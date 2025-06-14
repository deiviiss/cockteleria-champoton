import Link from "next/link"
import { Clock, Facebook, MapPin, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { getPhoneNumberMenu } from "@/actions/menu/get-phone-number-menu";

export async function Footer() {
  const address = "Av prolongación Benito juárez presidentes de méxico, Champotón, Campeche"
  const encodedAddress = encodeURIComponent(address)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  const phoneNumber = await getPhoneNumberMenu()
  const whatsappUrl = `https://wa.me/${phoneNumber?.replace(/\D/g, "")}`

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">Coctelería y Tacos de Mariscos Champotón</h3>
            <p className="text-gray-300">Del Negrito y el Wero, ¡Sabor familiar!</p>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horarios</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Horarios de Atención:</p>
                  <p className="text-gray-300 text-sm">Jueves a Martes</p>
                  <p className="text-gray-300 text-sm">10:00 AM - 6:00 PM</p>
                  <p className="text-red-300 text-sm">Cerrado los Miércoles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ubicación</h3>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <Link
                href={googleMapsUrl}
                target="_blank" rel="noopener noreferrer"
              >
                <p className="text-gray-300 font-medium">Ubicación:</p>
                <span
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm text-left"
                >
                  Av prolongación Benito Juárez
                  <br />
                  Presidentes de México
                  <br />
                  Champotón, Campeche
                </span>
              </Link>
            </div>
          </div>

          {/* Links */}
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
              <li>
                <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61566795117335"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-gray-300 font-medium">Contáctanos:</p>
              <Link
                href={`tel:${phoneNumber}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 hover:text-green-400 transition-colors">
                  981 307 8506
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 pb-8 text-center text-gray-300 relative">
          <div className="flex items-center gap-1"
          >
            <Link href="/" className="absolute right-0 -top-72 md:-top-48 md:right-5 lg:right-20 text-xl font-bold text-primary">
              <Image
                src="/images/logo2.webp"
                alt="logo-cocteleria-champoton"
                width={160}
                height={160}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Coctelería y Tacos de Mariscos Champotón. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
