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
const category = "directors"
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