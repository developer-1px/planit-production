# UI 우선 클라이언트 마이그레이션 계획서

> API를 제일 나중으로 하고 일단 전체 화면을 중심으로 기본기능과 보여지는 걸 우선으로 해. 그래야 컨펌을 받지

## 전략 변경: UI First, API Later

목표: **2주 안에 모든 화면을 하드코딩 데이터로 완성**하여 디자인/기능 컨펌을 받은 후 API 연동

## 1. 즉시 구현 계획 (1-3일)

### Day 1: 메인 페이지 UI

#### 1.1 비디오 배경 컴포넌트
```svelte
<!-- src/routes/(client)/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  
  // 하드코딩 데이터
  const mainVideos = [
    {
      id: '1',
      title: 'Opening Reel 2024',
      description: 'Latest Works Collection',
      vimeo_id: '824804225',
      thumbnail: 'https://i.vimeocdn.com/video/1234567890.jpg',
      video_start_at: 0,
      video_end_at: 30
    },
    {
      id: '2',
      title: 'Directors Cut',
      description: 'Featured Directors',
      vimeo_id: '824804226',
      thumbnail: 'https://i.vimeocdn.com/video/1234567891.jpg'
    }
  ]
  
  let currentIndex = 0
  let videoElement: HTMLVideoElement
  
  onMount(() => {
    // 임시로 비디오 태그 사용 (Vimeo 연동은 나중에)
    if (videoElement) {
      videoElement.play()
    }
  })
</script>

<div class="main-page">
  <!-- 비디오 배경 -->
  <div class="video-background">
    <video 
      bind:this={videoElement}
      src="/sample-video.mp4" 
      autoplay 
      muted 
      loop
      class="w-full h-full object-cover"
    >
    </video>
    
    <!-- 오버레이 텍스트 -->
    <div class="overlay absolute inset-0 flex items-center justify-center">
      <div class="text-center text-white">
        <h1 class="text-6xl font-bold mb-4 opacity-0 animate-fade-in">
          {mainVideos[currentIndex].title}
        </h1>
        <p class="text-2xl opacity-0 animate-fade-in animation-delay-300">
          {mainVideos[currentIndex].description}
        </p>
      </div>
    </div>
  </div>
  
  <!-- 인디케이터 -->
  <div class="indicators absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
    {#each mainVideos as video, i}
      <button 
        class="w-12 h-1 bg-white/50 transition-all"
        class:bg-white={i === currentIndex}
        class:w-24={i === currentIndex}
        on:click={() => currentIndex = i}
      />
    {/each}
  </div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }
  
  .animation-delay-300 {
    animation-delay: 300ms;
  }
</style>
```

### Day 2: Works/Directors/Plan-V 갤러리 페이지

#### 2.1 갤러리 레이아웃 컴포넌트
```svelte
<!-- src/lib/components/VideoGallery.svelte -->
<script lang="ts">
  export let videos = []
  export let heroVideo = null
  
  let selectedVideo = null
  let showPlayer = false
  
  function playVideo(video) {
    selectedVideo = video
    showPlayer = true
  }
</script>

<div class="video-gallery">
  <!-- 히어로 비디오 -->
  {#if heroVideo}
    <div class="hero-section mb-20">
      <div class="relative aspect-video max-w-6xl mx-auto cursor-pointer group"
           on:click={() => playVideo(heroVideo)}>
        <img src={heroVideo.thumbnail} alt={heroVideo.title} 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <svg class="w-20 h-20 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div class="absolute bottom-0 left-0 p-8 text-white">
          <h2 class="text-4xl font-bold">{heroVideo.title}</h2>
          <p class="text-xl mt-2">{heroVideo.description}</p>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- 비디오 그리드 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
    {#each videos as video}
      <div class="video-item cursor-pointer group" on:click={() => playVideo(video)}>
        <div class="relative aspect-video overflow-hidden">
          <img src={video.thumbnail} alt={video.title}
               class="w-full h-full object-cover transition-transform group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div class="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
            <h3 class="font-bold">{video.title}</h3>
            <p class="text-sm">{video.client}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- 비디오 플레이어 모달 -->
{#if showPlayer}
  <div class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
       on:click={() => showPlayer = false}>
    <div class="relative max-w-6xl w-full mx-8">
      <button class="absolute -top-12 right-0 text-white hover:text-gray-300">
        <svg class="w-8 h-8" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <div class="aspect-video bg-black">
        <!-- 임시 비디오 -->
        <video src="/sample-video.mp4" controls autoplay class="w-full h-full" />
      </div>
      <div class="text-white mt-4">
        <h2 class="text-2xl font-bold">{selectedVideo?.title}</h2>
        <p class="mt-2">{selectedVideo?.description}</p>
      </div>
    </div>
  </div>
{/if}
```

#### 2.2 Works 페이지 구현
```svelte
<!-- src/routes/(client)/works/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores'
  import VideoGallery from '$lib/components/VideoGallery.svelte'
  
  // 하드코딩 데이터
  const worksData = {
    'commercial': {
      hero: {
        id: '1',
        title: 'Nike - Just Do It',
        description: 'Global Campaign 2024',
        client: 'Nike',
        thumbnail: 'https://picsum.photos/1920/1080?random=1',
        vimeo_id: '824804225'
      },
      videos: [
        {
          id: '2',
          title: 'Samsung Galaxy',
          client: 'Samsung',
          thumbnail: 'https://picsum.photos/640/360?random=2'
        },
        {
          id: '3',
          title: 'Coca-Cola Summer',
          client: 'Coca-Cola',
          thumbnail: 'https://picsum.photos/640/360?random=3'
        },
        // ... 더 많은 비디오
      ]
    },
    'music-video': {
      // ... 뮤직비디오 데이터
    }
  }
  
  $: category = $page.params.id
  $: data = worksData[category] || worksData['commercial']
</script>

<div class="works-page">
  <VideoGallery heroVideo={data.hero} videos={data.videos} />
</div>
```

### Day 3: 블로그 & 네비게이션

#### 3.1 블로그 페이지 (Masonry 레이아웃)
```svelte
<!-- src/routes/(client)/blog/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  
  const blogPosts = [
    {
      id: '1',
      title: 'Behind the Scenes: Nike Campaign',
      image: 'https://picsum.photos/400/600?random=1',
      excerpt: 'Discover how we created the latest Nike campaign...',
      date: '2024-03-15'
    },
    {
      id: '2',
      title: 'Director Spotlight: John Doe',
      image: 'https://picsum.photos/400/300?random=2',
      excerpt: 'Meet our talented director John Doe...',
      date: '2024-03-10'
    },
    // ... 더 많은 포스트
  ]
  
  let columns = 3
  
  onMount(() => {
    // 반응형 컬럼 수 조정
    const updateColumns = () => {
      if (window.innerWidth < 768) columns = 1
      else if (window.innerWidth < 1024) columns = 2
      else columns = 3
    }
    
    updateColumns()
    window.addEventListener('resize', updateColumns)
    
    return () => window.removeEventListener('resize', updateColumns)
  })
</script>

<div class="blog-page px-8 py-12">
  <h1 class="text-4xl font-bold mb-12">Blog</h1>
  
  <div class="masonry-grid" style="column-count: {columns}; column-gap: 2rem;">
    {#each blogPosts as post}
      <article class="break-inside-avoid mb-8 cursor-pointer group">
        <div class="overflow-hidden">
          <img src={post.image} alt={post.title} 
               class="w-full transition-transform group-hover:scale-105" />
        </div>
        <div class="mt-4">
          <time class="text-sm text-gray-500">{post.date}</time>
          <h2 class="text-xl font-bold mt-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p class="mt-2 text-gray-600">{post.excerpt}</p>
        </div>
      </article>
    {/each}
  </div>
</div>
```

#### 3.2 네비게이션 컴포넌트
```svelte
<!-- src/routes/(client)/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores'
  
  let menuOpen = false
  
  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/works/commercial', label: 'Works' },
    { href: '/directors/all', label: 'Directors' },
    { href: '/plan-v/featured', label: 'Plan-V' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]
</script>

<div class="client-layout">
  <!-- 네비게이션 -->
  <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-40 border-b">
    <div class="px-8 py-4 flex justify-between items-center">
      <a href="/" class="text-2xl font-bold">PLANIT</a>
      
      <!-- 데스크톱 메뉴 -->
      <ul class="hidden md:flex gap-8">
        {#each menuItems as item}
          <li>
            <a href={item.href} 
               class="hover:text-blue-600 transition-colors"
               class:text-blue-600={$page.url.pathname === item.href}>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
      
      <!-- 모바일 메뉴 버튼 -->
      <button class="md:hidden" on:click={() => menuOpen = !menuOpen}>
        <svg class="w-6 h-6" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
    </div>
  </nav>
  
  <!-- 모바일 메뉴 -->
  {#if menuOpen}
    <div class="fixed inset-0 bg-white z-50 md:hidden">
      <div class="p-8">
        <button on:click={() => menuOpen = false} class="mb-8">
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <ul class="space-y-6">
          {#each menuItems as item}
            <li>
              <a href={item.href} 
                 class="text-2xl hover:text-blue-600"
                 on:click={() => menuOpen = false}>
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
  
  <!-- 컨텐츠 -->
  <main class="pt-16">
    <slot />
  </main>
</div>
```

## 2. 주요 기능 구현 (4-7일)

### Day 4-5: Vimeo 플레이어 통합

```svelte
<!-- src/lib/components/VimeoPlayer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  
  export let vimeoId: string
  export let autoplay = false
  export let controls = true
  
  let container: HTMLDivElement
  
  onMount(() => {
    // Vimeo Player SDK 로드
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.onload = () => {
      // @ts-ignore
      const Player = window.Vimeo.Player
      const player = new Player(container, {
        id: vimeoId,
        autoplay,
        controls,
        responsive: true
      })
      
      player.on('play', () => console.log('Video playing'))
    }
    document.head.appendChild(script)
  })
</script>

<div bind:this={container} class="vimeo-container aspect-video"></div>
```

### Day 6-7: 애니메이션 & 인터랙션

```svelte
<!-- src/lib/components/TextAnimation.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  
  export let text: string
  export let delay = 0
  
  let visible = false
  
  onMount(() => {
    setTimeout(() => visible = true, delay)
  })
</script>

<div class="text-animation" class:visible>
  {#each text.split('') as char, i}
    <span style="animation-delay: {delay + i * 50}ms">
      {char === ' ' ? '\u00A0' : char}
    </span>
  {/each}
</div>

<style>
  .text-animation span {
    opacity: 0;
    display: inline-block;
    transform: translateY(20px);
  }
  
  .text-animation.visible span {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

## 3. 반응형 & 최적화 (8-10일)

### 모바일 최적화
- 터치 제스처 지원
- 모바일 네비게이션
- 이미지 크기 최적화

### 성능 최적화
- 이미지 lazy loading
- 컴포넌트 code splitting
- CSS 최적화

## 4. 컨펌 후 API 연동 (11-14일)

### API 연동 전략
```typescript
// src/lib/api/mock.ts
export const mockAPI = {
  async getMainVideos() {
    // 하드코딩 데이터 반환
    return mainVideos
  },
  
  async getWorksByCategory(category: string) {
    // 하드코딩 데이터 반환
    return worksData[category]
  }
}

// 나중에 실제 API로 교체
// src/lib/api/real.ts
export const realAPI = {
  async getMainVideos() {
    const response = await fetch('/api/items/main')
    return response.json()
  }
}
```

## 5. 구현 우선순위

### 1주차: UI 완성
1. **Day 1**: 메인 페이지 (비디오 배경, 애니메이션)
2. **Day 2**: Works/Directors/Plan-V 갤러리
3. **Day 3**: 블로그, 네비게이션
4. **Day 4-5**: Vimeo 플레이어 통합
5. **Day 6-7**: 애니메이션, 인터랙션 완성

### 2주차: 최적화 & API
6. **Day 8-10**: 반응형, 성능 최적화
7. **Day 11-14**: API 연동 (컨펌 후)

## 6. 체크리스트

### UI 컨펌 받을 항목들
- [ ] 메인 페이지 비디오 자동재생
- [ ] 비디오 전환 애니메이션
- [ ] 갤러리 레이아웃 (히어로 + 그리드)
- [ ] 비디오 플레이어 모달
- [ ] 블로그 Masonry 레이아웃
- [ ] 모바일 반응형
- [ ] 로딩 애니메이션
- [ ] 페이지 전환 효과

### 기술적 확인사항
- [ ] Vimeo 자동재생 (muted 필수)
- [ ] iOS Safari 호환성
- [ ] 구간 반복 재생
- [ ] 썸네일 품질
- [ ] 폰트 로딩

## 7. 샘플 데이터 준비

```typescript
// src/lib/data/samples.ts
export const sampleVideos = {
  main: [
    {
      id: '1',
      title: 'Opening Reel 2024',
      vimeo_id: '824804225', // 실제 Vimeo ID
      thumbnail: '/samples/thumb1.jpg',
      video_start_at: 0,
      video_end_at: 30
    }
  ],
  works: {
    commercial: [/* ... */],
    musicVideo: [/* ... */],
    documentary: [/* ... */]
  },
  directors: {
    /* ... */
  }
}
```

이 계획대로 진행하면 **2주 안에 모든 UI를 완성**하여 클라이언트 컨펌을 받을 수 있고, 그 후 API 연동을 진행할 수 있습니다.