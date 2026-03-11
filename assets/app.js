/* ============================================
   SYMFONY 8.0 EXPERT COCKPIT — Core Engine
   ============================================ */

// --- STATE MANAGEMENT ---
const State = {
    data: { completed: [], completedSubtopics: {}, flagged: [], scores: {}, notebook: {}, notebookTags: {}, bookmarks: [], lastTopic: null, studyDays: {}, fcMastery: {}, streak: 0, lastStudyDate: null, studyTime: 0, certResults: [], skillIQ: null },
    load() {
        try { const s = localStorage.getItem('symfony_cockpit_state'); if (s) { this.data = { ...this.data, ...JSON.parse(s) }; if (!this.data.completedSubtopics) this.data.completedSubtopics = {}; } } catch (e) { console.warn('State load error', e); }
    },
    save() { localStorage.setItem('symfony_cockpit_state', JSON.stringify(this.data)); },
    trackStudyDay() {
        const today = new Date().toISOString().slice(0, 10);
        this.data.studyDays[today] = (this.data.studyDays[today] || 0) + 1;
        if (this.data.lastStudyDate !== today) {
            const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
            this.data.streak = this.data.lastStudyDate === yesterday ? this.data.streak + 1 : 1;
            this.data.lastStudyDate = today;
        }
        this.save();
    }
};

// --- ROUTER ---
const Router = {
    handleRoute() {
        const hash = location.hash.slice(1) || 'mindmap';
        const views = ['mindmap', 'course', 'quiz', 'flashcards', 'cert-exam', 'skill-assessment', 'terminal'];
        views.forEach(v => {
            const el = document.getElementById('view-' + v);
            if (el) { el.classList.add('hidden'); el.style.zIndex = ''; }
        });
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar) sidebar.classList.add('hidden');
        sidebar?.classList.remove('md:flex');

        if (hash === 'mindmap') {
            document.getElementById('view-mindmap').classList.remove('hidden');
            App.renderMindmap();
        } else if (hash.startsWith('topic/')) {
            const id = hash.split('/')[1];
            document.getElementById('view-course').classList.remove('hidden');
            if (sidebar) { sidebar.classList.remove('hidden'); sidebar.classList.add('md:flex'); }
            App.renderTopicView(id);
        } else if (hash.startsWith('quiz/')) {
            const id = hash.split('/')[1];
            App.pendingQuizTopic = id;
            document.getElementById('mode-modal').classList.remove('hidden');
        } else if (hash.startsWith('flashcards/')) {
            const id = hash.split('/')[1];
            document.getElementById('view-flashcards').classList.remove('hidden');
            App.renderFlashcardsView(id);
        } else if (hash === 'certification-exam') {
            document.getElementById('view-cert-exam').classList.remove('hidden');
            App.renderCertExamPreScreen();
        } else if (hash === 'skill-assessment') {
            document.getElementById('view-skill-assessment').classList.remove('hidden');
        } else if (hash === 'terminal') {
            document.getElementById('view-terminal').classList.remove('hidden');
            App.initTerminal();
        }
        // Update mobile nav active state
        document.querySelectorAll('.mobile-nav-item').forEach(el => {
            el.classList.toggle('active', el.getAttribute('href') === '#' + hash.split('/')[0]);
        });
        State.trackStudyDay();
    }
};

// --- HELPERS ---
function getAllTopicIds() {
    const ids = [];
    (AppData.modules || []).forEach(m => (m.topics || []).forEach(t => ids.push(t.id)));
    return ids;
}

function getTopicTitle(id) {
    for (const m of AppData.modules || []) for (const t of m.topics || []) if (t.id === id) return t.title;
    return id;
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
    return a;
}

function renderMarkdown(md) {
    if (!md) return '';
    try {
        const html = marked.parse(md);
        const div = document.createElement('div');
        div.innerHTML = html;
        div.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
        return div.innerHTML;
    } catch { return md; }
}

function makeProgressRing(percent, size = 48, stroke = 4, color = '#10b981') {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r, offset = c - (percent / 100) * c;
    return `<svg width="${size}" height="${size}" class="progress-ring"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="${stroke}"/><circle class="progress-ring__circle" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/></svg>`;
}

function confetti() {
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899'];
    for (let i = 0; i < 60; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.cssText = `left:${Math.random() * 100}vw;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};animation-delay:${Math.random() * 2}s;animation-duration:${2 + Math.random() * 2}s;width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }
}

// --- MAIN APP ---
const App = {
    pendingQuizTopic: null,
    quizMode: 'practice',
    quizTimer: null,
    quizTimeLeft: 0,
    certExam: null,
    certTimer: null,
    fcState: { cards: [], idx: 0, topicId: null, revealed: false },
    pomoState: { running: false, seconds: 25 * 60, interval: null },
    _qCountCache: {},

    // Count valid (non-gibberish) questions for a topic
    countValidQuestions(topicId) {
        if (this._qCountCache[topicId] !== undefined) return this._qCountCache[topicId];
        const raw = AppData.quizzes[topicId];
        if (!raw) { this._qCountCache[topicId] = 0; return 0; }
        const count = this.parseQuizQuestions(raw).length;
        this._qCountCache[topicId] = count;
        return count;
    },

    // Extract subtopics from markdown headers (## )
    getSubtopics(topicId) {
        const topic = (AppData.topics || []).find(t => t.id === topicId);
        if (!topic || !topic.content) return [];
        const matches = [...topic.content.matchAll(/^##\s+(.+)$/gm)];
        return matches.map(m => m[1].trim());
    },

    // Launch quiz for entire module
    startModuleQuiz(moduleIdx, mode) {
        const mod = (AppData.modules || [])[moduleIdx];
        if (!mod) return;
        const topicIds = (mod.topics || []).map(t => t.id).filter(id => AppData.quizzes && AppData.quizzes[id]);
        if (!topicIds.length) return;
        this.pendingQuizTopic = topicIds; // Array = multi-topic
        this.quizMode = mode;
        this.pendingQuizCount = 0;
        // Open mode modal for question count selection
        document.getElementById('mode-modal').classList.remove('hidden');
    },

    init() {
        State.load();
        this.renderSidebar();
        this.updateGlobalProgress();
        this.setupPomodoro();
        this.restoreStudyTime();
        this.setupFocusMode();
        this.setupEventListeners();
        window.addEventListener('hashchange', () => Router.handleRoute());
        Router.handleRoute();
    },

    // --- RADAR CHART (METRICS DASHBOARD) ---
    updateRadarChart() {
        const row = document.getElementById('dashboard-top-row');
        const cEl = document.getElementById('skillsRadarChart');
        if (!cEl || !row) return;

        // Show the top row
        row.classList.remove('hidden');

        // Extract module averages
        const labels = [];
        const data = [];

        (AppData.modules || []).forEach(mod => {
            const shortName = mod.title.split('-')[0].trim(); // Get main category name
            labels.push(shortName);

            let totalTopicScore = 0;
            let validTopics = 0;

            (mod.topics || []).forEach(t => {
                if (State.data.scores[t.id] !== undefined) {
                    totalTopicScore += State.data.scores[t.id];
                    validTopics++;
                } else if (State.data.completed.includes(t.id)) {
                    // Give a base score for merely completing a topic reading
                    totalTopicScore += 40;
                    validTopics++;
                }
            });

            data.push(validTopics > 0 ? Math.round(totalTopicScore / validTopics) : 0);
        });

        if (this.radarChartInstance) {
            this.radarChartInstance.destroy();
        }

        const ctx = cEl.getContext('2d');
        this.radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Skill Mastery (%)',
                    data: data,
                    backgroundColor: 'rgba(56, 189, 248, 0.2)', // brand-400 with opacity
                    borderColor: 'rgba(56, 189, 248, 1)',
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)', // emerald-500
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: {
                            color: 'rgba(148, 163, 184, 1)', // slate-400
                            font: { family: "'Inter', sans-serif", size: 10, weight: 'bold' }
                        },
                        ticks: {
                            display: false, // hide the numbers (0, 20, 40...) on the axes
                            min: 0,
                            max: 100,
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900
                        titleColor: '#fff',
                        bodyColor: '#38bdf8', // brand-400
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            label: function (context) { return context.raw + '% Mastery'; }
                        }
                    }
                }
            }
        });
    },

    // --- SIDEBAR ---
    renderSidebar() {
        const menu = document.getElementById('sidebar-menu');
        if (!menu) return;
        let html = '';
        (AppData.modules || []).forEach(mod => {
            const topicIds = (mod.topics || []).map(t => t.id);
            const done = topicIds.filter(id => State.data.completed.includes(id)).length;
            const pct = topicIds.length ? Math.round(done / topicIds.length * 100) : 0;
            html += `<div class="mb-1"><div class="flex items-center gap-2 px-4 py-2 text-[10px] font-black tracking-widest text-slate-500 uppercase">${makeProgressRing(pct, 20, 2)}<span class="truncate">${mod.title}</span><span class="ml-auto text-emerald-400/60 text-[9px]">${done}/${topicIds.length}</span></div>`;
            (mod.topics || []).forEach(t => {
                const completed = State.data.completed.includes(t.id);
                const flagged = State.data.flagged.includes(t.id);
                const active = location.hash === '#topic/' + t.id;
                html += `<a href="#topic/${t.id}" class="flex items-center gap-3 px-6 py-2 text-sm transition-colors ${active ? 'bg-brand-500/10 text-brand-400 border-r-2 border-brand-500' : 'text-slate-400 hover:text-white hover:bg-white/5'}"><span class="w-5 h-5 shrink-0 flex items-center justify-center">${completed ? '<svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : '<span class="w-2 h-2 rounded-full bg-slate-600"></span>'}</span><span class="truncate">${t.title}</span>${flagged ? '<svg class="w-3 h-3 text-amber-400 ml-auto shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M3 6a3 3 0 013-3h10l-2 6 2 6H6a3 3 0 01-3-3V6z"/></svg>' : ''}</a>`;
            });
            html += '</div>';
        });
        menu.innerHTML = html;
    },

    // --- GLOBAL PROGRESS ---
    updateGlobalProgress() {
        const all = getAllTopicIds();
        const done = all.filter(id => State.data.completed.includes(id)).length;
        const pct = all.length ? Math.round(done / all.length * 100) : 0;
        const bar = document.getElementById('global-progress-bar');
        const txt = document.getElementById('global-progress-text');
        if (bar) bar.style.width = pct + '%';
        if (txt) txt.textContent = pct + '%';
    },

    // --- MINDMAP ---
    renderMindmap() {
        this.renderStatsBar();
        this.renderContinueBanner();
        this.renderDailyChallenge();
        this.updateRadarChart();
        this.renderWeaknessWidget();
        const container = document.getElementById('mindmap-container');
        if (!container) return;
        let html = '';
        (AppData.modules || []).forEach((mod, mi) => {
            const topicIds = (mod.topics || []).map(t => t.id);
            const done = topicIds.filter(id => State.data.completed.includes(id)).length;
            const pct = topicIds.length ? Math.round(done / topicIds.length * 100) : 0;
            const status = done === 0 ? 'Not Started' : done === topicIds.length ? 'Mastered' : 'In Progress';
            const statusColor = done === 0 ? 'text-slate-500' : done === topicIds.length ? 'text-emerald-400' : 'text-brand-400';
            const gradients = ['from-blue-500/20 to-cyan-500/10', 'from-violet-500/20 to-purple-500/10', 'from-emerald-500/20 to-teal-500/10', 'from-amber-500/20 to-orange-500/10', 'from-rose-500/20 to-pink-500/10', 'from-indigo-500/20 to-blue-500/10', 'from-yellow-500/20 to-amber-500/10'];
            html += `<div class="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-br ${gradients[mi % gradients.length]} hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5">`;
            // Count valid questions for this module
            const quizTopicIds = topicIds.filter(id => AppData.quizzes && AppData.quizzes[id]);
            let moduleQCount = 0;
            quizTopicIds.forEach(tid => { moduleQCount += this.countValidQuestions(tid); });

            html += `<div class="flex items-center justify-between mb-4"><div class="flex items-center gap-4">${makeProgressRing(pct, 56, 5, done === topicIds.length ? '#10b981' : '#0ea5e9')}<div><h3 class="font-display font-bold text-lg text-white">${mod.title}</h3><span class="text-xs font-bold ${statusColor}">${status} · ${done}/${topicIds.length} topics</span></div></div>`;
            // Per-module quiz buttons
            if (moduleQCount > 0) {
                html += `<div class="flex gap-2 shrink-0"><button onclick="App.startModuleQuiz(${mi},'practice')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition-colors">📝 Practice (${moduleQCount}q)</button><button onclick="App.startModuleQuiz(${mi},'exam')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition-colors">🎯 Exam</button></div>`;
            }
            html += `</div>`;
            html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">';
            (mod.topics || []).forEach(t => {
                const completed = State.data.completed.includes(t.id);
                const hasFlash = AppData.flashcards && AppData.flashcards[t.id];
                const hasQuiz = AppData.quizzes && AppData.quizzes[t.id];
                const score = State.data.scores[t.id];
                const qCount = hasQuiz ? this.countValidQuestions(t.id) : 0;

                const checkboxHtml = `
                    <div class="relative flex items-center justify-center w-8 h-8 rounded-xl shrink-0 cursor-pointer transition-all border-2 ${completed ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-black/40 border-white/10 text-transparent hover:border-emerald-500/40 hover:bg-emerald-500/5'}" onclick="event.preventDefault(); event.stopPropagation(); App.toggleTopicComplete('${t.id}');">
                        <svg class="w-4 h-4 transition-all duration-300 ${completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </div>`;

                const subtopics = this.getSubtopics(t.id);
                let subtopicsHtml = '';
                if (subtopics.length > 0) {
                    const completedSubs = State.data.completedSubtopics[t.id] || [];
                    const subPct = Math.round(completedSubs.length / subtopics.length * 100);
                    subtopicsHtml += `<div class="mt-3 pt-3 border-t border-white/5 space-y-2">`;
                    subtopics.forEach(sub => {
                        const subCompleted = completedSubs.includes(sub);
                        subtopicsHtml += `
                            <div class="flex items-center gap-2 group/sub cursor-pointer" onclick="event.preventDefault(); event.stopPropagation(); App.toggleSubtopicComplete('${t.id}', '${sub.replace(/'/g, "\\'")}');">
                                <div class="w-4 h-4 rounded flex items-center justify-center shrink-0 border ${subCompleted ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-black/40 border-white/10 text-transparent group-hover/sub:border-emerald-500/40'} transition-all">
                                    <svg class="w-2.5 h-2.5 ${subCompleted ? 'opacity-100' : 'opacity-0'}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                                </div>
                                <span class="text-xs transition-colors truncate w-full ${subCompleted ? 'text-slate-500 line-through' : 'text-slate-400 group-hover/sub:text-slate-300'}">${sub}</span>
                            </div>`;
                    });
                    subtopicsHtml += `</div>`;
                }

                html += `<div class="flex flex-col bg-black/20 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <a href="#topic/${t.id}" class="group flex items-center gap-3 p-3">
                        ${checkboxHtml}
                        <div class="min-w-0 flex-1">
                            <p class="text-sm font-medium ${completed ? 'text-emerald-300/80 group-hover:text-emerald-300' : 'text-slate-200 group-hover:text-white'} truncate transition-colors">${t.title}</p>
                            <div class="flex items-center gap-2 mt-1">
                                ${hasFlash ? '<span class="text-[9px] font-bold uppercase tracking-wider text-yellow-500/70 bg-yellow-500/10 px-1.5 py-0.5 rounded">⚡ Cards</span>' : ''}
                                ${qCount > 0 ? `<span class="text-[9px] font-bold uppercase tracking-wider text-brand-400/70 bg-brand-500/10 px-1.5 py-0.5 rounded">📝 ${qCount}q</span>` : ''}
                                ${score !== undefined ? `<span class="text-[9px] font-bold bg-white/5 px-1.5 py-0.5 rounded ${score >= 85 ? 'text-emerald-400' : 'text-slate-400'}">${score}%</span>` : ''}
                            </div>
                        </div>
                    </a>
                    ${subtopicsHtml ? `<div class="px-3 pb-3">${subtopicsHtml}</div>` : ''}
                </div>`;
            });
            html += '</div></div>';
        });
        container.innerHTML = html;
    },

    toggleTopicComplete(topicId) {
        const done = State.data.completed.includes(topicId);
        if (done) {
            State.data.completed = State.data.completed.filter(c => c !== topicId);
            // Optionally uncheck all subtopics? Let's leave them checked for now so user doesn't lose progress if they accidentally uncheck main topic.
        } else {
            if (!State.data.completed.includes(topicId)) State.data.completed.push(topicId);
            // Check all subtopics automatically
            const subtopics = this.getSubtopics(topicId);
            if (subtopics.length > 0) {
                State.data.completedSubtopics[topicId] = [...subtopics];
            }
        }
        State.save();
        this.renderMindmap();
        this.updateGlobalProgress();
        this.renderSidebar();
    },

    toggleSubtopicComplete(topicId, subtopicStr) {
        if (!State.data.completedSubtopics[topicId]) {
            State.data.completedSubtopics[topicId] = [];
        }

        const subs = State.data.completedSubtopics[topicId];
        const idx = subs.indexOf(subtopicStr);
        if (idx !== -1) {
            subs.splice(idx, 1);
            // If main topic was complete, maybe uncomplete it?
            if (State.data.completed.includes(topicId)) {
                State.data.completed = State.data.completed.filter(c => c !== topicId);
            }
        } else {
            subs.push(subtopicStr);
            // Check if ALL are now complete
            const allSubs = this.getSubtopics(topicId);
            if (subs.length === allSubs.length && allSubs.length > 0) {
                if (!State.data.completed.includes(topicId)) State.data.completed.push(topicId);
            }
        }
        State.save();
        this.renderMindmap();
        this.updateGlobalProgress();
        this.renderSidebar();
    },

    renderStatsBar() {
        const bar = document.getElementById('stats-bar');
        if (!bar) return;
        const all = getAllTopicIds();
        const done = all.filter(id => State.data.completed.includes(id)).length;
        const scores = Object.values(State.data.scores);
        const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const totalCards = Object.values(AppData.flashcards || {}).reduce((s, c) => s + c.length, 0);
        const mastered = Object.values(State.data.fcMastery || {}).filter(v => v === 'got-it').length;
        bar.innerHTML = `
            <div class="stat-card"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Topics</div><div class="flex items-center gap-2"><span class="text-2xl font-display font-black text-white">${done}</span><span class="text-sm text-slate-500">/ ${all.length}</span></div></div>
            <div class="stat-card"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Quiz Avg</div><div class="text-2xl font-display font-black ${avg >= 85 ? 'text-emerald-400' : avg >= 60 ? 'text-amber-400' : 'text-slate-300'}">${avg}%</div></div>
            <div class="stat-card"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Flashcards</div><div class="flex items-center gap-2"><span class="text-2xl font-display font-black text-white">${mastered}</span><span class="text-sm text-slate-500">/ ${totalCards}</span></div></div>
            <div class="stat-card"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Streak</div><div class="text-2xl font-display font-black text-amber-400">${State.data.streak} 🔥</div></div>
            <div class="stat-card hidden md:block"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Cert Exams</div><div class="text-2xl font-display font-black text-violet-400">${(State.data.certResults || []).length}</div></div>`;
    },

    renderContinueBanner() {
        const banner = document.getElementById('continue-banner');
        if (!banner || !State.data.lastTopic) { if (banner) banner.classList.add('hidden'); return; }
        const title = getTopicTitle(State.data.lastTopic);
        banner.classList.remove('hidden');
        banner.innerHTML = `<a href="#topic/${State.data.lastTopic}" class="block glass-card rounded-2xl p-5 bg-gradient-to-r from-brand-500/10 to-transparent hover:from-brand-500/15 transition-all group"><div class="flex items-center justify-between"><div><p class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-1">Continue Learning</p><h3 class="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">${title}</h3></div><svg class="w-8 h-8 text-brand-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></div></a>`;
    },

    renderDailyChallenge() {
        const el = document.getElementById('daily-challenge');
        if (!el) return;
        const allQuizIds = Object.keys(AppData.quizzes || {});
        if (!allQuizIds.length) { el.classList.add('hidden'); return; }
        const today = new Date().toISOString().slice(0, 10);
        const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
        const topicId = allQuizIds[seed % allQuizIds.length];
        el.classList.remove('hidden');
        el.innerHTML = `<div class="daily-challenge p-5 relative z-10"><div class="flex items-center justify-between relative z-10"><div><p class="text-xs font-bold text-violet-300 uppercase tracking-widest mb-1">⭐ Daily Challenge</p><h3 class="text-base font-bold text-white">Test yourself on: ${getTopicTitle(topicId)}</h3></div><a href="#quiz/${topicId}" class="px-4 py-2 rounded-xl text-sm font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/20">Take Challenge</a></div></div>`;
    },

    // --- TOPIC VIEW ---
    renderTopicView(topicId) {
        State.data.lastTopic = topicId;
        State.save();
        
        // Check if it's a regular topic or a code review
        const topic = (AppData.topics || []).find(t => t.id === topicId);
        const codeReview = (AppData.codeReviews || []).find(r => r.id === topicId);
        
        const titleEl = document.getElementById('course-title');
        const contentEl = document.getElementById('course-content');
        const metaEl = document.getElementById('course-meta');

        // Reset CR Lock
        this.crLocked = false;

        if (codeReview) {
            if (titleEl) titleEl.textContent = codeReview.title;
            if (metaEl) { metaEl.textContent = 'Code Review'; metaEl.classList.remove('hidden'); }
            this.renderCodeReview(topicId);
        } else {
            if (titleEl) titleEl.textContent = topic ? topic.title : topicId;
            let content = topic ? renderMarkdown(topic.content) : '<p class="text-slate-500">No content found.</p>';
            
            // Check for associated Code Reviews
            const associatedCRIds = this.topicToCodeReview[topicId] || [];
            if (associatedCRIds.length > 0) {
                content += `
                    <div class="mt-20 pt-12 border-t border-white/5">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <h3 class="text-xl font-bold text-white">Interactive Bug-Hunting Labs</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                `;
                
                associatedCRIds.forEach(crId => {
                    const cr = (AppData.codeReviews || []).find(r => r.id === crId);
                    if (cr) {
                        const isDone = (State.data.completed || []).includes(crId);
                        content += `
                            <div onclick="location.hash='#topic/${crId}'" class="glass-card rounded-2xl p-6 border-rose-500/10 hover:border-rose-500/20 transition-all group cursor-pointer">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Lab Challenge</span>
                                    ${isDone ? '<span class="text-emerald-400 text-xs font-black">MASTERED ✓</span>' : ''}
                                </div>
                                <h4 class="text-sm font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">${cr.title}</h4>
                                <p class="text-[11px] text-slate-500 leading-relaxed mb-4">Spot the architectural flaw in this <strong>${topic ? topic.title : topicId}</strong> implementation.</p>
                                <div class="text-[10px] font-bold text-rose-500/80 uppercase">Start Challenge →</div>
                            </div>
                        `;
                    }
                });

                content += `
                        </div>
                    </div>
                `;
            }

            if (contentEl) contentEl.innerHTML = content;
            // Meta badge
            const modInfo = (AppData.modules || []).find(m => (m.topics || []).some(t => t.id === topicId));
            if (metaEl && modInfo) { metaEl.textContent = modInfo.title; metaEl.classList.remove('hidden'); }
        }
        // Flashcards button
        const fcBtn = document.getElementById('btn-flashcards');
        if (fcBtn) { const has = AppData.flashcards && AppData.flashcards[topicId]; if (has) { fcBtn.href = '#flashcards/' + topicId; fcBtn.classList.remove('hidden'); } else { fcBtn.classList.add('hidden'); } }
        // Quiz button
        const qBtn = document.getElementById('btn-start-quiz');
        if (qBtn) { const has = AppData.quizzes && AppData.quizzes[topicId]; qBtn.href = has ? '#quiz/' + topicId : '#'; qBtn.style.opacity = has ? '1' : '0.3'; qBtn.style.pointerEvents = has ? 'auto' : 'none'; }
        // Flag button
        this.updateFlagButton(topicId);
        // Mark complete button
        this.updateCompleteButton(topicId);
        // Notebook
        this.loadNotebook(topicId);
        // Bookmark button
        this.updateBookmarkButton(topicId);
        // Reading progress
        this.setupReadingProgress();
        // Table of contents + checklist
        this.generateToC(topicId);
        // Sidebar highlight
        this.renderSidebar();
    },

    // --- TABLE OF CONTENTS + REVISION CHECKLIST ---
    generateToC(topicId) {
        const tocList = document.getElementById('toc-list');
        const tocProgress = document.getElementById('toc-progress');
        const tocBar = document.getElementById('toc-progress-bar');
        if (!tocList) return;
        const content = document.getElementById('course-content');
        if (!content) return;
        const headings = content.querySelectorAll('h2, h3');
        if (!headings.length) {
            tocList.innerHTML = '<p class="text-slate-600 p-2">No sections found</p>';
            return;
        }
        if (!State.data.tocChecked) State.data.tocChecked = {};
        let html = '';
        headings.forEach((h, i) => {
            const id = `toc-${topicId}-${i}`;
            h.id = `heading-${i}`;
            const checked = State.data.tocChecked[id] ? 'checked' : '';
            const indent = h.tagName === 'H3' ? 'pl-4' : '';
            const weight = h.tagName === 'H2' ? 'font-bold text-slate-200' : 'text-slate-400';
            html += `
                <label class="flex items-start gap-2 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors ${indent} group">
                    <input type="checkbox" ${checked} data-toc-id="${id}" onchange="App.toggleTocCheck(this)"
                        class="mt-0.5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500/30 shrink-0" style="accent-color:#06b6d4">
                    <span class="${weight} leading-tight group-hover:text-white transition-colors cursor-pointer"
                        onclick="document.getElementById('heading-${i}').scrollIntoView({behavior:'smooth',block:'start'})">
                        ${h.textContent}
                    </span>
                </label>`;
        });
        tocList.innerHTML = html;
        this.updateTocProgress(topicId, headings.length);
    },

    toggleTocCheck(el) {
        const id = el.dataset.tocId;
        if (!State.data.tocChecked) State.data.tocChecked = {};
        State.data.tocChecked[id] = el.checked;
        State.save();
        // Extract topicId from toc id
        const parts = id.split('-');
        parts.shift(); // remove 'toc'
        parts.pop(); // remove index
        const topicId = parts.join('-');
        const count = document.querySelectorAll('#toc-list input[type=checkbox]').length;
        this.updateTocProgress(topicId, count);
    },

    updateTocProgress(topicId, totalCount) {
        const checked = Object.keys(State.data.tocChecked || {}).filter(k => k.startsWith(`toc-${topicId}-`) && State.data.tocChecked[k]).length;
        const pct = totalCount > 0 ? Math.round(checked / totalCount * 100) : 0;
        const prog = document.getElementById('toc-progress');
        const bar = document.getElementById('toc-progress-bar');
        if (prog) prog.textContent = pct + '%';
        if (bar) bar.style.width = pct + '%';
    },

    // --- FLAG MANAGEMENT ---
    updateFlagButton(topicId) {
        const btn = document.getElementById('btn-flag');
        if (!btn) return;
        const flagged = State.data.flagged.includes(topicId);
        btn.className = btn.className.replace(/text-\w+-\d+/g, '');
        btn.classList.add(flagged ? 'text-amber-400' : 'text-slate-300');
        btn.querySelector('span')?.textContent && (btn.querySelector('span').textContent = flagged ? 'Unflag' : 'Flag');
        btn.onclick = () => {
            if (State.data.flagged.includes(topicId)) State.data.flagged = State.data.flagged.filter(f => f !== topicId);
            else State.data.flagged.push(topicId);
            State.save();
            this.updateFlagButton(topicId);
            this.renderSidebar();
        };
    },

    updateCompleteButton(topicId) {
        const btn = document.getElementById('btn-mark-complete');
        if (!btn) return;
        const done = State.data.completed.includes(topicId);
        btn.innerHTML = done ? '✓ Completed — Undo' : 'Mark as Complete';
        btn.className = btn.className.replace(/bg-\w+-\d+/g, '');
        btn.classList.add(done ? 'bg-emerald-600' : 'bg-brand-600');
        btn.onclick = () => {
            if (done) State.data.completed = State.data.completed.filter(c => c !== topicId);
            else if (!State.data.completed.includes(topicId)) State.data.completed.push(topicId);
            State.save();
            this.updateCompleteButton(topicId);
            this.updateGlobalProgress();
            this.renderSidebar();
        };
    },

    loadNotebook(topicId) {
        const ta = document.getElementById('notebook-textarea');
        const tags = document.getElementById('notebook-tags');
        if (ta) { ta.value = State.data.notebook[topicId] || ''; ta.oninput = () => { State.data.notebook[topicId] = ta.value; State.save(); }; }
        if (tags) { tags.value = State.data.notebookTags[topicId] || ''; tags.oninput = () => { State.data.notebookTags[topicId] = tags.value; State.save(); }; }
    },

    // --- MANUAL FLASHCARD GENERATOR ---
    openFlashcardGenerator() {
        const modal = document.getElementById('flashcard-generator-modal');
        if (!modal) return;

        const qInput = document.getElementById('fc-gen-q');
        const aInput = document.getElementById('fc-gen-a');
        const cInput = document.getElementById('fc-gen-code');
        const ta = document.getElementById('notebook-textarea');

        qInput.value = '';
        aInput.value = '';
        cInput.value = '';

        // Pre-fill answer with highlighted text from notebook if any
        if (ta) {
            const selectedText = ta.value.substring(ta.selectionStart, ta.selectionEnd);
            if (selectedText) {
                aInput.value = selectedText;
            }
        }

        modal.classList.remove('hidden');
        qInput.focus();
    },

    closeFlashcardGenerator() {
        const modal = document.getElementById('flashcard-generator-modal');
        if (modal) modal.classList.add('hidden');
    },

    saveCustomFlashcard() {
        const topicId = State.data.lastTopic;
        if (!topicId) {
            alert('Error: No active topic found.');
            return;
        }

        const q = document.getElementById('fc-gen-q').value.trim();
        const a = document.getElementById('fc-gen-a').value.trim();
        const c = document.getElementById('fc-gen-code').value.trim();

        if (!q || (!a && !c)) {
            alert('Please provide a Question and either an Answer or a Code snippet.');
            return;
        }

        // Initialize topic flashcards array if it doesn't exist
        if (!AppData.flashcards) AppData.flashcards = {};
        if (!AppData.flashcards[topicId]) AppData.flashcards[topicId] = [];

        const newCard = {
            q: q,
            a: a,
            code: c || undefined,
            isCustom: true // Mark as user-generated
        };

        AppData.flashcards[topicId].push(newCard);

        // Show success feedback
        this.closeFlashcardGenerator();
        const btn = document.getElementById('btn-create-flashcard');
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '✅ Saved!';
            btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
            }, 2000);
        }
    },

    setupReadingProgress() {
        const scrollArea = document.getElementById('course-scroll-area');
        const bar = document.getElementById('reading-progress-bar');
        if (!scrollArea || !bar) return;
        scrollArea.onscroll = () => {
            const pct = scrollArea.scrollTop / (scrollArea.scrollHeight - scrollArea.clientHeight) * 100;
            bar.style.width = Math.min(100, pct) + '%';
        };
    },

    // --- FOCUS MODE ---
    focusModeActive: false,

    setupFocusMode() {
        const btn = document.getElementById('btn-focus-mode');
        if (!btn) return;
        btn.onclick = () => this.toggleFocusMode();
    },

    toggleFocusMode() {
        this.focusModeActive = !this.focusModeActive;
        const btn = document.getElementById('btn-focus-mode');
        const sidebar = document.getElementById('app-sidebar');
        const tocPanel = document.getElementById('toc-panel');
        const notebookPanel = document.querySelector('.w-80.bg-dark-900.border-l'); // The notebook panel

        if (this.focusModeActive) {
            if (btn) {
                btn.classList.add('bg-brand-500/20', 'text-brand-400', 'border-brand-500/30');
                btn.classList.remove('bg-slate-800', 'text-slate-300', 'border-slate-700');
            }
            if (sidebar) { sidebar.classList.remove('md:flex'); sidebar.classList.add('hidden'); }
            if (tocPanel) { tocPanel.classList.remove('lg:flex'); tocPanel.classList.add('hidden'); }
            if (notebookPanel) { notebookPanel.classList.remove('lg:flex'); notebookPanel.classList.add('hidden'); }
        } else {
            if (btn) {
                btn.classList.remove('bg-brand-500/20', 'text-brand-400', 'border-brand-500/30');
                btn.classList.add('bg-slate-800', 'text-slate-300', 'border-slate-700');
            }
            if (sidebar) { sidebar.classList.add('md:flex'); sidebar.classList.remove('hidden'); }
            if (tocPanel) { tocPanel.classList.add('lg:flex'); tocPanel.classList.remove('hidden'); }
            if (notebookPanel) { notebookPanel.classList.add('lg:flex'); notebookPanel.classList.remove('hidden'); }
        }
    },

    toggleMobileNotebook() {
        const notebookPanel = document.querySelector('.w-80.bg-dark-900.border-l');
        if (!notebookPanel) return;

        if (notebookPanel.classList.contains('hidden')) {
            // Show as absolute overlay on mobile
            notebookPanel.classList.remove('hidden', 'lg:flex');
            notebookPanel.classList.add('absolute', 'right-0', 'top-14', 'bottom-0', 'z-40', 'shadow-2xl');
        } else {
            notebookPanel.classList.add('hidden', 'lg:flex');
            notebookPanel.classList.remove('absolute', 'right-0', 'top-14', 'bottom-0', 'z-40', 'shadow-2xl');
        }
    },

    // --- BOOKMARKS ---
    updateBookmarkButton(topicId) {
        const btn = document.getElementById('btn-bookmark-topic');
        if (!btn) return;
        const isBookmarked = (State.data.bookmarks || []).some(b => b.id === topicId);
        btn.querySelector('svg').setAttribute('fill', isBookmarked ? 'currentColor' : 'none');
        btn.onclick = () => {
            if (!State.data.bookmarks) State.data.bookmarks = [];
            const idx = State.data.bookmarks.findIndex(b => b.id === topicId);
            if (idx >= 0) State.data.bookmarks.splice(idx, 1);
            else State.data.bookmarks.push({ id: topicId, title: getTopicTitle(topicId), ts: Date.now() });
            State.save();
            this.updateBookmarkButton(topicId);
            this.updateBookmarkCount();
        };
    },

    updateBookmarkCount() {
        const el = document.getElementById('bookmark-count');
        if (!el) return;
        const n = (State.data.bookmarks || []).length;
        el.textContent = n;
        el.classList.toggle('hidden', n === 0);
    },

    toggleBookmarks() {
        const panel = document.getElementById('bookmarks-panel');
        if (!panel) return;
        const open = !panel.classList.contains('translate-x-full');
        panel.classList.toggle('translate-x-full', open);
        if (!open) {
            const list = document.getElementById('bookmarks-list');
            if (!list) return;
            const bm = State.data.bookmarks || [];
            list.innerHTML = bm.length ? bm.map(b => `<a href="#topic/${b.id}" class="block p-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 hover:text-white transition-colors">${b.title}</a>`).join('') : '<p class="text-sm text-slate-500">No bookmarks yet.</p>';
        }
    },

    // --- QUIZ SYSTEM ---
    pendingQuizCount: 0, // 0 = all

    startQuizWithMode(mode) {
        document.getElementById('mode-modal').classList.add('hidden');
        this.quizMode = mode;
        const topicId = this.pendingQuizTopic;
        const quizView = document.getElementById('view-quiz');
        if (quizView) { quizView.classList.remove('hidden'); quizView.style.zIndex = '30'; }
        this.showOnlyWrong = false;
        // Support multiple topic IDs (for module quiz)
        if (Array.isArray(topicId)) {
            this.renderMultiTopicQuiz(topicId);
        } else {
            this.renderQuiz(topicId);
        }
    },

    renderMultiTopicQuiz(topicIds) {
        let allQuestions = [];
        topicIds.forEach(tid => {
            const raw = AppData.quizzes[tid];
            if (!raw) return;
            const qs = this.parseQuizQuestions(raw);
            qs.forEach(q => { q.topicId = tid; });
            allQuestions = allQuestions.concat(qs);
        });
        const shuffled = shuffleArray(allQuestions);
        const limited = this.pendingQuizCount > 0 ? shuffled.slice(0, this.pendingQuizCount) : shuffled;
        const modeBadge = document.getElementById('quiz-mode-label');
        const timerDisplay = document.getElementById('quiz-timer-display');
        if (modeBadge) modeBadge.textContent = this.quizMode === 'practice' ? 'Practice Mode' : 'Exam Mode';
        if (modeBadge) modeBadge.className = `text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${this.quizMode === 'practice' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`;
        const titleEl = document.getElementById('quiz-title');
        if (titleEl) titleEl.textContent = 'Module Quiz — ' + limited.length + ' questions';
        const backEl = document.getElementById('quiz-back');
        if (backEl) backEl.href = '#mindmap';
        this.activeQuiz = { topicId: topicIds.join(','), questions: limited, answers: {}, submitted: false };
        if (this.quizMode === 'exam') {
            this.quizTimeLeft = limited.length * 60;
            if (timerDisplay) { timerDisplay.classList.remove('hidden'); timerDisplay.textContent = this.formatTime(this.quizTimeLeft); }
            this.quizTimer = setInterval(() => { this.quizTimeLeft--; if (timerDisplay) timerDisplay.textContent = this.formatTime(this.quizTimeLeft); if (this.quizTimeLeft <= 0) { clearInterval(this.quizTimer); this.submitQuiz(); } }, 1000);
        } else { if (timerDisplay) timerDisplay.classList.add('hidden'); }
        this.renderQuizQuestions();
    },

    renderQuiz(topicId) {
        const raw = AppData.quizzes[topicId];
        if (!raw) return;
        const modeBadge = document.getElementById('quiz-mode-label');
        const timerDisplay = document.getElementById('quiz-timer-display');
        if (modeBadge) modeBadge.textContent = this.quizMode === 'practice' ? 'Practice Mode' : 'Exam Mode';
        if (modeBadge) modeBadge.className = `text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${this.quizMode === 'practice' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`;
        const titleEl = document.getElementById('quiz-title');
        const backEl = document.getElementById('quiz-back');
        if (backEl) backEl.href = '#topic/' + topicId;

        const allQuestions = this.parseQuizQuestions(raw);
        const shuffled = shuffleArray(allQuestions);
        const limited = this.pendingQuizCount > 0 ? shuffled.slice(0, this.pendingQuizCount) : shuffled;
        if (titleEl) titleEl.textContent = getTopicTitle(topicId) + ' — ' + limited.length + '/' + allQuestions.length + ' questions';
        this.activeQuiz = { topicId, questions: limited, answers: {}, submitted: false };

        if (this.quizMode === 'exam') {
            this.quizTimeLeft = limited.length * 60;
            if (timerDisplay) { timerDisplay.classList.remove('hidden'); timerDisplay.textContent = this.formatTime(this.quizTimeLeft); }
            this.quizTimer = setInterval(() => { this.quizTimeLeft--; if (timerDisplay) timerDisplay.textContent = this.formatTime(this.quizTimeLeft); if (this.quizTimeLeft <= 0) { clearInterval(this.quizTimer); this.submitQuiz(); } }, 1000);
        } else { if (timerDisplay) timerDisplay.classList.add('hidden'); }

        this.renderQuizQuestions();
    },

    // --- GIBBERISH DETECTION ---
    isGibberishQuestion(q) {
        // Detect corrupted auto-generated questions
        const gibberishTitle = /\b(concept|conceptual|architectural|gracefully|flexibly|magically|seamlessly|natively)\b.*\d+\s*:?\s*$/i;
        const genericOptions = /^(Component logic [A-Z]|Feature [A-Z])$/i;
        const gibberishExplanation = /\b(optimally intelligently|gracefully cleanly|magically gracefully|rationally wonderfully)\b/i;
        const regardingConcept = /^Regarding\s+.*\bconceptu?a?l?\b/i;
        const regardingGeneric = /^Regarding\s+.*\bconcept\s+\d+/i;
        // Check title
        if (gibberishTitle.test(q.text) || regardingConcept.test(q.text) || regardingGeneric.test(q.text)) return true;
        // Check if ALL options are generic placeholders
        if (q.options.length >= 2 && q.options.every(o => genericOptions.test(o.trim()))) return true;
        // Check explanation for gibberish filler
        if (q.explanation && gibberishExplanation.test(q.explanation)) return true;
        // Check if question text has 10+ adjectives/adverbs in a row (gibberish pattern)
        const words = q.text.split(/\s+/);
        if (words.length > 15) {
            const adverbs = words.filter(w => /ly$/i.test(w)).length;
            if (adverbs > 5) return true;
        }
        return false;
    },

    parseQuizQuestions(raw) {
        const questions = [];
        const blocks = raw.split(/\n(?=###\s*Q\d+|\n(?=\d+[\.\)]\s))/);
        blocks.forEach(block => {
            const lines = block.trim().split('\n').filter(l => l.trim());
            if (!lines.length) return;
            let qText = '';
            const headerMatch = lines[0].match(/^###\s*Q\d+[:\.]\s*(.+)/);
            const numMatch = lines[0].match(/^\d+[\.\)]\s*(.+)/);
            if (headerMatch) qText = headerMatch[1];
            else if (numMatch) qText = numMatch[1];
            else return;
            const q = { text: qText, options: [], correct: [], type: 'single', explanation: '', reference: '' };
            let correctLetters = [];
            lines.slice(1).forEach(line => {
                const optMatch = line.match(/^[-*]\s*\[([xX ]?)\]\s*(?:[A-Z]\)\s*)?(.+)/);
                if (optMatch) {
                    q.options.push(optMatch[2].trim());
                    if (optMatch[1] && optMatch[1].toLowerCase() === 'x') q.correct.push(q.options.length - 1);
                    return;
                }
                const corrMatch = line.match(/^\*\*Correct\s+Answer\(?s?\)?:?\*\*\s*(.+)/i);
                if (corrMatch) { correctLetters = corrMatch[1].replace(/[\s]/g, '').split(/[,&]+/); return; }
                const explMatch = line.match(/^\*\*Explanation:?\*\*\s*(.+)/i);
                if (explMatch) { q.explanation = explMatch[1].trim(); return; }
                const refMatch = line.match(/^\*\*Reference:?\*\*\s*(.+)/i);
                if (refMatch) { q.reference = refMatch[1].trim(); return; }
            });
            if (q.correct.length === 0 && correctLetters.length > 0) {
                correctLetters.forEach(letter => {
                    const idx = letter.trim().toUpperCase().charCodeAt(0) - 65;
                    if (idx >= 0 && idx < q.options.length) q.correct.push(idx);
                });
            }
            if (q.options.length >= 2 && q.correct.length >= 1) {
                q.type = q.correct.length > 1 ? 'multiple' : 'single';
                if (q.options.length === 2 && q.options.every(o => ['true', 'false'].includes(o.replace(/^[A-Z]\)\s*/, '').toLowerCase()))) q.type = 'truefalse';
                // QUALITY FILTER: reject gibberish
                if (!this.isGibberishQuestion(q)) {
                    questions.push(q);
                }
            }
        });
        return questions;
    },

    renderQuizQuestions() {
        const container = document.getElementById('quiz-container');
        if (!container || !this.activeQuiz) return;
        const { questions, answers, submitted } = this.activeQuiz;
        let html = '';
        questions.forEach((q, qi) => {
            const userAns = answers[qi] || [];
            const isCorrect = submitted ? (q.correct.length === userAns.length && q.correct.every(c => userAns.includes(c))) : null;
            // Filter: show only wrong answers if filter active
            if (this.showOnlyWrong && submitted && isCorrect) return;
            html += `<div class="glass-card rounded-xl p-5 border ${submitted ? (isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30') : 'border-white/5'}">`;
            html += `<div class="flex items-start gap-3 mb-4"><span class="flex items-center justify-center w-8 h-8 rounded-lg ${submitted ? (isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400') : 'bg-white/5 text-slate-400'} text-xs font-bold shrink-0">${qi + 1}</span><p class="text-sm font-medium text-slate-200 pt-1">${q.text}</p></div>`;
            html += '<div class="space-y-2 ml-11">';
            q.options.forEach((opt, oi) => {
                const selected = userAns.includes(oi);
                const isRight = q.correct.includes(oi);
                let cls = 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10 cursor-pointer';
                if (selected && !submitted) cls = 'bg-brand-500/20 border-brand-500/30 text-brand-300';
                if (submitted && isRight) cls = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300';
                if (submitted && selected && !isRight) cls = 'bg-rose-500/20 border-rose-500/30 text-rose-300';
                const inputType = q.type === 'multiple' ? 'checkbox' : 'radio';
                html += `<label class="flex items-center gap-3 p-3 rounded-lg border transition-all ${cls}" ${submitted ? '' : `onclick="App.selectAnswer(${qi},${oi},'${q.type}')"`}><input type="${inputType}" class="hidden" ${selected ? 'checked' : ''} ${submitted ? 'disabled' : ''}><span class="w-4 h-4 rounded-${q.type === 'multiple' ? 'sm' : 'full'} border-2 flex items-center justify-center shrink-0 ${selected ? 'border-brand-400 bg-brand-500/30' : 'border-slate-600'}">${selected ? '<span class="w-2 h-2 rounded-full bg-brand-400"></span>' : ''}</span><span class="text-sm">${opt}</span></label>`;
            });
            html += '</div>';
            // Show correction: correct answer + explanation
            if (submitted && !isCorrect) {
                html += `<div class="mt-3 ml-11 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300"><strong>✓ Correct:</strong> ${q.correct.map(c => q.options[c]).join(', ')}`;
                if (q.explanation) html += `<br><span class="text-slate-400 mt-1 block">💡 ${q.explanation}</span>`;
                if (q.reference) html += `<br><a href="${q.reference}" target="_blank" class="text-brand-400 hover:underline">📖 Reference</a>`;
                html += `</div>`;
            }
            if (submitted && isCorrect) {
                html += `<div class="mt-3 ml-11 p-2 rounded-lg text-xs text-emerald-400/60">✅ Correct${q.explanation ? ' — ' + q.explanation : ''}</div>`;
            }
            html += '</div>';
        });
        if (!submitted) {
            html += `<button onclick="App.submitQuiz()" class="w-full py-4 rounded-xl font-bold text-lg bg-brand-600 text-white hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/20 mt-6">Submit Answers</button>`;
        } else {
            // Review wrong answers filter
            html += `<div class="flex gap-3 mt-6 mb-4"><button onclick="App.showOnlyWrong=false;App.renderQuizQuestions()" class="px-4 py-2 rounded-lg text-sm font-bold ${!this.showOnlyWrong ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400'} transition-colors">All Questions</button><button onclick="App.showOnlyWrong=true;App.renderQuizQuestions()" class="px-4 py-2 rounded-lg text-sm font-bold ${this.showOnlyWrong ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'} transition-colors">❌ Wrong Only</button></div>`;
        }
        container.innerHTML = html;
    },

    selectAnswer(qi, oi, type) {
        if (!this.activeQuiz || this.activeQuiz.submitted) return;
        if (!this.activeQuiz.answers[qi]) this.activeQuiz.answers[qi] = [];
        if (type === 'multiple') {
            const idx = this.activeQuiz.answers[qi].indexOf(oi);
            if (idx >= 0) this.activeQuiz.answers[qi].splice(idx, 1);
            else this.activeQuiz.answers[qi].push(oi);
        } else {
            this.activeQuiz.answers[qi] = [oi];
        }
        if (this.quizMode === 'practice') {
            // Immediate feedback per question in practice mode
        }
        this.renderQuizQuestions();
    },

    submitQuiz() {
        if (!this.activeQuiz) return;
        if (this.quizTimer) { clearInterval(this.quizTimer); this.quizTimer = null; }
        this.activeQuiz.submitted = true;
        const { questions, answers, topicId } = this.activeQuiz;
        let correct = 0;
        questions.forEach((q, qi) => {
            const ua = answers[qi] || [];
            if (q.correct.length === ua.length && q.correct.every(c => ua.includes(c))) correct++;
        });
        const score = Math.round(correct / questions.length * 100);
        State.data.scores[topicId] = Math.max(State.data.scores[topicId] || 0, score);
        State.save();
        this.renderQuizQuestions();
        // Prepend score result
        const container = document.getElementById('quiz-container');
        const scoreColor = score >= 85 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400';
        const scoreHTML = `<div class="glass-card rounded-2xl p-8 mb-8 text-center"><h3 class="text-5xl font-display font-black ${scoreColor} mb-3">${score}%</h3><p class="text-slate-400">${correct}/${questions.length} correct — ${score >= 85 ? 'Expert Level! 🏆' : score >= 60 ? 'Advanced Level' : 'Keep studying!'}</p>${score >= 85 ? '<p class="text-emerald-300 text-sm mt-2">🎉 Outstanding performance!</p>' : ''}</div>`;
        container.insertAdjacentHTML('afterbegin', scoreHTML);
        if (score >= 85) confetti();
        this.updateGlobalProgress();
    },

    // --- WEAKNESS QUIZ GENERATOR ---
    renderWeaknessWidget() {
        const widget = document.getElementById('weak-areas-content');
        if (!widget) return;

        const scores = Object.entries(State.data.scores);
        if (!scores.length) {
            widget.innerHTML = '<p class="text-slate-500 text-xs">Complete some quizzes to see your weak areas.</p>';
            return;
        }

        // Sort by score ascending
        scores.sort((a, b) => a[1] - b[1]);
        const weakTopics = scores.filter(s => s[1] < 70).slice(0, 3);

        if (!weakTopics.length) {
            widget.innerHTML = '<div class="flex items-center gap-2 text-emerald-400 text-xs font-bold"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>You have no major weak areas!</div>';
            return;
        }

        let html = '<ul class="space-y-2 mt-2">';
        weakTopics.forEach(([id, score]) => {
            const title = getTopicTitle(id);
            html += `<li class="flex items-center justify-between text-xs"><span class="text-slate-300 truncate pr-2">${title}</span><span class="font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">${score}%</span></li>`;
        });
        html += '</ul>';
        widget.innerHTML = html;
        this.currentWeakTopics = weakTopics.map(w => w[0]);
    },

    generateWeaknessQuiz() {
        if (!this.currentWeakTopics || !this.currentWeakTopics.length) {
            alert('Complete some quizzes and get a score under 70% to generate a weakness quiz.');
            return;
        }

        // Use the multi-topic quiz logic
        this.pendingQuizTopic = this.currentWeakTopics;
        this.quizMode = 'practice';
        this.pendingQuizCount = 15; // Limit to 15 questions for focused practice

        const quizView = document.getElementById('view-quiz');
        if (quizView) { quizView.classList.remove('hidden'); quizView.style.zIndex = '30'; }

        this.renderMultiTopicQuiz(this.currentWeakTopics);

        // Override title
        const titleEl = document.getElementById('quiz-title');
        if (titleEl) titleEl.textContent = 'Targeted Weakness Quiz — ' + this.pendingQuizCount + ' questions';
    },

    // --- ADVANCED POMODORO & SESSION TRACKING ---
    pomoMode: 'work', // 'work' | 'break'

    setupPomodoro() {
        const btn = document.getElementById('btn-pomo');
        if (!btn) return;
        btn.onclick = () => this.togglePomodoro();
        btn.ondblclick = () => this.resetPomodoro();
        this.updatePomodoroDisplay();
    },

    togglePomodoro() {
        if (this.pomoState.running) {
            clearInterval(this.pomoState.interval);
            this.pomoState.running = false;
        } else {
            this.pomoState.running = true;
            this.pomoState.interval = setInterval(() => {
                this.pomoState.seconds--;

                // Track actual study time (only if working)
                if (this.pomoMode === 'work') {
                    State.data.studyTime = (State.data.studyTime || 0) + 1;
                    if (State.data.studyTime % 60 === 0) State.save(); // Save every minute
                    this.updateSessionStats();
                }

                if (this.pomoState.seconds <= 0) {
                    clearInterval(this.pomoState.interval);
                    this.pomoState.running = false;
                    this.playPing();

                    // Switch modes
                    if (this.pomoMode === 'work') {
                        this.pomoMode = 'break';
                        this.pomoState.seconds = 5 * 60; // 5 min break
                        alert("Pomodoro complete! Take a 5-minute break.");
                    } else {
                        this.pomoMode = 'work';
                        this.pomoState.seconds = 25 * 60; // 25 min work
                        alert("Break complete! Ready to focus?");
                    }
                }
                this.updatePomodoroDisplay();
            }, 1000);
        }
        this.updatePomodoroDisplay();
    },

    resetPomodoro() {
        clearInterval(this.pomoState.interval);
        this.pomoState.running = false;
        this.pomoMode = 'work';
        this.pomoState.seconds = 25 * 60;
        this.updatePomodoroDisplay();
    },

    updatePomodoroDisplay() {
        const d1 = document.getElementById('pomo-display');
        const d2 = document.getElementById('session-timer-display');
        const btn = document.getElementById('btn-pomo');

        const m = Math.floor(this.pomoState.seconds / 60);
        const s = this.pomoState.seconds % 60;
        const txt = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (d1) d1.textContent = txt;
        if (d2) d2.textContent = txt; // Sync with dashboard widget

        if (btn) {
            const icon = btn.querySelector('svg');
            if (this.pomoState.running) {
                icon.classList.add('animate-spin');
                icon.classList.replace('text-rose-500', this.pomoMode === 'work' ? 'text-brand-400' : 'text-emerald-400');
            } else {
                icon.classList.remove('animate-spin');
                icon.classList.remove('text-brand-400', 'text-emerald-400');
                icon.classList.add('text-rose-500');
            }
        }
    },

    restoreStudyTime() {
        this.updateSessionStats();
    },

    updateSessionStats() {
        const tst = document.getElementById('total-study-time');
        if (tst) {
            const h = Math.floor((State.data.studyTime || 0) / 3600);
            const m = Math.floor(((State.data.studyTime || 0) % 3600) / 60);
            tst.textContent = `${h}h ${m}m`;
        }
    },

    playPing() {
        try {
            const actx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = actx.createOscillator();
            const gain = actx.createGain();
            osc.connect(gain);
            gain.connect(actx.destination);
            osc.frequency.setValueAtTime(880, actx.currentTime);
            gain.gain.setValueAtTime(0.5, actx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 1);
            osc.start(actx.currentTime);
            osc.stop(actx.currentTime + 1);
        } catch (e) { }
    },

    formatTime(s) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; },
};

// Continue in app2.js (loaded below)
