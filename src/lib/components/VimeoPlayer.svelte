<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  
  interface Props {
    vimeoId: string
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    controls?: boolean
    startAt?: number
    endAt?: number
    onPlay?: () => void
    onPause?: () => void
    onEnded?: () => void
    onTimeupdate?: (data: any) => void
  }
  
  let { 
    vimeoId,
    autoplay = false,
    muted = true,
    loop = false,
    controls = false,
    startAt = 0,
    endAt = 0,
    onPlay,
    onPause,
    onEnded,
    onTimeupdate
  }: Props = $props()
  
  let container: HTMLDivElement
  let player: any
  let isLooping = false
  
  onMount(async () => {
    // Vimeo Player SDK 동적 로드
    if (!window.Vimeo) {
      const script = document.createElement('script')
      script.src = 'https://player.vimeo.com/api/player.js'
      script.async = true
      await new Promise((resolve) => {
        script.onload = resolve
        document.head.appendChild(script)
      })
    }
    
    // Vimeo Player 초기화
    player = new window.Vimeo.Player(container, {
      id: vimeoId,
      autoplay,
      muted,
      loop: loop && !endAt, // endAt이 있으면 커스텀 루프 사용
      controls,
      responsive: true,
      background: !controls, // 컨트롤이 없으면 백그라운드 모드
    })
    
    // 시작 지점 설정
    if (startAt > 0) {
      player.setCurrentTime(startAt)
    }
    
    // 이벤트 핸들러
    if (onPlay) {
      player.on('play', onPlay)
    }
    
    if (onPause) {
      player.on('pause', onPause)
    }
    
    if (onEnded) {
      player.on('ended', onEnded)
    }
    
    // 구간 반복 재생
    if (endAt > 0) {
      player.on('timeupdate', (data: any) => {
        if (data.seconds >= endAt && !isLooping) {
          isLooping = true
          player.setCurrentTime(startAt).then(() => {
            if (loop) {
              player.play()
            }
            isLooping = false
          })
        }
        
        if (onTimeupdate) {
          onTimeupdate({
            ...data,
            percent: startAt > 0 || endAt > 0 
              ? (data.seconds - startAt) / (endAt - startAt)
              : data.percent
          })
        }
      })
    } else if (onTimeupdate) {
      player.on('timeupdate', onTimeupdate)
    }
  })
  
  onDestroy(() => {
    if (player) {
      player.destroy()
    }
  })
  
  // 외부에서 제어할 수 있는 메서드들
  export const play = () => player?.play()
  export const pause = () => player?.pause()
  export const setCurrentTime = (time: number) => player?.setCurrentTime(time)
</script>

<div bind:this={container} class="vimeo-player-container"></div>

<style>
  .vimeo-player-container {
    width: 100%;
    height: 100%;
  }
  
  .vimeo-player-container :global(iframe) {
    width: 100%;
    height: 100%;
  }
</style>