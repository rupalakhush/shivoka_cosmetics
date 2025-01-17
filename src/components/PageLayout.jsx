import { motion } from 'framer-motion'

export default function PageLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </motion.div>
    </div>
  )
}

