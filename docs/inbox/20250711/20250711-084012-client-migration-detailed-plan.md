# 클라이언트 마이그레이션 상세 계획서

> 자 일단 clinet부터 완성할거야. 어떻게 진행할지 보고서를 client중심으로 상세히 하나 더 써봐

## 프로젝트 개요

비디오 포트폴리오 웹사이트의 클라이언트 부분을 Python/템플릿 기반에서 SvelteKit으로 완전히 마이그레이션하는 프로젝트입니다. 이 사이트는 Vimeo 기반의 비디오 쇼케이스가 핵심 기능입니다.

## 1. 현재 클라이언트 구조 분석

### 1.1 핵심 페이지

| 페이지 | 경로 | 주요 기능 | 현재 상태 |
|--------|------|----------|-----------|
| **메인** | `/` | 풀스크린 비디오 배경, 자동재생 | 기본 레이아웃만 구현 |
| **Works** | `/works/[id]` | 작품 갤러리, 비디오 플레이어 | 미구현 |
| **Directors** | `/directors/[id]` | 감독별 작품 목록 | 미구현 |
| **Plan-V** | `/plan-v/[id]` | Plan-V 카테고리 작품 | 미구현 |
| **블로그** | `/blog` | 블로그 포스트 목록 | 기본 구조만 구현 |

### 1.2 사용 중인 API

```javascript
// 현재 사용 중인 API 엔드포인트
GET /api/configs/tags      // 태그 목록
GET /api/items/main        // 메인 비디오
GET /api/items/{category}/{tag}  // 카테고리별 비디오
GET /api/blogs             // 블로그 목록
```

### 1.3 핵심 컴포넌트

- **Vimeo$**: Vimeo Player API를 RxJS Observable로 래핑
- **video-background**: 배경 비디오 자동재생 (구간 반복)
- **video-player**: 팝업 비디오 플레이어
- **TextAnimation**: 텍스트 페이드인 애니메이션
- **store**: RxJS 기반 상태 관리

## 2. 기술 스택 전환 계획

### 2.1 상태 관리
- **현재**: RxJS + 커스텀 store
- **목표**: Svelte 5 runes (`$state`, `$derived`)
- **이유**: Svelte의 반응형 시스템이 더 간단하고 효율적

### 2.2 비디오 플레이어
- **현재**: Vimeo Player SDK + RxJS 래퍼
- **목표**: @vimeo/player + Svelte 컴포넌트
- **이유**: 직접적인 Promise 기반 API 사용

### 2.3 애니메이션
- **현재**: 커스텀 TextAnimation 클래스
- **목표**: Svelte transitions/animations
- **이유**: 내장 애니메이션이 더 성능 좋음

### 2.4 CSS 처리
- **현재**: Stylus + 레거시 CSS
- **목표**: Adorable CSS + CSS Modules
- **이유**: 이미 프로젝트에 설정되어 있음

## 3. 단계별 구현 계획

### Phase 1: 기초 설정 (2-3일)

#### 1.1 프로젝트 구조 정리
```
src/
├── lib/
│   ├── api/
│   │   └── client.ts        // API 클라이언트
│   ├── stores/
│   │   ├── items.svelte.ts  // 비디오 아이템 스토어
│   │   ├── tags.svelte.ts   // 태그 스토어
│   │   └── ui.svelte.ts     // UI 상태 스토어
│   └── components/
│       ├── video/
│       │   ├── VimeoPlayer.svelte
│       │   ├── VideoBackground.svelte
│       │   └── VideoThumbnail.svelte
│       └── ui/
│           ├── TextAnimation.svelte
│           └── LoadingIndicator.svelte
```

#### 1.2 API 클라이언트 구현
```typescript
// src/lib/api/client.ts
import { createAPI } from '$lib/api/apiForge'
import { fetchAdapter } from '$lib/api/adapter/fetchAdapter'

export const api = createAPI({
  baseURL: '/api',
  adapter: fetchAdapter
})

// 타입 정의
export interface VideoItem {
  id: string
  title: string
  vimeo_id: string
  thumbnail: string
  category: string
  tags: string[]
  // ...
}
```

#### 1.3 기본 스토어 설정
```typescript
// src/lib/stores/items.svelte.ts
export const itemsStore = () => {
  let items = $state<VideoItem[]>([])
  let loading = $state(false)
  let error = $state<Error | null>(null)
  
  const loadItems = async (category: string, tag: string) => {
    loading = true
    try {
      const response = await api.get.items[category][tag]()
      items = response.data
    } catch (e) {
      error = e as Error
    } finally {
      loading = false
    }
  }
  
  return {
    get items() { return items },
    get loading() { return loading },
    get error() { return error },
    loadItems
  }
}
```

### Phase 2: 핵심 컴포넌트 구현 (3-4일)

#### 2.1 Vimeo Player 컴포넌트
```svelte
<!-- src/lib/components/video/VimeoPlayer.svelte -->
<script lang="ts">
  import Player from '@vimeo/player'
  import { onMount } from 'svelte'
  
  let { 
    vimeoId,
    autoplay = false,
    loop = false,
    startAt = 0,
    endAt = 0,
    onPlay,
    onPause,
    onEnded
  } = $props()
  
  let player: Player
  let container: HTMLDivElement
  
  onMount(() => {
    player = new Player(container, {
      id: vimeoId,
      autoplay,
      loop,
      controls: false
    })
    
    // 구간 반복 재생 구현
    if (startAt > 0) {
      player.setCurrentTime(startAt)
    }
    
    if (endAt > 0) {
      player.on('timeupdate', (data) => {
        if (data.seconds >= endAt) {
          player.setCurrentTime(startAt)
        }
      })
    }
    
    // 이벤트 바인딩
    if (onPlay) player.on('play', onPlay)
    if (onPause) player.on('pause', onPause)
    if (onEnded) player.on('ended', onEnded)
    
    return () => player.destroy()
  })
</script>

<div bind:this={container} class="vimeo-player"></div>
```

#### 2.2 비디오 배경 컴포넌트
```svelte
<!-- src/lib/components/video/VideoBackground.svelte -->
<script lang="ts">
  import VimeoPlayer from './VimeoPlayer.svelte'
  import TextAnimation from '../ui/TextAnimation.svelte'
  
  let { item } = $props()
  
  let isPlaying = $state(false)
  let progress = $state(0)
</script>

<div class="video-background">
  <VimeoPlayer
    vimeoId={item.vimeo_id}
    autoplay={true}
    loop={true}
    startAt={item.video_start_at}
    endAt={item.video_end_at}
    onPlay={() => isPlaying = true}
    onPause={() => isPlaying = false}
  />
  
  <div class="overlay">
    <TextAnimation text={item.title} />
    <TextAnimation text={item.description} delay={300} />
  </div>
  
  <div class="progress-bar" style="width: {progress}%"></div>
</div>
```

### Phase 3: 페이지 구현 (4-5일)

#### 3.1 메인 페이지
```svelte
<!-- src/routes/(client)/+page.svelte -->
<script lang="ts">
  import { itemsStore } from '$lib/stores/items.svelte'
  import VideoBackground from '$lib/components/video/VideoBackground.svelte'
  
  const store = itemsStore()
  
  $effect(() => {
    store.loadItems('main', 'featured')
  })
  
  let currentIndex = $state(0)
  
  const nextVideo = () => {
    currentIndex = (currentIndex + 1) % store.items.length
  }
</script>

{#if store.loading}
  <LoadingIndicator />
{:else if store.items.length > 0}
  <VideoBackground item={store.items[currentIndex]} />
  
  <div class="indicators">
    {#each store.items as item, i}
      <button
        class="indicator"
        class:active={i === currentIndex}
        onclick={() => currentIndex = i}
      />
    {/each}
  </div>
{/if}
```

#### 3.2 Works 페이지
```svelte
<!-- src/routes/(client)/works/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores'
  import VideoThumbnail from '$lib/components/video/VideoThumbnail.svelte'
  import VideoPlayer from '$lib/components/video/VideoPlayer.svelte'
  
  const store = itemsStore()
  let selectedVideo = $state<VideoItem | null>(null)
  
  $effect(() => {
    store.loadItems('works', $page.params.id)
  })
</script>

<div class="works-page">
  {#if store.items[0]}
    <div class="hero-video">
      <VideoThumbnail 
        item={store.items[0]}
        size="large"
        onclick={() => selectedVideo = store.items[0]}
      />
    </div>
  {/if}
  
  <div class="video-grid">
    {#each store.items.slice(1) as item}
      <VideoThumbnail 
        {item}
        onclick={() => selectedVideo = item}
      />
    {/each}
  </div>
  
  {#if selectedVideo}
    <VideoPlayer 
      item={selectedVideo}
      onClose={() => selectedVideo = null}
    />
  {/if}
</div>
```

### Phase 4: 최적화 및 완성 (2-3일)

#### 4.1 성능 최적화
- 이미지 lazy loading
- 비디오 프리로딩 전략
- 번들 사이즈 최적화

#### 4.2 반응형 처리
```css
/* 모바일/데스크톱 분기 */
@media (max-width: 768px) {
  .m-only { display: block; }
  .dt-only { display: none; }
}

@media (min-width: 769px) {
  .m-only { display: none; }
  .dt-only { display: block; }
}
```

#### 4.3 에러 처리 및 폴백
- 비디오 로드 실패 시 썸네일 표시
- 네트워크 에러 재시도 로직
- 오프라인 모드 대응

## 4. 구현 우선순위

### 즉시 구현 (1주차)
1. **API 클라이언트 설정**
   - 실제 데이터베이스 연동
   - 타입 정의
   
2. **Vimeo Player 컴포넌트**
   - 기본 재생 기능
   - 구간 반복 재생
   
3. **메인 페이지**
   - 비디오 배경
   - 인디케이터

### 다음 구현 (2주차)
4. **Works/Directors/Plan-V 페이지**
   - 갤러리 레이아웃
   - 비디오 플레이어 팝업
   
5. **블로그 페이지**
   - Masonry 레이아웃
   - 이미지 최적화

### 추후 구현 (3주차)
6. **검색 기능**
7. **필터링/정렬**
8. **공유 기능**
9. **애널리틱스**

## 5. 데이터베이스 연동 계획

### 5.1 임시 솔루션 (즉시)
```typescript
// src/lib/db/mock.ts
export const mockDB = {
  items: {
    async findByCategory(category: string, tag: string) {
      // 하드코딩된 데이터 반환
      return mockData[category]?.[tag] || []
    }
  }
}
```

### 5.2 실제 DB 연동 (1-2주 내)
- PostgreSQL + Prisma 또는
- MongoDB + Mongoose 또는
- Firebase Firestore

## 6. 테스트 전략

### 6.1 컴포넌트 테스트
```typescript
// VimeoPlayer.test.ts
import { render } from '@testing-library/svelte'
import VimeoPlayer from './VimeoPlayer.svelte'

test('should autoplay when prop is true', async () => {
  const { component } = render(VimeoPlayer, {
    props: { vimeoId: '123', autoplay: true }
  })
  // ...
})
```

### 6.2 E2E 테스트
- Playwright로 주요 사용자 시나리오 테스트
- 비디오 재생, 페이지 전환, 반응형 등

## 7. 배포 계획

### 7.1 단계적 배포
1. 개발 환경에서 완성
2. 스테이징 환경 테스트
3. 기존 사이트와 A/B 테스트
4. 점진적 트래픽 전환

### 7.2 모니터링
- 성능 메트릭 (Core Web Vitals)
- 에러 추적 (Sentry)
- 사용자 행동 분석

## 8. 예상 일정

| 주차 | 작업 내용 | 완료 기준 |
|------|----------|----------|
| 1주차 | 기초 설정, API 연동, 메인 페이지 | 메인 페이지 동작 |
| 2주차 | Works/Directors/Plan-V 페이지 | 모든 페이지 기본 동작 |
| 3주차 | 최적화, 테스트, 버그 수정 | 프로덕션 준비 완료 |

## 9. 리스크 및 대응 방안

### 9.1 기술적 리스크
- **Vimeo API 제한**: 캐싱 전략 수립
- **대용량 비디오**: CDN 활용, 적응형 스트리밍
- **브라우저 호환성**: 폴리필, 점진적 향상

### 9.2 일정 리스크
- **DB 마이그레이션 지연**: Mock 데이터로 먼저 진행
- **디자인 변경**: 컴포넌트 기반 구조로 유연하게 대응

## 10. 성공 지표

- 페이지 로드 시간 < 3초
- 비디오 시작 시간 < 2초
- 모바일 성능 점수 > 90
- 0% JavaScript 에러율
- 기존 사이트 대비 사용자 체류 시간 증가

이 계획을 따라 단계적으로 구현하면 3주 내에 완전한 클라이언트 마이그레이션을 완료할 수 있습니다.