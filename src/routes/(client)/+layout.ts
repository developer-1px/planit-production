import type { PageLoad } from "./$types"
import { http } from "src/src/shared/api/api"

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

export const load: PageLoad = async ({ fetch, params }) => {
  // GitHub Pages용 하드코딩된 데이터 (기존 메인 비디오들)
  const mainVideos = [
    {
      id: 6196793142411264,
      name: "GALAXY UNPACKED",
      desc: "OPENING with 'Emily in Paris'",
      thumbnail: {
        src: "http://lh3.googleusercontent.com/oMy1fJ16rarMHe9WR2dqhuhYS84QHCVC8DLmu21eyKPXNbjmt7ANMj4pFei0QdLRfvas017a0Ocdbt4VMmxvUA_3cvrMEKW6RGd4Dw"
      },
      video_thumbnail: "https://i.vimeocdn.com/video/1497014218-72dab4cbf58a4229d9fc9b1a2a7ed53406bb559aaa8471978ad27538631891d3-d_640",
      video_id: "744109283",
      video_start_at: "5",
      video_end_at: "30"
    },
    {
      id: 6205471996248064,
      name: "LG OLED TV",
      desc: "Fire",
      thumbnail: {
        src: "http://lh3.googleusercontent.com/bjQjjJBFrdH41QqyjmqGCP8dXG4Er1h3je6WjJyZn5ndPvb7IcKgfZVzuXK-lN006lrvgQh83RIBGB5UcakvVP9TVNs2Har5gfRDNglW"
      },
      video_thumbnail: "https://i.vimeocdn.com/video/1360206893-746a27154f6cdda8b2efac71f665b2788759238b4eb93642231ba8eff493c1f2-d_640",
      video_id: "671411780",
      video_start_at: "2",
      video_end_at: "15"
    },
    {
      id: 6209208080924672,
      name: "Samsung Galaxy",
      desc: "Monster in a Box",
      thumbnail: {
        src: "http://lh3.googleusercontent.com/q1SwAJmbJppuAGnjGfniNwH4xLXSXRAXpz9Oo4BwJ3Rn9vgxT7ICKYZoikjRxAJMYxdtbyLUubs4d4KrkEP3kWazvdWK73HZUbd2wqaS"
      },
      video_thumbnail: "https://i.vimeocdn.com/video/1360216350-4b13a154a7e0a9df787736248547139ed7a0882a35c65548ef64a3ec537b5468-d_640",
      video_id: "671415520",
      video_start_at: null,
      video_end_at: null
    },
    {
      id: 5706275094528000,
      name: "Hyundai",
      desc: "A Message to Space",
      thumbnail: {
        src: "http://lh3.googleusercontent.com/72f9QeIvYM4uypLd0BCoIIR1WExa1JI5pRiWXMZ-PHxXlXQWHTSgGT2vAkUeF5HdbkcELiERf9DbUU5kf3JPu644uTk"
      },
      video_thumbnail: "https://i.vimeocdn.com/video/515670459_640.jpg",
      video_id: "125535849",
      video_start_at: "77",
      video_end_at: "99"
    }
  ]

  const tags = {
    "plan v": ["Coming Soon"],
    directors: ["John S. Park", "Joseph Kahn", "Kyu Ha Kim", "Zong Baik", "Than Vu", "Francis Lawrence", "Kalle Engström", "Brad Furman", "Douglas Avery", "Stacy Wall", "Blair Hayes", "Yoann Lemoine", "Henrik Hansen", "Daniel Carberry", "Marcus Domleo", "Ben Samuel"],
    works: ["Latest", "Featured", "Awards", "Global", "Service Production"]
  }

  return {
    mainVideos,
    tags
  }
}
