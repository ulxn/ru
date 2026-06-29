/* ── State ───────────────────────────────── */
let deck = [...ALL_CARDS];
let idx = 0;
let flipped = false;
let alwaysShow = false;

/* ── Theme ───────────────────────────────── */
const themeBtn = document.getElementById('theme-btn');
let dark = localStorage.getItem('theme')
    ? localStorage.getItem('theme') === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(d) {
    dark = d;
    document.documentElement.setAttribute('data-theme', d ? 'dark' : 'light');
    localStorage.setItem('theme', d ? 'dark' : 'light');
}
themeBtn.addEventListener('click', () => applyTheme(!dark));
applyTheme(dark);

/* ── Page navigation ─────────────────────── */
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.page;
        pages.forEach(p => p.classList.toggle('active', p.id === target));
        navBtns.forEach(b => b.classList.toggle('active', b === btn));
        if (target === 'gallery-page') renderGallery();
    });
});

/* ─────────────────────────────────────────
   FLASHCARD PAGE
───────────────────────────────────────── */
const fcCard = document.getElementById('fc-card');
const fcScene = document.getElementById('fc-scene');
const fcFront = document.getElementById('fc-front');
const fcBack = document.getElementById('fc-back');
const fcPrev = document.getElementById('fc-prev');
const fcNext = document.getElementById('fc-next');
const fcCounter = document.getElementById('fc-counter');
const fcFill = document.getElementById('fc-fill');
const fcSortBtns = document.querySelectorAll('[data-fc-sort]');
const fcAlways = document.getElementById('fc-always-toggle');

function categoryLabel(c) {
    return c.slang ? 'Slang' : 'Essential';
}

function renderCard() {
    const c = deck[idx];
    flipped = false;
    if (!alwaysShow) fcCard.classList.remove('flipped');

    const isSlang = !!c.slang;
    const catClass = isSlang ? 'slang' : '';
    const catText = categoryLabel(c);

    // front
    fcFront.querySelector('.fc-english').textContent = c.en;
    fcFront.querySelector('.fc-num').textContent = `#${c.id}`;
    const catFront = fcFront.querySelector('.fc-category');
    catFront.textContent = catText;
    catFront.className = `fc-category ${catClass}`;

    // back
    fcBack.querySelector('.fc-russian').textContent = c.ru;
    fcBack.querySelector('.fc-pronun').textContent = c.pronun;
    fcBack.querySelector('.fc-literal').textContent = c.literal;
    fcBack.querySelector('.fc-note').textContent = c.note;
    fcBack.querySelector('.fc-num-b').textContent = `#${c.id}`;
    const catBack = fcBack.querySelector('.fc-category');
    catBack.textContent = catText;
    catBack.className = `fc-category ${catClass}`;

    // controls
    fcCounter.textContent = `${idx + 1} / ${deck.length}`;
    fcFill.style.width = `${((idx + 1) / deck.length) * 100}%`;
    fcPrev.disabled = idx === 0;
    fcNext.disabled = idx === deck.length - 1;
}

function navigate(dir) {
    if (alwaysShow) {
        idx = Math.max(0, Math.min(deck.length - 1, idx + dir));
        renderCard();
        return;
    }
    const cls = dir > 0 ? 'swipe-left' : 'swipe-right';
    fcScene.classList.add(cls);
    setTimeout(() => {
        fcScene.classList.remove(cls);
        idx = Math.max(0, Math.min(deck.length - 1, idx + dir));
        renderCard();
    }, 260);
}

fcPrev.addEventListener('click', () => navigate(-1));
fcNext.addEventListener('click', () => navigate(1));

fcCard.addEventListener('click', () => {
    if (alwaysShow) return;
    flipped = !flipped;
    fcCard.classList.toggle('flipped', flipped);
});

// Always-show toggle
fcAlways.addEventListener('change', () => {
    alwaysShow = fcAlways.checked;
    fcCard.classList.toggle('always-show', alwaysShow);
    // show back face correctly
    if (alwaysShow) {
        fcCard.classList.remove('flipped');
        flipped = false;
    }
});

// Filter buttons
function buildDeck(type) {
    let base = [...ALL_CARDS];
    if (type === 'essentials') base = ALL_CARDS.filter(c => !c.slang);
    if (type === 'slang') base = ALL_CARDS.filter(c => !!c.slang);
    if (type === 'shuffle') base.sort(() => Math.random() - .5);
    return base;
}

fcSortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fcSortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        deck = buildDeck(btn.dataset.fcSort);
        idx = 0;
        renderCard();
    });
});

// Keyboard
document.addEventListener('keydown', e => {
    if (!document.getElementById('fc-page').classList.contains('active')) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if ((e.key === ' ' || e.key === 'Enter') && !alwaysShow) {
        e.preventDefault();
        flipped = !flipped;
        fcCard.classList.toggle('flipped', flipped);
    }
});

// Touch / swipe
let touchX = null, touchY = null;
fcScene.addEventListener('touchstart', e => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
}, { passive: true });
fcScene.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = touchY = null;
    // Ignore mostly-vertical swipes (scrolling)
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < 40) return; // small move = tap (flip)
    dx < 0 ? navigate(1) : navigate(-1);
});

/* ─────────────────────────────────────────
   GALLERY PAGE
───────────────────────────────────────── */
const galleryGrid = document.getElementById('gallery-grid');
const gallerySearch = document.getElementById('gallery-search');
const galSortBtns = document.querySelectorAll('[data-gal-sort]');
const countBadge = document.getElementById('count-badge');

let galSort = 'default';
let galQuery = '';

function getGalDeck() {
    let d = [...ALL_CARDS];
    if (galSort === 'essentials') d = d.filter(c => !c.slang);
    if (galSort === 'slang') d = d.filter(c => !!c.slang);
    if (galSort === 'shuffle') d.sort(() => Math.random() - .5);
    if (galQuery) {
        const q = galQuery.toLowerCase();
        d = d.filter(c =>
            c.en.toLowerCase().includes(q) ||
            c.ru.toLowerCase().includes(q) ||
            c.pronun.toLowerCase().includes(q)
        );
    }
    return d;
}

function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderGallery() {
    const d = getGalDeck();
    countBadge.textContent = `${d.length} card${d.length !== 1 ? 's' : ''}`;

    const emptyEl = document.getElementById('gallery-empty');
    if (!d.length) {
        galleryGrid.innerHTML = '';
        emptyEl.style.display = 'block';
        return;
    }
    emptyEl.style.display = 'none';

    galleryGrid.innerHTML = d.map(c => `
    <div class="g-card" onclick="openCard(${c.id})" tabindex="0" role="button" aria-label="${escHtml(c.en)}">
      <div class="g-num">#${c.id}${c.slang ? ' &nbsp;<span class="g-slang-badge">Slang</span>' : ''}</div>
      <div class="g-en">${escHtml(c.en)}</div>
      <div class="g-ru">${escHtml(c.ru)}</div>
      <div class="g-pronun">${escHtml(c.pronun)}</div>
      <div class="g-literal">${escHtml(c.literal)}</div>
    </div>
  `).join('');
}

function openCard(id) {
    const cardIdx = deck.findIndex(c => c.id === id);
    // If the card isn't in current deck filter, reset to all and find
    if (cardIdx === -1) {
        deck = [...ALL_CARDS];
        fcSortBtns.forEach(b => b.classList.toggle('active', b.dataset.fcSort === 'default'));
    }
    const newIdx = deck.findIndex(c => c.id === id);
    if (newIdx !== -1) {
        idx = newIdx;
        renderCard();
        navBtns[0].click();
    }
}
window.openCard = openCard;

gallerySearch.addEventListener('input', () => {
    galQuery = gallerySearch.value.trim();
    renderGallery();
});

galSortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        galSortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        galSort = btn.dataset.galSort;
        renderGallery();
    });
});

/* ── Init ────────────────────────────────── */
renderCard();