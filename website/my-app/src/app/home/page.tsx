import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PenLine, Pencil, CheckSquare, Share2, Cloud } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            QuickNote
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/login" className="text-gray-600 hover:text-primary">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to QuickNote</h1>
          <p className="text-xl text-gray-600 mb-8">Capture your thoughts, organize your life, and access your notes from anywhere.</p>
          <Button size="lg">
            Start Taking Notes
          </Button>
        </div>

        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
          <FeatureCard 
            icon={<PenLine className="h-8 w-8 text-primary" />}
            title="Easy Note-Taking"
            description="Quickly jot down your ideas with our intuitive interface."
          />
          <FeatureCard 
            icon={<CheckSquare className="h-8 w-8 text-primary" />}
            title="Task Management"
            description="Turn your notes into actionable tasks and stay organized."
          />
          <FeatureCard 
            icon={<Pencil className="h-8 w-8 text-primary" />}
            title="Markup Support"
            description="Supports Markup languages with Latex and HTML for uniqueness and creativity"
          />
          </div>
        </div>
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-lg font-semibold mb-2">QuickNote</h2>
              <p className="text-gray-600">Simplify your life, one note at a time.</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-primary">Twitter</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-primary">Facebook</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-primary">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p>&copy; 2023 QuickNote. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

