// =============================================
// PULSE-DOPPLER LFM RADAR TECHNICAL SHOWCASE
// JavaScript - Interactive Navigation & PDF Export
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeScrollSpy();
    initializeSmoothScroll();
    initializeCardAnimations();
    initializePrintOptimization();
    initializeLanguageToggle();
    generateBlockVisualizations();
});

// =============================================
// NAVIGATION MANAGEMENT
// =============================================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// =============================================
// SCROLL SPY - Highlight active section
// =============================================
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// =============================================
// SMOOTH SCROLLING
// =============================================
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// CARD ANIMATIONS - Fade in on scroll
// =============================================
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.tech-card, .result-card, .figure-card');

    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserverCallback = (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };

    const cardObserver = new IntersectionObserver(cardObserverCallback, cardObserverOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// =============================================
// PDF EXPORT OPTIMIZATION
// =============================================
function initializePrintOptimization() {
    // Ensure all equations are rendered before print
    window.addEventListener('beforeprint', function () {
        // Give MathJax time to render all equations
        if (window.MathJax) {
            MathJax.typesetPromise().then(() => {
                console.log('All equations rendered for PDF export');
            }).catch((err) => {
                console.error('MathJax rendering error:', err);
            });
        }

        // Expand all collapsed sections (if any)
        const cards = document.querySelectorAll('.tech-card');
        cards.forEach(card => {
            card.style.pageBreakInside = 'avoid';
        });
    });

    window.addEventListener('afterprint', function () {
        console.log('PDF export completed');
    });
}

// =============================================
// EQUATION COPYING (Optional Enhancement)
// =============================================
function initializeEquationCopy() {
    const equations = document.querySelectorAll('.equation-box');

    equations.forEach(eq => {
        eq.style.cursor = 'pointer';
        eq.title = 'Click to copy LaTeX code';

        eq.addEventListener('click', function () {
            // Extract LaTeX from equation
            const mathContent = this.querySelector('.MathJax');
            if (mathContent) {
                const latex = mathContent.getAttribute('data-latex') ||
                    mathContent.textContent;

                // Copy to clipboard
                navigator.clipboard.writeText(latex).then(() => {
                    showNotification('Equation copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy equation:', err);
                });
            }
        });
    });
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================
function showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =============================================
// MOBILE MENU TOGGLE (Responsive)
// =============================================
function createMobileMenuToggle() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Create hamburger button
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.id = 'mobileMenuBtn';
    menuButton.setAttribute('aria-label', 'Toggle navigation');
    menuButton.style.cssText = `
        position: fixed;
        top: 14px;
        left: 14px;
        z-index: 2100;
        background: #1e3a8a;
        color: white;
        border: none;
        padding: 0.55rem 0.85rem;
        font-size: 1.3rem;
        border-radius: 6px;
        cursor: pointer;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        transition: background 0.2s;
    `;

    document.body.appendChild(menuButton);

    const sidebar = document.querySelector('.sidebar');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function showButton() {
        menuButton.style.display = isMobile() ? 'block' : 'none';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        menuButton.innerHTML = '☰';
    }

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        menuButton.innerHTML = '✕';
    }

    menuButton.addEventListener('click', function () {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar when a nav link is clicked on mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (isMobile()) closeSidebar();
        });
    });

    showButton();
    window.addEventListener('resize', function () {
        showButton();
        if (!isMobile()) closeSidebar();
    });
}

createMobileMenuToggle();

// =============================================
// TABLE OF CONTENTS GENERATOR (Optional)
// =============================================
function generateTableOfContents() {
    const sections = document.querySelectorAll('.section');
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Quick Navigation</h3><ul></ul>';

    const tocList = toc.querySelector('ul');

    sections.forEach((section, index) => {
        const title = section.querySelector('h2, .main-title');
        if (title) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = title.textContent;
            link.href = `#${section.id}`;
            link.addEventListener('click', function (e) {
                e.preventDefault();
                section.scrollIntoView({ behavior: 'smooth' });
            });
            li.appendChild(link);
            tocList.appendChild(li);
        }
    });

    return toc;
}

// =============================================
// KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + P: Trigger print dialog
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }

    // Ctrl/Cmd + H: Toggle sidebar (desktop only)
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }
});

// =============================================
// PERFORMANCE MONITORING
// =============================================
function logPerformanceMetrics() {
    if (window.performance) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;

                console.log('=== Performance Metrics ===');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`Server Response Time: ${connectTime}ms`);
                console.log(`DOM Render Time: ${renderTime}ms`);
                console.log('===========================');
            }, 0);
        });
    }
}

logPerformanceMetrics();

// =============================================
// MATHJAX READY EVENT
// =============================================
if (window.MathJax) {
    MathJax.startup = {
        ready: () => {
            MathJax.startup.defaultReady();
            console.log('MathJax loaded and ready');

            // Re-typeset on dynamic content changes
            MathJax.typesetPromise().then(() => {
                console.log('All equations typeset successfully');
            }).catch((err) => console.error('MathJax error:', err));
        }
    };
}

// =============================================
// BLOCK SIGNAL VISUALIZATIONS
// =============================================

function generateBlockVisualizations() {

    const svgStyle = `
        background:#0d1117;
        border-radius:8px;
        display:block;
        width:100%;
        margin:0 auto;
    `;

    const labelStyle = `font-family:'Consolas',monospace; font-size:11px; fill:#8b949e;`;
    const titleStyle = `font-family:'Segoe UI',sans-serif; font-size:12px; font-weight:700; fill:#58a6ff;`;
    const arrowStyle = `stroke:#3b82f6; stroke-width:2; fill:none; marker-end:url(#arr);`;

    // Arrow marker def reused in every SVG
    const defs = `<defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
        </marker>
    </defs>`;

    // ── helpers ──────────────────────────────────────────────
    function svgWrap(w, h, content) {
        return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="${svgStyle}">${defs}${content}</svg>`;
    }
    function label(x, y, txt, anchor = 'middle', col = '#8b949e') {
        return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="'Consolas',monospace" font-size="11" fill="${col}">${txt}</text>`;
    }
    function sectionTitle(x, y, txt) {
        return `<text x="${x}" y="${y}" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="700" fill="#58a6ff">${txt}</text>`;
    }
    function box(x, y, w, h, col = '#161b22', stroke = '#30363d') {
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${col}" stroke="${stroke}" stroke-width="1.5"/>`;
    }
    function arrow(x1, y1, x2, y2) {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${arrowStyle}/>`;
    }
    // sine-like chirp path  freq increases left→right
    function chirpPath(x0, y0, w, h, periods = 3, rising = true) {
        let d = `M${x0},${y0 + h / 2}`;
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const freq = rising ? (0.5 + t * periods) : (periods - t * (periods - 0.5));
            const y = y0 + h / 2 - (h / 2 - 4) * Math.sin(2 * Math.PI * freq * t);
            d += ` L${x0 + t * w},${y}`;
        }
        return d;
    }
    function sinePath(x0, y0, w, h, freq = 3) {
        let d = `M${x0},${y0 + h / 2}`;
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const y = y0 + h / 2 - (h / 2 - 4) * Math.sin(2 * Math.PI * freq * t);
            d += ` L${x0 + t * w},${y}`;
        }
        return d;
    }
    function noisePath(x0, y0, w, h, seed = 42) {
        let d = `M${x0},${y0 + h / 2}`;
        let v = 0;
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            v += (Math.sin(seed * i * 0.3 + 1.7) * 0.4 + Math.sin(seed * i * 0.7) * 0.3) * 2;
            v *= 0.85;
            const y = Math.max(y0 + 3, Math.min(y0 + h - 3, y0 + h / 2 + v * (h / 3)));
            d += ` L${x0 + t * w},${y}`;
        }
        return d;
    }
    function impulse(x, y0, h) {
        return `<line x1="${x}" y1="${y0 + h}" x2="${x}" y2="${y0 + 4}" stroke="#3fb950" stroke-width="2.5"/>
                <circle cx="${x}" cy="${y0 + 4}" r="3" fill="#3fb950"/>`;
    }
    function noisyImpulse(cx, y0, h) {
        // wide blob
        return `<ellipse cx="${cx}" cy="${y0 + h / 2}" rx="18" ry="${h / 2 - 4}" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="1"/>
                <line x1="${cx}" y1="${y0 + h}" x2="${cx}" y2="${y0 + 4}" stroke="#3fb950" stroke-width="2.5"/>
                <circle cx="${cx}" cy="${y0 + 4}" r="3" fill="#3fb950"/>`;
    }

    // ── Block 1: LFM Generation ───────────────────────────────
    const b1 = svgWrap(700, 140, `
        ${box(10, 10, 200, 120)} ${sectionTitle(110, 28, 'INPUT')} ${label(110, 45, 'Parameters only', 'middle', '#6e7681')}
        ${label(110, 62, 'pulse_len = 512', 'middle')} ${label(110, 77, 'fs = 20 MHz', 'middle')} ${label(110, 92, 'B = 5 MHz', 'middle')}
        ${label(110, 108, '(no signal yet)', 'middle', '#6e7681')}
        ${arrow(210, 70, 260, 70)}
        ${box(260, 10, 180, 120, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'LFM BLOCK 1')}
        <path d="${chirpPath(270, 38, 160, 72, 4, true)}" stroke="#3b82f6" stroke-width="1.8" fill="none"/>
        ${label(350, 125, 's(t) = e^(jπkt²)', 'middle', '#58a6ff')}
        ${arrow(440, 70, 490, 70)}
        ${box(490, 10, 200, 120, '#0d1117', '#3fb950')}
        ${sectionTitle(590, 28, 'OUTPUT')}
        <path d="${chirpPath(500, 38, 180, 72, 4, true)}" stroke="#3fb950" stroke-width="1.8" fill="none"/>
        ${label(590, 108, 'pulse ∈ ℂ⁵¹² (chirp)', 'middle', '#3fb950')}
    `);

    // ── Block 2: Pulse Train ──────────────────────────────────
    function pulseTrainPath(x0, y0, w, h, n = 5, duty = 0.55) {
        const pw = w / n, act = pw * duty, gap = pw * (1 - duty);
        let d = '';
        for (let i = 0; i < n; i++) {
            const xS = x0 + i * pw, xE = xS + act;
            // chirp inside each pulse
            d += `M${xS},${y0 + h / 2}`;
            for (let j = 0; j <= 30; j++) {
                const t = j / 30;
                const freq = 0.5 + t * 2;
                d += ` L${xS + t * act},${y0 + h / 2 - (h / 2 - 4) * Math.sin(2 * Math.PI * freq * t)}`;
            }
            d += ` M${xE},${y0 + h / 2} L${xE + gap},${y0 + h / 2}`;
        }
        return d;
    }
    const b2 = svgWrap(700, 140, `
        ${box(10, 10, 200, 120, '#0d1117', '#3fb950')}
        ${sectionTitle(110, 28, 'INPUT')}
        <path d="${chirpPath(20, 38, 180, 72, 4, true)}" stroke="#3fb950" stroke-width="1.8" fill="none"/>
        ${label(110, 118, 'Single chirp pulse', 'middle', '#3fb950')}
        ${arrow(210, 70, 260, 70)}
        ${box(260, 10, 180, 120, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'PULSE TRAIN BLOCK 2')}
        <path d="${pulseTrainPath(268, 34, 165, 76, 4)}" stroke="#58a6ff" stroke-width="1.5" fill="none"/>
        ${label(350, 125, '128 pulses × 712 samples', 'middle', '#58a6ff')}
        ${arrow(440, 70, 490, 70)}
        ${box(490, 10, 200, 120, '#0d1117', '#3fb950')}
        ${sectionTitle(590, 28, 'OUTPUT')}
        <path d="${pulseTrainPath(498, 34, 185, 76, 5)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        ${label(590, 118, 'tx ∈ ℂ⁹¹¹³⁶', 'middle', '#3fb950')}
    `);

    // ── Block 3: Channel ──────────────────────────────────────
    const b3 = svgWrap(700, 160, `
        ${box(10, 10, 190, 140, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT tx')}
        <path d="${pulseTrainPath(18, 36, 175, 68, 4)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        ${label(105, 112, 'No delay', 'middle', '#6e7681')}
        ${label(105, 127, 'No Doppler shift', 'middle', '#6e7681')}
        ${arrow(200, 80, 250, 80)}
        ${box(250, 10, 200, 140, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'CHANNEL BLOCK 3')}
        ${label(350, 50, 'τ = 2R/c = 3.33μs', 'middle', '#58a6ff')}
        ${label(350, 66, 'delay = 67 samples', 'middle')}
        ${label(350, 82, 'fd = 2v/λ = 3200 Hz', 'middle', '#ffa657')}
        ${label(350, 98, 'Doppler modulation', 'middle')}
        ${label(350, 130, 'r(t) = s(t-τ)·e^(j2πfdt)', 'middle', '#58a6ff')}
        ${arrow(450, 80, 500, 80)}
        ${box(500, 10, 190, 140, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT rx')}
        <path d="${pulseTrainPath(508, 36, 175, 55, 4)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        ${label(595, 103, 'Delayed 67 samples', 'middle', '#ffa657')}
        ${label(595, 118, '+ Doppler freq shift', 'middle', '#ffa657')}
        ${label(595, 136, 'rx ∈ ℂ⁹¹²⁰³', 'middle', '#3fb950')}
    `);

    // ── Block 4: AWGN ─────────────────────────────────────────
    const b4 = svgWrap(700, 150, `
        ${box(10, 10, 190, 130, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT rx (clean)')}
        <path d="${pulseTrainPath(18, 36, 175, 65, 4)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        ${label(105, 118, 'SNR = ∞ (no noise)', 'middle', '#6e7681')}
        ${arrow(200, 75, 250, 75)}
        ${box(250, 10, 200, 130, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'AWGN BLOCK 4')}
        ${label(350, 50, 'n(t) ~ CN(0, σ²)', 'middle', '#58a6ff')}
        ${label(350, 66, 'noise_power = 0.01', 'middle')}
        <path d="${noisePath(258, 82, 185, 40, 17)}" stroke="#f85149" stroke-width="1.2" fill="none"/>
        ${label(350, 135, '+ Gaussian noise', 'middle', '#f85149')}
        ${arrow(450, 75, 500, 75)}
        ${box(500, 10, 190, 130, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT rx+noise')}
        <path d="${noisePath(508, 32, 175, 75, 99)}" stroke="#3fb950" stroke-width="1.2" fill="none"/>
        ${label(595, 118, 'SNR ≈ 20 dB', 'middle', '#ffa657')}
    `);

    // ── Block 5: Matrix Reshape ───────────────────────────────
    function drawMatrix(x, y, rows = 5, cols = 7, cw = 14, ch = 10) {
        let s = '';
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
            const hue = c / (cols - 1);
            const intensity = Math.abs(Math.sin(r * 0.9 + c * 0.6));
            const b = Math.floor(40 + intensity * 120);
            s += `<rect x="${x + c * cw}" y="${y + r * ch}" width="${cw - 1}" height="${ch - 1}" rx="1" fill="rgb(${Math.floor(b * 0.4)},${Math.floor(b * 0.6)},${b})"/>`;
        }
        return s;
    }
    const b5 = svgWrap(700, 150, `
        ${box(10, 10, 190, 130, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT (1D array)')}
        <path d="${noisePath(18, 38, 175, 60, 88)}" stroke="#3fb950" stroke-width="1.3" fill="none"/>
        ${label(105, 112, '91,203 samples', 'middle', '#3fb950')}
        ${label(105, 127, '(long 1D signal)', 'middle', '#6e7681')}
        ${arrow(200, 75, 250, 75)}
        ${box(250, 10, 200, 130, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'RESHAPE BLOCK 5')}
        ${label(350, 50, 'reshape(rx,712,128)', 'middle', '#58a6ff')}
        ${label(350, 66, 'rows = fast-time', 'middle')}
        ${label(350, 82, 'cols = slow-time', 'middle')}
        ${label(350, 98, '(range bins × pulses)', 'middle', '#6e7681')}
        ${arrow(450, 75, 500, 75)}
        ${box(500, 10, 190, 130, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT (2D matrix)')}
        ${drawMatrix(516, 36, 8, 10, 14, 9)}
        ${label(520, 130, '712 rows', 'middle', '#8b949e')} ${label(590, 130, '128 cols', 'middle', '#8b949e')}
        ${label(595, 118, 'rx_matrix[712×128]', 'middle', '#3fb950')}
    `);

    // ── Block 6: Matched Filter ───────────────────────────────
    const b6 = svgWrap(700, 155, `
        ${box(10, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT (one pulse)')}
        <path d="${chirpPath(18, 38, 175, 65, 4, true)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        ${label(105, 118, 'Chirp: 25.6 μs wide', 'middle', '#ffa657')}
        ${label(105, 133, 'Low peak / spread energy', 'middle', '#6e7681')}
        ${arrow(200, 77, 250, 77)}
        ${box(250, 10, 200, 135, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'MATCHED FILTER BLK 6')}
        ${label(350, 48, 'h(t) = s*(-t)', 'middle', '#58a6ff')}
        ${label(350, 64, 'conv(rx_pulse, tx_mf)', 'middle')}
        ${label(350, 80, 'Cross-correlation', 'middle')}
        ${label(350, 96, 'Gain = BT = 256', 'middle', '#ffa657')}
        ${label(350, 112, '= +24.1 dB SNR', 'middle', '#3fb950')}
        ${arrow(450, 77, 500, 77)}
        ${box(500, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT (compressed)')}
        ${impulse(595, 36, 80)}
        ${label(595, 128, 'Sharp peak: ~2 bins', 'middle', '#3fb950')}
        ${label(595, 143, 'SNR: 20→44 dB', 'middle', '#ffa657')}
    `);

    // ── Block 7: Range Estimation ─────────────────────────────
    function profilePath(x0, y0, w, h, peakAt = 0.35) {
        let d = `M${x0},${y0 + h}`;
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const v = Math.exp(-Math.pow((t - peakAt) * 18, 2)) * 0.88 + Math.random() * 0.04;
            d += ` L${x0 + t * w},${y0 + h - v * (h - 4)}`;
        }
        return d;
    }
    const b7 = svgWrap(700, 150, `
        ${box(10, 10, 190, 130, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT range_matrix')}
        ${drawMatrix(25, 36, 7, 10, 14, 9)}
        ${label(105, 118, 'After matched filter', 'middle', '#6e7681')}
        ${label(105, 133, '[712×128] matrix', 'middle', '#3fb950')}
        ${arrow(200, 75, 250, 75)}
        ${box(250, 10, 200, 130, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'RANGE ESTIM. BLOCK 7')}
        ${label(350, 48, 'sum(abs(·),2) → profile', 'middle', '#58a6ff')}
        ${label(350, 64, '[~,bin] = max(profile)', 'middle')}
        ${label(350, 80, 'R = bin × c/(2fs)', 'middle', '#58a6ff')}
        ${label(350, 96, 'bin 67 → 502.5 m', 'middle', '#ffa657')}
        ${arrow(450, 75, 500, 75)}
        ${box(500, 10, 190, 130, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT')}
        <path d="${profilePath(505, 36, 180, 65)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        <line x1="563" y1="36" x2="563" y2="100" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3"/>
        ${label(563, 112, '↑ bin 67', 'middle', '#ffa657')}
        ${label(595, 128, 'range_est ≈ 502.5 m', 'middle', '#3fb950')}
    `);

    // ── Block 8: Doppler FFT ──────────────────────────────────
    function fftSpectrum(x0, y0, w, h, peakAt = 0.62) {
        let d = `M${x0},${y0 + h}`;
        for (let i = 0; i <= 200; i++) {
            const t = i / 200;
            const v = Math.exp(-Math.pow((t - peakAt) * 30, 2)) * 0.9
                + Math.exp(-Math.pow((t - 0.5) * 60, 2)) * 0.15
                + Math.random() * 0.03;
            d += ` L${x0 + t * w},${y0 + h - v * (h - 4)}`;
        }
        return d;
    }
    const b8 = svgWrap(700, 155, `
        ${box(10, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT slow-time row')}
        <path d="${sinePath(18, 38, 175, 68, 3.2)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        ${label(105, 120, 'range_matrix[bin67,:]', 'middle', '#3fb950')}
        ${label(105, 135, '128 pulses (phase data)', 'middle', '#6e7681')}
        ${arrow(200, 77, 250, 77)}
        ${box(250, 10, 200, 135, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'DOPPLER FFT BLOCK 8')}
        ${label(350, 48, 'detrend → hamming wind.', 'middle', '#58a6ff')}
        ${label(350, 64, 'fftshift(fft(·,1024))', 'middle')}
        ${label(350, 80, '-PRF/2 to +PRF/2', 'middle')}
        ${label(350, 96, 'Δf = 27.4 Hz/bin', 'middle', '#6e7681')}
        ${arrow(450, 77, 500, 77)}
        ${box(500, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT (spectrum)')}
        <path d="${fftSpectrum(505, 36, 180, 68)}" stroke="#3fb950" stroke-width="1.5" fill="none"/>
        <line x1="612" y1="38" x2="612" y2="102" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3"/>
        ${label(612, 115, '↑ fd=3200Hz', 'middle', '#ffa657')}
        ${label(595, 132, 'v = fd·λ/2 ≈ 200 m/s', 'middle', '#3fb950')}
    `);

    // ── Block 9: Interpolation ────────────────────────────────
    function parabola(x0, y0, w, h) {
        let d = ``;
        // 3 discrete bins
        const bins = [0.35, 0.5, 0.65];
        const heights = [0.55, 0.92, 0.60];
        bins.forEach((b, i) => {
            const bx = x0 + b * w, by = y0 + h - heights[i] * (h - 6);
            d += `<rect x="${bx - 6}" y="${by}" width="12" height="${y0 + h - by}" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="1.5" rx="2"/>`;
        });
        // parabola fit
        let pd = `M`;
        for (let i = 0; i <= 60; i++) {
            const t = i / 60;
            const x = x0 + (0.2 + t * 0.6) * w;
            const u = (t - 0.5) * 2;
            const v = 0.92 - u * u * 1.4;
            const yp = y0 + h - Math.max(0, v) * (h - 6);
            pd += (i === 0 ? '' : `L`) + `${x},${yp} `;
        }
        d += `<path d="${pd}" stroke="#ffa657" stroke-width="1.8" fill="none" stroke-dasharray="5,3"/>`;
        // true peak marker
        d += `<line x1="${x0 + 0.52 * w}" y1="${y0 + h}" x2="${x0 + 0.52 * w}" y2="${y0 + 8}" stroke="#3fb950" stroke-width="2" stroke-dasharray="3,3"/>`;
        d += `<circle cx="${x0 + 0.52 * w}" cy="${y0 + 8}" r="4" fill="#3fb950"/>`;
        return d;
    }
    const b9 = svgWrap(700, 155, `
        ${box(10, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT (FFT bins)')}
        <rect x="48" y="56" width="12" height="44" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
        <rect x="78" y="36" width="12" height="64" fill="rgba(59,130,246,0.5)" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
        <rect x="108" y="52" width="12" height="48" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
        <rect x="138" y="78" width="12" height="22" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
        ${label(105, 118, 'Discrete bins only', 'middle', '#ffa657')} ${label(105, 133, '±0.11 m/s accuracy', 'middle', '#6e7681')}
        ${arrow(200, 77, 250, 77)}
        ${box(250, 10, 200, 135, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'INTERPOLATION BLK 9')}
        ${label(350, 50, 'α=left, β=peak, γ=right', 'middle', '#58a6ff')}
        ${label(350, 66, 'δ=0.5(α-γ)/(α-2β+γ)', 'middle')}
        ${label(350, 82, 'f̂d = f[k] + δ·Δf', 'middle', '#58a6ff')}
        ${label(350, 98, 'Sub-bin precision', 'middle', '#3fb950')}
        ${arrow(450, 77, 500, 77)}
        ${box(500, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT (refined)')}
        ${parabola(505, 36, 180, 80)}
        ${label(595, 128, 'fd_est refined', 'middle', '#3fb950')}
        ${label(595, 143, 'v ≈ 200.00 m/s ±0.01', 'middle', '#ffa657')}
    `);

    // ── Block 10: Range-Doppler Map ───────────────────────────
    function rdmap(x0, y0, w, h) {
        let s = ``;
        const rows = 20, cols = 28;
        const cw = w / cols, ch = h / rows;
        const pr = 8, pc = 17; // peak row/col
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
            const d = Math.sqrt(Math.pow((r - pr) / 3, 2) + Math.pow((c - pc) / 2.5, 2));
            const v = Math.max(0, 1 - d * 0.38);
            const intensity = Math.floor(v * 220);
            const R = Math.floor(intensity * 0.1), G = Math.floor(intensity * 0.6), B = intensity;
            s += `<rect x="${x0 + c * cw}" y="${y0 + r * ch}" width="${cw}" height="${ch}" fill="rgb(${R},${G},${B})"/>`;
        }
        // peak dot
        s += `<circle cx="${x0 + pc * cw + cw / 2}" cy="${y0 + pr * ch + ch / 2}" r="4" fill="#3fb950" opacity="0.9"/>`;
        return s;
    }
    const b10 = svgWrap(700, 155, `
        ${box(10, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(105, 28, 'INPUT range_matrix')}
        ${drawMatrix(25, 38, 7, 10, 14, 9)}
        ${label(105, 120, 'After matched filter', 'middle', '#6e7681')}
        ${label(105, 135, '[712×128] windowed', 'middle', '#3fb950')}
        ${arrow(200, 77, 250, 77)}
        ${box(250, 10, 200, 135, '#0d1117', '#3b82f6')}
        ${sectionTitle(350, 28, 'RD MAP BLOCK 10')}
        ${label(350, 50, 'Hamming 2D window', 'middle', '#58a6ff')}
        ${label(350, 66, 'fft(·,1024,dim=2)', 'middle')}
        ${label(350, 82, 'fftshift along Doppler', 'middle')}
        ${label(350, 98, '20·log10(|RD|)', 'middle')}
        ${label(350, 114, 'normalize → display', 'middle', '#6e7681')}
        ${arrow(450, 77, 500, 77)}
        ${box(500, 10, 190, 135, '#0d1117', '#3fb950')}
        ${sectionTitle(595, 28, 'OUTPUT 2D MAP')}
        ${rdmap(503, 30, 185, 90)}
        ${label(595, 132, 'Peak @ (500m, 200m/s)', 'middle', '#3fb950')}
        ${label(595, 147, '[712 × 1024] map', 'middle', '#6e7681')}
    `);

    // ── inject into each tech-card ────────────────────────────
    const svgs = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];
    const titles = [
        '📡 Signal Flow: Input Parameters → LFM Chirp Output',
        '📡 Signal Flow: Single Chirp → 128-Pulse Train',
        '📡 Signal Flow: TX Signal → Delayed + Doppler-Shifted RX',
        '📡 Signal Flow: Clean RX → Noisy RX (SNR ≈ 20 dB)',
        '📡 Signal Flow: 1D Array → 2D [Range × Pulse] Matrix',
        '📡 Signal Flow: Chirp Pulse → Compressed Peak',
        '📡 Signal Flow: 2D Matrix → Range Profile → Distance',
        '📡 Signal Flow: Slow-Time Row → Doppler Spectrum',
        '📡 Signal Flow: Discrete Bins → Sub-Bin Refined Peak',
        '📡 Signal Flow: Windowed Matrix → 2D Range-Doppler Map',
    ];

    const cards = document.querySelectorAll('#block-explanation .tech-card');
    svgs.forEach((svg, i) => {
        const card = cards[i];
        if (!card) return;

        // Build the visualization container
        const wrapper = document.createElement('div');
        wrapper.className = 'signal-viz-wrapper';
        wrapper.innerHTML = `
            <div class="signal-viz-title">${titles[i]}</div>
            <div class="signal-viz-body">${svg}</div>
        `;
        card.querySelector('.card-body').appendChild(wrapper);
    });
}



const translations = {
    en: {
        // Sidebar
        'nav-logo': 'Radar System',
        'nav-overview': 'Overview',
        'nav-parameters': 'System Parameters',
        'nav-validation': 'Equation Validation',
        'nav-diagram': 'System Diagram',
        'nav-blocks': 'Block Explanations',
        'nav-results': 'Results',
        'nav-code': 'Complete Code',
        'nav-export': '⬇ Export PDF',

        // Hero
        'hero-title': 'Pulse-Doppler Linear Frequency Modulated (LFM) Radar System',
        'hero-subtitle': 'Technical Validation & Academic Showcase',
        'obj-title': 'Project Objective',
        'obj-p1': 'This project demonstrates a <strong>Pulse-Doppler LFM Radar system</strong> that can measure both <strong>how far away</strong> (range) and <strong>how fast</strong> (velocity) a target is moving. Think of it like this:',
        'obj-li1': '<strong>LFM Chirp:</strong> We send out a signal that changes frequency over time (like a police siren going up in pitch)',
        'obj-li2': '<strong>Matched Filter:</strong> We compress the received signal to find exactly when it came back (tells us range)',
        'obj-li3': '<strong>Doppler Processing:</strong> We analyze how the frequency changed due to motion (tells us velocity)',
        'obj-li4': '<strong>2D Map:</strong> We combine both to create a complete picture showing all targets with their range and speed',
        'feat1': 'LFM Chirp Waveform',
        'feat2': 'Matched Filter Processing',
        'feat3': 'Range-Doppler Mapping',
        'feat4': 'Quadratic Interpolation',

        // Parameters
        'params-title': 'System Parameters',
        'params-th1': 'Parameter',
        'params-th2': 'Symbol',
        'params-th3': 'Value',
        'params-th4': 'Unit',
        'param-c': 'Speed of Light',
        'param-fc': 'Carrier Frequency',
        'param-fs': 'Sampling Frequency',
        'param-B': 'Bandwidth',
        'param-Np': 'Pulse Length',
        'param-M': 'Number of Pulses',
        'param-Ng': 'Pulse Gap',
        'param-R0': 'Target Range',
        'param-v0': 'Target Velocity',
        'param-noise': 'Noise Power',

        // Validation
        'val-title': 'Equation Validation: Code vs. Theory',
        'val-desc': 'Verification that our MATLAB implementation matches the theoretical equations from Mahafza textbook.',
        'val-th1': 'Eq. #',
        'val-th2': 'Parameter',
        'val-th3': 'Reference Equation (Theory)',
        'val-th4': 'Code Implementation',
        'val-th5': 'Match?',
        'val-th6': 'Ref',
        'val-p1': 'Travel Delay',
        'val-p2': 'Doppler Frequency',
        'val-p3': 'LFM Signal',
        'val-p4': 'Noise Model',
        'val-p5': 'Matched Filter',
        'val-p6': 'Range Estimation',
        'val-p7': 'Velocity Estimation',
        'val-p8': 'Speed of Light',
        'val-p9': 'Wavelength',
        'val-p10': 'Pulse Duration',
        'val-p11': 'Chirp Rate',
        'val-p12': 'Received Signal',
        'val-p13': 'Convolution',
        'val-p14': 'PRI & PRF',
        'val-p15': 'Doppler FFT',
        'val-p16': 'Interpolation',
        'val-p17': 'Range-Doppler Map',
        'val-p18': 'Power (dB)',
        'ref-title': 'References',

        // Diagram
        'diag-title': 'System Block Diagram Overview',
        'diag-desc': 'This is the complete signal flow from transmission to final detection. Each block processes the signal step-by-step.',
        'flow-b1-title': 'LFM Signal Generation',
        'flow-b1-sum': 'Create chirp signal: frequency sweeps from 0→5 MHz',
        'flow-b2-title': 'Pulse Train Formation',
        'flow-b2-sum': 'Repeat chirp 128 times with gaps between pulses',
        'flow-b3-title': 'Channel (Delay + Doppler)',
        'flow-b3-sum': 'Signal travels to target and back: gets delayed (range) and frequency-shifted (velocity)',
        'flow-b4-title': 'Add Noise',
        'flow-b4-sum': 'Realistic noise added to simulate real-world conditions',
        'flow-b5-title': 'Matrix Reshaping',
        'flow-b5-sum': 'Organize into 2D matrix: rows=range bins, columns=pulse numbers',
        'flow-b6-title': 'Matched Filter',
        'flow-b6-sum': 'Compress long chirp into sharp peak → improves range resolution',
        'flow-b7-title': 'Range Estimation',
        'flow-b7-sum': 'Find peak position → convert to distance in meters',
        'flow-b8-title': 'Doppler Processing',
        'flow-b8-sum': 'FFT on slow-time (across pulses) → find frequency shift',
        'flow-b9-title': 'Peak Interpolation',
        'flow-b9-sum': 'Refine Doppler estimate using neighboring bins → better accuracy',
        'flow-b10-title': 'Range-Doppler Map',
        'flow-b10-sum': '2D image showing all targets with their range and velocity',
        'takeaway-title': '🔑 Key Takeaway',
        'takeaway-p1': '<strong>The system works in two dimensions:</strong>',
        'takeaway-li1': '<strong>Range (Distance):</strong> Measured by timing how long the signal takes to return (Blocks 6-7)',
        'takeaway-li2': '<strong>Velocity (Speed):</strong> Measured by detecting frequency changes due to motion (Blocks 8-9)',
        'takeaway-p2': "By combining both, we get a complete picture of where targets are and how fast they're moving!",

        // Block Explanations
        'blk-title': 'Detailed Block Explanations',
        'blk-desc': "Here's what happens at each processing stage. Use these explanations during your presentation to explain each step.",
        'blk1-h3': 'LFM Signal Generation',
        'blk1-what-h': '🔍 What It Does',
        'blk1-what-p': 'Creates a chirp signal that sweeps from low frequency to high frequency over time. Think of it like a whistle that goes from low pitch to high pitch smoothly.',
        'blk1-eq-h': '📐 Key Equations',
        'blk1-eq1': '<strong>Pulse Duration:</strong> $T = \\frac{N}{f_s} = 25.6$ μs',
        'blk1-eq2': '<strong>Chirp Rate:</strong> $k = \\frac{B}{T} = 1.95 \\times 10^{11}$ Hz/s (how fast frequency changes)',
        'blk1-eq3': '<strong>Signal:</strong> $s(t) = e^{j\\pi kt^2}$ (phase grows with time squared)',
        'blk1-why-h': '💡 Why It Matters',
        'blk1-why-p': 'The chirp can be compressed later by the matched filter, turning a long 25.6 μs pulse into a sharp peak. This gives us good range resolution (30 m) while maintaining enough energy for detection.',
        'blk1-trace-h': '📊 Code Tracing Values',
        'blk1-trace1': '<strong>Input:</strong> None (generation from parameters)',
        'blk1-trace2': '<strong>Parameters Used:</strong> pulse_len = 512, fs = 20×10⁶ Hz, B = 5×10⁶ Hz',
        'blk1-trace3': '<strong>Computed:</strong> T = 25.6 μs, k = 1.953×10¹¹ Hz/s',
        'blk1-trace4': '<strong>Output:</strong> <code>pulse</code> ∈ ℂ⁵¹² (512 complex samples)',

        'blk2-h3': 'Pulse Train Formation',
        'blk2-what-p': 'Takes the single chirp pulse and repeats it 128 times with gaps in between. Like sending out 128 radar "pings" in a row.',
        'blk2-eq1': '<strong>PRI (Pulse Repetition Interval):</strong> Time between pulses = 35.6 μs',
        'blk2-eq2': '<strong>PRF (Pulse Repetition Frequency):</strong> $\\text{PRF} = \\frac{1}{\\text{PRI}} = 28.09$ kHz',
        'blk2-why-p': 'Multiple pulses let us measure velocity using the Doppler effect. Each pulse samples the target at a different time, and we can see how the phase changes from pulse to pulse (this tells us velocity). More pulses = better velocity accuracy.',
        'blk2-trace1': '<strong>Input:</strong> Single <code>pulse</code> ∈ ℂ⁵¹²',
        'blk2-trace2': '<strong>Parameters Used:</strong> num_pulses = 128, pulse_gap = 200 samples',
        'blk2-trace3': '<strong>Computed:</strong> pulse_total_len = 712 samples (512 + 200)',
        'blk2-trace4': '<strong>Output:</strong> <code>tx</code> ∈ ℂ⁹¹\'¹³⁶ (128×712 = 91,136 samples)',

        'blk3-h3': 'Channel Propagation & Doppler Shift',
        'blk3-what-p': 'Simulates what happens when the signal travels to the target and back. Two things happen: (1) the signal gets <strong>delayed</strong> (tells us range), and (2) the frequency gets <strong>shifted</strong> (tells us velocity).',
        'blk3-eq1': '<strong>Delay Time:</strong> $\\tau = \\frac{2R}{c} = 3.33$ μs (signal travels 500m + 500m back)',
        'blk3-eq2': '<strong>Doppler Shift:</strong> $f_d = \\frac{2v}{\\lambda} = 3200$ Hz (moving target changes frequency)',
        'blk3-eq3': '<strong>Received Signal:</strong> Delayed copy with frequency shift applied',
        'blk3-why-p': 'This is the physics of radar! The delay tells us <strong>how far</strong> (500m → 3.33 μs delay), and the Doppler tells us <strong>how fast</strong> (200 m/s → 3200 Hz shift). The rest of the system is about extracting these two pieces of information from the noisy received signal.',
        'blk3-trace1': '<strong>Input:</strong> <code>tx</code> ∈ ℂ⁹¹\'¹³⁶',
        'blk3-trace2': '<strong>Computed:</strong> tau = 3.33 μs, delay_samples = 67, fd = 3200 Hz',
        'blk3-trace3': '<strong>Output:</strong> <code>rx</code> ∈ ℂ⁹¹\'²⁰³ (91,136 + 67 = 91,203 samples, Doppler modulated)',

        'blk4-h3': 'Additive White Gaussian Noise (AWGN)',
        'blk4-what-p': 'Adds random noise to the signal to make it realistic. Real radar always has noise from electronics, atmosphere, etc.',
        'blk4-eq1': '<strong>Noise Model:</strong> $n(t) \\sim \\mathcal{CN}(0, \\sigma^2)$ (complex Gaussian noise)',
        'blk4-eq2': '<strong>Noise Power:</strong> $\\sigma^2 = 0.01$ → SNR ≈ 20 dB before processing',
        'blk4-why-p': 'Testing with noise proves the system works in realistic conditions. The matched filter will later improve SNR from 20 dB to ~44 dB (24 dB gain). This shows our processing is robust!',

        'blk5-h3': 'Slow-Time / Fast-Time Matrix Formation',
        'blk5-what-p': 'Reorganizes the long 1D signal into a 2D matrix (table). Rows = range bins, Columns = pulse numbers. This makes it easy to process range and Doppler separately.',
        'blk5-eq-h': '📐 Key Concept',
        'blk5-eq1': '<strong>Fast-Time (down):</strong> Each row is a range bin (like 0m, 7.5m, 15m, ...)',
        'blk5-eq2': '<strong>Slow-Time (across):</strong> Each column is a pulse number (1, 2, 3, ..., 128)',
        'blk5-eq3': '<strong>Matrix Size:</strong> 712 rows × 128 columns',
        'blk5-why-p': 'Think of it like a spreadsheet: look down a column to see one pulse at all ranges, or look across a row to see one range across all pulses. This makes it easy to process range (down columns) and Doppler (across rows) separately.',

        'blk6-h3': 'Matched Filter (Pulse Compression)',
        'blk6-what-p': 'This is the magic step! Compresses the long 25.6 μs chirp into a sharp peak. Like squeezing a sponge - the energy concentrates into a narrow pulse, making it easy to see where the target is.',
        'blk6-eq1': '<strong>Filter:</strong> $h(t) = s^*(-t)$ (time-reversed conjugate of transmitted pulse)',
        'blk6-eq2': '<strong>Operation:</strong> Convolution (cross-correlation) with each received pulse',
        'blk6-eq3': '<strong>Gain:</strong> Processing gain = 24.1 dB (SNR improves from 20 dB to 44 dB!)',
        'blk6-why-p': '<strong>Key benefit:</strong> Turns a long pulse (bad resolution) into a short peak (good resolution). The 5 MHz bandwidth gives us 30m range resolution. Also adds 24 dB processing gain - makes the target much easier to detect in noise!',

        'blk7-h3': 'Range Estimation',
        'blk7-what-p': "Finds which range bin has the strongest signal. That's where the target is! Then converts the bin number to actual distance in meters.",
        'blk7-eq1': '<strong>Range Formula:</strong> $R = n \\cdot \\frac{c}{2f_s}$ where $n$ is bin number',
        'blk7-eq2': '<strong>Bin Spacing:</strong> Each bin = 7.5 m',
        'blk7-eq3': '<strong>Method:</strong> Sum across all 128 pulses, find the peak',
        'blk7-why-p': 'This gives us the final range answer! For our target at 500m, we find the peak around bin 67. Summing across all 128 pulses adds another 21 dB of SNR improvement (on top of the 24 dB from matched filter).',

        'blk8-h3': 'Doppler Processing (Slow-Time FFT)',
        'blk8-what-p': 'Now we know the range, extract that range bin and look at how it changes across the 128 pulses. FFT converts this into frequency domain to find the Doppler shift.',
        'blk8-eq1': '<strong>Doppler FFT:</strong> 1024-point FFT across 128 pulses',
        'blk8-eq2': '<strong>Velocity from Doppler:</strong> $v = \\frac{f_d \\lambda}{2}$',
        'blk8-eq3': '<strong>Frequency Resolution:</strong> 27.4 Hz per bin',
        'blk8-why-p': 'The FFT finds the Doppler frequency (3200 Hz), which we convert to velocity (200 m/s) using $v = f_d\\lambda/2$. Detrend removes stationary clutter, Hamming reduces sidelobes. The peak in the spectrum tells us how fast the target is moving!',

        'blk9-h3': 'Quadratic Peak Interpolation',
        'blk9-what-p': 'FFT bins are discrete, but the true peak might be between bins. This uses the peak and its neighbors to estimate the exact frequency with sub-bin accuracy. Like refining your measurement!',
        'blk9-eq1': '<strong>Parabolic Fit:</strong> $\\delta = \\frac{0.5(\\alpha - \\gamma)}{\\alpha - 2\\beta + \\gamma}$ (fits parabola through 3 points)',
        'blk9-eq2': '<strong>Refined Frequency:</strong> $\\hat{f}_d = f[k] + \\delta \\cdot \\Delta f$',
        'blk9-eq3': '<strong>Accuracy:</strong> Improves from ±0.11 m/s to ±0.01 m/s',
        'blk9-why-p': "Without interpolation, we're limited to bin spacing accuracy. With it, we get 10x better precision! This is important for accurate velocity measurement, especially for slow-moving targets.",

        'blk10-h3': '2D Range-Doppler Map Generation',
        'blk10-what-p': 'Creates the final 2D image showing ALL targets at ALL ranges and ALL velocities simultaneously. This is the complete radar picture!',
        'blk10-eq1': '<strong>2D Processing:</strong> FFT along slow-time (Doppler) for each range bin',
        'blk10-eq2': '<strong>Output Size:</strong> 712 range bins × 1024 Doppler bins',
        'blk10-eq3': '<strong>Display:</strong> $P_{\\text{dB}} = 20\\log_{10}(|S|)$ (convert to dB for visualization)',
        'blk10-why-p': '<strong>This is the final output!</strong> A 2D image where the X-axis is range (0-5000m) and Y-axis is velocity (-1750 to +1750 m/s). Our target appears as a bright spot at (500m, 200 m/s). In a real radar, multiple targets would show up as multiple bright spots.',

        // Results
        'res-title': 'Results & Diagnostics',
        'res-desc': 'Simulation outputs with technical captions explaining the underlying physics.',
        'res-summary-title': 'Estimation Performance Summary',
        'res-range-h4': 'Range Estimation',
        'res-range-l1': 'True Range:',
        'res-range-l2': 'Estimated Range:',
        'res-range-l3': 'Error:',
        'res-range-phys': '<strong>Physics:</strong> Range resolution $\\Delta R = \\frac{c}{2B} = 30$ m (theoretical). Matched filter compresses the 25.6 μs chirp into a narrow peak, achieving the expected resolution.',
        'res-vel-h4': 'Velocity Estimation',
        'res-vel-l1': 'True Velocity:',
        'res-vel-l2': 'Estimated Velocity:',
        'res-vel-l3': 'Error:',
        'res-vel-phys': '<strong>Physics:</strong> Doppler resolution $\\Delta v = \\frac{\\lambda}{2M \\cdot \\text{PRI}} = 0.22$ m/s. Quadratic interpolation refines this to ~0.01 m/s accuracy.',
        'rdmap-title': 'Range-Doppler Map Output',
        'rdmap-cap-h4': 'Range-Doppler Map (ACADEMIC VERSION)',
        'rdmap-cap-p1': '<strong>Description:</strong> 2D intensity plot showing simultaneous range and velocity localization. The bright peak at (500 m, 200 m/s) represents the target detection.',
        'rdmap-cap-p2': '<strong>Physics Interpretation:</strong> The compressed pulse width in range (~2 bins ≈ 15 m) matches the theoretical $\\Delta R = c/(2B)$ resolution. Background noise floor is approximately -40 dB relative to peak, indicating excellent SNR after processing (24 dB matched filter gain + 21 dB coherent integration = 45 dB total gain).',
        'metrics-title': 'System Performance Metrics',
        'met-th1': 'Metric',
        'met-th2': 'Theoretical Value',
        'met-th3': 'Achieved Value',
        'met-th4': 'Status',

        // Code
        'code-title': 'Complete MATLAB Implementation',
        'code-desc': 'Full source code for the Pulse-Doppler LFM Radar system. Copy this entire code to run the simulation.',
        'code-how-h': '📝 How to Run This Code',
        'code-how-li1': 'Copy the entire code above',
        'code-how-li2': 'Paste into MATLAB editor',
        'code-how-li3': 'Press F5 or click "Run"',
        'code-how-li4': 'Check the Command Window for results',
        'code-how-li5': 'View the Range-Doppler map figure',
        'code-see-h': '🔍 What You Should See',
        'code-see-li1': '<strong>Console Output:</strong> Estimated Range ≈ 500 m, Estimated Velocity ≈ 200 m/s',
        'code-see-li2': '<strong>Figure:</strong> Bright peak at coordinates (500 m, 200 m/s) on the Range-Doppler map',
        'code-see-li3': '<strong>Color Scale:</strong> -40 dB to 0 dB (normalized power)',

        // Export
        'export-title': '📄 Export to PDF',
        'export-desc': 'Download this entire technical showcase as a high-quality PDF. All equations, tables, and diagrams will be preserved. Make sure to enable <strong>"Background Graphics"</strong> in the print dialog for best results.',
        'export-tip1': '✅ Use <strong>Google Chrome</strong> for best PDF quality',
        'export-tip2': '✅ Set <strong>Layout: Portrait</strong>, Margins: Default',
        'export-tip3': '✅ Enable <strong>Background graphics</strong>',
        'export-tip4': '✅ Sidebar will be automatically hidden in PDF',
        'export-btn-text': 'Export to PDF',
    },

    ar: {
        // Sidebar
        'nav-logo': 'نظام الرادار',
        'nav-overview': 'نظرة عامة',
        'nav-parameters': 'معاملات النظام',
        'nav-validation': 'التحقق من المعادلات',
        'nav-diagram': 'مخطط النظام',
        'nav-blocks': 'شرح البلوكات',
        'nav-results': 'النتائج',
        'nav-code': 'الكود الكامل',
        'nav-export': '⬇ تصدير PDF',

        // Hero
        'hero-title': 'نظام رادار نبضي دوبلري بتردد خطي (LFM)',
        'hero-subtitle': 'التحقق التقني والعرض الأكاديمي',
        'obj-title': 'هدف المشروع',
        'obj-p1': 'يُوضّح هذا المشروع <strong>نظام رادار LFM نبضي دوبلري</strong> قادر على قياس <strong>المسافة</strong> (المدى) و<strong>السرعة</strong> في آنٍ واحد. الفكرة ببساطة:',
        'obj-li1': '<strong>إشارة LFM (Chirp):</strong> نُرسل إشارة يتغير ترددها مع الوقت (مثل صفارة سيارة الإسعاف)',
        'obj-li2': '<strong>الفلتر المطابق:</strong> نضغط الإشارة المستقبَلة لمعرفة وقت عودتها بدقة (يحدد المدى)',
        'obj-li3': '<strong>معالجة دوبلر:</strong> نحلل تغير التردد الناتج عن الحركة (يحدد السرعة)',
        'obj-li4': '<strong>الخريطة ثنائية الأبعاد:</strong> ندمج المعلومتين لرؤية جميع الأهداف بمداها وسرعتها دفعةً واحدة',
        'feat1': 'شكل موجة Chirp الخطي',
        'feat2': 'معالجة الفلتر المطابق',
        'feat3': 'خريطة المدى-دوبلر',
        'feat4': 'الاستيفاء التربيعي',

        // Parameters
        'params-title': 'معاملات النظام',
        'params-th1': 'المعامل',
        'params-th2': 'الرمز',
        'params-th3': 'القيمة',
        'params-th4': 'الوحدة',
        'param-c': 'سرعة الضوء',
        'param-fc': 'التردد الحامل',
        'param-fs': 'تردد الأخذ',
        'param-B': 'عرض النطاق',
        'param-Np': 'طول النبضة',
        'param-M': 'عدد النبضات',
        'param-Ng': 'الفجوة بين النبضات',
        'param-R0': 'مدى الهدف',
        'param-v0': 'سرعة الهدف',
        'param-noise': 'قدرة الضوضاء',

        // Validation
        'val-title': 'التحقق من المعادلات: الكود مقابل النظرية',
        'val-desc': 'التحقق من توافق تطبيق MATLAB مع المعادلات النظرية من كتاب Mahafza.',
        'val-th1': 'رقم المعادلة',
        'val-th2': 'المعامل',
        'val-th3': 'المعادلة المرجعية (النظرية)',
        'val-th4': 'التطبيق في الكود',
        'val-th5': 'تطابق؟',
        'val-th6': 'مرجع',
        'val-p1': 'تأخير الانتشار',
        'val-p2': 'تردد دوبلر',
        'val-p3': 'إشارة LFM',
        'val-p4': 'نموذج الضوضاء',
        'val-p5': 'الفلتر المطابق',
        'val-p6': 'تقدير المدى',
        'val-p7': 'تقدير السرعة',
        'val-p8': 'سرعة الضوء',
        'val-p9': 'الطول الموجي',
        'val-p10': 'مدة النبضة',
        'val-p11': 'معدل التغيير التردد',
        'val-p12': 'الإشارة المستقبَلة',
        'val-p13': 'الالتواء',
        'val-p14': 'PRI و PRF',
        'val-p15': 'FFT دوبلر',
        'val-p16': 'الاستيفاء',
        'val-p17': 'خريطة المدى-دوبلر',
        'val-p18': 'القدرة (ديسيبل)',
        'ref-title': 'المراجع',

        // Diagram
        'diag-title': 'نظرة عامة على مخطط بلوكات النظام',
        'diag-desc': 'هذا هو التدفق الكامل للإشارة من الإرسال حتى الكشف النهائي. كل بلوك يعالج الإشارة خطوة بخطوة.',
        'flow-b1-title': 'توليد إشارة LFM',
        'flow-b1-sum': 'إنشاء إشارة Chirp: التردد يُجارح من 0 إلى 5 ميغاهرتز',
        'flow-b2-title': 'تكوين قطار النبضات',
        'flow-b2-sum': 'تكرار الـ Chirp 128 مرة مع فجوات بين النبضات',
        'flow-b3-title': 'القناة (التأخير + دوبلر)',
        'flow-b3-sum': 'الإشارة تسافر للهدف وترجع: تتأخر (المدى) ويتغير ترددها (السرعة)',
        'flow-b4-title': 'إضافة ضوضاء',
        'flow-b4-sum': 'إضافة ضوضاء واقعية لمحاكاة الظروف الحقيقية',
        'flow-b5-title': 'إعادة تشكيل المصفوفة',
        'flow-b5-sum': 'ترتيب في مصفوفة ثنائية الأبعاد: صفوف = خلايا المدى، أعمدة = أرقام النبضات',
        'flow-b6-title': 'الفلتر المطابق',
        'flow-b6-sum': 'ضغط الـ Chirp الطويل لقمة حادة ← يحسّن دقة المدى',
        'flow-b7-title': 'تقدير المدى',
        'flow-b7-sum': 'إيجاد موضع القمة ← تحويله لمسافة بالمتر',
        'flow-b8-title': 'معالجة دوبلر',
        'flow-b8-sum': 'FFT على الزمن البطيء (عبر النبضات) ← إيجاد إزاحة التردد',
        'flow-b9-title': 'استيفاء القمة',
        'flow-b9-sum': 'تدقيق تقدير دوبلر باستخدام الخلايا المجاورة ← دقة أعلى',
        'flow-b10-title': 'خريطة المدى-دوبلر',
        'flow-b10-sum': 'صورة ثنائية الأبعاد تُظهر جميع الأهداف بمداها وسرعتها',
        'takeaway-title': '🔑 الاستنتاج الرئيسي',
        'takeaway-p1': '<strong>النظام يعمل في بُعدين:</strong>',
        'takeaway-li1': '<strong>المدى (المسافة):</strong> يُقاس بحساب الوقت الذي تستغرقه الإشارة للعودة (البلوكات 6-7)',
        'takeaway-li2': '<strong>السرعة:</strong> تُقاس بالكشف عن تغيرات التردد الناتجة عن الحركة (البلوكات 8-9)',
        'takeaway-p2': 'بدمج الاثنين، نحصل على صورة كاملة تُظهر أين توجد الأهداف وما سرعتها!',

        // Block Explanations
        'blk-title': 'شرح تفصيلي للبلوكات',
        'blk-desc': 'إليك ما يحدث في كل مرحلة من مراحل المعالجة. استخدم هذه الشروحات في عرضك التقديمي.',
        'blk1-h3': 'توليد إشارة LFM',
        'blk1-what-h': '🔍 ما الذي يفعله',
        'blk1-what-p': 'ينشئ إشارة Chirp تُجارح من تردد منخفض إلى تردد عالٍ مع الوقت. تخيّلها كصافرة تنتقل من نبرة منخفضة لعالية بسلاسة.',
        'blk1-eq-h': '📐 المعادلات الأساسية',
        'blk1-eq1': '<strong>مدة النبضة:</strong> $T = \\frac{N}{f_s} = 25.6$ μs',
        'blk1-eq2': '<strong>معدل التغيير التردد:</strong> $k = \\frac{B}{T} = 1.95 \\times 10^{11}$ Hz/s',
        'blk1-eq3': '<strong>الإشارة:</strong> $s(t) = e^{j\\pi kt^2}$ (الطور يزداد مع مربع الزمن)',
        'blk1-why-h': '💡 لماذا هو مهم',
        'blk1-why-p': 'يمكن لاحقاً ضغط الـ Chirp بواسطة الفلتر المطابق، محوّلاً نبضة 25.6 μs الطويلة إلى قمة حادة. هذا يمنحنا دقة مدى جيدة (30 م) مع الحفاظ على طاقة كافية للكشف.',
        'blk1-trace-h': '📊 قيم تتبع الكود',
        'blk1-trace1': '<strong>المدخل:</strong> لا شيء (التوليد من المعاملات)',
        'blk1-trace2': '<strong>المعاملات المستخدمة:</strong> pulse_len = 512، fs = 20×10⁶ Hz، B = 5×10⁶ Hz',
        'blk1-trace3': '<strong>المحسوب:</strong> T = 25.6 μs، k = 1.953×10¹¹ Hz/s',
        'blk1-trace4': '<strong>المخرج:</strong> <code>pulse</code> ∈ ℂ⁵¹² (512 عينة مركبة)',

        'blk2-h3': 'تكوين قطار النبضات',
        'blk2-what-p': 'يأخذ نبضة الـ Chirp الواحدة ويكررها 128 مرة مع فجوات بينها. مثل إرسال 128 "نبضة رادار" متتالية.',
        'blk2-eq1': '<strong>PRI (فترة تكرار النبضة):</strong> الوقت بين النبضات = 35.6 μs',
        'blk2-eq2': '<strong>PRF (تردد تكرار النبضة):</strong> $\\text{PRF} = \\frac{1}{\\text{PRI}} = 28.09$ kHz',
        'blk2-why-p': 'النبضات المتعددة تتيح قياس السرعة باستخدام تأثير دوبلر. كل نبضة تأخذ عينة من الهدف في وقت مختلف، ونرى كيف يتغير الطور من نبضة لأخرى. كلما زاد عدد النبضات، زادت دقة السرعة.',
        'blk2-trace1': '<strong>المدخل:</strong> نبضة واحدة <code>pulse</code> ∈ ℂ⁵¹²',
        'blk2-trace2': '<strong>المعاملات:</strong> num_pulses = 128، pulse_gap = 200 عينة',
        'blk2-trace3': '<strong>المحسوب:</strong> pulse_total_len = 712 عينة (512 + 200)',
        'blk2-trace4': '<strong>المخرج:</strong> <code>tx</code> ∈ ℂ⁹¹\'¹³⁶ (128×712 = 91,136 عينة)',

        'blk3-h3': 'انتشار القناة وإزاحة دوبلر',
        'blk3-what-p': 'يحاكي ما يحدث عند سفر الإشارة للهدف والعودة. شيئان يحدثان: (1) الإشارة تتأخر (يُحدد المدى)، (2) يتغير التردد (يُحدد السرعة).',
        'blk3-eq1': '<strong>زمن التأخير:</strong> $\\tau = \\frac{2R}{c} = 3.33$ μs (الإشارة تقطع 500م ذهاباً وإياباً)',
        'blk3-eq2': '<strong>إزاحة دوبلر:</strong> $f_d = \\frac{2v}{\\lambda} = 3200$ Hz (الهدف المتحرك يغير التردد)',
        'blk3-eq3': '<strong>الإشارة المستقبَلة:</strong> نسخة متأخرة مع إزاحة تردد مطبقة',
        'blk3-why-p': 'هذه هي فيزياء الرادار! التأخير يخبرنا <strong>كم المسافة</strong> (500م → 3.33 μs)، ودوبلر يخبرنا <strong>كم السرعة</strong> (200 م/ث → 3200 Hz).',
        'blk3-trace1': '<strong>المدخل:</strong> <code>tx</code> ∈ ℂ⁹¹\'¹³⁶',
        'blk3-trace2': '<strong>المحسوب:</strong> tau = 3.33 μs، delay_samples = 67، fd = 3200 Hz',
        'blk3-trace3': '<strong>المخرج:</strong> <code>rx</code> ∈ ℂ⁹¹\'²⁰³ (91,136 + 67 = 91,203 عينة، مع تضمين دوبلر)',

        'blk4-h3': 'الضوضاء البيضاء الغاوسية المضافة (AWGN)',
        'blk4-what-p': 'تُضاف ضوضاء عشوائية للإشارة لجعلها واقعية. الرادار الحقيقي دائماً يحتوي على ضوضاء من الإلكترونيات والغلاف الجوي.',
        'blk4-eq1': '<strong>نموذج الضوضاء:</strong> $n(t) \\sim \\mathcal{CN}(0, \\sigma^2)$ (ضوضاء غاوسية مركبة)',
        'blk4-eq2': '<strong>قدرة الضوضاء:</strong> $\\sigma^2 = 0.01$ → نسبة إشارة/ضوضاء ≈ 20 ديسيبل قبل المعالجة',
        'blk4-why-p': 'الاختبار مع الضوضاء يُثبت أن النظام يعمل في ظروف واقعية. الفلتر المطابق سيحسّن النسبة من 20 ديسيبل إلى ~44 ديسيبل (ربح 24 ديسيبل).',

        'blk5-h3': 'تكوين مصفوفة الزمن البطيء/الزمن السريع',
        'blk5-what-p': 'يعيد تنظيم الإشارة أحادية الأبعاد الطويلة في مصفوفة ثنائية الأبعاد. الصفوف = خلايا المدى، الأعمدة = أرقام النبضات.',
        'blk5-eq-h': '📐 المفهوم الأساسي',
        'blk5-eq1': '<strong>الزمن السريع (رأسياً):</strong> كل صف هو خلية مدى (مثل 0م، 7.5م، 15م، ...)',
        'blk5-eq2': '<strong>الزمن البطيء (أفقياً):</strong> كل عمود هو رقم نبضة (1، 2، 3، ...، 128)',
        'blk5-eq3': '<strong>حجم المصفوفة:</strong> 712 صفاً × 128 عموداً',
        'blk5-why-p': 'فكّر فيها كجدول بيانات: انظر عمودياً لترى نبضة واحدة على جميع المدى، أو أفقياً لترى مدى واحد عبر جميع النبضات.',

        'blk6-h3': 'الفلتر المطابق (ضغط النبضة)',
        'blk6-what-p': 'هذه هي الخطوة السحرية! يضغط الـ Chirp الطويل 25.6 μs في قمة حادة. مثل عصر إسفنجة - الطاقة تتركز في نبضة ضيقة.',
        'blk6-eq1': '<strong>الفلتر:</strong> $h(t) = s^*(-t)$ (المرافق المعكوس زمنياً للنبضة المُرسَلة)',
        'blk6-eq2': '<strong>العملية:</strong> الالتواء (الارتباط التقاطعي) مع كل نبضة مستقبَلة',
        'blk6-eq3': '<strong>الربح:</strong> ربح المعالجة = 24.1 ديسيبل (نسبة إشارة/ضوضاء ترتفع من 20 إلى 44 ديسيبل!)',
        'blk6-why-p': '<strong>الفائدة الرئيسية:</strong> يحوّل نبضة طويلة (دقة رديئة) لقمة حادة (دقة جيدة). عرض النطاق 5 ميغاهرتز يعطينا دقة مدى 30م. كما يُضيف ربح معالجة 24 ديسيبل!',

        'blk7-h3': 'تقدير المدى',
        'blk7-what-p': 'يجد خلية المدى التي تحتوي على أقوى إشارة. هذا هو موقع الهدف! ثم يحوّل رقم الخلية لمسافة فعلية بالمتر.',
        'blk7-eq1': '<strong>معادلة المدى:</strong> $R = n \\cdot \\frac{c}{2f_s}$ حيث $n$ هو رقم الخلية',
        'blk7-eq2': '<strong>تباعد الخلايا:</strong> كل خلية = 7.5 م',
        'blk7-eq3': '<strong>الطريقة:</strong> الجمع عبر 128 نبضة، إيجاد القمة',
        'blk7-why-p': 'هذا يعطينا الإجابة النهائية للمدى! لهدفنا على 500م، نجد القمة عند الخلية 67 تقريباً.',

        'blk8-h3': 'معالجة دوبلر (FFT الزمن البطيء)',
        'blk8-what-p': 'بعد معرفة المدى، نستخرج خلية المدى تلك وننظر كيف تتغير عبر 128 نبضة. الـ FFT يحوّل هذا لمجال التردد لإيجاد إزاحة دوبلر.',
        'blk8-eq1': '<strong>FFT دوبلر:</strong> 1024-نقطة FFT عبر 128 نبضة',
        'blk8-eq2': '<strong>السرعة من دوبلر:</strong> $v = \\frac{f_d \\lambda}{2}$',
        'blk8-eq3': '<strong>دقة التردد:</strong> 27.4 Hz لكل خلية',
        'blk8-why-p': 'الـ FFT يجد تردد دوبلر (3200 Hz)، الذي نحوّله لسرعة (200 م/ث) باستخدام $v = f_d\\lambda/2$.',

        'blk9-h3': 'الاستيفاء التربيعي للقمة',
        'blk9-what-p': 'خلايا الـ FFT متقطعة، لكن القمة الحقيقية قد تكون بين خليتين. يستخدم هذا القمة وجيرانها لتقدير التردد الدقيق بدقة أعلى من الخلية.',
        'blk9-eq1': '<strong>الملاءمة المكافئية:</strong> $\\delta = \\frac{0.5(\\alpha - \\gamma)}{\\alpha - 2\\beta + \\gamma}$ (تلائم قطعاً مكافئاً عبر 3 نقاط)',
        'blk9-eq2': '<strong>التردد المُحسَّن:</strong> $\\hat{f}_d = f[k] + \\delta \\cdot \\Delta f$',
        'blk9-eq3': '<strong>الدقة:</strong> تتحسن من ±0.11 م/ث إلى ±0.01 م/ث',
        'blk9-why-p': 'بدون الاستيفاء، نحن محدودون بدقة تباعد الخلايا. بالاستيفاء، نحصل على دقة أعلى بـ 10 مرات!',

        'blk10-h3': 'توليد خريطة المدى-دوبلر ثنائية الأبعاد',
        'blk10-what-p': 'ينشئ الصورة النهائية ثنائية الأبعاد التي تُظهر جميع الأهداف على جميع المدى والسرعات في آنٍ واحد. هذه هي الصورة الرادارية الكاملة!',
        'blk10-eq1': '<strong>المعالجة ثنائية الأبعاد:</strong> FFT على الزمن البطيء (دوبلر) لكل خلية مدى',
        'blk10-eq2': '<strong>حجم المخرج:</strong> 712 خلية مدى × 1024 خلية دوبلر',
        'blk10-eq3': '<strong>العرض:</strong> $P_{\\text{dB}} = 20\\log_{10}(|S|)$ (تحويل لديسيبل للتصور)',
        'blk10-why-p': '<strong>هذا هو المخرج النهائي!</strong> صورة ثنائية الأبعاد، المحور السيني = المدى (0-5000م)، المحور الصادي = السرعة (-1750 إلى +1750 م/ث). يظهر هدفنا كنقطة مضيئة عند (500م، 200 م/ث).',

        // Results
        'res-title': 'النتائج والتشخيص',
        'res-desc': 'مخرجات المحاكاة مع تفسيرات فيزيائية للظواهر الأساسية.',
        'res-summary-title': 'ملخص أداء التقدير',
        'res-range-h4': 'تقدير المدى',
        'res-range-l1': 'المدى الحقيقي:',
        'res-range-l2': 'المدى المُقدَّر:',
        'res-range-l3': 'الخطأ:',
        'res-range-phys': '<strong>الفيزياء:</strong> دقة المدى $\\Delta R = \\frac{c}{2B} = 30$ م (نظرياً). الفلتر المطابق يضغط نبضة 25.6 μs في قمة ضيقة.',
        'res-vel-h4': 'تقدير السرعة',
        'res-vel-l1': 'السرعة الحقيقية:',
        'res-vel-l2': 'السرعة المُقدَّرة:',
        'res-vel-l3': 'الخطأ:',
        'res-vel-phys': '<strong>الفيزياء:</strong> دقة دوبلر $\\Delta v = \\frac{\\lambda}{2M \\cdot \\text{PRI}} = 0.22$ م/ث. الاستيفاء التربيعي يُحسّنها إلى ~0.01 م/ث.',
        'rdmap-title': 'مخرج خريطة المدى-دوبلر',
        'rdmap-cap-h4': 'خريطة المدى-دوبلر (النسخة الأكاديمية)',
        'rdmap-cap-p1': '<strong>الوصف:</strong> مخطط كثافة ثنائي الأبعاد يُظهر تحديد المدى والسرعة في آنٍ واحد. القمة المضيئة عند (500 م، 200 م/ث) تمثل اكتشاف الهدف.',
        'rdmap-cap-p2': '<strong>التفسير الفيزيائي:</strong> عرض النبضة المضغوطة (~2 خلايا ≈ 15 م) يتوافق مع دقة $\\Delta R = c/(2B)$ النظرية. مستوى الضوضاء الخلفية ≈ -40 ديسيبل نسبةً للقمة.',
        'metrics-title': 'مقاييس أداء النظام',
        'met-th1': 'المقياس',
        'met-th2': 'القيمة النظرية',
        'met-th3': 'القيمة المحققة',
        'met-th4': 'الحالة',

        // Code
        'code-title': 'الكود الكامل بـ MATLAB',
        'code-desc': 'الكود المصدري الكامل لنظام رادار LFM النبضي الدوبلري. انسخ الكود بالكامل لتشغيل المحاكاة.',
        'code-how-h': '📝 طريقة تشغيل الكود',
        'code-how-li1': 'انسخ الكود بالكامل من الأعلى',
        'code-how-li2': 'الصقه في محرر MATLAB',
        'code-how-li3': 'اضغط F5 أو انقر "Run"',
        'code-how-li4': 'تحقق من Command Window للنتائج',
        'code-how-li5': 'اعرض شكل خريطة المدى-دوبلر',
        'code-see-h': '🔍 ما الذي ستراه',
        'code-see-li1': '<strong>مخرج وحدة التحكم:</strong> المدى المُقدَّر ≈ 500 م، السرعة المُقدَّرة ≈ 200 م/ث',
        'code-see-li2': '<strong>الشكل:</strong> قمة مضيئة عند إحداثيات (500 م، 200 م/ث) على خريطة المدى-دوبلر',
        'code-see-li3': '<strong>مقياس الألوان:</strong> من -40 ديسيبل إلى 0 ديسيبل (قدرة مُطبَّعة)',

        // Export
        'export-title': '📄 تصدير إلى PDF',
        'export-desc': 'حمّل هذا العرض التقني الكامل كملف PDF عالي الجودة. ستُحفظ جميع المعادلات والجداول والمخططات. تأكد من تفعيل <strong>"خلفية الرسومات"</strong> في حوار الطباعة للحصول على أفضل نتيجة.',
        'export-tip1': '✅ استخدم <strong>Google Chrome</strong> لأفضل جودة PDF',
        'export-tip2': '✅ اضبط <strong>الاتجاه: عمودي</strong>، الهوامش: افتراضي',
        'export-tip3': '✅ فعّل <strong>خلفية الرسومات</strong>',
        'export-tip4': '✅ سيُخفى الشريط الجانبي تلقائياً في PDF',
        'export-btn-text': 'تصدير PDF',
    }
};

// Map data-i18n keys to DOM elements
const i18nMap = [
    // Sidebar
    { key: 'nav-logo', sel: '.sidebar .logo h3' },
    { key: 'nav-overview', sel: '.nav-link[href="#hero"]' },
    { key: 'nav-parameters', sel: '.nav-link[href="#parameters"]' },
    { key: 'nav-validation', sel: '.nav-link[href="#validation"]' },
    { key: 'nav-diagram', sel: '.nav-link[href="#diagram-overview"]' },
    { key: 'nav-blocks', sel: '.nav-link[href="#block-explanation"]' },
    { key: 'nav-results', sel: '.nav-link[href="#results"]' },
    { key: 'nav-code', sel: '.nav-link[href="#code"]' },
    { key: 'nav-export', sel: '.nav-link[href="#export"]' },

    // Hero
    { key: 'hero-title', sel: '.main-title', html: false },
    { key: 'hero-subtitle', sel: '.subtitle', html: false },
    { key: 'obj-title', sel: '.objective-box h2', html: false },
    { key: 'obj-p1', sel: '.objective-box > p', html: true },
    { key: 'obj-li1', sel: '.simple-list li:nth-child(1)', html: true },
    { key: 'obj-li2', sel: '.simple-list li:nth-child(2)', html: true },
    { key: 'obj-li3', sel: '.simple-list li:nth-child(3)', html: true },
    { key: 'obj-li4', sel: '.simple-list li:nth-child(4)', html: true },
    { key: 'feat1', sel: '.key-features .feature:nth-child(1) span:last-child', html: false },
    { key: 'feat2', sel: '.key-features .feature:nth-child(2) span:last-child', html: false },
    { key: 'feat3', sel: '.key-features .feature:nth-child(3) span:last-child', html: false },
    { key: 'feat4', sel: '.key-features .feature:nth-child(4) span:last-child', html: false },

    // Parameters
    { key: 'params-title', sel: '#parameters .section-title', html: false },
    { key: 'params-th1', sel: '#parameters .params-table thead th:nth-child(1)', html: false },
    { key: 'params-th2', sel: '#parameters .params-table thead th:nth-child(2)', html: false },
    { key: 'params-th3', sel: '#parameters .params-table thead th:nth-child(3)', html: false },
    { key: 'params-th4', sel: '#parameters .params-table thead th:nth-child(4)', html: false },
    { key: 'param-c', sel: '#parameters .params-table tbody tr:nth-child(1) td:nth-child(1)', html: false },
    { key: 'param-fc', sel: '#parameters .params-table tbody tr:nth-child(2) td:nth-child(1)', html: false },
    { key: 'param-fs', sel: '#parameters .params-table tbody tr:nth-child(3) td:nth-child(1)', html: false },
    { key: 'param-B', sel: '#parameters .params-table tbody tr:nth-child(4) td:nth-child(1)', html: false },
    { key: 'param-Np', sel: '#parameters .params-table tbody tr:nth-child(5) td:nth-child(1)', html: false },
    { key: 'param-M', sel: '#parameters .params-table tbody tr:nth-child(6) td:nth-child(1)', html: false },
    { key: 'param-Ng', sel: '#parameters .params-table tbody tr:nth-child(7) td:nth-child(1)', html: false },
    { key: 'param-R0', sel: '#parameters .params-table tbody tr:nth-child(8) td:nth-child(1)', html: false },
    { key: 'param-v0', sel: '#parameters .params-table tbody tr:nth-child(9) td:nth-child(1)', html: false },
    { key: 'param-noise', sel: '#parameters .params-table tbody tr:nth-child(10) td:nth-child(1)', html: false },

    // Validation
    { key: 'val-title', sel: '#validation .section-title', html: false },
    { key: 'val-desc', sel: '#validation .section-desc', html: false },
    { key: 'val-th1', sel: '#validation .validation-table thead th:nth-child(1)', html: false },
    { key: 'val-th2', sel: '#validation .validation-table thead th:nth-child(2)', html: false },
    { key: 'val-th3', sel: '#validation .validation-table thead th:nth-child(3)', html: false },
    { key: 'val-th4', sel: '#validation .validation-table thead th:nth-child(4)', html: false },
    { key: 'val-th5', sel: '#validation .validation-table thead th:nth-child(5)', html: false },
    { key: 'val-th6', sel: '#validation .validation-table thead th:nth-child(6)', html: false },
    { key: 'val-p1', sel: '#validation .validation-table tbody tr:nth-child(1) td:nth-child(2)', html: false },
    { key: 'val-p2', sel: '#validation .validation-table tbody tr:nth-child(2) td:nth-child(2)', html: false },
    { key: 'val-p3', sel: '#validation .validation-table tbody tr:nth-child(3) td:nth-child(2)', html: false },
    { key: 'val-p4', sel: '#validation .validation-table tbody tr:nth-child(4) td:nth-child(2)', html: false },
    { key: 'val-p5', sel: '#validation .validation-table tbody tr:nth-child(5) td:nth-child(2)', html: false },
    { key: 'val-p6', sel: '#validation .validation-table tbody tr:nth-child(6) td:nth-child(2)', html: false },
    { key: 'val-p7', sel: '#validation .validation-table tbody tr:nth-child(7) td:nth-child(2)', html: false },
    { key: 'val-p8', sel: '#validation .validation-table tbody tr:nth-child(8) td:nth-child(2)', html: false },
    { key: 'val-p9', sel: '#validation .validation-table tbody tr:nth-child(9) td:nth-child(2)', html: false },
    { key: 'val-p10', sel: '#validation .validation-table tbody tr:nth-child(10) td:nth-child(2)', html: false },
    { key: 'val-p11', sel: '#validation .validation-table tbody tr:nth-child(11) td:nth-child(2)', html: false },
    { key: 'val-p12', sel: '#validation .validation-table tbody tr:nth-child(12) td:nth-child(2)', html: false },
    { key: 'val-p13', sel: '#validation .validation-table tbody tr:nth-child(13) td:nth-child(2)', html: false },
    { key: 'val-p14', sel: '#validation .validation-table tbody tr:nth-child(14) td:nth-child(2)', html: false },
    { key: 'val-p15', sel: '#validation .validation-table tbody tr:nth-child(15) td:nth-child(2)', html: false },
    { key: 'val-p16', sel: '#validation .validation-table tbody tr:nth-child(16) td:nth-child(2)', html: false },
    { key: 'val-p17', sel: '#validation .validation-table tbody tr:nth-child(17) td:nth-child(2)', html: false },
    { key: 'val-p18', sel: '#validation .validation-table tbody tr:nth-child(18) td:nth-child(2)', html: false },
    { key: 'ref-title', sel: '.references-box h3', html: false },

    // Diagram
    { key: 'diag-title', sel: '#diagram-overview .section-title', html: false },
    { key: 'diag-desc', sel: '#diagram-overview .section-desc', html: false },
    { key: 'flow-b1-title', sel: '.flow-block:nth-child(1) .block-title', html: false },
    { key: 'flow-b1-sum', sel: '.flow-block:nth-child(1) .block-summary', html: false },
    { key: 'flow-b2-title', sel: '.flow-block:nth-child(3) .block-title', html: false },
    { key: 'flow-b2-sum', sel: '.flow-block:nth-child(3) .block-summary', html: false },
    { key: 'flow-b3-title', sel: '.flow-block:nth-child(5) .block-title', html: false },
    { key: 'flow-b3-sum', sel: '.flow-block:nth-child(5) .block-summary', html: false },
    { key: 'flow-b4-title', sel: '.flow-block:nth-child(7) .block-title', html: false },
    { key: 'flow-b4-sum', sel: '.flow-block:nth-child(7) .block-summary', html: false },
    { key: 'flow-b5-title', sel: '.flow-block:nth-child(9) .block-title', html: false },
    { key: 'flow-b5-sum', sel: '.flow-block:nth-child(9) .block-summary', html: false },
    { key: 'flow-b6-title', sel: '.flow-block:nth-child(11) .block-title', html: false },
    { key: 'flow-b6-sum', sel: '.flow-block:nth-child(11) .block-summary', html: false },
    { key: 'flow-b7-title', sel: '.flow-block:nth-child(13) .block-title', html: false },
    { key: 'flow-b7-sum', sel: '.flow-block:nth-child(13) .block-summary', html: false },
    { key: 'flow-b8-title', sel: '.flow-block:nth-child(15) .block-title', html: false },
    { key: 'flow-b8-sum', sel: '.flow-block:nth-child(15) .block-summary', html: false },
    { key: 'flow-b9-title', sel: '.flow-block:nth-child(17) .block-title', html: false },
    { key: 'flow-b9-sum', sel: '.flow-block:nth-child(17) .block-summary', html: false },
    { key: 'flow-b10-title', sel: '.flow-block:nth-child(19) .block-title', html: false },
    { key: 'flow-b10-sum', sel: '.flow-block:nth-child(19) .block-summary', html: false },
    { key: 'takeaway-title', sel: '.key-takeaway h3', html: false },
    { key: 'takeaway-p1', sel: '.key-takeaway p:nth-child(2)', html: true },
    { key: 'takeaway-li1', sel: '.key-takeaway li:nth-child(1)', html: true },
    { key: 'takeaway-li2', sel: '.key-takeaway li:nth-child(2)', html: true },
    { key: 'takeaway-p2', sel: '.key-takeaway p:nth-child(4)', html: false },

    // Block Explanations section title/desc
    { key: 'blk-title', sel: '#block-explanation .section-title', html: false },
    { key: 'blk-desc', sel: '#block-explanation .section-desc', html: false },

    // Results
    { key: 'res-title', sel: '#results .section-title', html: false },
    { key: 'res-desc', sel: '#results .section-desc', html: false },
    { key: 'res-summary-title', sel: '.results-summary h3', html: false },
    { key: 'res-range-h4', sel: '.result-card:nth-child(1) h4', html: false },
    { key: 'res-range-l1', sel: '.result-card:nth-child(1) .result-value:nth-child(2) .label', html: false },
    { key: 'res-range-l2', sel: '.result-card:nth-child(1) .result-value:nth-child(3) .label', html: false },
    { key: 'res-range-l3', sel: '.result-card:nth-child(1) .result-value:nth-child(4) .label', html: false },
    { key: 'res-range-phys', sel: '.result-card:nth-child(1) .physics-note', html: true },
    { key: 'res-vel-h4', sel: '.result-card:nth-child(2) h4', html: false },
    { key: 'res-vel-l1', sel: '.result-card:nth-child(2) .result-value:nth-child(2) .label', html: false },
    { key: 'res-vel-l2', sel: '.result-card:nth-child(2) .result-value:nth-child(3) .label', html: false },
    { key: 'res-vel-l3', sel: '.result-card:nth-child(2) .result-value:nth-child(4) .label', html: false },
    { key: 'res-vel-phys', sel: '.result-card:nth-child(2) .physics-note', html: true },
    { key: 'rdmap-title', sel: '.code-output-section h3', html: false },
    { key: 'rdmap-cap-h4', sel: '.figure-caption h4', html: false },
    { key: 'rdmap-cap-p1', sel: '.figure-caption p:nth-child(2)', html: true },
    { key: 'rdmap-cap-p2', sel: '.figure-caption p:nth-child(3)', html: true },
    { key: 'metrics-title', sel: '.metrics-section h3', html: false },
    { key: 'met-th1', sel: '.metrics-table thead th:nth-child(1)', html: false },
    { key: 'met-th2', sel: '.metrics-table thead th:nth-child(2)', html: false },
    { key: 'met-th3', sel: '.metrics-table thead th:nth-child(3)', html: false },
    { key: 'met-th4', sel: '.metrics-table thead th:nth-child(4)', html: false },

    // Code
    { key: 'code-title', sel: '#code .section-title', html: false },
    { key: 'code-desc', sel: '#code .section-desc', html: false },
    { key: 'code-how-h', sel: '.code-notes h3:nth-child(1)', html: false },
    { key: 'code-how-li1', sel: '.code-notes ol li:nth-child(1)', html: false },
    { key: 'code-how-li2', sel: '.code-notes ol li:nth-child(2)', html: false },
    { key: 'code-how-li3', sel: '.code-notes ol li:nth-child(3)', html: false },
    { key: 'code-how-li4', sel: '.code-notes ol li:nth-child(4)', html: false },
    { key: 'code-how-li5', sel: '.code-notes ol li:nth-child(5)', html: false },
    { key: 'code-see-h', sel: '.code-notes h3:nth-child(3)', html: false },
    { key: 'code-see-li1', sel: '.code-notes ul li:nth-child(1)', html: true },
    { key: 'code-see-li2', sel: '.code-notes ul li:nth-child(2)', html: true },
    { key: 'code-see-li3', sel: '.code-notes ul li:nth-child(3)', html: true },

    // Export
    { key: 'export-title', sel: '.export-title', html: false },
    { key: 'export-desc', sel: '.export-desc', html: true },
    { key: 'export-tip1', sel: '.export-tips li:nth-child(1)', html: true },
    { key: 'export-tip2', sel: '.export-tips li:nth-child(2)', html: true },
    { key: 'export-tip3', sel: '.export-tips li:nth-child(3)', html: true },
    { key: 'export-tip4', sel: '.export-tips li:nth-child(4)', html: true },
    { key: 'export-btn-text', sel: '.btn-text', html: false },
];

// Block cards: each tech-card has a predictable structure
const blockCards = [
    { n: 1, h3: 'blk1-h3', what: 'blk1-what-p', eqH: 'blk1-eq-h', eq: ['blk1-eq1', 'blk1-eq2', 'blk1-eq3'], whyH: 'blk1-why-h', why: 'blk1-why-p', traceH: 'blk1-trace-h', trace: ['blk1-trace1', 'blk1-trace2', 'blk1-trace3', 'blk1-trace4'] },
    { n: 2, h3: 'blk2-h3', what: 'blk2-what-p', eq: ['blk2-eq1', 'blk2-eq2'], why: 'blk2-why-p', trace: ['blk2-trace1', 'blk2-trace2', 'blk2-trace3', 'blk2-trace4'] },
    { n: 3, h3: 'blk3-h3', what: 'blk3-what-p', eq: ['blk3-eq1', 'blk3-eq2', 'blk3-eq3'], why: 'blk3-why-p', trace: ['blk3-trace1', 'blk3-trace2', 'blk3-trace3'] },
    { n: 4, h3: 'blk4-h3', what: 'blk4-what-p', eq: ['blk4-eq1', 'blk4-eq2'], why: 'blk4-why-p' },
    { n: 5, h3: 'blk5-h3', what: 'blk5-what-p', eqH: 'blk5-eq-h', eq: ['blk5-eq1', 'blk5-eq2', 'blk5-eq3'], why: 'blk5-why-p' },
    { n: 6, h3: 'blk6-h3', what: 'blk6-what-p', eq: ['blk6-eq1', 'blk6-eq2', 'blk6-eq3'], why: 'blk6-why-p' },
    { n: 7, h3: 'blk7-h3', what: 'blk7-what-p', eq: ['blk7-eq1', 'blk7-eq2', 'blk7-eq3'], why: 'blk7-why-p' },
    { n: 8, h3: 'blk8-h3', what: 'blk8-what-p', eq: ['blk8-eq1', 'blk8-eq2', 'blk8-eq3'], why: 'blk8-why-p' },
    { n: 9, h3: 'blk9-h3', what: 'blk9-what-p', eq: ['blk9-eq1', 'blk9-eq2', 'blk9-eq3'], why: 'blk9-why-p' },
    { n: 10, h3: 'blk10-h3', what: 'blk10-what-p', eq: ['blk10-eq1', 'blk10-eq2', 'blk10-eq3'], why: 'blk10-why-p' },
];

let currentLang = 'en';

function applyTranslation(lang) {
    const t = translations[lang];
    const isAr = lang === 'ar';

    // RTL support
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');

    // Apply mapped elements
    i18nMap.forEach(({ key, sel, html }) => {
        const els = document.querySelectorAll(sel);
        if (!els.length || !t[key]) return;
        els.forEach(el => {
            if (html) { el.innerHTML = t[key]; }
            else { el.textContent = t[key]; }
        });
    });

    // Apply block cards
    const cards = document.querySelectorAll('#block-explanation .tech-card');
    blockCards.forEach((blk, idx) => {
        const card = cards[idx];
        if (!card) return;

        // h3
        const h3 = card.querySelector('.card-header h3');
        if (h3 && t[blk.h3]) h3.textContent = t[blk.h3];

        // what-p
        const whatPs = card.querySelectorAll('.simple-explanation p');
        if (whatPs[0] && t[blk.what]) whatPs[0].innerHTML = t[blk.what];

        // eq h4 (custom for blocks with different heading key)
        if (blk.eqH) {
            const h4s = card.querySelectorAll('.simple-explanation h4');
            if (h4s[1] && t[blk.eqH]) h4s[1].textContent = t[blk.eqH];
        }

        // equation list items
        if (blk.eq) {
            const eqItems = card.querySelectorAll('.equation-list li');
            blk.eq.forEach((key, i) => {
                if (eqItems[i] && t[key]) eqItems[i].innerHTML = t[key];
            });
        }

        // why-h
        if (blk.whyH) {
            const h4s = card.querySelectorAll('.simple-explanation h4');
            const whyH4 = h4s[3] || h4s[2];
            if (whyH4 && t[blk.whyH]) whyH4.textContent = t[blk.whyH];
        }

        // why-p
        if (blk.why) {
            const ps = card.querySelectorAll('.simple-explanation p');
            const lastP = ps[ps.length - 1];
            if (lastP && t[blk.why]) lastP.innerHTML = t[blk.why];
        }

        // trace items
        if (blk.trace) {
            const tracePs = card.querySelectorAll('.trace-box p');
            blk.trace.forEach((key, i) => {
                if (tracePs[i] && t[key]) tracePs[i].innerHTML = t[key];
            });
        }
    });

    // Re-typeset MathJax for new Arabic content
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(err => console.error('MathJax re-typeset error:', err));
    }

    // Update toggle button label
    const btn = document.getElementById('langToggleBtn');
    if (btn) {
        btn.textContent = isAr ? '🌐 English' : '🌐 عربي';
        btn.setAttribute('aria-label', isAr ? 'Switch to English' : 'التبديل إلى العربية');
    }

    currentLang = lang;
}

function initializeLanguageToggle() {
    // Create the toggle button
    const btn = document.createElement('button');
    btn.id = 'langToggleBtn';
    btn.textContent = '🌐 عربي';
    btn.setAttribute('aria-label', 'التبديل إلى العربية');
    btn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 3000;
        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        color: white;
        border: none;
        padding: 0.65rem 1.2rem;
        font-size: 0.95rem;
        font-weight: 700;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0 4px 18px rgba(59,130,246,0.45);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        letter-spacing: 0.5px;
        font-family: 'Segoe UI', Tahoma, sans-serif;
    `;

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 8px 24px rgba(59,130,246,0.55)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 18px rgba(59,130,246,0.45)';
    });

    btn.addEventListener('click', () => {
        applyTranslation(currentLang === 'en' ? 'ar' : 'en');
    });

    document.body.appendChild(btn);
}


const ExportUtils = {
    // Generate clean filename for PDF export
    generatePDFFilename: function () {
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        return `Radar_Technical_Showcase_${dateStr}.pdf`;
    },

    // Optimize document for PDF before printing
    optimizeForPDF: function () {
        // Ensure all images are loaded
        const images = document.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve;
                }
            });
        });

        return Promise.all(promises);
    },

    // Print with optimization
    printOptimized: function () {
        this.optimizeForPDF().then(() => {
            window.print();
        });
    }
};

// Expose to global scope for manual triggering
window.ExportUtils = ExportUtils;

console.log('Radar Technical Showcase - JavaScript Initialized');
console.log('Use Ctrl+P (Cmd+P on Mac) to export to PDF');
console.log('Use window.ExportUtils.printOptimized() for optimized PDF export');
