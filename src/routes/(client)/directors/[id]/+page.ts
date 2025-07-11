import type { PageLoad } from './$types'

export const prerender = false

export const load: PageLoad = async ({ params, parent }) => {
  const { tags } = await parent()
  const { id } = params
  
  // 하드코딩된 감독별 데이터
  const directorVideos = {
    'john-s-park': [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        tags: ["Global ", "John S. Park"]
      },
      {
        id: 4,
        name: "Hyundai Venue",
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
        name: "KIA SELTOS",
        desc: "Badass",
        video_id: "356456625",
        video_url: "https://vimeo.com/356456625",
        video_thumbnail: "https://i.vimeocdn.com/video/811456799_640.jpg",
        tags: ["John S. Park", "Global"]
      },
      {
        id: 6,
        name: "GENESIS G90",
        desc: "Athletic Elegance",
        video_id: "295903745",
        video_url: "https://vimeo.com/295903745",
        video_thumbnail: "https://i.vimeocdn.com/video/734316607_640.jpg",
        video_start_at: "23",
        video_end_at: "30",
        tags: ["John S. Park", "Global"]
      },
      {
        id: 7,
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
        tags: ["John S. Park", "Global"]
      },
      {
        id: 8,
        name: "GENESIS G70",
        desc: "The First Genesis",
        video_id: "295902477",
        video_url: "https://vimeo.com/295902477",
        video_thumbnail: "https://i.vimeocdn.com/video/734314900_640.jpg",
        video_start_at: "38",
        video_end_at: "52",
        tags: ["John S. Park", "Global"]
      }
    ],
    'kaye-hwang': [
      {
        id: 1,
        name: "Hoegaarden",
        desc: "Botanic",
        video_id: "554195560",
        video_url: "https://vimeo.com/554195560",
        video_thumbnail: "https://i.vimeocdn.com/video/1145357390_640",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/xe3_CJ87ESWJo2eT1jR6n9QAeIgPnRoTyoA9lqaacCdT5FZplveDsi4ReOc_rj9lFv34sBk-5IE8KWEzN3JvkafdkkvpSkAVCx0uy_U",
          width: 1920,
          height: 1080
        },
        tags: ["Kaye Hwang"]
      },
      {
        id: 2,
        name: "Hyundai Card",
        desc: "MX Boost",
        video_id: "547487701",
        video_url: "https://vimeo.com/547487701",
        video_thumbnail: "https://i.vimeocdn.com/video/1133551159_640.jpg",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/uod1Fdmg0shLX8jNS1INsX85DWMOWC0rxH6CTLvbps2otFqHkShlKsKEdHfkftsDXAOqvwGmEQD5RpudQVOKqT-YhVyfyaJK7Hp_7Fw",
          width: 1920,
          height: 1080
        },
        tags: ["Kaye Hwang"]
      },
      {
        id: 3,
        name: "Samsung",
        desc: "THE FIRST LOOK 2021 Teaser",
        video_id: "547487301",
        video_url: "https://vimeo.com/547487301",
        video_thumbnail: "https://i.vimeocdn.com/video/1133550524_640.jpg",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/rObZla4lUjoVG6WX03ukUR4f-tanGKHCGpEYru5I4IpF1_f1AaqhdvVxD0x6U8iDKBgKoqqB5iDRltfY9CZ2rRy9FXr4GOTN1EkF5g",
          width: 1920,
          height: 1080
        },
        tags: ["Global", "Kaye Hwang"]
      },
      {
        id: 4,
        name: "SAMSUNG",
        desc: "The Frame X Fred",
        video_id: "671411958",
        video_url: "https://vimeo.com/671411958",
        video_thumbnail: "https://i.vimeocdn.com/video/1360207232-c6f4c0df4bb6d64abe2bcf332c03c70b2b30e6b0e8df7e49b01f63c1cd860e5d-d_640",
        video_start_at: "1",
        video_end_at: "30",
        tags: ["Kaye Hwang", "Global"]
      },
      {
        id: 5,
        name: "KT 5G",
        desc: "Real 5G Game",
        video_id: "380639812",
        video_url: "https://vimeo.com/380639812",
        video_thumbnail: "https://i.vimeocdn.com/video/841089023_640.jpg",
        tags: ["Kaye Hwang"]
      },
      {
        id: 6,
        name: "CASS",
        desc: "The Moment",
        video_id: "376062323",
        video_url: "https://vimeo.com/376062323",
        video_thumbnail: "https://i.vimeocdn.com/video/835143379_640.jpg",
        tags: ["Kaye Hwang"]
      }
    ],
    'zong-baik': [
      {
        id: 1,
        name: "HYUNDAI",
        desc: "easy life with smart technology - sloth",
        video_id: "375372497",
        video_url: "https://vimeo.com/375372497",
        video_thumbnail: "https://i.vimeocdn.com/video/834121432_640.jpg",
        video_start_at: "17",
        video_end_at: "22",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/v5wDdKkLWEtmXuBOz9zQpkgAfvmA0vm8wNXjwxCjlhu7LFnJJI9egZz0rrrxEQQi9k4Go5-BoFYZRf1B9E7LvejU7w8",
          width: 1920,
          height: 1080
        },
        tags: ["Zong Baik", "Global"]
      },
      {
        id: 2,
        name: "HYUNDAI",
        desc: "easy life with smart technology - koala",
        video_id: "375370796",
        video_url: "https://vimeo.com/375370796",
        video_thumbnail: "https://i.vimeocdn.com/video/834119237_640.jpg",
        video_start_at: "10",
        video_end_at: "20",
        tags: ["Zong Baik", "Global"]
      },
      {
        id: 3,
        name: "ETUDE HOUSE",
        desc: "Better Lips Talk",
        video_id: "295911025",
        video_url: "https://vimeo.com/295911025",
        video_thumbnail: "https://i.vimeocdn.com/video/734324967_640.jpg",
        thumbnail: {
          src: "http://lh3.googleusercontent.com/4sC8HJn8vbmYo99lOJEQrqoZV9QArCJOhBcNI-x_h7QsEWHD-gfKsLGy2yy_PJCZHa7yOxflKTgpFe-z8ypCOFbCWU2j5VSGWUY3Yw",
          width: 1920,
          height: 1080
        },
        tags: ["Zong Baik"]
      },
      {
        id: 4,
        name: "LG G7",
        desc: "Boombox Speaker",
        video_id: "295906570",
        video_url: "https://vimeo.com/295906570",
        video_thumbnail: "https://i.vimeocdn.com/video/734319934_640.jpg",
        tags: ["Zong Baik", "Global"]
      }
    ]
  }
  
  // 기본값은 John S. Park
  const videos = directorVideos[id] || directorVideos['john-s-park']
  
  return {
    videos,
    tags
  }
}