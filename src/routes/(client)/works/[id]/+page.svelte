<script lang="ts">
import { page } from '$app/stores'
import { onMount, onDestroy } from 'svelte'
import VideoBackgroundThumbnail from '$lib/components/VideoBackgroundThumbnail.svelte'
import VideoPlayer from '$lib/components/VideoPlayer.svelte'
import { initMobileVideoScroll } from '$lib/utils/mobileVideoScroll'

const { data } = $props()

// 모바일 스크롤 비디오 재생
let cleanup: (() => void) | undefined
onMount(() => {
  cleanup = initMobileVideoScroll()
})
onDestroy(() => {
  cleanup?.()
})

// URL에서 카테고리와 태그 추출
const category = "works"
const tag = $page.params.id

// 태그 표시용 (대소문자 구분)
let displayTag = $state(tag)
$effect(() => {
  if (data.tags && data.tags[category]) {
    const tags = data.tags[category]
    const lowerTags = tags.map(t => t.toLowerCase())
    const index = lowerTags.indexOf(tag.toLowerCase())
    if (index !== -1) {
      displayTag = tags[index]
    }
  }
})

// 비디오 데이터
const videos = $derived(data.videos || [])

// 비디오 플레이어
let showVideoPlayer = $state(false)
let selectedVideo = $state(null)

function SHOW_VIDEO_PLAYER(video: any) {
  selectedVideo = video
  showVideoPlayer = true
}
</script>

<section title-content>
  <h1>{displayTag}</h1>
</section>

{#if videos.length > 0}
<section initial-content>
  <VideoBackgroundThumbnail 
    video={videos[0]} 
    onClick={() => SHOW_VIDEO_PLAYER(videos[0])}
    let:t
    let:state
    let:willState
  >
    <div initial-content-desc>
      <div wrap animation-desc>
        <h1 class:animation={t.doAnimation} style:animation-delay="{t.delay1}ms">{videos[0].name}</h1>
        <h2 class:animation={t.doAnimation} style:animation-delay="{t.delay2}ms">{videos[0].desc}</h2>
      </div>
    </div>
    <div 
      thumbnail 
      style:background-image="url({videos[0].thumbnail?.src ? videos[0].thumbnail.src + '=s1920' : videos[0].video_thumbnail})"
    ></div>
    <div loading></div>
  </VideoBackgroundThumbnail>
</section>
{/if}

<section grid-works-content>
  {#each videos.slice(1) as video}
    <div works-cell onclick={() => SHOW_VIDEO_PLAYER(video)}>
      <VideoBackgroundThumbnail 
        {video}
        let:t
        let:state
        let:willState
      >
        <div works-cell-desc animation-desc>
          <h1 class:animation={t.doAnimation} style:animation-delay="{t.delay1}ms">{video.name}</h1>
          <h2 class:animation={t.doAnimation} style:animation-delay="{t.delay2}ms">{video.desc}</h2>
        </div>
        <div 
          thumbnail 
          style:background-image="url({video.thumbnail?.src ? video.thumbnail.src + '=s1920' : video.video_thumbnail})"
        ></div>
        <div loading></div>
      </VideoBackgroundThumbnail>
    </div>
  {/each}
</section>

<section video-space>
  <p>Copyright © plan'it production. All rights reserved.</p>
</section>

{#if showVideoPlayer && selectedVideo}
  <VideoPlayer 
    video={selectedVideo} 
    onClose={() => showVideoPlayer = false} 
  />
{/if}

<style>
  /* Title Content */
  [title-content] {
    position: fixed;
    top: 74px;
    right: 24px;
    z-index: 1000;
  }
  [title-content] h1 {
    font-size: 16px;
    line-height: 34px;
  }

  /* Initial Content */
  [initial-content] {
    position: relative;
    width: 100%;
    background-size: cover;
    background: #000;
  }
  [initial-content]:before {
    content: " ";
    display: block;
    padding-top: 56.25%;
  }
  @media (max-width: 767px) {
    [initial-content]:before {
      content: " ";
      display: block;
      padding-top: 100%;
    }
  }
  [initial-content] [initial-content-desc] {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 100;
  }
  [initial-content] [initial-content-desc] > [wrap] {
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    [initial-content] [initial-content-desc] > [wrap] {
      padding: 54px 24px;
    }
  }
  @media (max-width: 767px) {
    [initial-content] [initial-content-desc] > [wrap] {
      padding: 24px;
    }
  }
  @media (min-width: 768px) {
    [initial-content] [initial-content-desc] h1 {
      font-size: 60px;
    }
  }
  @media (max-width: 767px) {
    [initial-content] [initial-content-desc] h1 {
      font-size: 32px;
    }
  }
  @media (min-width: 768px) {
    [initial-content] [initial-content-desc] h2 {
      font-size: 40px;
    }
  }
  @media (max-width: 767px) {
    [initial-content] [initial-content-desc] h2 {
      font-size: 24px;
    }
  }

  /* Grid Works Content */
  @media (min-width: 1024px) {
    [grid-works-content] {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-flow: row dense;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    [grid-works-content] {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: row dense;
    }
  }
  [grid-works-content] [works-cell] {
    flex: 1;
    position: relative;
    background: #000;
    cursor: pointer;
  }
  [grid-works-content] [works-cell]:before {
    content: " ";
    display: block;
    padding-top: 56.25%;
  }
  [grid-works-content] [works-cell] [works-cell-desc] {
    position: absolute;
    left: 24px;
    bottom: 24px;
    line-height: 36px;
  }
  @media (max-width: 767px) {
    [grid-works-content] [works-cell] [works-cell-desc] {
      z-index: 100;
    }
  }
  [grid-works-content] [works-cell] [works-cell-desc] h1 {
    font-size: 32px;
  }
  [grid-works-content] [works-cell] [works-cell-desc] h2 {
    font-size: 24px;
  }

  /* Video Space */
  [video-space] {
    display: block;
    text-align: center;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  [video-space] > * {
    margin: auto;
  }
  [video-space] p {
    color: #999;
    font-size: 11px;
    padding-top: 180px;
  }
  @media (min-width: 768px) {
    [video-space] {
      display: none;
    }
  }

  /* Thumbnail Background */
  [thumbnail] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
  }

  /* Loading */
  [loading] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Animation */
  .animation {
    animation: fadeInUp 1s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>