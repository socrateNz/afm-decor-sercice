"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PhotoManager from "@/components/admin/photo-manager"
import TestimonialManager from "@/components/admin/testimonial-manager"

export default function AdminPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="container-custom py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-amber-500" style={{ fontFamily: "var(--font-playfair)" }}>
            Backoffice
          </h1>
          <p className="text-sm text-gray-600">AFM Décor - Service</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>

      <Tabs defaultValue="photos">
        <TabsList className="mb-6">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <PhotoManager />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
