/* 습작들 — 넷플릭스식 서재. 소리 없음(무음 원칙). 데이터는 books.js */
(() => {
  'use strict';
  const BOOKS = window.BOOKS || [];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Each reader saves {chapterTitle, pageIndex, totalPages, updatedAt} under its own key on this same origin
  function progress(ed) {
    try {
      const p = JSON.parse(localStorage.getItem(ed.key) || 'null');
      if (!p || !p.totalPages || !(p.pageIndex > 0)) return null;
      return { pct: Math.min(100, Math.round(((p.pageIndex + 1) / p.totalPages) * 100)), where: p.chapterTitle || '', at: p.updatedAt || 0 };
    } catch (e) { return null; }
  }

  const banner = (b) => `<span class="banner ${b.genre.includes('시나리오') ? 'is-script' : 'is-novel'}">${esc(b.genre)}</span>`;
  const meta = (b) => [b.genre, `${b.chapters}장`, b.audio ? '오디오북' : '', b.editions.length > 1 ? `판본 ${b.editions.length}` : '', b.year].filter(Boolean).map(esc).join('<i>·</i>');

  function readButtons(b) {
    const ed = b.editions[0], pr = progress(ed);
    return `<a class="btn btn-play" href="${ed.url}">▶ ${pr ? '이어 읽기' : '읽기'}</a>` +
      (pr ? `<span class="hint">${esc(pr.where)} · ${pr.pct}%</span>` : '');
  }

  function renderHero() {
    const b = BOOKS[0];
    if (!b) return;
    const ed = b.editions[0];
    $('hero').innerHTML = `
      <div class="hero-bg" style="background-image:url('${ed.cover}')"></div>
      <div class="hero-inner">
        <button class="hero-poster" data-book="${b.id}" aria-label="${esc(b.title)} 정보">
          <img src="${ed.cover}" alt="" width="600" height="900">${banner(b)}
        </button>
        <div class="hero-text">
          <p class="kicker">새로 펴냄</p>
          <h1 class="hero-title">${esc(b.title)}</h1>
          ${b.subtitle ? `<p class="hero-sub">${esc(b.subtitle)}</p>` : ''}
          <p class="meta">${meta(b)}</p>
          <p class="hero-syn">${esc(b.synopsis)}</p>
          <div class="actions">${readButtons(b)}<button class="btn btn-info" data-book="${b.id}">ⓘ 정보</button></div>
        </div>
      </div>`;
  }

  const card = (b) => `
    <button class="card" data-book="${b.id}" aria-label="${esc(b.title)} — ${esc(b.genre)}">
      <img src="${b.editions[0].cover}" alt="" loading="lazy" width="600" height="900">
      ${banner(b)}
      ${b.editions.length > 1 ? `<span class="ed-badge">판본 ${b.editions.length}</span>` : ''}
    </button>`;

  function continueCards() {
    const list = [];
    BOOKS.forEach((b) => b.editions.forEach((ed) => { const pr = progress(ed); if (pr) list.push({ b, ed, pr }); }));
    return list.sort((x, y) => y.pr.at - x.pr.at).map(({ b, ed, pr }) => `
      <a class="card card-cont" href="${ed.url}" aria-label="${esc(ed.name)} 이어 읽기, ${pr.pct}%">
        <img src="${ed.cover}" alt="" loading="lazy" width="600" height="900">
        ${banner(b)}
        <span class="cont-info"><b>${esc(ed.name)}</b>${esc(pr.where)}</span>
        <span class="bar"><i style="width:${pr.pct}%"></i></span>
      </a>`);
  }

  function renderRows() {
    const rows = [
      ['이어 읽기', continueCards()],
      ['모든 작품', BOOKS.map(card)],
      ['단편소설', BOOKS.filter((b) => b.genre === '단편소설').map(card)],
      ['단편 시나리오', BOOKS.filter((b) => b.genre.includes('시나리오')).map(card)],
      ['오디오북으로 듣기', BOOKS.filter((b) => b.audio).map(card)]
    ];
    $('rows').innerHTML = rows.filter(([, c]) => c.length).map(([t, c]) =>
      `<section class="row"><h2>${t}</h2><div class="track">${c.join('')}</div></section>`).join('');
  }

  function openSheet(id) {
    const b = BOOKS.find((x) => x.id === id);
    if (!b) return;
    const eds = b.editions.map((ed, i) => {
      const pr = progress(ed);
      return `
        <li class="ed ${i === 0 ? 'is-main' : ''}">
          <img src="${ed.cover}" alt="" width="600" height="900" loading="lazy">
          <div class="ed-text">
            <span class="ed-label">${esc(ed.label)}</span>
            <b>${esc(ed.name)}</b>
            <small>${esc(ed.note)}${pr ? ` · ${esc(pr.where)} ${pr.pct}%` : ''}</small>
          </div>
          <a class="btn ${i === 0 ? 'btn-play' : 'btn-ghost'}" href="${ed.url}">${pr ? '이어 읽기' : '읽기'}</a>
        </li>`;
    }).join('');
    $('sheetPanel').innerHTML = `
      <button class="sheet-x" data-close aria-label="닫기">✕</button>
      <div class="sheet-head">
        <div class="sheet-poster"><img src="${b.editions[0].cover}" alt="" width="600" height="900">${banner(b)}</div>
        <div>
          <h2 id="sheetTitle" class="sheet-title">${esc(b.title)}</h2>
          ${b.subtitle ? `<p class="hero-sub">${esc(b.subtitle)}</p>` : ''}
          <p class="meta">${meta(b)}</p>
          <div class="actions">${readButtons(b)}</div>
        </div>
      </div>
      <p class="sheet-syn">${esc(b.synopsis)}</p>
      <p class="tags">${b.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</p>
      <h3 class="ed-head">${b.editions.length > 1 ? '판본 선택' : '판본'}</h3>
      <ul class="eds">${eds}</ul>`;
    $('sheet').classList.remove('hidden');
    document.body.classList.add('noscroll');
    $('sheetPanel').querySelector('.sheet-x').focus();
  }

  function closeSheet() {
    $('sheet').classList.add('hidden');
    document.body.classList.remove('noscroll');
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-book],[data-close]');
    if (!t) return;
    if (t.hasAttribute('data-close')) closeSheet();
    else openSheet(t.getAttribute('data-book'));
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });
  // Coming back from a reader (bfcache) → refresh progress
  window.addEventListener('pageshow', () => { renderHero(); renderRows(); });

  renderHero();
  renderRows();
  // 링크로 상세 열기: /#stars
  if (location.hash.length > 1) openSheet(decodeURIComponent(location.hash.slice(1)));
})();
