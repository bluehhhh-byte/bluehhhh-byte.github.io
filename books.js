// 습작들 — 서재 목록. 새 작품은 맨 위에 한 덩어리 추가. editions[0]이 최종본(메인).
// key = 각 리더 사이트의 이어 읽기 저장 키(같은 origin이라 그대로 읽힌다)
window.BOOKS = [
  {
    id: 'naranhi',
    title: '나란히',
    subtitle: '예보에 없던 사람',
    genre: '단편 시나리오',
    chapters: 10,
    audio: false,
    year: '2026.11',
    tags: ['로맨틱 코미디', '곡성', '기후', '사투리'],
    synopsis: '날씨를 말하는 여자와 날씨에 대비하는 남자. 섬진강 국도변 주유소에서 시작된 사랑이, 서울로 ‘올라가는’ 꿈과 고향으로 ‘내려온’ 삶 사이에서 말 한마디에 흔들린다. 극한호우의 밤, 두 사람은 서로 모른 채 같은 비를 막는다.',
    editions: [
      { label: '최종본', name: '나란히', url: '/side-by-side/', cover: 'covers/side-by-side.webp', key: 'side_by_side_progress_v1', note: '소설과 시나리오를 섞은 판' }
    ]
  },
  {
    id: 'whereabouts',
    title: '우리가 좋아했던 것들의 행방',
    subtitle: '',
    genre: '단편소설',
    chapters: 8,
    audio: true,
    year: '2026.11',
    tags: ['이별', '도시', '취향'],
    synopsis: '오 년의 연애가 끝난 뒤, 이유 없이 무너지고 사람들이 묻지 않고 다시 쌓는 도시. 열다섯 살부터 ‘괜찮다’를 연습해 온 남자가, 함께 좋아하게 된 것들의 목록을 들고 그녀가 남긴 ‘잘 지내요’의 뜻을 찾아 걷는다.',
    editions: [
      { label: '최종본', name: '우리가 좋아했던 것들의 행방', url: '/whereabouts-of-what-we-loved/', cover: 'covers/whereabouts-of-what-we-loved.webp', key: 'whereabouts_progress_v1', note: '손질을 더한 판' },
      { label: '초판', name: '공통의 취향', url: '/common-taste/', cover: 'covers/common-taste.webp', key: 'common_taste_progress_v1', note: '처음 펴낸 판' }
    ]
  },
  {
    id: 'stars',
    title: '별이 지고 난 뒤에도',
    subtitle: '',
    genre: '단편소설',
    chapters: 8,
    audio: true,
    year: '2026.11',
    tags: ['기다림', '별', '기억'],
    synopsis: '잊지 못한 사람들이 흘러드는 별의 도시. 거꾸로 가는 회중시계가 멈추기 전에, 그는 그녀를 기다린 시간의 값을 치러야 한다. 기다려 달라고 한 적 없다는 그녀의 대답 앞에서, 마지막 답장을 쓰기까지.',
    editions: [
      { label: '최종본', name: '별이 지고 난 뒤에도', url: '/even-after-the-stars-fall/', cover: 'covers/even-after-the-stars-fall.webp', key: 'even_after_stars_fall_progress_v1', note: '개정본' },
      { label: '초판', name: '반추', url: '/after-the-stars-fall/', cover: 'covers/after-the-stars-fall.webp', key: 'after_stars_fall_progress_v1', note: '처음 펴낸 판' }
    ]
  }
];
