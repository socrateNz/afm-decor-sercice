"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Star, Check, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Testimonial {
  id: number
  name: string
  rating: number
  message: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

const statusLabel: Record<Testimonial["status"], string> = {
  pending: "En attente",
  approved: "Approuvé",
  rejected: "Rejeté",
}

const statusClass: Record<Testimonial["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-gray-200 text-gray-600",
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [busyId, setBusyId] = useState<number | null>(null)

  const load = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/testimonials", { cache: "no-store" })
      const data = await res.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Impossible de charger les témoignages.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        toast.error("Échec de la mise à jour.")
        return
      }
      toast.success(status === "approved" ? "Avis approuvé." : "Avis rejeté.")
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    } catch {
      toast.error("Une erreur est survenue.")
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (id: number) => {
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
      if (!res.ok) {
        toast.error("Échec de la suppression.")
        return
      }
      toast.success("Avis supprimé.")
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
    } catch {
      toast.error("Une erreur est survenue.")
    } finally {
      setBusyId(null)
    }
  }

  if (isLoading) {
    return <p className="text-gray-600">Chargement des témoignages...</p>
  }

  if (testimonials.length === 0) {
    return <p className="text-gray-600">Aucun avis pour le moment.</p>
  }

  return (
    <div className="space-y-4">
      {testimonials.map((t) => (
        <div key={t.id} className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{t.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[t.status]}`}>
                {statusLabel[t.status]}
              </span>
            </div>
            <div className="flex">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="mb-3 text-sm text-gray-700">{t.message}</p>
          <div className="flex flex-wrap gap-2">
            {t.status !== "approved" && (
              <Button
                type="button"
                size="sm"
                disabled={busyId === t.id}
                onClick={() => updateStatus(t.id, "approved")}
              >
                <Check className="mr-1 h-4 w-4" />
                Approuver
              </Button>
            )}
            {t.status !== "rejected" && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={busyId === t.id}
                onClick={() => updateStatus(t.id, "rejected")}
              >
                <X className="mr-1 h-4 w-4" />
                Rejeter
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" size="sm" variant="destructive" disabled={busyId === t.id}>
                  <Trash2 className="mr-1 h-4 w-4" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer cet avis ?</AlertDialogTitle>
                  <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => remove(t.id)}>Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  )
}
