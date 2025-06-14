"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GiShrimp } from "react-icons/gi";
import { Eye, EyeOff, LogIn } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/actions/auth/login"
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { IoInformationOutline } from "react-icons/io5"

const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo electrónico es requerido',
    message: 'Correo electrónico no válido'
  }).email({
    message: 'Correo electrónico no válido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    message: 'Contraseña no válida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

export default function LoginForm() {
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo') || '/platform/profile'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const defaultValuesForm = {
    email: '',
    password: ''
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(loginSchema)
  })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)

    const { email, password } = values

    try {
      const { ok, message } = await login(email, password)

      if (!ok) {
        toast.error(message)
        setError(message)
        setIsSubmitting(false)
        return
      }

      toast.success(message)
      setIsSubmitting(false)
      // router.push("/admin")
      window.location.replace("/admin")
    } catch (error) {
      toast.error("Error al iniciar sesión")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <GiShrimp className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center">Bienvenido de nuevo</CardTitle>
              <CardDescription className="text-center">
                Ingresa tu usuario y contraseña para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder='Ingresa tu usuario'
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Contraseña'
                        {...field}
                        value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='space-y-3 flex-col'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full'
              >
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </form>
    </Form>
  )
}
