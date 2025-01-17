'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FcGoogle } from 'react-icons/fc'

export default function SignupPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/', redirect: false })
      if (result?.error) {
        setError('An error occurred during Google login.')
      } else {
        router.push('/')
      }
    } catch (err) {
      setError('An error occurred during Google login.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to Cosmetic Store</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="font-medium text-pink-600 hover:text-pink-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-pink-600 hover:text-pink-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

