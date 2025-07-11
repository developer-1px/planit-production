import { json } from "@sveltejs/kit"

export function GET() {
  return json({
    "plan v": ["Coming Soon"],
    directors: ["John S. Park", "Kyu Ha Kim", "Hun Lee", "Kaye Hwang", "Paul Kim", "Dune", "Sung An You", "Dong Hwa Shin"],
    works: ["Latest", "Featured", "Awards", "Global", "Service Production"]
  })
}
