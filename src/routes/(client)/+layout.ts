import type { PageLoad } from "./$types"
import { http } from "src/src/shared/api/api"

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

export const load: PageLoad = async ({ fetch, params }) => {
  // GitHub Pages용 하드코딩된 데이터
  const mainVideos = [
    {
      id: "1",
      name: "Nike Air Campaign",
      desc: "Revolutionary athletic campaign",
      thumbnail: { src: "https://picsum.photos/1920/1080?random=1" },
      video_thumbnail: "https://picsum.photos/1920/1080?random=1",
      video_id: "123456789",
      video_start_at: "0",
      video_end_at: "30"
    },
    {
      id: "2", 
      name: "Samsung Galaxy",
      desc: "Next generation smartphone",
      thumbnail: { src: "https://picsum.photos/1920/1080?random=2" },
      video_thumbnail: "https://picsum.photos/1920/1080?random=2",
      video_id: "123456790",
      video_start_at: "0",
      video_end_at: "25"
    }
  ]

  const tags = {
    works: ["Nike", "Samsung", "BMW", "Apple"],
    directors: ["Kim", "Lee", "Park", "Choi"],
    "plan v": ["Fashion", "Sport", "Tech", "Music"]
  }

  return {
    mainVideos,
    tags
  }
}
