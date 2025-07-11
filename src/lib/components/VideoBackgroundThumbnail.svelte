<script lang="ts">
import Player from "@vimeo/player"
import { onMount, onDestroy } from "svelte"
import { TextAnimation } from "$lib/TextAnimation"

interface Props {
  video: any
  onClick?: () => void
}

let { video, onClick }: Props = $props()

let element: HTMLElement = $state(null)
let vimeo: Player = $state(null)
let state = $state("loading")
let willState = $state("")
let t = new TextAnimation((animation) => {
  t = animation
})

const isMobile = typeof window !== 'undefined' && 'ontouchstart' in document

onMount(() => {
  if (!element || !video.video_id) return

  // Vimeo 플레이어 초기화
  vimeo = new Player(element, {
    id: video.video_id,
    background: true,
    autoplay: false,
    loop: true,
  })

  // 초기 일시정지
  vimeo.pause()

  // [구간반복] 로딩시, start_at 위치로..
  if (video.video_start_at) {
    vimeo.setCurrentTime(parseFloat(video.video_start_at))
  }

  // 이벤트 핸들러
  vimeo.on("play", () => {
    state = "played"
    willState = "played"
    t.start()
  })

  vimeo.on("pause", () => {
    state = "paused"
    willState = "paused"
  })

  vimeo.on("loaded", () => {
    state = "paused"
  })

  // [구간반복] end_at을 만나면 처음으로
  if (video.video_end_at) {
    vimeo.on("timeupdate", (data) => {
      if (data.seconds >= parseFloat(video.video_end_at)) {
        vimeo.setCurrentTime(parseFloat(video.video_start_at || "0"))
      }
    })
  }

  // [구간반복] 끝나면 처음으로
  vimeo.on("ended", () => {
    vimeo.setCurrentTime(parseFloat(video.video_start_at || "0"))
  })
})

// 데스크톱 마우스 이벤트
function handleMouseEnter() {
  if (!isMobile && vimeo) {
    vimeo.play()
  }
}

function handleMouseLeave() {
  if (!isMobile && vimeo) {
    t.stop()
    vimeo.pause()
  }
}

// 모바일 스크롤 재생
export function play() {
  if (vimeo) vimeo.play()
}

export function pause() {
  if (vimeo) vimeo.pause()
}

onDestroy(() => {
  if (vimeo) {
    vimeo.destroy()
  }
})
</script>

<div 
  class="video-background-thumbnail"
  attr-state={state}
  attr-will-state={willState}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onclick={onClick}
>
  <slot {t} {state} {willState} />
  <div class="vimeo-container" bind:this={element}></div>
</div>

<style>
  .video-background-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    overflow: hidden;
    cursor: pointer;
  }
  
  .vimeo-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .video-background-thumbnail :global(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  
  /* Thumbnail specific styles */
  .video-background-thumbnail :global([animation-desc]) {
    display: none;
  }
  
  .video-background-thumbnail :global([thumbnail]) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center center;
    transition: opacity 0.38s;
    z-index: 1;
  }
  
  .video-background-thumbnail :global(div[loading]) {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("/img/loading.gif") no-repeat center center;
    background-size: auto 8px;
    z-index: 100;
    display: none;
  }
  
  .video-background-thumbnail[attr-will-state="played"] :global(div[loading]) {
    display: block;
  }
  
  .video-background-thumbnail[attr-state="played"] :global(div[loading]) {
    display: none;
  }
  
  .video-background-thumbnail[attr-state="played"] :global([animation-desc]) {
    display: block;
  }
  
  .video-background-thumbnail[attr-state="played"] :global([thumbnail]) {
    opacity: 0;
  }
  
  .video-background-thumbnail[attr-state="played"][attr-will-state="paused"] :global(div[thumbnail]) {
    opacity: 1;
  }
  
  .video-background-thumbnail:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0);
    z-index: 1;
  }
</style>