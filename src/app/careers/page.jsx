"use client"

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const jobOpenings = [
  {
    id: 1,
    title: "Makeup Artist",
    department: "Retail",
    location: "New York, NY",
  },
  {
    id: 2,
    title: "Product Development Specialist",
    department: "Research & Development",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Remote",
  },
]

export default function CareersPage() {
  return (
    <PageLayout 
      title="Careers" 
      subtitle="Join our team and be part of the beauty revolution"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <p className="text-gray-600 mb-6">
          At Cosmetic Store, we're always looking for passionate individuals who share our 
          love for beauty and innovation. Join our diverse team and help us shape the future 
          of the beauty industry.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Innovative and dynamic work environment</li>
          <li>Opportunities for growth and development</li>
          <li>Competitive compensation and benefits</li>
          <li>Employee discounts on our products</li>
        </ul>
      </motion.div>

      <h2 className="text-2xl font-semibold mb-6 text-center">Current Openings</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobOpenings.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Department: {job.department}</p>
                <p className="text-gray-600 mb-4">Location: {job.location}</p>
                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  )
}

