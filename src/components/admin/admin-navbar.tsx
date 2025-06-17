"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { GiShrimp } from "react-icons/gi";
import { ButtonLogout } from "@/components/auth/ButtonLogout";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LucideFolderDown } from "lucide-react";

export function NavbarAdmin() {
  const { data: session } = useSession()

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1"
          >
            <Link href="/" className="text-xl font-bold text-primary">
              <Image
                src="/images/logo.webp"
                alt="logo-cocteleria-champoton"
                width={85}
                height={85}
                className="object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-3">
            <>
              <GiShrimp className="h-5 w-5 text-primary" />
              <span className="">Hola {session?.user.name}</span>
            </>

            <Button variant="ghost" size="sm" asChild >
              <Link href="/admin/resources">
                <LucideFolderDown className="h-5 w-5" />
                <span className="hidden sm:inline">Recursos</span>
              </Link>
            </Button>

            <ButtonLogout name="Salir" />
          </div>
        </div>
      </div>
    </header>
  )
}
