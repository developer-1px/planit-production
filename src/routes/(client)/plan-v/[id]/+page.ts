import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ params, parent }) => {
  const { tags } = await parent()
  
  // 현재는 하드코딩된 데이터 사용
  // 나중에 API 호출로 변경
  const mockVideos = [
    {
      id: '1',
      name: 'Plan-V Project',
      desc: 'Featured Work',
      video_id: '824804225',
      thumbnail: {
        src: 'https://picsum.photos/1920/1080?random=20'
      },
      video_thumbnail: 'https://i.vimeocdn.com/video/1234567890.jpg',
      video_start_at: '5',
      video_end_at: '30'
    },
    {
      id: '2',
      name: 'Virtual Production',
      desc: 'Innovation Lab',
      video_id: '824804226',
      thumbnail: {
        src: 'https://picsum.photos/640/360?random=21'
      },
      video_thumbnail: 'https://i.vimeocdn.com/video/1234567891.jpg'
    }
  ]
  
  return {
    videos: mockVideos,
    tags
  }
}