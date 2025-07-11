<script lang="ts">
import { TextAnimation } from "$lib/TextAnimation"
import VideoBackground from "src/src/shared/ui/VideoBackground.svelte"
import VideoPlayer from "$lib/components/VideoPlayer.svelte"

const { data } = $props<{ data: PageData }>()

let doAnimation = $state(false)
let delay1 = $state(0)
let delay2 = $state(0)

const animation = new TextAnimation((animation) => {
  doAnimation = animation.doAnimation
  delay1 = animation.delay1
  delay2 = animation.delay2
})

//
let currentVideoIndex = $state(0)

const videos = data.mainVideos
const currentVideo = $derived(videos[currentVideoIndex % videos.length])

$effect(() => {
  if (currentVideoIndex) {
    animation.stop()
  }
})

const SET_MAIN_VIDEO_INDEX = (index: number) => {
  currentVideoIndex = index
}

const NEXT_MAIN_VIDEO = () => {
  currentVideoIndex++
  animation.stop()
}

//
const handleVideoPlay = () => {
  animation.start()
}

const handleVideoEnded = () => {
  NEXT_MAIN_VIDEO()
  animation.stop()
}

//
let isPlaying = $state(true)
const TOGGLE_VIDEO_PLAY = () => {
  isPlaying = !isPlaying
}

// 비디오 플레이어 팝업  
let showVideoPlayer = $state(false)
const SHOW_VIDEO_PLAYER = (video: any) => {
  showVideoPlayer = true
}

//
let progressPercent = $state(0)
const handleTimeupdate = (e) => {
  progressPercent = e.detail.percent * 100
}

const stopPropagation = (e: Event) => (fn) => {
  e.stopPropagation()
  fn()
}
</script>

<section class="video-background-list" full-screen-banner onclick={() => SHOW_VIDEO_PLAYER(currentVideo)}>
  {#each videos as video}
    <VideoBackground
      {video}
      state={video === currentVideo ? "play" : "pause"}
      visible={video === currentVideo}
      {isPlaying}
      onPlay={handleVideoPlay}
      onEnded={handleVideoEnded}
      onTimeupdate={handleTimeupdate}
    />
  {/each}

  {#if videos.length > 0}
    <section banner-wrap>
      <section banner-desc>
        <div wrap animation-desc>
          <h1 class:animation={doAnimation} style:animation-delay="{delay1}ms">{currentVideo.name}</h1>
          <h2 class:animation={doAnimation} style:animation-delay="{delay2}ms">{currentVideo.desc}</h2>
        </div>
      </section>

      <section banner-indicators>
        <div wrap>
          {#each videos as video, i}
            <div indicator on={i === currentVideoIndex ? true : null} onclick={stopPropagation(() => SET_MAIN_VIDEO_INDEX(i))}></div>
          {/each}
        </div>
      </section>

      <section class="track">
        <div class="progress" style:width="{progressPercent}%"></div>
      </section>
    </section>
  {/if}
</section>

{#if showVideoPlayer && currentVideo}
  <VideoPlayer 
    video={currentVideo} 
    onClose={() => showVideoPlayer = false} 
  />
{/if}

<style>
  /* Full Screen Banner */
  [full-screen-banner] {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    cursor: pointer;
  }
  
  /* Banner Wrap */
  [banner-wrap] {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
  }
  
  /* Banner Description */
  [banner-desc] {
    position: absolute;
    width: 100%;
    left: 0;
    line-height: 60px;
  }
  @media (min-width: 768px) {
    [banner-desc] {
      bottom: 175px;
    }
  }
  @media (max-width: 767px) {
    [banner-desc] {
      bottom: 164px;
    }
  }
  [banner-desc] > [wrap] {
    padding: 0 24px;
  }
  [banner-desc] h1 {
    font-size: 60px;
  }
  [banner-desc] h2 {
    font-size: 40px;
  }
  @media (max-width: 767px) {
    [banner-desc] h1 {
      font-size: 32px;
    }
    [banner-desc] h2 {
      font-size: 24px;
    }
  }
  
  /* Banner Indicators */
  [banner-indicators] {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 120px;
  }
  [banner-indicators] > [wrap] {
    display: flex;
    padding: 0 24px;
  }
  [indicator] {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  [indicator][on] {
    background: rgba(255, 255, 255, 1);
  }
  
  /* Track and Progress */
  .track {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
  }
  .progress {
    height: 100%;
    background: #009be0;
    transition: width 0.1s linear;
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
  
  /* Video Background List */
  .video-background-list {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #000;
  }
</style>
