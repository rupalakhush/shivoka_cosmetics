import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Hero Image */}
      <Image
        src="/placeholder.svg"
        alt="Beauty Products Collection"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
            Discover Your Perfect
            <span className="block text-pink-400">Beauty Routine</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-xl">
            Explore our collection of premium skincare products designed to enhance your natural beauty
          </p>
          
          <Link 
            href="/shop"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-pink-500 rounded-full 
              hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
          >
            Explore Collection
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

