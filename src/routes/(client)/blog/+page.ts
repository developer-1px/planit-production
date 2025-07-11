import type { PageLoad } from "./$types"

export const prerender = false

export const load: PageLoad = async ({ fetch, params }) => {
  // 현재는 하드코딩된 데이터 사용
  // 나중에 API 호출로 변경
  const blogs = [
    {
      id: '1',
      name: 'Behind the Scenes: Nike Campaign',
      cover: {
        src: 'https://picsum.photos/400/600?random=12'
      },
      body: 'Discover how we created the latest Nike campaign with cutting-edge technology and creative storytelling. <img src="https://picsum.photos/800/600?random=13"> Our team worked tirelessly to bring this vision to life.',
      date: '2024-03-15'
    },
    {
      id: '2',
      name: 'Director Spotlight: Kim Sung-hoon',
      cover: {
        src: 'https://picsum.photos/400/300?random=14'
      },
      body: 'Meet our talented director Kim Sung-hoon and learn about his creative process. His unique vision has shaped many of our most successful campaigns.',
      date: '2024-03-10'
    },
    {
      id: '3',
      name: 'The Future of Commercial Production',
      cover: {
        src: 'https://picsum.photos/400/500?random=15'
      },
      body: 'Exploring new technologies and trends in commercial video production. Virtual production, AI-assisted editing, and real-time rendering are changing the game. <img src="https://picsum.photos/800/600?random=16"> The future is here.',
      date: '2024-03-05'
    },
    {
      id: '4',
      name: 'Music Video Revolution',
      cover: {
        src: 'https://picsum.photos/400/400?random=17'
      },
      body: 'How K-pop is changing the landscape of music video production. The demand for high-quality, innovative music videos has never been higher.',
      date: '2024-02-28'
    }
  ]
  
  return {
    blogs
  }
}
