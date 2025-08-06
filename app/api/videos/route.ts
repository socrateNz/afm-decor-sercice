import { NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!
const CHANNEL_ID = 'UCqJNSS6egBcy8vqNgvVYJJw'
const MAX_RESULTS = 10

export async function GET() {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${MAX_RESULTS}`

  try {
    const res = await fetch(apiUrl)
    const data = await res.json()

    console.log("YouTube API response:", data)

    if (!data.items) {
      return NextResponse.json(
        { error: "Aucune vidéo trouvée ou réponse inattendue", data },
        { status: 404 }
      )
    }

    const videos = data.items.map((item: any) => ({
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
      title: item.snippet.title,
    }))

    return NextResponse.json(videos)
  } catch (error) {
    console.error("Erreur API YouTube:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des vidéos." },
      { status: 500 }
    )
  }
}
