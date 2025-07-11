import type { PageLoad } from './$types'

export const prerender = false

export const load: PageLoad = async ({ params, parent }) => {
  const { tags } = await parent()
  const { id } = params
  
  // 하드코딩된 Plan V 데이터
  const planVVideos = {
    'plan-v': [
      {
        id: 1,
        name: "FORTNITE",
        desc: "LAUNCHING",
        video_id: "375370796",
        video_url: "https://vimeo.com/375370796",
        video_thumbnail: "https://i.vimeocdn.com/video/834119237-9046ed795114263daf49b954876b123688d53904c7c110168b13aa4b90338688-d_640",
        video_start_at: "10",
        video_end_at: "20",
        tags: []
      },
      {
        id: 2,
        name: "Virtual Production Lab",
        desc: "Next Generation Filmmaking",
        video_id: "744109283",
        video_url: "https://vimeo.com/744109283",
        video_thumbnail: "https://i.vimeocdn.com/video/1497014218-72dab4cbf58a4229d9fc9b1a2a7ed53406bb559aaa8471978ad27538631891d3-d_640",
        video_start_at: "5",
        video_end_at: "30",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/oMy1fJ16rarMHe9WR2dqhuhYS84QHCVC8DLmu21eyKPXNbjmt7ANMj4pFei0QdLRfvas017a0Ocdbt4VMmxvUA_3cvrMEKW6RGd4Dw",
          width: 1915,
          height: 1075
        },
        tags: ["Plan V", "Innovation"]
      },
      {
        id: 3,
        name: "Interactive Experience",
        desc: "Immersive Content Creation",
        video_id: "671411780",
        video_url: "https://vimeo.com/671411780",
        video_thumbnail: "https://i.vimeocdn.com/video/1360206893-746a27154f6cdda8b2efac71f665b2788759238b4eb93642231ba8eff493c1f2-d_640",
        video_start_at: "2",
        video_end_at: "15",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/bjQjjJBFrdH41QqyjmqGCP8dXG4Er1h3je6WjJyZn5ndPvb7IcKgfZVzuXK-lN006lrvgQh83RIBGB5UcakvVP9TVNs2Har5gfRDNglW",
          width: 1920,
          height: 1080
        },
        tags: ["Plan V", "Technology"]
      },
      {
        id: 4,
        name: "SAMSUNG",
        desc: "Micro LED - The Wall",
        video_id: "295912152",
        video_url: "https://vimeo.com/295912152",
        video_thumbnail: "https://i.vimeocdn.com/video/734327368_640.jpg",
        video_start_at: "50",
        video_end_at: "69",
        tags: ["Plan V", "Technology"]
      },
      {
        id: 5,
        name: "XR Studio",
        desc: "Extended Reality Production",
        video_id: "810018484",
        video_url: "https://vimeo.com/810018484",
        video_thumbnail: "https://i.vimeocdn.com/video/1636933408-e7727eca0dd613e056f690fe494a6831d6d45c2da888f16e31146a1a315db879-d_640",
        video_start_at: "10",
        video_end_at: "30",
        tags: ["Plan V", "Innovation"]
      },
      {
        id: 6,
        name: "Real-time Rendering",
        desc: "Unreal Engine Integration",
        video_id: "744109283",
        video_url: "https://vimeo.com/744109283",
        video_thumbnail: "https://i.vimeocdn.com/video/1497014218-72dab4cbf58a4229d9fc9b1a2a7ed53406bb559aaa8471978ad27538631891d3-d_640",
        video_start_at: "5",
        video_end_at: "30",
        tags: ["Plan V", "Technology"]
      }
    ],
    'innovation': [
      {
        id: 1,
        name: "AI-Powered Production",
        desc: "Future of Content Creation",
        video_id: "810018484",
        video_url: "https://vimeo.com/810018484",
        video_thumbnail: "https://i.vimeocdn.com/video/1636933408-e7727eca0dd613e056f690fe494a6831d6d45c2da888f16e31146a1a315db879-d_640",
        video_start_at: "10",
        video_end_at: "30",
        tags: ["Innovation", "Technology"]
      }
    ],
    'featured': [
      {
        id: 1,
        name: "Metaverse Experience",
        desc: "Virtual World Production",
        video_id: "380639720",
        video_url: "https://vimeo.com/380639720",
        video_thumbnail: "https://i.vimeocdn.com/video/841088902_640.jpg",
        video_start_at: "1",
        video_end_at: "30",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/Q56mjm5D_XSST4OsUh09ZNh815NrT7vWYI7n2lZmOu27GXeBZMyQIrKSV_gKn6yIXk-FLrSl7KEjBMs22RYmgwMh",
          width: 1920,
          height: 1080
        },
        tags: ["Featured", "Plan V"]
      }
    ]
  }
  
  // 기본값은 plan-v
  const videos = planVVideos[id] || planVVideos['plan-v']
  
  return {
    videos,
    tags
  }
}