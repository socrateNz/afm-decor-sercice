"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TestimonialForm() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const resetForm = () => {
    setName("")
    setRating(0)
    setMessage("")
    setWebsite("")
    setIsSubmitted(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error("Choisis une note avant d'envoyer ton avis.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, message, website }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        toast.error(data.error || "Une erreur est survenue.")
        return
      }

      setIsSubmitted(true)
    } catch {
      toast.error("Une erreur est survenue. Réessaie plus tard.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-amber-400 text-amber-600 hover:bg-amber-50">
          Laisser un avis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {isSubmitted ? (
          <div className="py-6 text-center">
            <DialogTitle className="mb-2 text-amber-500" style={{ fontFamily: "var(--font-playfair)" }}>
              Merci !
            </DialogTitle>
            <DialogDescription>
              Votre avis a bien été reçu et sera publié après validation.
            </DialogDescription>
            <Button className="mt-6" onClick={() => handleOpenChange(false)}>
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-playfair)" }}>Partagez votre expérience</DialogTitle>
              <DialogDescription>
                Votre avis sera relu avant d'être publié sur le site.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="testimonial-name" className="mb-1 block">
                  Nom
                </Label>
                <Input
                  id="testimonial-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  required
                />
              </div>

              <div>
                <Label className="mb-1 block">Note</Label>
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      aria-label={`${value} étoile${value > 1 ? "s" : ""}`}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          value <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="testimonial-message" className="mb-1 block">
                  Message
                </Label>
                <Textarea
                  id="testimonial-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={600}
                  rows={4}
                  required
                />
              </div>

              {/* Honeypot : champ invisible pour les humains, souvent rempli par les bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="testimonial-website">Site web</label>
                <input
                  id="testimonial-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Envoi..." : "Envoyer mon avis"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
