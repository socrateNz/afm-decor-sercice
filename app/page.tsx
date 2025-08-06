"use client"

import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Prestations from "@/components/prestations"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Realisation from "@/components/Realisation"
import { useEffect, useState } from "react"

interface Video {
  id: string
  url: string
  title: string
}

export default function Home() {

  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/videos')
      const data = await res.json()
      setVideos(data)
    }

    fetchVideos()
  }, [])

  console.log(videos);
  
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Prestations />
      <Gallery />
      {videos.length > 0 && <Realisation realisation={videos} />}
      <Testimonials />
      <Contact />
    </>
  )
}
