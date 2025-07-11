<script lang="ts">
import Player from "@vimeo/player"
import { onMount, onDestroy } from "svelte"

interface Props {
  video: any
  onClose: () => void
}

let { video, onClose }: Props = $props()

let videoElement: HTMLElement = $state(null)
let vimeo: Player = $state(null)
let showControls = $state(true)
let showClose = $state(true)
let percent = $state(0)
let state = $state("paused")
let autoHideTimer: number

const iOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

// Vimeo 플레이어 초기화
onMount(() => {
  if (!videoElement) return

  vimeo = new Player(videoElement, {
    id: video.video_id,
    controls: iOS,
    color: "#009be0",
    title: false,
    byline: false,
    autoplay: true,
    playsinline: false,
    loop: false
  })

  // 이벤트 핸들러
  vimeo.on("play", () => {
    state = "played"
  })

  vimeo.on("pause", () => {
    state = "paused"
  })

  vimeo.on("timeupdate", (data) => {
    percent = data.percent * 100
  })

  // iOS가 아닌 경우에만 자동 숨김 타이머 설정
  if (!iOS) {
    startAutoHideTimer()
  }

  // 자동 재생
  vimeo.play()
})

// 자동 숨김 타이머
function startAutoHideTimer() {
  showControls = true
  clearTimeout(autoHideTimer)
  
  autoHideTimer = window.setTimeout(() => {
    showControls = false
  }, 3000)
}

// 마우스 움직임 감지
function handleMouseActivity() {
  if (!iOS) {
    startAutoHideTimer()
  }
}

// 재생/일시정지 토글
function togglePlay() {
  if (!vimeo) return
  
  if (state === "played") {
    vimeo.pause()
  } else {
    vimeo.play()
  }
}

// 전체화면
function fullscreen() {
  const elem = document.documentElement
  
  if (document.fullscreenElement) {
    showClose = true
    document.exitFullscreen()
  } else {
    elem.requestFullscreen().then(() => {
      showClose = false
    })
  }
}

// 시간 변경
function timechange(event: MouseEvent) {
  if (!vimeo) return
  
  const rect = event.currentTarget.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const percentX = offsetX / rect.width
  
  vimeo.getDuration().then(duration => {
    vimeo.setCurrentTime(duration * percentX)
  })
}

// 닫기
function close() {
  onClose()
}

onDestroy(() => {
  clearTimeout(autoHideTimer)
  if (vimeo) {
    vimeo.destroy()
  }
})
</script>

{#if !iOS}
<section popup player-popup 
  onmousedown={handleMouseActivity}
  onmousemove={handleMouseActivity}
  onclick={handleMouseActivity}
>
  <div player-media bind:this={videoElement}></div>

  <div player-title hidden class:visible={showControls}>
    <h1>{video.name}</h1>
    <h2>{video.desc}</h2>
  </div>

  <div layer onclick={togglePlay}></div>

  <div player-btn="play" class:visible={showControls} attr-state={state} onclick={(e) => {
    e.stopPropagation()
    togglePlay()
  }}>
    <div></div>
  </div>

  <div player-btn="full-screen" class:visible={showControls} onclick={(e) => {
    e.stopPropagation()
    fullscreen()
  }}>
    <div></div>
  </div>

  <div player-btn="close" class:visible={showControls} onclick={(e) => {
    e.stopPropagation()
    close()
  }} hidden class:visible={showClose}>
    <div></div>
  </div>

  <div player-slider class:visible={showControls} onclick={(e) => {
    e.stopPropagation()
    timechange(e)
  }}>
    <div player-slider-bar>
      <div player-slider-active style:width="{percent}%"></div>
    </div>
  </div>
</section>
{:else}
<section popup player-popup>
  <div player-media bind:this={videoElement}></div>

  <div player-btn="close" class:visible={showControls} onclick={(e) => {
    e.stopPropagation()
    close()
  }} hidden class:visible={showClose}>
    <div></div>
  </div>
</section>
{/if}

<style>
  .visible {
    display: block !important;
  }
  
  [hidden]:not(.visible) {
    display: none !important;
  }
</style>