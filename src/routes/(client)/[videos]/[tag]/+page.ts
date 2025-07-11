export async function load({ params, fetch, parent }) {
  const { tags } = await parent()
  
  // URL에서 category 추출 (works, directors, plan-v)
  const category = params.videos
  const tag = params.tag
  
  // API 호출
  const items = await fetch(`/api/items/${category}/${tag}`).then(res => res.json())

  return {
    params,
    items,
    tags
  }
}
