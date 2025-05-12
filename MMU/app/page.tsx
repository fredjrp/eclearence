import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold text-center">Multimedia University - E-Clearance System</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="MMU Logo"
            width={300}
            height={300}
            className="mx-auto mb-8 rounded-lg shadow-md"
            priority
          />

          <h2 className="text-3xl font-bold mb-4 text-green-700">Welcome to MMU E-Clearance System</h2>

          <p className="text-lg mb-8 text-gray-600">Streamlining the clearance process for students and departments</p>

          <Link href="/login">
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Proceed to Login
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Multimedia University - Group 16. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
