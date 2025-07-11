<script lang="ts">
import { onMount } from 'svelte'

const { data } = $props<{ data: PageData }>()

const blogs = data.blogs || []

const html = (body: string) => {
  const img_reg = /<img [^>]*>/g
  body = body.replace(img_reg, (a) => "</p>" + a + "<p>").replace(/<p><\/p>/g, "")
  body = "<p>" + body + "</p>"
  
  // 이미지 src에 =s1024 추가
  const div = document.createElement('div')
  div.innerHTML = body
  div.querySelectorAll('img').forEach(img => {
    img.src += '=s1024'
  })
  
  return div.innerHTML
}

// Masonry 레이아웃 적용
function applyMasonry() {
  const posts = document.querySelectorAll('[grid-masonry]')
  posts.forEach((el: HTMLElement) => {
    const height = el.lastElementChild!.getBoundingClientRect().bottom - el.firstElementChild!.getBoundingClientRect().top
    el.style.gridRowEnd = `span ${Math.round(height / 50)}`
  })
}

onMount(() => {
  // 초기 실행
  applyMasonry()
  
  // 주기적으로 재조정
  const interval = setInterval(applyMasonry, 500)
  
  return () => clearInterval(interval)
})
</script>

<space size-header></space>

<section grid-blog-content>
  {#each blogs as blog}
    <div post grid-masonry>
      <h1 title-bar="stress">
        <div title>{blog.name}</div>
      </h1>
      {#if blog.cover?.src}
        <div post-img><img src="{blog.cover.src}=s1024" alt={blog.name} /></div>
      {/if}
      <div post-desc blog>{@html html(blog.body)}</div>
    </div>
  {/each}
</section>