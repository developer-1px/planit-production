// 모바일 스크롤 시 화면에 보이는 첫 번째 비디오 재생
export function initMobileVideoScroll() {
  if (!('ontouchstart' in document)) return

  let scrollTimer: number

  const playCurrent = () => {
    const elements = document.querySelectorAll('video-background-thumbnail')
    let firstVisible = false

    elements.forEach((el: any) => {
      if (!firstVisible) {
        const rect = el.getBoundingClientRect()
        
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          firstVisible = true
          if (el.play) el.play()
          return
        }
      }
      
      if (el.pause) el.pause()
    })
  }

  const handleScroll = () => {
    clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => {
      playCurrent()
    }, 500)
  }

  window.addEventListener('scroll', handleScroll)
  
  // 초기 실행
  setTimeout(playCurrent, 1000)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}