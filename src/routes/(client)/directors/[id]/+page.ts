import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, parent }) => {
  const { tags } = await parent()
  
  // 현재는 하드코딩된 데이터 사용
  // 나중에 API 호출로 변경
  const mockVideos = [
    {
      id: '1',
      name: 'Directors Reel',
      desc: 'John S. Park',
      video_id: '824804225',
      thumbnail: {
        src: 'https://picsum.photos/1920/1080?random=10'
      },
      video_thumbnail: 'https://i.vimeocdn.com/video/1234567890.jpg',
      video_start_at: '5',
      video_end_at: '30'
    },
    {
      id: '2',
      name: 'Commercial Works',
      desc: 'John S. Park',
      video_id: '824804226',
      thumbnail: {
        src: 'https://picsum.photos/640/360?random=11'
      },
      video_thumbnail: 'https://i.vimeocdn.com/video/1234567891.jpg'
    }
  ]
  
  return {
    videos: mockVideos,
    tags
  }
}