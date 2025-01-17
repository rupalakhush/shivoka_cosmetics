"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout 
      title="About Us" 
      subtitle="Discover the story behind our passion for beauty and skincare"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Cosmetic Store, we believe that everyone deserves to feel beautiful and confident. 
            Our mission is to provide high-quality, innovative beauty products that enhance your 
            natural beauty and promote healthy skin.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-600">
            We are committed to using clean, ethically-sourced ingredients and sustainable 
            practices. Our products are cruelty-free and we continuously strive to minimize 
            our environmental impact.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
            src="/placeholder.svg"
            alt="About Cosmetic Store"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </PageLayout>
  )
}

