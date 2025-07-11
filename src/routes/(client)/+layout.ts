import type { PageLoad } from "./$types"
import { http } from "src/src/shared/api/api"

// SSR 모드로 변경 (에러 로그 확인용)
export const prerender = false

export const load: PageLoad = async ({ fetch, params }) => {
  // 실제 API 호출
  const mainVideos = await fetch("/api/items/main").then(res => res.json())
  const tags = await fetch("/api/configs/tags").then(res => res.json())

  return {
    mainVideos,
    tags
  }
}
