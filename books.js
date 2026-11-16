// 습작들 — 서재 목록. 새 작품은 맨 위에 추가하면 홈 맨 앞(대표 작품)에 선다.
// genre = 메뉴·줄을 나누는 장르, format = 표지 배너(단편소설/단편 시나리오)
// key = 각 리더 사이트의 이어 읽기 저장 키(같은 origin이라 그대로 읽힌다)
window.BOOKS = [
  {
    id: 'naranhi',
    title: '나란히',
    subtitle: '예보에 없던 사람',
    genre: '로맨틱 코미디',
    format: '단편 시나리오',
    chapters: 10,
    audio: true,
    year: '2026.11',
    url: '/side-by-side/',
    cover: 'covers/side-by-side.webp',
    key: 'side_by_side_progress_v1',
    tags: ['곡성', '기상캐스터', '주유소', '기후', '사투리', '오디오북'],
    synopsis: '날씨를 말하는 여자와 날씨에 대비하는 남자. 섬진강 국도변 주유소에서 시작된 사랑이, 서울로 ‘올라가는’ 꿈과 고향으로 ‘내려온’ 삶 사이에서 말 한마디에 흔들린다. 극한호우의 밤, 두 사람은 서로 모른 채 같은 비를 막는다.'
  },
  {
    id: 'whereabouts',
    title: '우리가 좋아했던 것들의 행방',
    subtitle: '',
    genre: '판타지 멜로',
    format: '단편소설',
    chapters: 8,
    audio: true,
    year: '2026.11',
    url: '/whereabouts-of-what-we-loved/',
    cover: 'covers/whereabouts-of-what-we-loved.webp',
    key: 'whereabouts_progress_v1',
    tags: ['이별', '무너지는 도시', '취향', '오디오북'],
    synopsis: '오 년의 연애가 끝난 뒤, 이유 없이 무너지고 사람들이 묻지 않고 다시 쌓는 도시. 열다섯 살부터 ‘괜찮다’를 연습해 온 남자가, 함께 좋아하게 된 것들의 목록을 들고 그녀가 남긴 ‘잘 지내요’의 뜻을 찾아 걷는다.'
  }
];
