
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-cream px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-serif mb-6">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-cream/70 mb-8">We couldn't find the page you're looking for. Perhaps the way was mistook—let us guide you home.</p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="default" size="lg" onClick={() => (window.location.pathname = '/') }>
            Return Home
          </Button>
          <a href="/" className="link-gold self-center">Or browse the experience</a>
        </div>
      </div>
    </div>
  )
}
