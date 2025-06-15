"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Product, Category, ProductOption } from "@/lib/types"
import { PlusCircle, Pencil, Trash2, Save, X, Trash, Plus } from "lucide-react"
import ImageUpload from "@/components/image-upload"
import { getProducts } from "@/actions/products/get-products"
import { getCategories } from "@/actions/categories/get-categories"
import { useForm } from "react-hook-form"
import { productSchema } from "@/schemas/product.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createUpdateProduct } from "@/actions/products/create-update-product"
import { toast } from "sonner"
import Loading from "@/app/loading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { deleteProduct } from "@/actions/products/delete-product-by-id"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { deleteImageFromCloudinary } from "@/actions/products/delete-image-from-cloudinary"
import { DialogDescription } from "@radix-ui/react-dialog"

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [newOption, setNewOption] = useState<Partial<ProductOption>>({ name: "", price: 0, isAvailable: false, type: "size" })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const [showDeleteOptionsModal, setShowDeleteOptionsModal] = useState(false)
  const [optionToDeleteIndex, setOptionToDeleteIndex] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      price: currentProduct?.price || 0,
      image: currentProduct?.image,
      categoryId: currentProduct?.categoryId || "",
      isAvailable: currentProduct?.isAvailable || true,
      options: currentProduct?.options || []
    }
  })

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getProducts()
        const categoriesData = await getCategories()
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Reset form on product change
  useEffect(() => {
    if (currentProduct) {
      form.reset({
        name: currentProduct?.name,
        description: currentProduct?.description,
        price: currentProduct?.price,
        image: currentProduct?.image,
        categoryId: currentProduct?.categoryId,
        isAvailable: currentProduct?.isAvailable,
        options: currentProduct?.options || []
      })
    }
  }, [currentProduct, form])

  const handleAddNew = () => {
    setCurrentProduct(null)
    setIsEditing(true)

    form.reset({
      name: "",
      description: "",
      price: 0,
      image: "",
      categoryId: "",
      isAvailable: true,
      options: []
    })
  }

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product })
    setIsEditing(true)
    setSelectedImage(null)
  }

  const handleCancel = () => {
    setCurrentProduct(null)
    setNewOption({ name: "", price: 0, isAvailable: true, type: "size" })
    setIsEditing(false)
    setSelectedImage(null)
  }

  // Functions to manage product options
  const addOption = () => {
    if (!newOption.name?.trim() || !newOption.type) {
      toast.error("El nombre es requerido.")
      return
    }

    const newOpt: ProductOption = {
      name: newOption.name?.trim() || '',
      price: newOption.price || 0,
      isAvailable: newOption.isAvailable || true,
      quantity: 0,
      productId: currentProduct?.id || '',
      type: newOption.type || 'size'
    }

    const current = form.getValues("options") || []
    form.setValue("options", [...current, newOpt])
    setNewOption({ name: "", price: 0, isAvailable: true, type: "size" })
  }

  const updateOption = (index: number, field: keyof ProductOption, value: any) => {
    const options = form.getValues("options") || []

    const updated = [...options]
    updated[index] = {
      ...updated[index],
      [field]: value
    }
    form.setValue("options", updated)
  }

  const removeOption = (index: number) => {
    const current = form.getValues("options") || []
    const updated = [...current]
    updated.splice(index, 1)
    form.setValue("options", updated)
  }

  const handleDelete = async (productId: string) => {
    if (!productToDelete) return

    const { ok, message } = await deleteProduct(productId)
    if (!ok) {
      toast.error(message || "No se pudo eliminar el producto")
      return
    }

    toast.success(message || "Producto eliminado correctamente")

    const updated = await getProducts()
    setProducts(updated)
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
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
        const res = await fetch("/api/upload-product-image", {
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

        if (currentProduct?.image) {
          const { ok, message } = await deleteImageFromCloudinary(currentProduct.image)
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
    formData.append("description", updatedValues?.description)
    formData.append("price", updatedValues.price.toString()) // Convert number to string
    formData.append("image", updatedValues.image)
    formData.append("categoryId", updatedValues.categoryId)
    formData.append("isAvailable", updatedValues.isAvailable.toString())
    formData.append("options", JSON.stringify(updatedValues.options))

    // If we're editing an existing product
    if (currentProduct?.id) {
      formData.append("id", currentProduct.id)
    }

    const { ok, message } = await createUpdateProduct(formData)

    if (!ok) {
      toast.error(message || "No se pudo guardar el producto")
      setIsSubmitting(false)
      return
    }

    toast.success(message || "Producto guardado correctamente")
    setIsSubmitting(false)
    setIsEditing(false)
    setCurrentProduct(null)

    const updated = await getProducts()
    setProducts(updated)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {!isEditing
        ?
        (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lista de Productos</h2>
              <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/80">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline ml-2">
                  Nuevo Producto
                </span>
              </Button>
            </div>

            {products.length === 0
              ? (
                <div className="text-center py-8 text-muted-foreground">No hay productos. ¡Agrega uno nuevo!</div>
              )
              :
              (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary/20">
                        <th className="text-left p-3">Nombre</th>
                        <th className="text-left p-3">Categoría</th>
                        <th className="text-left p-3">Precio</th>
                        <th className="text-left p-3">Estado</th>
                        <th className="text-right p-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const category = categories.find((c) => c.id === product.categoryId)
                        return (
                          <tr key={product.id} className="border-b hover:bg-primary/10">
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{category?.name || "Sin categoría"}</td>
                            <td className="p-3">{product.options?.length ? 'Variados' : `$ ${product.price}`} </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${product.isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                              >
                                {product.isAvailable ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(product)}
                                className="text-blue-500 hover:text-blue-700 mr-1"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setProductToDelete(product)
                                  setShowDeleteModal(true)
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
        )
        :
        (
          <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {currentProduct ? "Editar Producto" : "Nuevo Producto"}
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
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre del producto"
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
                              placeholder="Descripción del producto"
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
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría *</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange} disabled={isSubmitting} defaultValue={field.value} key={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio *</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              min={'0'}
                              step={'0.01'}
                              {...field}
                              onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                              placeholder='Precio del producto'
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
                            nameImage="del Producto"
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

                    {/* Product Options Section */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-4">Opciones del Producto</h3>

                        {/* Existing Options */}
                        {(form.watch("options") || []).length > 0 && (
                          <div className="space-y-3 mb-4">
                            <h4 className="text-sm font-medium text-foreground">Opciones existentes:</h4>
                            {(form.watch("options") || []).map((option, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-primary/10">
                                <div className="flex-1">
                                  <Input
                                    value={option.name}
                                    onChange={(e) => updateOption(index, "name", e.target.value)}
                                    placeholder="Nombre de la opción"
                                    disabled={isSubmitting}
                                    className="mb-2"
                                  />
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={option.price}
                                    onChange={(e) => updateOption(index, "price", Number.parseFloat(e.target.value) || 0)}
                                    placeholder="Precio"
                                    disabled={isSubmitting}
                                  />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={option.isAvailable}
                                      onCheckedChange={(checked) => updateOption(index, "isAvailable", checked)}
                                      disabled={isSubmitting}
                                    />
                                    <Label className="text-xs">Disponible</Label>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setOptionToDeleteIndex(index)
                                      setShowDeleteOptionsModal(true)
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={isSubmitting}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )

                        }

                        {/* Add New Option */}
                        <div className="border rounded-lg p-4 bg-primary/10 flex flex-col gap-y-2">
                          <h4 className="text-sm font-medium text-foreground mb-3">Agregar nueva opción:</h4>

                          {/* select option type */}
                          <Select
                            value={newOption.type}
                            onValueChange={(value) => setNewOption({ ...newOption, type: value as "size" | "ingredient" | "variable" })}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="w-1/3">
                              <SelectValue placeholder="Elige una opción..." />
                            </SelectTrigger>
                            <SelectContent>

                              <SelectItem value={"size"}>
                                <div className="flex justify-between items-center w-full">
                                  <span>Tamaño</span>
                                </div>
                              </SelectItem>
                              <SelectItem value={"ingredient"}>
                                <div className="flex justify-between items-center w-full">
                                  <span>Ingredientes</span>
                                </div>
                              </SelectItem>
                              <SelectItem value={"variable"}>
                                <div className="flex justify-between items-center w-full">
                                  <span>Variable</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {/* select option data */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* option name */}
                            <div>
                              <Label htmlFor="optionName" className="text-xs">
                                Nombre
                              </Label>
                              <Input
                                id="optionName"
                                value={newOption.name}
                                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                                placeholder="Ej: pulpo chico, pulpo grande, etc."
                                disabled={isSubmitting}
                              />
                            </div>
                            {/* option price */}
                            <div>
                              <Label htmlFor="optionPrice" className="text-xs">
                                Precio
                              </Label>
                              <Input
                                id="optionPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={newOption.price}
                                onChange={(e) =>
                                  setNewOption({ ...newOption, price: Number.parseFloat(e.target.value) || 0 })
                                }
                                placeholder="0.00"
                                disabled={isSubmitting}
                              />
                            </div>
                            {/* add option button */}
                            <div className="flex items-end">
                              <Button
                                type="button"
                                onClick={addOption}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                                disabled={isSubmitting}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar
                              </Button>
                            </div>
                          </div>
                          {/* switch to enable/disable option */}
                          <div className="flex items-center space-x-2 mt-3">
                            <Switch
                              checked={newOption.isAvailable}
                              onCheckedChange={(checked) => setNewOption({ ...newOption, isAvailable: checked })}
                              disabled={isSubmitting}
                            />
                            <Label className="text-sm">Opción disponible</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="isAvailable"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2 flex items-center space-x-2 pt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                            disabled={isSubmitting}
                          />
                          <FormLabel>Producto Activo</FormLabel>
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
                    Guardar Producto
                  </Button>
                </div>
              </form>
            </Form>

          </div >
        )
      }

      {/* delete modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar este producto?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Se eliminará el producto y todas las opciones asociadas.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="font-semibold text-lg">{productToDelete?.name}</p>
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
              onClick={() => handleDelete(productToDelete?.id || "")}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* delete options modal */}
      <Dialog open={showDeleteOptionsModal} onOpenChange={setShowDeleteOptionsModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar esta opción?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Se eliminará la opción del producto.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="font-semibold text-lg">{optionToDeleteIndex !== null && form.watch("options")?.[optionToDeleteIndex]?.name}
            </p>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteOptionsModal(false)
                setOptionToDeleteIndex(null)
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (optionToDeleteIndex !== null) {
                  removeOption(optionToDeleteIndex)
                  setOptionToDeleteIndex(null)
                  setShowDeleteOptionsModal(false)
                  toast.success("Opción eliminada correctamente")
                }
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
