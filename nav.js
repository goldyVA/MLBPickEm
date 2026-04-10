// nav.js — shared navigation for MLB Pick'em
// Include with: <script type="module" src="nav.js"></script>
// Requires a <nav id="mainNav"></nav> in the HTML

export function initNav({ activePage, isAdmin = false, userName = '' }) {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const pages = [
    { href: 'picks.html',     label: 'My Picks',  icon: '🎯' },
    { href: 'results.html',   label: 'Results',   icon: '📋' },
    { href: 'standings.html', label: 'Standings', icon: '🏆' },
    { href: 'survivor.html',  label: 'Survivor',  icon: '💀' },
    { href: 'profile.html',   label: 'Profile',   icon: '🔐' },
  ];

  if (isAdmin) {
    pages.push({ href: 'admin.html', label: 'Admin', icon: '⚙️' });
  }

  nav.innerHTML = `
    <div class="nav-inner">
<a href="index.html" class="nav-logo">⚾ Pick'em</a>

      <div class="nav-links" id="navLinks">
        ${pages.map(p => `
          <a href="${p.href}" class="nav-link${p.href === activePage ? ' active' : ''}">
            ${p.label}
          </a>
        `).join('')}
      </div>

      <div class="nav-right">
        <span class="nav-user" id="navUser">${userName}</span>
        <button class="btn-signout" id="signOutBtn">Sign out</button>
        <button class="hamburger" id="hamburgerBtn" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-drawer" id="mobileDrawer">
      <div class="drawer-header">
        <span class="drawer-title">⚾ Pick'em</span>
        <button class="drawer-close" id="drawerClose" aria-label="Close menu">✕</button>
      </div>
      ${userName ? `<div class="drawer-user">${userName}</div>` : ''}
      <nav class="drawer-nav">
        ${pages.map(p => `
          <a href="${p.href}" class="drawer-link${p.href === activePage ? ' active' : ''}">
            <span class="drawer-icon">${p.icon}</span>
            ${p.label}
          </a>
        `).join('')}
      </nav>
      <button class="drawer-signout" id="drawerSignOutBtn">Sign out</button>
    </div>
    <div class="drawer-overlay" id="drawerOverlay"></div>
  `;

  // Wire hamburger
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer    = document.getElementById('mobileDrawer');
  const overlay   = document.getElementById('drawerOverlay');
  const closeBtn  = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close on nav
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  return {
    setUser(name) {
      const el = document.getElementById('navUser');
      if (el) el.textContent = name;
      const du = drawer.querySelector('.drawer-user');
      if (du) du.textContent = name;
    }
  };
}

export const NAV_STYLES = `
  /* ── Nav base ─────────────────────────────── */
  #mainNav {
    position: fixed;
    top: 0; left: 0; right: 0;
    background: var(--white);
    box-shadow: 0 1px 3px rgba(0,0,0,.08);
    z-index: 200;
    height: 58px;
  }

  .nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .nav-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: var(--navy);
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    gap: 2px;
    flex: 1;
    justify-content: center;
  }

  .nav-link {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink-light);
    text-decoration: none;
    transition: background .15s, color .15s;
    white-space: nowrap;
  }

  .nav-link:hover  { background: var(--cream); color: var(--ink); }
  .nav-link.active { background: var(--navy); color: var(--white); }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .nav-user {
    font-size: 13px;
    color: var(--ink-faint);
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn-signout {
    padding: 6px 12px;
    border: 1.5px solid var(--cream-dark);
    border-radius: 6px;
    background: transparent;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-light);
    cursor: pointer;
    transition: border-color .15s, color .15s;
    white-space: nowrap;
  }

  .btn-signout:hover { border-color: var(--red); color: var(--red); }

  /* ── Hamburger ────────────────────────────── */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 36px;
    height: 36px;
    background: transparent;
    border: 1.5px solid var(--cream-dark);
    border-radius: 8px;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }

  .hamburger span {
    display: block;
    width: 18px;
    height: 2px;
    background: var(--ink);
    border-radius: 2px;
    transition: all .2s ease;
  }

  .hamburger[aria-expanded="true"] span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }
  .hamburger[aria-expanded="true"] span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── Mobile drawer ────────────────────────── */
  .mobile-drawer {
    position: fixed;
    top: 0; right: 0;
    width: 280px;
    height: 100dvh;
    background: var(--white);
    z-index: 300;
    transform: translateX(100%);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0,0,0,.12);
  }

  .mobile-drawer.open { transform: translateX(0); }

  .drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.4);
    z-index: 299;
    opacity: 0;
    pointer-events: none;
    transition: opacity .28s ease;
  }

  .drawer-overlay.show { opacity: 1; pointer-events: all; }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 58px;
    border-bottom: 1px solid var(--cream-dark);
    flex-shrink: 0;
  }

  .drawer-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: var(--navy);
  }

  .drawer-close {
    width: 32px; height: 32px;
    border: none;
    background: var(--cream);
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    color: var(--ink-light);
    display: flex; align-items: center; justify-content: center;
    transition: background .15s;
  }

  .drawer-close:hover { background: var(--cream-dark); }

  .drawer-user {
    padding: 12px 20px;
    font-size: 13px;
    color: var(--ink-faint);
    border-bottom: 1px solid var(--cream-dark);
    background: var(--cream);
  }

  .drawer-nav {
    flex: 1;
    padding: 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
  }

  .drawer-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 16px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    transition: background .15s;
  }

  .drawer-link:hover  { background: var(--cream); }
  .drawer-link.active { background: var(--navy); color: var(--white); }

  .drawer-icon { font-size: 20px; width: 28px; text-align: center; }

  .drawer-signout {
    margin: 12px;
    padding: 13px;
    background: transparent;
    border: 1.5px solid var(--cream-dark);
    border-radius: 10px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 500;
    color: var(--red);
    cursor: pointer;
    transition: background .15s, border-color .15s;
    flex-shrink: 0;
  }

  .drawer-signout:hover { background: #FDF0EF; border-color: var(--red); }

  /* ── Responsive breakpoint ────────────────── */
  @media (max-width: 720px) {
    .nav-links  { display: none; }
    .nav-user   { display: none; }
    .btn-signout { display: none; }
    .hamburger  { display: flex; }
  }
`;
