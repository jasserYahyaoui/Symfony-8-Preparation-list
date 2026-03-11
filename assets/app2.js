// --- CODE REVIEW ENGINE (Interactive Line-Clicking) ---
App.codeReviewBugs = {
    '01-routing-bug': { line: 9, message: "The 'methods' parameter in #[Route] must be an array: methods: ['GET']" },
    'cr-routing-requirements': { line: 8, message: "Invalid regex: '0-9+' is missing the backslash: '\\d+'" },
    'cr-routing-priority': { line: 12, message: "Overlapping routes! The more specific route must have a higher priority." },
    'cr-routing-condition': { line: 9, message: "ExpressionLanguage syntax error: headers is an object, use request.headers.get('Host')." },
    '02-console-bug': { line: 7, message: "Missing #[AsCommand] attribute above the class declaration." },
    'cr-console-attributes': { line: 10, message: "Missing #[Argument] or #[Option] attribute on the property." },
    'cr-console-output': { line: 15, message: "Use SymfonyStyle for consistent output: $io->success() instead of $output->writeln()." },
    '03-di-bug': { line: 9, message: "Use Constructor Property Promotion: public function __construct(private LoggerInterface $logger)" },
    'cr-di-autowire': { line: 10, message: "Ambiguous service! Use #[Autowire(service: 'app.specific_service')] to resolve." },
    'cr-di-parameter': { line: 9, message: "Missing % signs for parameter: #[Autowire(param: '%kernel.project_dir%')]." },
    'cr-di-decoration': { line: 11, message: "Missing \$decorationInner argument to receive the original service." },
    '04-security-voter': { line: 16, message: "getUser() can return null, but more importantly, public posts might be viewable by anonymous users." },
    'cr-security-csrf': { line: 8, message: "Stateless CSRF is only compatible with stateless firewalls (no sessions)." },
    'cr-security-firewall-order': { line: 15, message: "Security risk! The generic firewall ^/ must come AFTER the specific ^/admin." },
    'cr-security-voter-null': { line: 10, message: "Always check if \$user is an instance of UserInterface before checking roles." },
    '05-twig-bug': { line: 9, message: "Missing return type declaration: public function getFilters(): array" },
    'cr-twig-filter-type': { line: 10, message: "Twig filters in Symfony 8 MUST declare their return type." },
    'cr-twig-app-obj': { line: 9, message: "The app.request object is read-only in Twig; headers must be accessed via get()." },
    '06-form-bug': { line: 11, message: "Missing return type declaration: public function buildForm(...): void" },
    'cr-forms-void-type': { line: 11, message: "buildForm and configureOptions must return void." },
    'cr-forms-rendering-syntax': { line: 8, message: "Syntax error: Attributes in Twig must be wrapped in { }: { 'class': '...' }." },
    '07-messenger-bug': { line: 6, message: "MessageHandlerInterface is deprecated. Use #[AsMessageHandler] attribute." },
    'cr-messenger-as-handler': { line: 8, message: "Missing #[AsMessageHandler] attribute on the handler class." },
    'cr-messenger-stamp-syntax': { line: 12, message: "Envelope::with() takes one or more stamps, not an array." },
    '08-controller-bug': { line: 12, message: "Bad practice: Inject the Request object directly into the action method." },
    'cr-controller-request-get': { line: 12, message: "\$this->getRequest() was removed in Symfony 8. Inject Request \$request instead." },
    'cr-controller-flash-array': { line: 14, message: "Flash messages should be strings (or translatable objects), not raw arrays." },
    '09-repository-bug': { line: 17, message: "DQL boolean comparison should use true/false or parameters, not integer 1." },
    '10-validator-bug': { line: 11, message: "Missing type check: if (!$constraint instanceof ContainsAlphanumeric) { ... }" },
    'cr-validation-groups': { line: 15, message: "Groups must be an array, even if there is only one group: ['Default']." },
    'cr-validation-callback': { line: 11, message: "Callback methods must be static if defined in the class for efficiency." },
    '11-event-listener-bug': { line: 7, message: "Wrong event type: onKernelException receives ExceptionEvent, not RequestEvent." },
    'cr-arch-event-type': { line: 7, message: "Ensure the argument type matches the event being listened to." },
    '12-twig-template-bug': { line: 2, message: "Potential null pointer: app.user can be null if not logged in." },
    '13-php84-hook-bug': { line: 2, message: "Syntactic error: check the combination of asymmetric visibility and hooks in PHP 8.4." },
    'cr-php84-readonly-hook': { line: 9, message: "Readonly properties cannot have hooks (get/set) in PHP 8.4." },
    'cr-php84-asymmetric-vis': { line: 12, message: "Property is private(set); it cannot be modified from a child class." },
    '14-serializer-bug': { line: 8, message: "#[Groups] attribute always expects an array: #[Groups(['api'])]" },
    'cr-misc-config-dotenv': { line: 9, message: "Dotenv::loadEnv() is preferred over load() for automatic .env.local handling." },
    '15-http-caching-bug': { line: 4, message: "Recommendation: Use setSharedMaxAge() for better reverse proxy support." },
    'cr-http-shared-maxage': { line: 10, message: "Shared Max Age (s-maxage) is required for Varnish/Nginx caching." },
    'cr-http-etag-check': { line: 15, message: "Optimization: Call \$response->isNotModified(\$request) BEFORE doing heavy work." }
};

App.topicToCodeReview = {
    'routing': ['01-routing-bug', 'cr-routing-requirements', 'cr-routing-priority', 'cr-routing-condition'],
    'console': ['02-console-bug', 'cr-console-attributes', 'cr-console-output'],
    'dependency-injection': ['03-di-bug', 'cr-di-autowire', 'cr-di-parameter', 'cr-di-decoration'],
    'security': ['04-security-voter', 'cr-security-csrf', 'cr-security-firewall-order', 'cr-security-voter-null'],
    'templating-with-twig': ['05-twig-bug', 'cr-twig-filter-type', 'cr-twig-app-obj'],
    'forms': ['06-form-bug', 'cr-forms-void-type', 'cr-forms-rendering-syntax'],
    'messenger': ['07-messenger-bug', 'cr-messenger-as-handler', 'cr-messenger-stamp-syntax'],
    'controllers': ['08-controller-bug', 'cr-controller-request-get', 'cr-controller-flash-array'],
    'data-validation': ['10-validator-bug', 'cr-validation-groups', 'cr-validation-callback'],
    'symfony-architecture': ['11-event-listener-bug', 'cr-arch-event-type'],
    'php': ['13-php84-hook-bug', 'cr-php84-readonly-hook', 'cr-php84-asymmetric-vis'],
    'miscellaneous': ['14-serializer-bug', 'cr-misc-config-dotenv'],
    'http-caching': ['15-http-caching-bug', 'cr-http-shared-maxage', 'cr-http-etag-check']
};

App.renderCodeReview = function (reviewId) {
    const review = (AppData.codeReviews || []).find(r => r.id === reviewId);
    const contentEl = document.getElementById('course-content');
    if (!review || !contentEl) return;

    // Extract code block
    const codeMatch = review.content.match(/```(?:php|twig|yaml|yml)\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1] : '';
    const lines = code.split('\n');
    const lang = review.content.match(/```(php|twig|yaml|yml)/)?.[1] || 'php';

    let html = `
        <div class="code-review-container animate-fadeIn">
            <div class="mb-8">
                <h1 class="text-3xl font-display font-black text-white mb-4">${review.title}</h1>
                <p class="text-slate-400 text-lg leading-relaxed">Find and click on the <strong>buggy line</strong> in the code snippet below.</p>
            </div>

            <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-violet-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div class="relative glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <!-- Editor Header -->
                    <div class="h-10 bg-slate-900/80 border-b border-white/5 flex items-center justify-between px-4">
                        <div class="flex items-center gap-1.5">
                            <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
                            <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
                            <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                            <span class="ml-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">${lang.toUpperCase()} — EXPERT EDITOR</span>
                        </div>
                        <div id="cr-status" class="text-[10px] font-bold text-brand-400 uppercase tracking-widest animate-pulse">Awaiting Input...</div>
                    </div>
                    
                    <!-- Editor Body -->
                    <div class="flex font-mono text-sm leading-6 overflow-x-auto bg-[#0d0d0f]">
                        <!-- Gutter -->
                        <div class="shrink-0 bg-slate-900/50 text-slate-600 text-right pr-4 pl-3 select-none border-r border-white/5 py-4">
                            ${lines.map((_, i) => `<div class="h-6">${i + 1}</div>`).join('')}
                        </div>
                        <!-- Code content -->
                        <div class="flex-1 py-4 relative" id="cr-lines-container">
                            ${lines.map((line, i) => {
                                const highlighted = hljs.highlight(line || ' ', { language: lang }).value;
                                return `
                                <div class="cr-line h-6 px-4 hover:bg-white/5 transition-colors cursor-crosshair relative group/line" 
                                     onclick="App.handleCodeLineClick('${reviewId}', ${i + 1}, this)">
                                    <span class="relative z-10 text-slate-300">${highlighted}</span>
                                    <div class="absolute inset-0 bg-brand-500/0 group-hover/line:bg-brand-500/5 transition-colors"></div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div id="cr-feedback" class="mt-8 hidden">
                <!-- Feedback injected here -->
            </div>
        </div>
    `;

    contentEl.innerHTML = html;
};

App.handleCodeLineClick = function (reviewId, clickedLine, lineEl) {
    if (this.crLocked) return;
    
    const bug = this.codeReviewBugs[reviewId];
    const feedbackEl = document.getElementById('cr-feedback');
    const statusEl = document.getElementById('cr-status');
    const isCorrect = clickedLine === bug.line;

    // Reset previous clicks
    document.querySelectorAll('.cr-line').forEach(el => {
        el.classList.remove('cr-line-error', 'cr-line-success');
    });

    if (isCorrect) {
        lineEl.classList.add('cr-line-success');
        statusEl.textContent = 'Correct!';
        statusEl.classList.remove('text-brand-400', 'animate-pulse');
        statusEl.classList.add('text-emerald-400');
        
        feedbackEl.innerHTML = `
            <div class="glass-card rounded-2xl p-6 border-emerald-500/20 bg-emerald-500/5 animate-bounce-subtle">
                <div class="flex items-start gap-4">
                    <div class="shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold text-white mb-1">Bug Found!</h4>
                        <p class="text-emerald-400/80 leading-relaxed">${bug.message}</p>
                    </div>
                </div>
                <div class="mt-6 flex gap-3">
                    <button onclick="App.markTopicComplete('${reviewId}')" class="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-colors">Mark as Mastered</button>
                </div>
            </div>
        `;
        feedbackEl.classList.remove('hidden');
        this.crLocked = true;
        // Track progress
        State.data.completed.push(reviewId);
        State.save();
    } else {
        lineEl.classList.add('cr-line-error');
        statusEl.textContent = 'Incorrect Line';
        statusEl.classList.add('text-rose-400');
        statusEl.classList.remove('text-brand-400');
        
        setTimeout(() => {
            if (!this.crLocked) {
                statusEl.textContent = 'Awaiting Input...';
                statusEl.classList.remove('text-rose-400');
                statusEl.classList.add('text-brand-400');
                lineEl.classList.remove('cr-line-error');
            }
        }, 1000);
    }
};

// --- FLASHCARDS (Premium Full-Page with Streak, Dots, Star) ---
App.renderFlashcardsView = function (topicId) {
    const allCards = (AppData.flashcards || {})[topicId] || [];
    if (!allCards.length) {
        document.getElementById('flashcard-deck').innerHTML = '<p class="text-slate-500 text-center">No flashcards available for this topic.</p>';
        return;
    }

    // Filter cards due for review based on SRS algorithm
    const now = Date.now();
    const srsData = State.data.fcSRS || {};
    const dueCards = allCards.filter((_, i) => {
        const key = `${topicId}_${i}`;
        if (!srsData[key]) return true; // Never studied before
        return srsData[key].nextReviewDate <= now;
    });

    if (dueCards.length === 0) {
        document.getElementById('flashcard-deck').innerHTML = `
        <div class="mt-8 text-center glass-card rounded-2xl p-8 max-w-md mx-auto" style="animation: fadeInUp 0.5s ease-out">
            <p class="text-4xl mb-4">🧘</p>
            <p class="text-2xl font-display font-bold text-emerald-400 mb-2">You're all caught up!</p>
            <p class="text-slate-400 text-sm mb-6">No flashcards are due for review in this topic right now. Check back later to strengthen your memory.</p>
            <div class="flex gap-3 justify-center">
                <a href="#topic/${topicId}" class="px-5 py-3 rounded-xl font-bold bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors">← Back to Topic</a>
            </div>
        </div>`;

        // Hide dot map and controls
        const dotMap = document.getElementById('fc-dot-map');
        if (dotMap) dotMap.innerHTML = '';
        document.getElementById('fc-prev-btn').disabled = true;
        document.getElementById('fc-next-btn').disabled = true;
        return;
    }

    // Keep track of original indexes for saving state accurately
    const cardsWithOriginalIndex = dueCards.map(c => ({
        ...c,
        originalIndex: allCards.indexOf(c)
    }));

    this.fcState = { cards: shuffleArray(cardsWithOriginalIndex), idx: 0, topicId, revealed: false, streak: 0 };
    document.getElementById('fc-back-btn').href = '#topic/' + topicId;
    this.renderDotMap();
    this.renderCurrentCard();
};

App.renderDotMap = function () {
    const { cards, topicId } = this.fcState;
    const dotMap = document.getElementById('fc-dot-map');
    if (!dotMap) return;
    const srsData = State.data.fcSRS || {};
    let html = '';
    cards.forEach((card, i) => {
        const data = srsData[`${topicId}_${card.originalIndex}`];
        let level = 'untouched';
        if (data) {
            if (data.interval > 21) level = 'mastered';
            else if (data.interval > 7) level = 'review';
            else level = 'no-idea'; // Default learning
        }

        const active = i === this.fcState.idx ? ' current' : '';
        html += `<div class="fc-dot ${level}${active}" onclick="App.fcGoTo(${i})" title="Card ${i + 1}: ${level}"></div>`;
    });
    dotMap.innerHTML = html;
};

App.fcGoTo = function (idx) {
    this.fcState.idx = idx;
    this.renderCurrentCard();
};

App.renderCurrentCard = function () {
    const { cards, idx, topicId, streak } = this.fcState;
    const card = cards[idx];
    if (!card) return;
    // Progress
    const progressEl = document.getElementById('fc-progress');
    const progressBar = document.getElementById('fc-progress-bar');
    if (progressEl) progressEl.textContent = `${idx + 1} / ${cards.length}`;
    if (progressBar) progressBar.style.width = ((idx + 1) / cards.length * 100) + '%';
    // Mastery counts (All cards, not just due)
    const masteryEl = document.getElementById('fc-mastery');
    if (masteryEl) {
        const srs = State.data.fcSRS || {};
        const allCards = (AppData.flashcards || {})[topicId] || [];

        let mastered = 0, familiar = 0, learning = 0, unknown = 0;

        allCards.forEach((_, i) => {
            const data = srs[`${topicId}_${i}`];
            if (!data) unknown++;
            else if (data.interval > 21) mastered++;
            else if (data.interval > 7) familiar++;
            else learning++;
        });

        masteryEl.textContent = `${mastered} mastered · ${familiar} familiar · ${learning} learning · ${unknown} untouched`;
    }
    // Streak badge
    const streakBadge = document.getElementById('fc-streak-badge');
    if (streakBadge) {
        if (streak >= 3) {
            streakBadge.classList.remove('hidden');
            streakBadge.textContent = `🔥 ${streak}`;
            streakBadge.classList.add('fc-streak-pop');
            setTimeout(() => streakBadge.classList.remove('fc-streak-pop'), 400);
        } else {
            streakBadge.classList.add('hidden');
        }
    }
    // Star button
    const starBtn = document.getElementById('fc-star-btn');
    if (starBtn) {
        const starred = (State.data.fcStarred || []).includes(`${topicId}_${card.originalIndex}`);
        starBtn.className = starBtn.className.replace('fc-star-active', '');
        if (starred) starBtn.classList.add('fc-star-active');
        starBtn.onclick = () => {
            if (!State.data.fcStarred) State.data.fcStarred = [];
            const key = `${topicId}_${card.originalIndex}`;
            const si = State.data.fcStarred.indexOf(key);
            if (si >= 0) State.data.fcStarred.splice(si, 1);
            else State.data.fcStarred.push(key);
            State.save();
            this.renderCurrentCard();
        };
    }
    // Question card
    const deck = document.getElementById('flashcard-deck');
    const srsData = (State.data.fcSRS || {})[`${topicId}_${card.originalIndex}`];
    const starredBadge = (State.data.fcStarred || []).includes(`${topicId}_${card.originalIndex}`);

    let masteryBadge = '';
    if (srsData) {
        let label = 'Learning';
        let color = 'blue';
        if (srsData.interval > 21) { label = 'Mastered'; color = 'emerald'; }
        else if (srsData.interval > 7) { label = 'Familiar'; color = 'amber'; }
        masteryBadge = `<span class="text-xs font-bold uppercase px-2 py-0.5 rounded-full inline-block bg-${color}-500/20 text-${color}-400 border border-${color}-500/20">${label} (Next: ${new Date(srsData.nextReviewDate).toLocaleDateString()})</span>`;
    }

    const starIcon = starredBadge ? '<span class="ml-2 text-amber-400">⭐</span>' : '';
    deck.innerHTML = `
        <div class="fc-question-page max-w-3xl w-full" style="animation: fadeInUp 0.3s ease-out">
            <div class="flex items-center justify-center gap-2 mb-4">
                <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">${getTopicTitle(topicId)}</p>
                ${starIcon}
            </div>
            <h3 class="text-xl md:text-3xl font-display font-bold text-white leading-relaxed mb-6">${card.q || ''}</h3>
            ${card.code ? `<pre class="text-left bg-[#0f172a] rounded-xl p-4 border border-white/5 overflow-x-auto max-w-full mb-6"><code class="language-php text-sm">${this.escapeHtml(card.code)}</code></pre>` : ''}
            <div class="flex items-center justify-center gap-3 mb-6">${masteryBadge}</div>
            <button onclick="App.revealAnswer()" class="mt-2 px-8 py-4 rounded-xl font-bold text-lg bg-brand-600 text-white hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/20 group hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5">
                Reveal Answer
                <kbd class="ml-2 text-xs px-1.5 py-0.5 bg-brand-700 rounded text-brand-200">Space</kbd>
            </button>
        </div>`;
    // Highlight code blocks
    deck.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
    // Hide answer overlay
    document.getElementById('fc-answer-overlay').classList.remove('revealed');
    this.fcState.revealed = false;
    // Nav buttons
    document.getElementById('fc-prev-btn').disabled = idx === 0;
    document.getElementById('fc-next-btn').disabled = idx === cards.length - 1;
    // Update dot map
    this.renderDotMap();
};

App.revealAnswer = function () {
    if (this.fcState.revealed) return;
    this.fcState.revealed = true;
    const card = this.fcState.cards[this.fcState.idx];
    const overlay = document.getElementById('fc-answer-overlay');
    const content = document.getElementById('fc-answer-content');
    let answerHtml = `<h4 class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-4">Answer</h4>`;
    answerHtml += `<div class="text-lg md:text-xl text-white font-medium leading-relaxed mb-6">${renderMarkdown(card.a || '')}</div>`;
    if (card.code) {
        answerHtml += `<pre class="text-left bg-[#0f172a] rounded-xl p-4 border border-white/5 overflow-x-auto max-w-2xl mx-auto"><code class="language-php text-sm">${this.escapeHtml(card.code)}</code></pre>`;
    }
    if (card.explanation) {
        answerHtml += `<div class="mt-4 text-sm text-slate-400 max-w-2xl mx-auto">${renderMarkdown(card.explanation)}</div>`;
    }
    content.innerHTML = answerHtml;
    content.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
    overlay.classList.add('revealed');
};

App.fcSelfAssess = function (level) {
    const { topicId, idx, cards } = this.fcState;
    const card = cards[idx];
    if (!State.data.fcSRS) State.data.fcSRS = {};
    const key = `${topicId}_${card.originalIndex}`;

    // SuperMemo-2 Logic constraints
    // level: 'easy' (quality=5), 'good' (quality=4), 'hard' (quality=3)
    let quality = 4;
    if (level === 'easy') quality = 5;
    else if (level === 'hard') quality = 3;

    let srs = State.data.fcSRS[key] || {
        repetition: 0,
        interval: 1,
        easinessFactor: 2.5,
        nextReviewDate: Date.now()
    };

    if (quality >= 3) {
        // Correct response
        if (srs.repetition === 0) {
            srs.interval = 1;
        } else if (srs.repetition === 1) {
            srs.interval = 6;
        } else {
            srs.interval = Math.round(srs.interval * srs.easinessFactor);
        }
        srs.repetition += 1;
    } else {
        // Incorrect response
        srs.repetition = 0;
        srs.interval = 1;
    }

    srs.easinessFactor = srs.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (srs.easinessFactor < 1.3) srs.easinessFactor = 1.3;

    // Calculate next review timestamp (interval in days)
    srs.nextReviewDate = Date.now() + (srs.interval * 24 * 60 * 60 * 1000);

    State.data.fcSRS[key] = srs;
    State.save();

    // Update streak
    if (quality >= 4) {
        this.fcState.streak++;
        if (this.fcState.streak === 5 || this.fcState.streak === 10 || this.fcState.streak === 20) {
            this.showStreakMilestone(this.fcState.streak);
        }
    } else {
        this.fcState.streak = 0;
    }

    // Auto-advance
    if (idx < this.fcState.cards.length - 1) {
        this.fcState.idx++;
        this.renderCurrentCard();
    } else {
        document.getElementById('fc-answer-overlay').classList.remove('revealed');
        this.renderCurrentCard();
        // Show completion message
        const total = this.fcState.cards.length;
        const now = Date.now();
        // Calculate how many need review total vs mastered
        const mastered = this.fcState.cards.filter((_, i) => State.data.fcSRS[`${topicId}_${i}`]?.interval > 21).length;
        const pct = Math.round(mastered / total * 100);

        document.getElementById('flashcard-deck').innerHTML += `
        <div class="mt-8 text-center glass-card rounded-2xl p-8 max-w-md mx-auto" style="animation: fadeInUp 0.5s ease-out">
            <p class="text-4xl mb-4">${pct >= 80 ? '🏆' : pct >= 50 ? '🎯' : '📚'}</p>
            <p class="text-2xl font-display font-bold ${pct >= 80 ? 'text-amber-400' : pct >= 50 ? 'text-emerald-400' : 'text-brand-400'} mb-2">Review Complete!</p>
            <p class="text-slate-400 text-sm mb-1">You finished the queued cards for this topic.</p>
            <p class="text-lg font-bold text-white mb-4">${mastered}/${total} long-term mastery (${pct}%)</p>
            <div class="h-2 bg-dark-900 rounded-full overflow-hidden mb-6 max-w-xs mx-auto">
                <div class="h-full bg-gradient-to-r from-emerald-500 to-brand-400 rounded-full" style="width:${pct}%"></div>
            </div>
            <div class="flex gap-3 justify-center">
                <a href="#topic/${topicId}" class="px-5 py-3 rounded-xl font-bold bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors">← Back to Topic</a>
            </div>
        </div>`;
    }
};

App.showStreakMilestone = function (count) {
    const msg = count >= 20 ? '🔥 UNSTOPPABLE! 20 in a row!' : count >= 10 ? '⚡ On Fire! 10 streak!' : '👏 Nice! 5 correct streak!';
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-xl bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 backdrop-blur-lg text-sm';
    toast.style.animation = 'streak-pop 0.4s ease-out';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transition = 'opacity 0.5s'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 2000);
};

App.escapeHtml = function (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

// --- CERTIFICATION EXAM SIMULATOR (Pearson VUE Style) ---
App.renderCertExamPreScreen = function () {
    document.getElementById('cert-pre-exam').classList.remove('hidden');
    document.getElementById('cert-active-exam').classList.add('hidden');
    document.getElementById('cert-results').classList.add('hidden');
    document.getElementById('cert-review-screen').classList.add('hidden');
};

App.startCertificationExam = function () {
    // Prevent external navigation
    window.onbeforeunload = function() {
        return "Are you sure you want to leave? Your exam progress will be lost.";
    };

    // Collect 5 questions per topic from quizzes
    const allTopicIds = Object.keys(AppData.quizzes || {});
    const examQuestions = [];
    allTopicIds.forEach(tid => {
        const parsed = App.parseQuizQuestions(AppData.quizzes[tid]);
        const picked = shuffleArray(parsed).slice(0, 5);
        picked.forEach(q => examQuestions.push({ ...q, topicId: tid }));
    });
    
    // Ensure we have 75 questions
    const shuffled = shuffleArray(examQuestions).slice(0, 75);
    
    this.certExam = {
        questions: shuffled,
        answers: {},
        flags: new Set(),
        currentIdx: 0,
        startTime: Date.now(),
        timeLimit: 90 * 60, // 90 minutes
    };

    // UI State
    document.getElementById('cert-pre-exam').classList.add('hidden');
    document.getElementById('cert-active-exam').classList.remove('hidden');
    document.getElementById('cert-review-screen').classList.add('hidden');
    document.getElementById('cert-results').classList.add('hidden');

    this.certRenderQuestion();
    this.certStartTimer();
};

App.certRenderQuestion = function () {
    const { questions, answers, flags, currentIdx } = this.certExam;
    const q = questions[currentIdx];
    if (!q) return;

    // Header updates
    document.getElementById('cert-q-number').textContent = `Question ${currentIdx + 1} of ${questions.length}`;
    
    // Flag button state
    const flagBtn = document.getElementById('cert-flag-btn');
    if (flags.has(currentIdx)) flagBtn.classList.add('flagged');
    else flagBtn.classList.remove('flagged');
    
    flagBtn.onclick = () => {
        if (flags.has(currentIdx)) flags.delete(currentIdx);
        else flags.add(currentIdx);
        this.certRenderQuestion();
    };

    // Question panel (Pearson VUE style)
    const panel = document.getElementById('cert-question-panel');
    const userAns = answers[currentIdx] || [];
    
    let html = `
        <div class="mb-10">
            <h3 class="text-2xl font-medium text-slate-800 leading-tight mb-4">${q.text}</h3>
            ${q.type === 'multiple' ? '<p class="text-sm font-bold text-[#2d5a8c]">Select all that apply.</p>' : '<p class="text-sm font-bold text-[#2d5a8c]">Select the best answer.</p>'}
        </div>
        <div class="space-y-4">
    `;

    q.options.forEach((opt, oi) => {
        const selected = userAns.includes(oi);
        const letter = String.fromCharCode(65 + oi);
        const cls = selected 
            ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
            : 'bg-white border-slate-300 hover:bg-slate-50';
        
        html += `
            <div onclick="App.certSelectAnswer(${oi})" class="group flex items-start gap-4 p-5 rounded-lg border-2 transition-all cursor-pointer ${cls}">
                <div class="shrink-0 w-7 h-7 rounded border-2 flex items-center justify-center font-bold text-sm ${selected ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-300 text-slate-500 group-hover:border-slate-400'}">
                    ${letter}
                </div>
                <div class="text-lg text-slate-700 pt-0.5">${opt}</div>
            </div>
        `;
    });
    html += '</div>';
    panel.innerHTML = html;

    // Navigation buttons state
    const prevBtn = document.getElementById('cert-prev-btn');
    prevBtn.disabled = currentIdx === 0;

    const nextBtn = document.getElementById('cert-next-btn');
    nextBtn.textContent = currentIdx === questions.length - 1 ? 'End Exam →' : 'Next →';
};

App.certSelectAnswer = function (oi) {
    const { questions, answers, currentIdx } = this.certExam;
    const q = questions[currentIdx];
    if (!answers[currentIdx]) answers[currentIdx] = [];
    
    if (q.type === 'multiple') {
        const idx = answers[currentIdx].indexOf(oi);
        if (idx >= 0) answers[currentIdx].splice(idx, 1);
        else answers[currentIdx].push(oi);
    } else {
        answers[currentIdx] = [oi];
    }
    this.certRenderQuestion();
};

App.certNextQuestion = function () {
    if (this.certExam.currentIdx < this.certExam.questions.length - 1) {
        this.certExam.currentIdx++;
        this.certRenderQuestion();
    } else {
        this.certShowReviewScreen();
    }
};

App.certPrevQuestion = function () {
    if (this.certExam.currentIdx > 0) {
        this.certExam.currentIdx--;
        this.certRenderQuestion();
    }
};

App.certShowReviewScreen = function () {
    const { questions, answers, flags } = this.certExam;
    document.getElementById('cert-active-exam').classList.add('hidden');
    document.getElementById('cert-review-screen').classList.remove('hidden');
    
    // Update stats
    const answeredCount = Object.keys(answers).filter(k => answers[k].length > 0).length;
    document.getElementById('review-stat-answered').textContent = answeredCount;
    document.getElementById('review-stat-flagged').textContent = flags.size;
    document.getElementById('review-stat-total').textContent = questions.length;
    
    // Build grid
    const grid = document.getElementById('cert-review-grid');
    let html = '';
    questions.forEach((q, i) => {
        const isAnswered = answers[i] && answers[i].length > 0;
        const isFlagged = flags.has(i);
        
        let statusCls = 'border-slate-200 bg-slate-50 text-slate-400';
        let statusText = 'Not Answered';
        
        if (isAnswered) {
            statusCls = 'border-blue-100 bg-blue-50 text-blue-700';
            statusText = 'Answered';
        }
        
        if (isFlagged) {
            statusCls = 'border-amber-200 bg-amber-50 text-amber-700 ring-1 ring-amber-400';
            statusText = isAnswered ? 'Answered (Marked)' : 'Marked';
        }
        
        html += `
            <div onclick="App.certGoToQuestion(${i}); App.certCloseReviewScreen();" class="p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${statusCls}">
                <div class="text-[10px] font-bold uppercase opacity-60 mb-1">Question ${i + 1}</div>
                <div class="text-xs font-black truncate">${statusText}</div>
            </div>
        `;
    });
    grid.innerHTML = html;
};

App.certCloseReviewScreen = function () {
    document.getElementById('cert-review-screen').classList.add('hidden');
    document.getElementById('cert-active-exam').classList.remove('hidden');
};

App.certGoToQuestion = function (idx) {
    this.certExam.currentIdx = idx;
    this.certRenderQuestion();
};

App.certStartTimer = function () {
    const timerEl = document.getElementById('cert-timer');
    const reviewTimerEl = document.getElementById('cert-review-timer');
    
    if (this.certTimer) clearInterval(this.certTimer);
    
    this.certTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - this.certExam.startTime) / 1000);
        const remaining = this.certExam.timeLimit - elapsed;
        
        if (remaining <= 0) {
            clearInterval(this.certTimer);
            this.submitCertificationExam();
            return;
        }
        
        const timeStr = this.formatTime(remaining);
        timerEl.textContent = timeStr;
        if (reviewTimerEl) reviewTimerEl.textContent = timeStr;
        
        if (remaining <= 300) {
            timerEl.classList.add('text-rose-600');
            timerEl.classList.remove('text-white');
        } else {
            timerEl.classList.remove('text-rose-600');
            timerEl.classList.add('text-white');
        }
    }, 1000);
};

App.submitCertificationExam = function () {
    // Clear the navigation warning
    window.onbeforeunload = null;
    
    if (this.certTimer) { clearInterval(this.certTimer); this.certTimer = null; }
    
    const { questions, answers } = this.certExam;
    // Calculate scores per topic
    const topicScores = {};
    const topicCounts = {};
    let totalCorrect = 0;
    
    questions.forEach((q, qi) => {
        const ua = answers[qi] || [];
        const correct = q.correct.length === ua.length && q.correct.every(c => ua.includes(c));
        if (correct) totalCorrect++;
        if (!topicScores[q.topicId]) { topicScores[q.topicId] = 0; topicCounts[q.topicId] = 0; }
        topicCounts[q.topicId]++;
        if (correct) topicScores[q.topicId]++;
    });
    
    const overallPct = Math.round(totalCorrect / questions.length * 100);
    const level = overallPct >= 85 ? 'Expert' : overallPct >= 60 ? 'Advanced' : 'Not Certified';
    
    // Save result
    State.data.certResults = State.data.certResults || [];
    State.data.certResults.push({ date: new Date().toISOString(), score: overallPct, level, topicScores, topicCounts });
    State.save();
    
    // UI
    document.getElementById('cert-active-exam').classList.add('hidden');
    document.getElementById('cert-review-screen').classList.add('hidden');
    document.getElementById('cert-results').classList.remove('hidden');
    
    this.renderCertResults(overallPct, level, totalCorrect, questions.length, topicScores, topicCounts);
};

App.renderCertResults = function (overallPct, level, totalCorrect, totalQuestions, topicScores, topicCounts) {
    const levelColor = level === 'Expert' ? 'text-amber-400' : level === 'Advanced' ? 'text-emerald-400' : 'text-rose-400';
    const resultContent = document.getElementById('cert-results-content');
    
    let html = `
        <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-black text-white mb-2">Exam Results</h2>
            <p class="text-slate-400">Symfony 8.0 Certification Mock Test</p>
        </div>
    `;

    html += `
        <div class="glass-card rounded-2xl p-8 text-center mb-8">
            <h3 class="text-6xl font-display font-black ${levelColor} mb-4">${overallPct}%</h3>
            <p class="text-2xl font-bold ${levelColor} mb-2">${level === 'Expert' ? '🏆 ' : level === 'Advanced' ? '🎯 ' : ''}${level}</p>
            <p class="text-slate-400">${totalCorrect}/${totalQuestions} correct answers</p>
        </div>
    `;

    // Topic breakdown
    html += '<h3 class="text-lg font-bold text-white mb-4">Score by Topic</h3><div class="space-y-3 mb-8">';
    Object.keys(topicCounts).forEach(tid => {
        const pct = Math.round(topicScores[tid] / topicCounts[tid] * 100);
        const barColor = pct >= 85 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500';
        html += `<div class="glass-card rounded-xl p-4"><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-slate-300">${getTopicTitle(tid)}</span><span class="text-sm font-bold ${pct >= 85 ? 'text-emerald-400' : pct >= 60 ? 'text-amber-400' : 'text-rose-400'}">${pct}%</span></div><div class="h-2 bg-dark-900 rounded-full overflow-hidden"><div class="${barColor} h-full rounded-full transition-all" style="width:${pct}%"></div></div></div>`;
    });
    html += '</div>';

    // Weak areas
    const weakTopics = Object.keys(topicCounts).filter(tid => Math.round(topicScores[tid] / topicCounts[tid] * 100) < 60);
    if (weakTopics.length) {
        html += '<div class="glass-card rounded-2xl p-6 border-rose-500/20 mb-8"><h4 class="text-sm font-bold text-rose-400 uppercase tracking-widest mb-3">⚠️ Focus Areas</h4><div class="space-y-2">';
        weakTopics.forEach(tid => {
            html += `<a href="#topic/${tid}" class="block p-3 rounded-lg bg-rose-500/5 hover:bg-rose-500/10 text-sm text-slate-300 hover:text-white transition-colors">${getTopicTitle(tid)}</a>`;
        });
        html += '</div></div>';
    }

    html += `
        <div class="flex gap-4">
            <button onclick="location.hash='certification-exam';App.renderCertExamPreScreen()" class="flex-1 py-4 rounded-xl font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors">Retake Exam</button>
            <a href="#mindmap" class="flex-1 py-4 rounded-xl font-bold bg-brand-600 text-white hover:bg-brand-500 transition-colors text-center shadow-lg shadow-brand-500/20 flex items-center justify-center">Back to Dashboard</a>
        </div>
    `;

    resultContent.innerHTML = html;
    if (level === 'Expert' && typeof confetti === 'function') confetti();
};

// --- TERMINAL SANDBOX ---
App.terminalMissions = [
    { id: 1, title: 'Routing Debug', task: 'List all routes in the application.', cmd: 'php bin/console debug:router', hint: 'debug:router' },
    { id: 2, title: 'Service Autowiring', task: 'Check if a specific service is available for autowiring.', cmd: 'php bin/console debug:autowiring', hint: 'debug:autowiring' },
    { id: 3, title: 'Container Inspection', task: 'Find all services tagged with "kernel.event_listener".', cmd: 'php bin/console debug:container --tag=kernel.event_listener', hint: 'debug:container --tag=...' },
    { id: 4, title: 'Config Dump', task: 'Dump the current configuration for FrameworkBundle.', cmd: 'php bin/console config:dump-reference framework', hint: 'config:dump-reference' },
    { id: 5, title: 'Event Dispatcher', task: 'List all listeners for the "kernel.request" event.', cmd: 'php bin/console debug:event-dispatcher kernel.request', hint: 'debug:event-dispatcher' },
    { id: 6, title: 'Messenger Audit', task: 'Debug the messenger bus configuration.', cmd: 'php bin/console debug:messenger', hint: 'debug:messenger' },
    { id: 7, title: 'Twig Functions', task: 'List all available Twig functions and filters.', cmd: 'php bin/console debug:twig', hint: 'debug:twig' }
];

App.initTerminal = function () {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    if (!input) return;

    this.terminalState = {
        history: [],
        historyIdx: -1,
        activeMissionIdx: 0,
        completedMissions: new Set()
    };

    input.value = '';
    input.focus();

    // Event Listeners
    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            if (cmd) this.handleTerminalCommand(cmd);
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.terminalState.historyIdx < this.terminalState.history.length - 1) {
                this.terminalState.historyIdx++;
                input.value = this.terminalState.history[this.terminalState.history.length - 1 - this.terminalState.historyIdx];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.terminalState.historyIdx > 0) {
                this.terminalState.historyIdx--;
                input.value = this.terminalState.history[this.terminalState.history.length - 1 - this.terminalState.historyIdx];
            } else {
                this.terminalState.historyIdx = -1;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.handleTerminalTab(input);
        }
    };

    body.onclick = () => input.focus();

    this.renderTerminalMissions();
};

App.handleTerminalCommand = function (cmd) {
    const output = document.getElementById('terminal-output');
    this.terminalState.history.push(cmd);
    this.terminalState.historyIdx = -1;

    // Add command to output
    const line = document.createElement('div');
    line.innerHTML = `<span class="text-brand-400 font-bold">jasser@symfony:~$</span> <span class="text-slate-100">${cmd}</span>`;
    output.appendChild(line);

    // Process logic
    const mission = this.terminalMissions[this.terminalState.activeMissionIdx];
    let response = '';
    let responseCls = 'text-slate-400';

    if (cmd === 'help') {
        response = 'Available commands: help, clear, list, ' + this.terminalMissions.map(m => m.hint.split(' ')[0]).join(', ');
    } else if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    } else if (cmd === 'list') {
        response = 'MISSIONS:\n' + this.terminalMissions.map((m, i) => `${i + 1}. ${m.title} [${this.terminalState.completedMissions.has(i) ? 'DONE' : 'TODO'}]`).join('\n');
    } else if (mission && cmd === mission.cmd) {
        response = `[OK] Mission Success: ${mission.title} completed!\n` + this.getFakeTerminalOutput(mission.cmd);
        responseCls = 'text-emerald-400';
        this.terminalState.completedMissions.add(this.terminalState.activeMissionIdx);
        if (this.terminalState.activeMissionIdx < this.terminalMissions.length - 1) {
            this.terminalState.activeMissionIdx++;
        }
        this.renderTerminalMissions();
    } else {
        response = `Command not found or mission target not met. Try: ${mission ? mission.hint : 'help'}`;
        responseCls = 'text-rose-400';
    }

    const resLine = document.createElement('div');
    resLine.className = 'whitespace-pre-wrap mt-1 mb-2 ' + responseCls;
    resLine.textContent = response;
    output.appendChild(resLine);

    const body = document.getElementById('terminal-body');
    body.scrollTop = body.scrollHeight;
};

App.handleTerminalTab = function (input) {
    const val = input.value.toLowerCase();
    const suggestions = ['php bin/console debug:router', 'php bin/console debug:autowiring', 'php bin/console debug:container', 'php bin/console config:dump-reference', 'php bin/console debug:event-dispatcher', 'php bin/console debug:messenger', 'php bin/console debug:twig'];
    const match = suggestions.find(s => s.startsWith(val));
    if (match) input.value = match;
};

App.renderTerminalMissions = function () {
    const container = document.getElementById('terminal-missions');
    if (!container) return;

    let html = '';
    this.terminalMissions.forEach((m, i) => {
        const isActive = i === this.terminalState.activeMissionIdx;
        const isDone = this.terminalState.completedMissions.has(i);
        
        const cls = isActive 
            ? 'bg-brand-500/20 border-brand-500/40' 
            : isDone ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' : 'bg-white/5 border-white/5';
        
        html += `
            <div class="p-4 rounded-xl border transition-all ${cls}">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-brand-400' : 'text-slate-500'}">Mission ${i + 1}</span>
                    ${isDone ? '<span class="text-emerald-400 text-xs font-black">✓</span>' : ''}
                </div>
                <h4 class="text-xs font-bold text-white mb-1">${m.title}</h4>
                <p class="text-[11px] text-slate-400 leading-snug">${m.task}</p>
                ${isActive ? `<div class="mt-3 text-[10px] font-mono text-brand-300 bg-brand-500/10 p-2 rounded border border-brand-500/20">${m.hint}</div>` : ''}
            </div>
        `;
    });
    container.innerHTML = html;
};

App.getFakeTerminalOutput = function (cmd) {
    if (cmd.includes('debug:router')) return ' Name                     Method   Scheme   Host   Path\n ------------------------ -------- -------- ------ --------------------------\n app_login                ANY      ANY      ANY    /login\n app_logout               ANY      ANY      ANY    /logout\n api_posts_get_collection GET      ANY      ANY    /api/posts';
    if (cmd.includes('debug:autowiring')) return ' Autowirable Services\n ====================\n\n App\\Service\\MyService\n App\\Repository\\UserRepository';
    return '[Binary output omitted] ...';
};

// --- SKILL IQ ASSESSMENT ---
App.startSkillAssessment = function () {
    const allTopicIds = Object.keys(AppData.quizzes || {});
    const questions = [];
    allTopicIds.forEach(tid => {
        const parsed = this.parseQuizQuestions(AppData.quizzes[tid]);
        const picked = shuffleArray(parsed).slice(0, 2);
        picked.forEach(q => questions.push({ ...q, topicId: tid }));
    });
    const shuffled = shuffleArray(questions).slice(0, 20);
    this.skillAssessment = { questions: shuffled, answers: {}, currentIdx: 0, startTime: Date.now() };
    this.renderSkillQuestion();
};

App.renderSkillQuestion = function () {
    const { questions, answers, currentIdx } = this.skillAssessment;
    const container = document.getElementById('skill-assessment-content');
    if (currentIdx >= questions.length) { this.submitSkillAssessment(); return; }
    const q = questions[currentIdx];
    const userAns = answers[currentIdx] || [];
    let html = `<div class="text-center mb-6"><span class="text-xs font-bold text-violet-400 uppercase tracking-widest">${getTopicTitle(q.topicId)}</span><p class="text-sm text-slate-500 mt-1">Question ${currentIdx + 1} of ${questions.length}</p></div>`;
    html += `<div class="h-1 bg-dark-800 rounded-full mb-8"><div class="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full" style="width:${((currentIdx + 1) / questions.length * 100)}%"></div></div>`;
    html += `<h3 class="text-xl font-bold text-white mb-6 text-center leading-relaxed">${q.text}</h3>`;
    html += '<div class="space-y-3 max-w-xl mx-auto">';
    q.options.forEach((opt, oi) => {
        const selected = userAns.includes(oi);
        const cls = selected ? 'bg-violet-500/20 border-violet-500/30 text-violet-300' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 cursor-pointer';
        html += `<div onclick="App.skillSelectAnswer(${oi})" class="p-4 rounded-xl border transition-all ${cls}"><span class="text-sm">${opt}</span></div>`;
    });
    html += '</div>';
    html += `<div class="flex justify-center mt-8"><button onclick="App.skillNextQuestion()" class="px-8 py-3 rounded-xl font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors ${userAns.length ? '' : 'opacity-50 cursor-not-allowed'}" ${userAns.length ? '' : 'disabled'}>Next →</button></div>`;
    container.innerHTML = html;
};

App.skillSelectAnswer = function (oi) {
    const q = this.skillAssessment.questions[this.skillAssessment.currentIdx];
    if (q.type === 'multiple') {
        if (!this.skillAssessment.answers[this.skillAssessment.currentIdx]) this.skillAssessment.answers[this.skillAssessment.currentIdx] = [];
        const idx = this.skillAssessment.answers[this.skillAssessment.currentIdx].indexOf(oi);
        if (idx >= 0) this.skillAssessment.answers[this.skillAssessment.currentIdx].splice(idx, 1);
        else this.skillAssessment.answers[this.skillAssessment.currentIdx].push(oi);
    } else {
        this.skillAssessment.answers[this.skillAssessment.currentIdx] = [oi];
    }
    this.renderSkillQuestion();
};

App.skillNextQuestion = function () {
    this.skillAssessment.currentIdx++;
    this.renderSkillQuestion();
};

App.submitSkillAssessment = function () {
    const { questions, answers } = this.skillAssessment;
    const topicScores = {};
    const topicCounts = {};
    let totalCorrect = 0;
    questions.forEach((q, qi) => {
        const ua = answers[qi] || [];
        const correct = q.correct.length === ua.length && q.correct.every(c => ua.includes(c));
        if (correct) totalCorrect++;
        if (!topicScores[q.topicId]) { topicScores[q.topicId] = 0; topicCounts[q.topicId] = 0; }
        topicCounts[q.topicId]++;
        if (correct) topicScores[q.topicId]++;
    });
    const pct = Math.round(totalCorrect / questions.length * 100);
    const level = pct >= 85 ? 'Expert' : pct >= 70 ? 'Advanced' : pct >= 50 ? 'Intermediate' : 'Beginner';
    State.data.skillIQ = { score: pct, level, topicScores, topicCounts, date: new Date().toISOString() };
    State.save();
    // Render results
    const container = document.getElementById('skill-assessment-content');
    const levelColor = level === 'Expert' ? 'text-amber-400' : level === 'Advanced' ? 'text-emerald-400' : level === 'Intermediate' ? 'text-brand-400' : 'text-slate-300';
    let html = `<div class="text-center mb-8"><h2 class="text-3xl font-display font-black text-white mb-2">Your Skill IQ</h2><div class="text-6xl font-display font-black ${levelColor} my-6">${pct}%</div><span class="text-lg font-bold ${levelColor}">${level}</span></div>`;
    html += '<h4 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Breakdown by Topic</h4><div class="space-y-3 mb-8">';
    Object.keys(topicCounts).forEach(tid => {
        const tpct = topicCounts[tid] > 0 ? Math.round(topicScores[tid] / topicCounts[tid] * 100) : 0;
        const barColor = tpct >= 85 ? 'bg-emerald-500' : tpct >= 60 ? 'bg-amber-500' : 'bg-rose-500';
        html += `<div class="glass-card rounded-xl p-4"><div class="flex justify-between mb-2"><span class="text-sm text-slate-300">${getTopicTitle(tid)}</span><span class="text-sm font-bold ${tpct >= 85 ? 'text-emerald-400' : tpct >= 60 ? 'text-amber-400' : 'text-rose-400'}">${tpct}%</span></div><div class="h-2 bg-dark-900 rounded-full overflow-hidden"><div class="${barColor} h-full rounded-full" style="width:${tpct}%"></div></div></div>`;
    });
    html += '</div>';
    // Recommendations
    const weak = Object.keys(topicCounts).filter(tid => Math.round(topicScores[tid] / topicCounts[tid] * 100) < 60);
    if (weak.length) {
        html += '<div class="glass-card rounded-2xl p-6 border-violet-500/20 mb-8"><h4 class="text-sm font-bold text-violet-400 uppercase tracking-widest mb-3">📚 Recommended Study</h4><div class="space-y-2">';
        weak.forEach(tid => html += `<a href="#topic/${tid}" class="block p-3 rounded-lg bg-violet-500/5 hover:bg-violet-500/10 text-sm text-slate-300 hover:text-white transition-colors">${getTopicTitle(tid)}</a>`);
        html += '</div></div>';
    }
    html += `<div class="flex gap-4"><button onclick="App.startSkillAssessment()" class="flex-1 py-3 rounded-xl font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 hover:bg-violet-500/30 transition-colors">Retake Assessment</button><a href="#mindmap" class="flex-1 py-3 rounded-xl font-bold bg-brand-600 text-white hover:bg-brand-500 transition-colors text-center">Dashboard</a></div>`;
    container.innerHTML = html;
};

// --- POMODORO ---
App.setupPomodoro = function () {
    const btn = document.getElementById('btn-pomo');
    const display = document.getElementById('pomo-display');
    if (!btn) return;
    btn.onclick = () => {
        if (this.pomoState.running) {
            clearInterval(this.pomoState.interval);
            this.pomoState.running = false;
        } else {
            this.pomoState.running = true;
            this.pomoState.interval = setInterval(() => {
                this.pomoState.seconds--;
                if (this.pomoState.seconds <= 0) {
                    clearInterval(this.pomoState.interval);
                    this.pomoState.running = false;
                    this.pomoState.seconds = 25 * 60;
                    State.data.studyTime = (State.data.studyTime || 0) + 25;
                    State.save();
                    if (display) display.textContent = '25:00';
                    alert('🍅 Pomodoro complete! Take a 5-minute break.');
                    return;
                }
                if (display) display.textContent = this.formatTime(this.pomoState.seconds);
            }, 1000);
        }
    };
    btn.ondblclick = () => {
        clearInterval(this.pomoState.interval);
        this.pomoState.running = false;
        this.pomoState.seconds = 25 * 60;
        if (display) display.textContent = '25:00';
    };
};

// --- EVENT LISTENERS ---
App.setupEventListeners = function () {
    // Bookmarks toggle
    document.getElementById('btn-bookmarks')?.addEventListener('click', () => this.toggleBookmarks());
    this.updateBookmarkCount();
    // Export
    document.getElementById('btn-export')?.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(State.data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'symfony-cockpit-progress.json';
        a.click();
    });
    // Import
    document.getElementById('btn-import')?.addEventListener('click', () => document.getElementById('import-file')?.click());
    document.getElementById('import-file')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                State.data = { ...State.data, ...data };
                State.save();
                location.reload();
            } catch { alert('Invalid JSON file'); }
        };
        reader.readAsText(file);
    });
    // Mobile menu
    document.getElementById('btn-mobile-menu')?.addEventListener('click', () => {
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('fixed');
            sidebar.classList.toggle('inset-0');
            sidebar.classList.toggle('z-[200]');
            sidebar.classList.toggle('w-full');
        }
    });
    // Keyboard shortcuts for flashcards
    document.addEventListener('keydown', (e) => {
        const fcView = document.getElementById('view-flashcards');
        if (!fcView || fcView.classList.contains('hidden')) return;
        if (e.code === 'Space') { e.preventDefault(); this.revealAnswer(); }
        if (e.code === 'ArrowRight' && this.fcState.idx < this.fcState.cards.length - 1) { this.fcState.idx++; this.renderCurrentCard(); }
        if (e.code === 'ArrowLeft' && this.fcState.idx > 0) { this.fcState.idx--; this.renderCurrentCard(); }
        if (e.code === 'Escape') document.getElementById('fc-answer-overlay')?.classList.remove('revealed');
        if (e.key === '1') this.fcSelfAssess('got-it');
        if (e.key === '2') this.fcSelfAssess('review');
        if (e.key === '3') this.fcSelfAssess('hard');
        if (e.key === '4') this.fcSelfAssess('no-idea');
    });
    // Flashcard nav buttons
    document.getElementById('fc-prev-btn')?.addEventListener('click', () => { if (this.fcState.idx > 0) { this.fcState.idx--; this.renderCurrentCard(); } });
    document.getElementById('fc-next-btn')?.addEventListener('click', () => { if (this.fcState.idx < this.fcState.cards.length - 1) { this.fcState.idx++; this.renderCurrentCard(); } });
    // Reset button
    document.getElementById('btn-reset')?.addEventListener('click', () => App.openResetModal());
};

// --- RESET PROGRESS ---
App.openResetModal = function () {
    document.getElementById('reset-modal').classList.remove('hidden');
};
App.closeResetModal = function () {
    document.getElementById('reset-modal').classList.add('hidden');
};
App.resetProgress = function (scope) {
    if (scope === 'all') {
        State.data = { completed: [], completedSubtopics: {}, scores: {}, notebook: {}, notebookTags: {}, bookmarks: [], flagged: [], fcMastery: {}, fcStarred: [], certResults: [], skillIQ: null, studyTime: 0, dailyGoal: null, dailyProgress: {} };
    } else if (scope === 'flashcards') {
        State.data.fcMastery = {};
        State.data.fcStarred = [];
    } else if (scope === 'quizzes') {
        State.data.scores = {};
        State.data.certResults = [];
        State.data.skillIQ = null;
    } else if (scope === 'completion') {
        State.data.completed = [];
        State.data.completedSubtopics = {};
    }
    State.save();
    this.closeResetModal();
    // Show success toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 backdrop-blur-lg text-sm';
    toast.style.animation = 'fadeInUp 0.3s ease-out';
    toast.textContent = `✅ ${scope === 'all' ? 'All progress' : scope.charAt(0).toUpperCase() + scope.slice(1)} reset successfully!`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transition = 'opacity 0.5s'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 2500);
    // Refresh UI
    location.reload();
};

// --- DAILY GOAL TRACKER ---
App.setDailyGoal = function () {
    const current = (State.data.dailyGoal || {}).target || 20;
    const val = prompt('🎯 Set your daily goal (number of flashcards to review):', current);
    if (!val || isNaN(parseInt(val))) return;
    if (!State.data.dailyGoal) State.data.dailyGoal = {};
    State.data.dailyGoal.target = parseInt(val);
    State.save();
    this.renderDailyGoal();
};
App.renderDailyGoal = function () {
    const container = document.getElementById('daily-goal-content');
    if (!container) return;
    const target = (State.data.dailyGoal || {}).target || 20;
    const today = new Date().toDateString();
    const progress = (State.data.dailyProgress || {})[today] || 0;
    const pct = Math.min(100, Math.round(progress / target * 100));
    const color = pct >= 100 ? '#10b981' : pct >= 50 ? '#06b6d4' : '#64748b';
    const circumference = 2 * Math.PI * 36;
    const dashoffset = circumference - (pct / 100) * circumference;
    container.innerHTML = `
        <div class="relative inline-block mb-2">
            <svg width="90" height="90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.05)" stroke-width="5" fill="none"/>
                <circle cx="40" cy="40" r="36" stroke="${color}" stroke-width="5" fill="none"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}"
                    stroke-linecap="round" transform="rotate(-90 40 40)" style="transition: stroke-dashoffset 0.8s ease-out"/>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-lg font-bold ${pct >= 100 ? 'text-emerald-400' : 'text-white'}">${pct >= 100 ? '🏆' : pct + '%'}</span>
            </div>
        </div>
        <p class="text-xs text-slate-400"><span class="font-bold text-white">${progress}</span> / ${target} cards today</p>
        ${pct >= 100 ? '<p class="text-[10px] text-emerald-400 font-bold mt-1">🎉 Goal reached!</p>' : ''}`;
};
App.trackDailyProgress = function () {
    const today = new Date().toDateString();
    if (!State.data.dailyProgress) State.data.dailyProgress = {};
    State.data.dailyProgress[today] = (State.data.dailyProgress[today] || 0) + 1;
    State.save();
    this.renderDailyGoal();
};

// --- WEAK AREAS DASHBOARD ---
App.renderWeakAreas = function () {
    const container = document.getElementById('weak-areas-content');
    if (!container) return;
    const m = State.data.fcMastery || {};
    const topicStats = {};
    Object.keys(m).forEach(key => {
        const parts = key.split('_');
        const tid = parts.slice(0, -1).join('_');
        if (!topicStats[tid]) topicStats[tid] = { total: 0, mastered: 0 };
        topicStats[tid].total++;
        if (m[key] === 'got-it') topicStats[tid].mastered++;
    });
    // Also check quiz scores
    const qs = State.data.quizScores || {};
    Object.keys(qs).forEach(tid => {
        if (!topicStats[tid]) topicStats[tid] = { total: 0, mastered: 0 };
        topicStats[tid].quizScore = qs[tid];
    });
    const scored = Object.entries(topicStats)
        .map(([tid, s]) => ({
            tid,
            title: getTopicTitle(tid),
            pct: s.total > 0 ? Math.round(s.mastered / s.total * 100) : (s.quizScore || 0),
            total: s.total
        }))
        .filter(t => t.total > 0)
        .sort((a, b) => a.pct - b.pct);
    if (!scored.length) {
        container.innerHTML = '<p class="text-slate-500 text-xs">Start reviewing flashcards or taking quizzes to see your weak areas.</p>';
        return;
    }
    const weak = scored.slice(0, 3);
    let html = '<div class="space-y-2">';
    weak.forEach(t => {
        const clr = t.pct >= 60 ? 'emerald' : t.pct >= 30 ? 'amber' : 'rose';
        html += `
            <a href="#topic/${t.tid}" class="block group">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-slate-300 group-hover:text-white transition-colors truncate">${t.title}</span>
                    <span class="text-xs font-bold text-${clr}-400">${t.pct}%</span>
                </div>
                <div class="h-1.5 bg-dark-900 rounded-full overflow-hidden">
                    <div class="h-full bg-${clr}-500 rounded-full transition-all" style="width:${t.pct}%"></div>
                </div>
            </a>`;
    });
    html += '</div>';
    if (scored.length > 3) {
        html += `<p class="text-[10px] text-slate-500 mt-2">+ ${scored.length - 3} more topics reviewed</p>`;
    }
    container.innerHTML = html;
};

// --- SESSION TIMER ---
App.startSessionTimer = function () {
    this.sessionStart = Date.now();
    this.sessionInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - this.sessionStart) / 1000);
        const m = Math.floor(elapsed / 60);
        const s = elapsed % 60;
        const display = document.getElementById('session-timer-display');
        if (display) display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
    // Total study time
    const totalEl = document.getElementById('total-study-time');
    if (totalEl) {
        const total = State.data.studyTime || 0;
        totalEl.textContent = `${Math.floor(total / 60)}h ${total % 60}m`;
    }
};
App.saveSessionTime = function () {
    if (this.sessionStart) {
        const mins = Math.floor((Date.now() - this.sessionStart) / 60000);
        State.data.studyTime = (State.data.studyTime || 0) + mins;
        State.save();
    }
};

// --- RETRY WRONG ONLY (Quiz Enhancement) ---
App.retryWrongOnly = function (topicId) {
    if (!this.lastQuizResult || !this.lastQuizResult.questions) return;
    const wrongQs = this.lastQuizResult.questions.filter((q, i) => {
        const ua = this.lastQuizResult.userAnswers[i] || [];
        return !(q.correct.length === ua.length && q.correct.every(c => ua.includes(c)));
    });
    if (!wrongQs.length) {
        alert('🎉 No wrong answers to retry!');
        return;
    }
    // Start quiz with only wrong questions
    this.quizState = { questions: shuffleArray(wrongQs), answers: {}, idx: 0, topicId, isRetry: true };
    location.hash = 'quiz/' + topicId;
    this.renderQuizQuestion();
};

// --- HOOK UP PEDAGOGICAL WIDGETS ---
const origInit = App.init;
App.init = function () {
    // Ingest external Code Review Banks
    if (window.CodeReviewBank) {
        const crModule = (AppData.modules || []).find(m => m.id === 'm7');
        Object.keys(window.CodeReviewBank).forEach(topicId => {
            const crs = window.CodeReviewBank[topicId];
            if (!App.topicToCodeReview[topicId]) App.topicToCodeReview[topicId] = [];
            
            crs.forEach(cr => {
                // Ingest into main AppData
                if (!AppData.codeReviews) AppData.codeReviews = [];
                if (!AppData.codeReviews.find(r => r.id === cr.id)) {
                    AppData.codeReviews.push({ id: cr.id, title: cr.title, content: cr.content });
                }
                
                // Add to bug mapping
                App.codeReviewBugs[cr.id] = { line: cr.bugLine, message: cr.bugMessage };
                
                // Add to topic mapping
                if (!App.topicToCodeReview[topicId].includes(cr.id)) {
                    App.topicToCodeReview[topicId].push(cr.id);
                }
                
                // Dynamically add to Sidebar (Module 7)
                if (crModule && !crModule.topics.find(t => t.id === cr.id)) {
                    crModule.topics.push({ id: cr.id, title: cr.title });
                }
            });
        });
    }

    origInit.call(this);
    // Start session timer
    this.startSessionTimer();
    // Render dashboard widgets
    this.renderDailyGoal();
    this.renderWeakAreas();
    // Save session on unload
    window.addEventListener('beforeunload', () => this.saveSessionTime());
};

// --- PATCH fcSelfAssess to track daily progress ---
const origFcAssess = App.fcSelfAssess;
App.fcSelfAssess = function (level) {
    origFcAssess.call(this, level);
    this.trackDailyProgress();
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => App.init());
