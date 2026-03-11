#!/usr/bin/env python3
"""Inject a sticky top navigation bar into all HTML pages in pages/ directory.
Adds: Back to Index, Pause/Resume Pomodoro, Reset Progress buttons.
"""
import os
import re

PAGES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'pages')

NAV_BAR = '''    <!-- Injected Navigation Bar -->
    <nav id="page-top-nav" style="position:sticky;top:0;z-index:100;background:rgba(15,23,42,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.06);padding:0.5rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
        <a href="../index.html" style="display:inline-flex;align-items:center;gap:6px;color:#60a5fa;font-weight:700;font-size:0.85rem;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.color='#93c5fd'" onmouseout="this.style.color='#60a5fa'">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Retour vers index.html
        </a>
        <div style="display:flex;align-items:center;gap:6px;">
            <button id="nav-pomo-btn" onclick="togglePomo()" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:8px;font-size:0.75rem;font-weight:700;background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2);cursor:pointer;transition:all 0.2s;" title="Pomodoro Timer">
                ⏱ <span id="nav-pomo-display">25:00</span>
            </button>
            <button onclick="if(confirm('⚠️ Reset ALL progress? This cannot be undone.')){localStorage.removeItem('symfony-cockpit');location.href='../index.html'}" style="padding:4px 10px;border-radius:8px;font-size:0.75rem;font-weight:700;background:rgba(239,68,68,0.08);color:#fca5a5;border:1px solid rgba(239,68,68,0.15);cursor:pointer;transition:all 0.2s;" title="Reset Progress">
                🔄 Reset
            </button>
        </div>
    </nav>
    <script>
    (function(){
        var s=25*60,r=false,iv;
        window.togglePomo=function(){
            var d=document.getElementById('nav-pomo-display'),b=document.getElementById('nav-pomo-btn');
            if(r){clearInterval(iv);r=false;b.style.background='rgba(239,68,68,0.1)';return;}
            r=true;b.style.background='rgba(16,185,129,0.15)';b.style.color='#34d399';b.style.borderColor='rgba(16,185,129,0.3)';
            iv=setInterval(function(){
                s--;if(s<=0){clearInterval(iv);r=false;s=25*60;d.textContent='25:00';alert('🍅 Pomodoro complete!');return;}
                d.textContent=Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;
            },1000);
        };
    })();
    </script>
'''

MARKER = '<!-- Injected Navigation Bar -->'

def inject_navbar(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already injected
    if MARKER in content:
        return False
    
    # Insert after <body ...>
    body_match = re.search(r'(<body[^>]*>)', content)
    if not body_match:
        return False
    
    insert_pos = body_match.end()
    new_content = content[:insert_pos] + '\n' + NAV_BAR + content[insert_pos:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True

def main():
    count = 0
    skipped = 0
    for fname in sorted(os.listdir(PAGES_DIR)):
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(PAGES_DIR, fname)
        if inject_navbar(fpath):
            count += 1
        else:
            skipped += 1
    print(f"✅ Injected navbar into {count} files, skipped {skipped}")

if __name__ == '__main__':
    main()
