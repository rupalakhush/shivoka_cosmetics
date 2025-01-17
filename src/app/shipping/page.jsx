"use client"

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShippingPolicyPage() {
  return (
    <PageLayout 
      title="Shipping Policy" 
      subtitle="Learn about our shipping options and delivery times"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Shipping Options</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Standard Shipping (3-5 business days): $5.99</li>
                <li>Express Shipping (2-3 business days): $12.99</li>
                <li>Overnight Shipping (1 business day): $24.99</li>
              </ul>
              <p className="mt-4 text-gray-600">
                Free standard shipping on orders over $50. Expedited shipping options are available at checkout.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Delivery Times</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Orders are typically processed within 1-2 business days. Delivery times are estimated and may vary depending on the shipping method chosen and your location.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Standard Shipping: 3-5 business days after processing</li>
                <li>Express Shipping: 2-3 business days after processing</li>
                <li>Overnight Shipping: Next business day after processing (order by 2 PM EST)</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>International Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We currently ship to select international destinations. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees, taxes, or duties that may be incurred.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  )
}

