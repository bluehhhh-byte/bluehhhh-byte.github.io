// 습작들 — 서재 목록. 새 작품은 맨 위에 추가하면 홈 맨 앞(대표 작품)에 선다.
// genre = 메뉴·줄을 나누는 장르, format = 표지 배너(단편소설/단편 시나리오)
// key = 각 리더 사이트의 이어 읽기 저장 키(같은 origin이라 그대로 읽힌다)
window.BOOKS = [
  {
    id: 'two-attack',
    title: '투 어택',
    subtitle: '두 번째 공을, 처음으로 나에게',
    genre: '멜로',
    format: '단편소설',
    chapters: 6,
    audio: false,
    adult: true,
    year: '2026.11',
    url: '/two-attack/',
    cover: 'covers/two-attack.webp',
    key: 'two_attack_progress_v1',
    tags: ['19', '배구', '세터', '포커', '이스탄불', '단편선 순간들'],
    synopsis: '스물두 해 동안 남에게 공을 올려 주기만 한 마흔 살 세터 엘리프. 한 시즌짜리 ‘보험’으로 온 이스탄불에서 사천 명이 처음으로 그녀의 이름을 부른 밤, 그녀는 지하 장비실로 낯선 포커 선수의 손목을 끌고 내려간다. 세 문장 중 하나는 거짓말인 놀이, 멈추고 싶을 때 말하는 한 마디 “타임”, 구단주 아들의 내기, 라마단의 붉은 카펫. 이 몸은 누구의 것인가. 평생 남에게 주던 공을, 처음으로 자기 것으로 넘기기까지.'
  },
  {
    id: 'pink-on-call',
    title: '핑크는 통화 중',
    subtitle: '',
    genre: '로맨틱 코미디',
    format: '단편 시나리오',
    chapters: 6,
    audio: true,
    year: '2026.11',
    url: '/pink-on-call/',
    cover: 'covers/pink-on-call.webp',
    key: 'pink_on_call_progress_v1',
    tags: ['보이스톡', '특촬물', '마스크맨', '듀스', '반려견', '오디오북'],
    synopsis: '어느 날 모경의 프로필이 마스크맨 핑크로 바뀐다. 보이스톡에서는 한마디도 놓치지 않고 몰아붙이고, 만나면 모든 걸 기억한 채 순하게 웃는 그녀. 매일 밤 머릿속에서 지하제국의 악당으로 쓰러지던 제범은, 1년 전 자신이 무심코 한 말 한마디가 그녀를 얼음 속에 가둔 괴물이었다는 걸 알게 된다.'
  },
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
