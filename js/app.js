/* ── State ───────────────────────────────── */
let deck = [...CARDS];
let idx = 0;
let flipped = false;
let sort = 'default';

/* ── Theme ───────────────────────────────── */
const themeBtn = document.getElementById('theme-btn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let dark = localStorage.getItem('theme')
    ? localStorage.getItem('theme') === 'dark'
    : prefersDark.matches;

function applyTheme(d) {
    dark = d;
    document.documentElement.setAttribute('data-theme', d ? 'dark' : 'light');
    themeBtn.textContent = d ? '☀️' : '🌙';
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
        if (target === 'gallery') renderGallery();
    });
});

/* ── Sorting helpers ─────────────────────── */
function applySort(type) {
    sort = type;
    if (type === 'alpha') {
        deck = [...deck].sort((a, b) => a.en.localeCompare(b.en));
    } else if (type === 'alpha-ru') {
        deck = [...deck].sort((a, b) => a.ru.localeCompare(b.ru, 'ru'));
    } else if (type === 'shuffle') {
        deck = [...deck].sort(() => Math.random() - .5);
    } else {
        deck = [...CARDS];
    }
}

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

function renderCard() {
    const c = deck[idx];
    flipped = false;
    fcCard.classList.remove('flipped');

    // front
    fcFront.querySelector('.fc-english').textContent = c.en;
    fcFront.querySelector('.fc-num').textContent = `#${c.id}`;

    // back
    fcBack.querySelector('.fc-russian').textContent = c.ru;
    fcBack.querySelector('.fc-pronun').textContent = c.pronun;
    fcBack.querySelector('.fc-literal').textContent = c.literal;
    fcBack.querySelector('.fc-note').textContent = c.note;
    fcBack.querySelector('.fc-num-b').textContent = `#${c.id}`;

    // controls
    fcCounter.textContent = `${idx + 1} / ${deck.length}`;
    fcFill.style.width = `${((idx + 1) / deck.length) * 100}%`;
    fcPrev.disabled = idx === 0;
    fcNext.disabled = idx === deck.length - 1;
}

function navigate(dir) {
    const cls = dir > 0 ? 'swipe-left' : 'swipe-right';
    fcScene.classList.add(cls);
    setTimeout(() => {
        fcScene.classList.remove(cls);
        idx = Math.max(0, Math.min(deck.length - 1, idx + dir));
        renderCard();
    }, 280);
}

fcPrev.addEventListener('click', () => navigate(-1));
fcNext.addEventListener('click', () => navigate(1));
fcCard.addEventListener('click', () => {
    flipped = !flipped;
    fcCard.classList.toggle('flipped', flipped);
});

// Sort buttons (flashcard)
fcSortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fcSortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applySort(btn.dataset.fcSort);
        idx = 0;
        renderCard();
    });
});

// Keyboard
document.addEventListener('keydown', e => {
    if (!document.getElementById('fc-page').classList.contains('active')) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipped = !flipped;
        fcCard.classList.toggle('flipped', flipped);
    }
});

// Touch / swipe
let touchX = null;
fcScene.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
fcScene.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) < 40) return; // tap = flip
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
let galDeck = [...CARDS];
let rendered = false;

function getGalDeck() {
    let d = [...CARDS];
    if (galSort === 'alpha') d.sort((a, b) => a.en.localeCompare(b.en));
    if (galSort === 'alpha-ru') d.sort((a, b) => a.ru.localeCompare(b.ru, 'ru'));
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

function renderGallery() {
    const d = getGalDeck();
    countBadge.textContent = `${d.length} card${d.length !== 1 ? 's' : ''}`;

    if (!d.length) {
        galleryGrid.innerHTML = '';
        document.getElementById('gallery-empty').style.display = 'block';
        return;
    }
    document.getElementById('gallery-empty').style.display = 'none';

    galleryGrid.innerHTML = d.map(c => `
    <div class="g-card" onclick="openCard(${c.id})" tabindex="0" role="button" aria-label="${c.en}">
      <div class="g-num">#${c.id}</div>
      <div class="g-en">${escHtml(c.en)}</div>
      <div class="g-ru">${escHtml(c.ru)}</div>
      <div class="g-pronun">${escHtml(c.pronun)}</div>
      <div class="g-literal">${escHtml(c.literal)}</div>
    </div>
  `).join('');
}

function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Open a gallery card in flashcard view
function openCard(id) {
    const cardIdx = deck.findIndex(c => c.id === id);
    if (cardIdx !== -1) {
        idx = cardIdx;
        renderCard();
        navBtns[0].click(); // go to flashcard page
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