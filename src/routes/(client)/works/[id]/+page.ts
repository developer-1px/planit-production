import type { PageLoad } from './$types'

export const prerender = false

export const load: PageLoad = async ({ params, parent, fetch }) => {
  const { tags } = await parent()
  const { id } = params
  
  // 하드코딩된 데이터로 테스트
  const hardcodedData = {
    global: [
      {
        id: 1,
        name: "GALAXY UNPACKED",
        desc: "OPENING with 'Emily in Paris'",
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
        tags: ["Latest", "Global"]
      },
      {
        id: 2,
        name: "LG OLED TV",
        desc: "Fire",
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
        tags: ["Global", "John S. Park"]
      },
      {
        id: 3,
        name: "Samsung Galaxy",
        desc: "Monster in a Box",
        video_id: "671415520",
        video_url: "https://vimeo.com/671415520",
        video_thumbnail: "https://i.vimeocdn.com/video/1360216350-4b13a154a7e0a9df787736248547139ed7a0882a35c65548ef64a3ec537b5468-d_640",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/q1SwAJmbJppuAGnjGfniNwH4xLXSXRAXpz9Oo4BwJ3Rn9vgxT7ICKYZoikjRxAJMYxdtbyLUubs4d4KrkEP3kWazvdWK73HZUbd2wqaS",
          width: 1920,
          height: 1080
        },
        tags: ["Global", "John S. Park"]
      },
      {
        id: 4,
        name: "Hyundai",
        desc: "A Message to Space",
        video_id: "125535849",
        video_url: "https://vimeo.com/125535849",
        video_thumbnail: "https://i.vimeocdn.com/video/515670459_640.jpg",
        video_start_at: "77",
        video_end_at: "99",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/72f9QeIvYM4uypLd0BCoIIR1WExa1JI5pRiWXMZ-PHxXlXQWHTSgGT2vAkUeF5HdbkcELiERf9DbUU5kf3JPu644uTk",
          width: 1920,
          height: 1080
        },
        tags: ["Global", "John S. Park"]
      },
      {
        id: 5,
        name: "Samsung - Frame TV",
        desc: "Art Store X Fred",
        video_id: "671411958",
        video_url: "https://vimeo.com/671411958",
        video_thumbnail: "https://i.vimeocdn.com/video/1360207232-c6f4c0df4bb6d64abe2bcf332c03c70b2b30e6b0e8df7e49b01f63c1cd860e5d-d_640",
        video_start_at: "1",
        video_end_at: "30",
        tags: ["Global"]
      },
      {
        id: 6,
        name: "HYUNDAI VENUE",
        desc: "New York",
        video_id: "336618154",
        video_url: "https://vimeo.com/336618154",
        video_thumbnail: "https://i.vimeocdn.com/video/782127270_640.jpg",
        video_start_at: "72",
        video_end_at: "83",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/X4ENNPIo_r2kkPxqCZhgZhIKmsDRJBrdjXQEgCJ39L6fTXzf4nQKKK3Vlt0HL7M8AWXJqRGsFkYlXL5Cf37VRDrbBe8",
          width: 1920,
          height: 1080
        },
        tags: ["Global", "John S. Park"]
      },
      {
        id: 7,
        name: "KIA SELTOS",
        desc: "Badass",
        video_id: "356456625",
        video_url: "https://vimeo.com/356456625",
        video_thumbnail: "https://i.vimeocdn.com/video/811456799_640.jpg",
        tags: ["Global"]
      },
      {
        id: 8,
        name: "SAMSUNG",
        desc: "The Wall",
        video_id: "295912152",
        video_url: "https://vimeo.com/295912152",
        video_thumbnail: "https://i.vimeocdn.com/video/734327368_640.jpg",
        video_start_at: "50",
        video_end_at: "69",
        tags: ["Global"]
      },
      {
        id: 9,
        name: "GENESIS G90",
        desc: "Athletic Elegance",
        video_id: "295903745",
        video_url: "https://vimeo.com/295903745",
        video_thumbnail: "https://i.vimeocdn.com/video/734316607_640.jpg",
        video_start_at: "23",
        video_end_at: "30",
        tags: ["Global"]
      },
      {
        id: 10,
        name: "SAMSUNG QLED 8K",
        desc: "More than the sum",
        video_id: "375374025",
        video_url: "https://vimeo.com/375374025",
        video_thumbnail: "https://i.vimeocdn.com/video/834123499_640.jpg",
        tags: ["Global"]
      },
      {
        id: 11,
        name: "GENESIS G70",
        desc: "The First Genesis",
        video_id: "295902477",
        video_url: "https://vimeo.com/295902477",
        video_thumbnail: "https://i.vimeocdn.com/video/734314900_640.jpg",
        video_start_at: "38",
        video_end_at: "52",
        tags: ["Global"]
      },
      {
        id: 12,
        name: "KIA IMAGINE",
        desc: "Imagine by KIA",
        video_id: "380639626",
        video_url: "https://vimeo.com/380639626",
        video_thumbnail: "https://i.vimeocdn.com/video/841088740_640.jpg",
        tags: ["Global"]
      }
    ],
    latest: [
      {
        id: 1,
        name: "BEHOLD",
        desc: "GALAXY UNPACKED - RIDLEY SCOTT",
        video_id: "810018484",
        video_url: "https://vimeo.com/810018484",
        video_thumbnail: "https://i.vimeocdn.com/video/1636933408-e7727eca0dd613e056f690fe494a6831d6d45c2da888f16e31146a1a315db879-d_640",
        video_start_at: "10",
        video_end_at: "30",
        tags: ["Latest", "Global"]
      },
      {
        id: 2,
        name: "BEHOLD Behind the scenes",
        desc: "GALAXY UNPACKED - RIDLEY SCOTT",
        video_id: "810019201",
        video_url: "https://vimeo.com/810019201",
        video_thumbnail: "https://i.vimeocdn.com/video/1636937367-1918224dbc9c879aa0f5ca7a46f0d80a33ce4d94d211e1317905f8683d0f82c3-d_640",
        video_start_at: "10",
        video_end_at: "20",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/LBQeBZlSMJ5ntXHdsabZGTZQxrtm2qJqnY_ypELXbXbJ1t3kHgZ3m45zssZPg-Vx5KxXBu6LIUIguPc26Xo__VeGz2uCf6BbIg701iQ",
          width: 3417,
          height: 1357
        },
        tags: ["Latest", "Global"]
      },
      {
        id: 3,
        name: "GALAXY UNPACKED",
        desc: "OPENING with 'Emily in Paris'",
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
        tags: ["Latest", "Global"]
      },
      {
        id: 4,
        name: "HYUNDAI Venue",
        desc: "Urban Vibes",
        video_id: "348117105",
        video_url: "https://vimeo.com/348117105",
        video_thumbnail: "https://i.vimeocdn.com/video/798664280_640.jpg",
        video_start_at: "72",
        video_end_at: "83",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/rWRyduBPi__M-JFhFq0COP3vKzjx_6O9ywNPALwR-jdygYOj6GnjELgN8FqIuTcQTxltiFoYTpEirGH_KM_TnQS-Z8k",
          width: 1920,
          height: 1080
        },
        tags: ["John S. Park", "Global", "Latest"]
      },
      {
        id: 5,
        name: "LG OLED TV",
        desc: "Fire",
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
        tags: ["Latest", "John S. Park"]
      },
      {
        id: 6,
        name: "GENESIS GV70",
        desc: "Face the Exceptional",
        video_id: "554193890",
        video_url: "https://vimeo.com/554193890",
        video_thumbnail: "https://i.vimeocdn.com/video/1145354901_640.jpg",
        tags: ["Latest"]
      }
    ],
    featured: [
      {
        id: 1,
        name: "HERA",
        desc: "seoulista",
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
        tags: ["Featured"]
      },
      {
        id: 2,
        name: "SAMSUNG QLED 8K",
        desc: "This is Real",
        video_id: "295910267",
        video_url: "https://vimeo.com/295910267",
        video_thumbnail: "https://i.vimeocdn.com/video/734323923_640.jpg",
        video_start_at: "30",
        video_end_at: "45",
        tags: ["Featured", "Global"]
      },
      {
        id: 3,
        name: "ETUDE HOUSE",
        desc: "Play 101 Pencil",
        video_id: "295911025",
        video_url: "https://vimeo.com/295911025",
        video_thumbnail: "https://i.vimeocdn.com/video/734324967_640.jpg",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/4sC8HJn8vbmYo99lOJEQrqoZV9QArCJOhBcNI-x_h7QsEWHD-gfKsLGy2yy_PJCZHa7yOxflKTgpFe-z8ypCOFbCWU2j5VSGWUY3Yw",
          width: 1920,
          height: 1080
        },
        tags: ["Featured"]
      },
      {
        id: 4,
        name: "KT 5G",
        desc: "Real 5G Game",
        video_id: "380639812",
        video_url: "https://vimeo.com/380639812",
        video_thumbnail: "https://i.vimeocdn.com/video/841089023_640.jpg",
        tags: ["Featured"]
      },
      {
        id: 5,
        name: "CASS",
        desc: "The Moment",
        video_id: "376062323",
        video_url: "https://vimeo.com/376062323",
        video_thumbnail: "https://i.vimeocdn.com/video/835143379_640.jpg",
        tags: ["Featured"]
      },
      {
        id: 6,
        name: "LG G7",
        desc: "Boombox Speaker",
        video_id: "295906570",
        video_url: "https://vimeo.com/295906570",
        video_thumbnail: "https://i.vimeocdn.com/video/734319934_640.jpg",
        tags: ["Featured", "Global"]
      }
    ]
  }
  
  // 태그별로 데이터 반환
  const videos = hardcodedData[id] || hardcodedData.global
  
  return {
    videos,
    tags
  }
}