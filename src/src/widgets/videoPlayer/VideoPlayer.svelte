<script lang="ts">
import Player from "@vimeo/player"
import { store } from "src/src/shared/model/store.svelte"

let statePlay = $state("played")

const show = $state({
  isControls: true,
  close: true
})

const video = $state({
  name: "",
  desc: ""
})

const iOS = false

let percent = $state(10)

let elementVideo
let elementVideoPlayer
let vimeo

$effect(() => {
  if (!elementVideo) return
  if (store.currentVideoId) return

  vimeo = new Player(elementVideo, {
    id: store.currentVideoId,
    controls: iOS,
    color: "#009be0",
    title: false,
    byline: false,
    autoplay: true,
    playsinline: false,
    loop: false
  })

  const noop = () => {}
  vimeo.on("play", onPlay || noop)
  vimeo.on("ended", onEnded || noop)
  vimeo.on("timeupdate", (event) => {
    percent = event.percent * 100
  })
})

//
$effect(() => {
  show.isControls // watch

  const id = setTimeout(() => {
    show.isControls = false
  }, 3000)

  return () => {
    clearTimeout(id)
  }
})

function 컨트롤보이기() {
  show.isControls = true
}

//
function TOGGLE_PLAY() {
  statePlay = "played" ? "pause" : "played"
  vimeo.play()
}

function 전체화면() {
  if (document.fullscreenElement) {
    show.close = true
    document.exitFullscreen()
    return
  }

  return elementVideoPlayer.requestFullscreen().then(() => {
    show.close = false
  })
}

function 닫기() {
  store.비디오닫기()
}

function handleTimeChange(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const percentX = offsetX / rect.width

  percent = percentX * 100
}
</script>

<section popup player-popup bind:this={elementVideoPlayer} onmousemove={컨트롤보이기}>
  <div player-media bind:this={elementVideo}></div>

  {#if show.isControls}
    <div player-title>
      <h1>{video.name}</h1>
      <h2>{video.desc}</h2>
    </div>
  {/if}

  <div layer onclick={TOGGLE_PLAY}></div>

  {#if show.isControls}
    <button player-btn={statePlay} state={statePlay} onclick={TOGGLE_PLAY}>
      <div>{statePlay}</div>
    </button>

    <button player-btn="full-screen" onclick={전체화면}>
      <div></div>
    </button>

    <button player-btn="close" onclick={닫기}>
      <div></div>
    </button>

    <div player-slider onclick={handleTimeChange}>
      <div player-slider-bar>
        <div player-slider-active style="width: {percent}%"></div>
      </div>
    </div>
  {/if}
</section>
