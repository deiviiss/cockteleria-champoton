import Link from "next/link"
import { Facebook } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion"
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cocktelería y Tacos de Mariscos Champotón</h3>
            <p className="text-gray-300">Del Negrito y el Wero, ¡Sabor familiar!</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-gray-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/search/top?q=cocteleria%20champoton%20campeche"
                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Contáctanos:</p>
              <p className="text-gray-300">info@cockteleriachampoton.com</p>
              <p className="text-gray-300">981 125 0049</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 pb-8 text-center text-gray-300 relative">
          <div className="flex items-center gap-1"
          >
            <Link href="/" className="absolute right-0 -top-72 md:-top-48 md:-right-4 lg:right-10 text-xl font-bold text-primary">
              <Image
                src="/images/logo2.webp"
                alt="logo-cockteleria-champoton"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Cocktelería y Tacos de Mariscos Champotón. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
