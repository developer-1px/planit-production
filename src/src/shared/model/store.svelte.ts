import { afterNavigate } from "$app/navigation"

class Store {
  nav = $state("")
  tags = $state({
    works: [],
    "plan v": [],
    directors: []
  })

  currentVideoId = $state("")

  init() {
    afterNavigate(() => {
      this.메뉴선택("")
    })
  }

  setTags(tags) {
    this.tags = Object.fromEntries(Object.entries(tags).map(([key, value]) => [
      key, 
      Array.isArray(value) ? value : value.split(/\s*\n\s*/)
    ]))
  }

  메뉴선택(nav) {
    this.nav = this.nav === nav ? "" : nav
  }

  비디오보기(videoId: string) {
    this.currentVideoId = videoId
  }

  비디오닫기() {
    this.currentVideoId = null
  }
}

export const store = new Store()

if (typeof window !== "undefined") {
  window.state = store
}
