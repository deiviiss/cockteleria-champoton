"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Category, Promotion } from "@/lib/types"
import { PlusCircle, Pencil, Trash2, Save, X, Calendar } from "lucide-react"
import { getPromotions } from "@/actions/promotions/get-promotions"
import Loading from "@/app/loading"
import { promotionSchema } from "@/schemas/promotion.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { deletePromotion } from "@/actions/promotions/delete-promotion-by-id"
import { toast } from "sonner"
import { createUpdatePromotion } from "@/actions/promotions/createUpdatePromotion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ImageUpload from "@/components/image-upload"
import { Switch } from "../ui/switch"
import { getCategoryPromotion } from "@/actions/categories/get-category-promotion"
import { deleteImageFromCloudinary } from "@/actions/products/delete-image-from-cloudinary"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

export default function PromotionsTab() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [categoryPromotion, setCategoryPromotion] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState<Promotion | null>(null)

  const form = useForm<z.infer<typeof promotionSchema>>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      name: currentPromotion?.name || "",
      description: currentPromotion?.description || "",
      promoPrice: currentPromotion?.promoPrice || 0,
      originalPrice: currentPromotion?.originalPrice || 0,
      discountPercentage: currentPromotion?.discountPercentage || 0,
      image: currentPromotion?.image || "",
      isActive: currentPromotion?.isActive || false,
      categoryId: currentPromotion?.categoryId || categoryPromotion?.id,
      createdAt: currentPromotion?.createdAt || new Date()
    }
  })

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const promotionsData = await getPromotions()
        const categoryPromotionData = await getCategoryPromotion()
        setPromotions(promotionsData)
        setCategoryPromotion(categoryPromotionData)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Reset form on promotion change
  useEffect(() => {
    if (currentPromotion) {
      form.reset({
        name: currentPromotion?.name,
        description: currentPromotion?.description,
        discountPercentage: currentPromotion?.discountPercentage,
        promoPrice: currentPromotion?.promoPrice,
        originalPrice: currentPromotion?.originalPrice,
        image: currentPromotion?.image,
        categoryId: currentPromotion?.categoryId,
        isActive: currentPromotion?.isActive,
        createdAt: currentPromotion?.createdAt
      })
    }
  }, [currentPromotion, form])

  const handleAddNew = () => {
    setCurrentPromotion(null)
    setIsEditing(true)

    form.reset({
      name: "",
      description: "",
      discountPercentage: 0,
      promoPrice: 0,
      originalPrice: 0,
      image: "",
      isActive: true,
      categoryId: categoryPromotion?.id,
      createdAt: new Date()
    })
  }

  const handleEdit = (promotion: Promotion) => {
    setCurrentPromotion({ ...promotion })
    setIsEditing(true)
    setSelectedImage(null)
  }

  const handleCancel = () => {
    setCurrentPromotion(null)
    setIsEditing(false)
    setSelectedImage(null)
  }

  const handleDelete = async (id: string) => {
    if (!id) return

    try {
      const { ok, message } = await deletePromotion(id)

      if (!ok) {
        toast.error(message || "No se pudo eliminar la promoción")
        return
      }

      toast.success(message || "Promoción eliminada correctamente")

      const updated = await getPromotions()
      setPromotions(updated)
      setPromotionToDelete(null)
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Error al eliminar la promoción:", error)
      alert("Ocurrió un error al eliminar la promoción")
    }
  }

  const onSubmit = async (values: z.infer<typeof promotionSchema>) => {
    setIsSubmitting(true)

    if (!selectedImage && !values.image) {
      toast.error("La imagen es obligatoria")
      setIsSubmitting(false)
      return
    }

    let imageUrl = values.image

    if (selectedImage) {
      const formDataImage = new FormData()
      formDataImage.append("image", selectedImage)

      try {
        const res = await fetch("/api/upload-promo-image", {
          method: "POST",
          body: formDataImage,
        })

        const data = await res.json()

        if (!data.ok) {
          toast.error(data.message || "Error al subir la imagen")
          setIsSubmitting(false)
          return
        }

        imageUrl = data.url

        if (currentPromotion?.image) {
          const { ok, message } = await deleteImageFromCloudinary(currentPromotion.image)
          if (!ok) {
            toast.error(message || "Error al eliminar la imagen anterior")
            setIsSubmitting(false)
            return
          }
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error)
        toast.error("Error inesperado al subir la imagen")
        setIsSubmitting(false)
        return
      }
    }

    const updatedValues = {
      ...values,
      image: imageUrl
    }

    const formData = new FormData()
    formData.append("name", updatedValues.name)
    formData.append("description", updatedValues.description)
    formData.append("discountPercentage", updatedValues.discountPercentage.toString())
    formData.append("isActive", updatedValues.isActive.toString())
    formData.append("promoPrice", updatedValues.promoPrice.toString())
    formData.append("originalPrice", updatedValues.originalPrice.toString())
    formData.append("image", updatedValues.image || "")
    formData.append("categoryId", categoryPromotion?.id || "")
    formData.append("createdAt", updatedValues.createdAt?.toISOString() ?? new Date().toISOString())

    // If we're editing an existing promotion
    if (currentPromotion?.id) {
      formData.append("id", currentPromotion.id)
    }

    const { ok, message } = await createUpdatePromotion(formData)

    if (!ok) {
      toast.error(message || "No se pudo guardar la promoción")
      setIsSubmitting(false)
      return
    }

    toast.success(message || "Promoción guardada correctamente")
    setIsSubmitting(false)
    setIsEditing(false)
    setCurrentPromotion(null)

    const updated = await getPromotions()
    setPromotions(updated)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div>
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lista de Promociones</h2>
              <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/80">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline  ml-2">
                  Nueva Promoción
                </span>
              </Button>
            </div>

            {promotions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hay promociones. ¡Agrega una nueva!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary/20">
                      <th className="text-left p-3">Nombre</th>
                      <th className="text-left p-3">Descuento</th>
                      <th className="text-left p-3">Precios</th>
                      <th className="text-left p-3">Estado</th>
                      <th className="text-right p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promotion) => {
                      const isActive = promotion.isActive

                      return (
                        <tr key={promotion.id} className="border-b hover:bg-primary/10">
                          <td className="p-3">{promotion.name}</td>
                          <td className="p-3">{promotion.discountPercentage}%</td>
                          <td className="p-3">
                            <div className="text-sm">
                              <div>Original: ${promotion.originalPrice.toFixed(2)}</div>
                              <div>Promoción: ${promotion.promoPrice.toFixed(2)}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {isActive ? "Activa" : "Inactiva"}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(promotion)}
                              className="text-blue-500 hover:text-blue-700 mr-1"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setPromotionToDelete(promotion);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {currentPromotion ? "Editar Promoción" : "Nueva Promoción"}
              </h2>
              <Button variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de la Promoción *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre de la promoción"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción de la promoción"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porcentaje de Descuento *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="1"
                              placeholder="Porcentaje de descuento"
                              {...field}
                              onChange={(e) => {
                                let value = parseInt(e.target.value, 10)
                                if (Number.isNaN(value) || value < 1) value = 1
                                field.onChange(value)
                              }}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="promoPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio de la promoción *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step={0.01}
                              placeholder="Precio de la promoción"
                              {...field}
                              onChange={(e) => {
                                const rawValue = parseFloat(e.target.value)

                                const value = isNaN(rawValue) || rawValue < 0 ? 0 : parseFloat(rawValue.toFixed(2))

                                field.onChange(value)
                              }}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio original *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step={0.01}
                              placeholder="Precio original"
                              {...field}
                              onChange={(e) => {
                                const rawValue = parseFloat(e.target.value)

                                const value = isNaN(rawValue) || rawValue < 0 ? 0 : parseFloat(rawValue.toFixed(2))

                                field.onChange(value)
                              }}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <>
                          <ImageUpload
                            nameImage="de la Promoción"
                            value={field.value}
                            previewFile={selectedImage}
                            onChange={(file) => {
                              // If there's no image, I'll leave.If there's an image, I'll continue.
                              setSelectedImage(file)
                              // string dummy value to pass validation
                              form.setValue("image", file ? "upload_pending" : "", { shouldValidate: true })
                            }}
                          />
                          <FormMessage />
                        </>
                      )}
                    />

                    {/*  Switch to activate/deactivate the promotion */}
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2 flex items-center space-x-2 pt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                            disabled={isSubmitting}
                          />
                          <FormLabel>Promoción Activa</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/80"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Promoción
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
      {/* delete modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar este producto?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Se eliminará la promoción y todas las opciones asociadas.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="font-semibold text-lg">{promotionToDelete?.name}</p>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(promotionToDelete?.id || "")}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
