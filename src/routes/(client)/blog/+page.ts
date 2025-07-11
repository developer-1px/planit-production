import type { PageLoad } from "./$types"

export const prerender = false

export const load: PageLoad = async ({ fetch, params }) => {
  // API에서 가져온 실제 블로그 데이터
  const response = await fetch('/api/blogs')
  const data = await response.json()
  
  // 데이터를 배열 형태로 변환
  const blogs = []
  for (const key in data) {
    if (key !== 'next' && key !== 'length' && key !== 'more') {
      blogs.push(data[key])
    }
  }
  
  return {
    blogs
  }
}
