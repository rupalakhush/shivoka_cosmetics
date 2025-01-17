"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "10 Skincare Tips for Glowing Skin",
    excerpt: "Discover the secrets to achieving radiant and healthy-looking skin with these expert tips.",
    image: "/placeholder.svg",
    date: "May 15, 2023"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Summer Makeup",
    excerpt: "Learn how to create long-lasting, fresh makeup looks that withstand the summer heat.",
    image: "/placeholder.svg",
    date: "June 2, 2023"
  },
  {
    id: 3,
    title: "Natural Ingredients for Hair Care",
    excerpt: "Explore the power of natural ingredients to nourish and strengthen your hair.",
    image: "/placeholder.svg",
    date: "April 28, 2023"
  }
]

export default function BlogPage() {
  return (
    <PageLayout 
      title="Beauty Blog" 
      subtitle="Stay up-to-date with the latest beauty trends, tips, and product reviews"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link href={`/blog/${post.id}`} className="text-pink-500 hover:text-pink-600">
                    Read More
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  )
}

