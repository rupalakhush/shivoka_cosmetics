"use client"

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReturnsExchangesPage() {
  return (
    <PageLayout 
      title="Returns & Exchanges" 
      subtitle="Our policy to ensure your satisfaction with every purchase"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Returns Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                We want you to love your purchase. If you're not completely satisfied, we accept returns within 30 days of delivery for a full refund or exchange.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Items must be unused, unopened, and in their original packaging</li>
                <li>Proof of purchase is required for all returns and exchanges</li>
                <li>Refunds will be issued to the original form of payment</li>
                <li>Shipping costs for returns are the responsibility of the customer unless the item is defective</li>
              </ul>
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
              <CardTitle>Exchange Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                To exchange an item, please follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Contact our customer service team to initiate the exchange</li>
                <li>Ship the original item back to us using the provided return label</li>
                <li>Once we receive the item, we'll process your exchange and ship out the new item</li>
                <li>You'll receive a confirmation email with tracking information for your new item</li>
              </ol>
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
              <CardTitle>Exceptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Please note the following exceptions to our returns and exchanges policy:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Gift cards are non-refundable and cannot be returned</li>
                <li>Personalized or custom-made items cannot be returned unless defective</li>
                <li>Sale items are final sale and cannot be returned or exchanged</li>
                <li>Bundled items must be returned as a complete set</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  )
}

