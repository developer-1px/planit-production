<script lang="ts">
import { onMount } from 'svelte'

const { data } = $props()

const blogs = data.blogs || []

const html = (body: string) => {
  const img_reg = /<img [^>]*>/g
  body = body.replace(img_reg, (a) => "</p>" + a + "<p>").replace(/<p><\/p>/g, "")
  body = "<p>" + body + "</p>"
  
  // 이미지 src에 =s1024 추가
  const div = document.createElement('div')
  div.innerHTML = body
  div.querySelectorAll('img').forEach(img => {
    if (!img.src.includes('=s')) {
      img.src += '=s1024'
    }
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
  setTimeout(applyMasonry, 100)
  
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

<style>
  /* Grid layout for blog posts */
  [grid-blog-content] {
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    grid-auto-rows: 50px;
    gap: 0;
  }
  
  @media (max-width: 767px) {
    [grid-blog-content] {
      grid-template-columns: 1fr;
    }
  }
  
  /* Individual post styling */
  [post] {
    background: #fff;
    overflow: hidden;
  }
  
  [post][grid-masonry] {
    grid-row-start: auto;
  }
  
  /* Title bar styling */
  [title-bar] {
    height: 50px;
    color: #009be0;
    background: #fff;
    padding: 0 24px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  
  [title-bar="stress"] {
    color: #fff;
    background: #45b8ea;
  }
  
  @media (max-width: 767px) {
    [title-bar] {
      font-size: 16px;
    }
  }
  
  [title-bar] [title] {
    flex: 1;
  }
  
  /* Post image */
  [post-img] {
    overflow: hidden;
  }
  
  [post-img] img {
    display: block;
    width: 100%;
    height: auto;
  }
  
  /* Post description */
  [post-desc] {
    white-space: pre-wrap;
    color: #333;
    padding-top: 13px;
    padding-bottom: 27px;
  }
  
  [post-desc][blog] {
    font-family: "Futura-MediumItalic", "Apple SD Gothic Neo", "Helvetica Neue", 'dotum', sans-serif;
    font-weight: 400;
    line-height: 1.8;
  }
  
  [post-desc] > :global(p) {
    padding-left: 24px;
    padding-right: 24px;
  }
  
  [post-desc] :global(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 20px 0;
  }
  
  [post-desc] :global(a[href]) {
    color: #009be0;
    text-decoration: underline;
  }
  
  [post-desc] :global(strong) {
    color: #000;
    font-weight: bold;
  }
  
  /* Space element */
  [size-header] {
    height: 74px;
  }
</style>