<script lang="ts">
import Player from "@vimeo/player"
import type { Video } from "src/src/shared/api/api"

const props = $props<{
  video: Video
  state: "play" | "pause"
  visible: boolean
  isPlaying: boolean

  onPlay: Function
  onEnded: Function
  onTimeupdate: Function
}>()

const { video, isPlaying, visible, onPlay, onEnded, onTimeupdate } = props

let element: HTMLElement = $state(null)
let vimeo = $state(null)
let loaded = $state(false)

const noop = () => {}

// Vimeo 플레이어 초기화
$effect(() => {
  if (!element || vimeo) return
  
  vimeo = new Player(element, {
    id: video.video_id,
    background: true,
    autoplay: false,
    autopause: true,
    loop: true
  })

  // 이벤트 핸들러
  vimeo.on("play", () => {
    if (onPlay) onPlay()
  })

  vimeo.on("loaded", async () => {
    loaded = true
    // [구간반복] 로딩시, start_at 위치로..
    if (video.video_start_at) {
      await vimeo.setCurrentTime(parseFloat(video.video_start_at))
    }
  })

  vimeo.on("timeupdate", (data) => {
    // percent 계산하여 전달
    if (onTimeupdate) {
      onTimeupdate({ 
        detail: { 
          percent: data.percent,
          seconds: data.seconds 
        } 
      })
    }
    
    // [구간반복] end_at을 만나면 처음으로
    if (video.video_end_at && data.seconds >= parseFloat(video.video_end_at)) {
      vimeo.setCurrentTime(parseFloat(video.video_start_at || "0"))
      if (onEnded) onEnded()
    }
  })

  vimeo.on("ended", async () => {
    // [구간반복] 끝나면 처음으로
    await vimeo.setCurrentTime(parseFloat(video.video_start_at || "0"))
    if (onEnded) onEnded()
  })
})

// state 변경에 따른 재생/일시정지
$effect(() => {
  if (!vimeo || !loaded) return

  if (props.state === "play") {
    vimeo.play()
  } else if (props.state === "pause") {
    vimeo.pause().then(() => {
      // [구간반복] 멈추면 처음으로
      if (video.video_start_at) {
        vimeo.setCurrentTime(parseFloat(video.video_start_at))
      }
    })
  }
})
</script>

<div class="layer video-background-wrapper" class:hidden={!visible}>
  <div class="video-background" bind:this={element}></div>
  <div class="layer bg(#000.0) pack"></div>
</div>

<style>
  .video-background-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    overflow: hidden;
  }
  
  .video-background:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000 url("/img/loading.gif") no-repeat center center;
    background-size: auto 8px;
  }
  
  .video-background :global(iframe) {
    width: 100vw;
    height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
    min-height: 100vh;
    min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .hidden {
    display: none;
  }
</style>