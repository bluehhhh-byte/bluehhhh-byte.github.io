/* 습작들 — 넷플릭스식 서재. 장르 메뉴로 나눠 보기. 소리 없음(무음 원칙). 데이터는 books.js */
(() => {
  'use strict';
  const BOOKS = window.BOOKS || [];
  const GENRES = [...new Set(BOOKS.map((b) => b.genre))];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let current = '전체';

  // Each reader saves {chapterTitle, pageIndex, totalPages, updatedAt} under its own key on this same origin
  function progress(b) {
    try {
      const p = JSON.parse(localStorage.getItem(b.key) || 'null');
      if (!p || !p.totalPages || !(p.pageIndex > 0)) return null;
      return { pct: Math.min(100, Math.round(((p.pageIndex + 1) / p.totalPages) * 100)), where: p.chapterTitle || '', at: p.updatedAt || 0 };
    } catch (e) { return null; }
  }

  const banner = (b) => `<span class="banner ${b.format.includes('시나리오') ? 'is-script' : 'is-novel'}">${esc(b.format)}</span>` +
    (b.adult ? '<span class="age19" title="19세 이상">19</span>' : '');
  const meta = (b) => [b.genre, b.format, `${b.chapters}장`, b.audio ? '오디오북' : '', b.year].filter(Boolean).map(esc).join('<i>·</i>');
  const shown = () => (current === '전체' ? BOOKS : BOOKS.filter((b) => b.genre === current));

  function readButtons(b) {
    const pr = progress(b);
    return `<a class="btn btn-play" href="${b.url}">▶ ${pr ? '이어 읽기' : '읽기'}</a>` +
      (pr ? `<span class="hint">${esc(pr.where)} · ${pr.pct}%</span>` : '');
  }

  function renderMenu() {
    $('menu').innerHTML = ['전체', ...GENRES].map((g) =>
      `<button class="chip ${g === current ? 'on' : ''}" data-genre="${esc(g)}" aria-pressed="${g === current}">${esc(g)}</button>`).join('');
  }

  function renderHero() {
    const b = shown()[0];
    if (!b) { $('hero').innerHTML = ''; return; }
    $('hero').innerHTML = `
      <div class="hero-bg" style="background-image:url('${b.cover}')"></div>
      <div class="hero-inner">
        <button class="hero-poster" data-book="${b.id}" aria-label="${esc(b.title)} 정보">
          <img src="${b.cover}" alt="" width="600" height="900">${banner(b)}
        </button>
        <div class="hero-text">
          <p class="kicker">${current === '전체' ? '새로 펴냄' : esc(b.genre)}</p>
          <h1 class="hero-title">${esc(b.title)}</h1>
          ${b.subtitle ? `<p class="hero-sub">${esc(b.subtitle)}</p>` : ''}
          <p class="meta">${meta(b)}</p>
          <p class="hero-syn">${esc(b.synopsis)}</p>
          <div class="actions">${readButtons(b)}<button class="btn btn-info" data-book="${b.id}">ⓘ 정보</button></div>
        </div>
      </div>`;
  }

  const card = (b) => `
    <button class="card" data-book="${b.id}" aria-label="${esc(b.title)} — ${esc(b.genre)}, ${esc(b.format)}">
      <img src="${b.cover}" alt="" loading="lazy" width="600" height="900">
      ${banner(b)}
    </button>`;

  function continueCards(list) {
    return list.map((b) => ({ b, pr: progress(b) })).filter((x) => x.pr).sort((x, y) => y.pr.at - x.pr.at).map(({ b, pr }) => `
      <a class="card card-cont" href="${b.url}" aria-label="${esc(b.title)} 이어 읽기, ${pr.pct}%">
        <img src="${b.cover}" alt="" loading="lazy" width="600" height="900">
        ${banner(b)}
        <span class="cont-info"><b>${esc(b.title)}</b>${esc(pr.where)}</span>
        <span class="bar"><i style="width:${pr.pct}%"></i></span>
      </a>`);
  }

  function renderRows() {
    const list = shown();
    const genres = current === '전체' ? GENRES : [current];
    const rows = [['이어 읽기', continueCards(list)], ...genres.map((g) => [g, list.filter((b) => b.genre === g).map(card)])];
    $('rows').innerHTML = rows.filter(([, c]) => c.length).map(([t, c]) =>
      `<section class="row"><h2>${esc(t)}</h2><div class="track">${c.join('')}</div></section>`).join('');
  }

  function render() { renderMenu(); renderHero(); renderRows(); }

  function openSheet(id) {
    const b = BOOKS.find((x) => x.id === id);
    if (!b) return;
    $('sheetPanel').innerHTML = `
      <button class="sheet-x" data-close aria-label="닫기">✕</button>
      <div class="sheet-head">
        <div class="sheet-poster"><img src="${b.cover}" alt="" width="600" height="900">${banner(b)}</div>
        <div>
          <p class="kicker">${esc(b.genre)}</p>
          <h2 id="sheetTitle" class="sheet-title">${esc(b.title)}</h2>
          ${b.subtitle ? `<p class="hero-sub">${esc(b.subtitle)}</p>` : ''}
          <p class="meta">${meta(b)}</p>
          <div class="actions">${readButtons(b)}</div>
        </div>
      </div>
      <p class="sheet-syn">${esc(b.synopsis)}</p>
      <p class="tags">${b.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</p>`;
    $('sheet').classList.remove('hidden');
    document.body.classList.add('noscroll');
    $('sheetPanel').querySelector('.sheet-x').focus();
  }

  function closeSheet() {
    $('sheet').classList.add('hidden');
    document.body.classList.remove('noscroll');
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-book],[data-close],[data-genre]');
    if (!t) return;
    if (t.hasAttribute('data-genre')) { current = t.getAttribute('data-genre'); render(); window.scrollTo({ top: 0 }); }
    else if (t.hasAttribute('data-close')) closeSheet();
    else openSheet(t.getAttribute('data-book'));
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });
  // Coming back from a reader (bfcache) → refresh progress
  window.addEventListener('pageshow', render);

  render();
  // 링크로 상세 열기: /#naranhi
  if (location.hash.length > 1) openSheet(decodeURIComponent(location.hash.slice(1)));
})();
