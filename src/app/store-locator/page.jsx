'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stores = [
  {
    id: 1,
    name: "Cosmetic Store - Downtown",
    address: "123 Main St, New York, NY 10001",
    phone: "(212) 555-1234",
  },
  {
    id: 2,
    name: "Cosmetic Store - Uptown",
    address: "456 Park Ave, New York, NY 10022",
    phone: "(212) 555-5678",
  },
  {
    id: 3,
    name: "Cosmetic Store - Brooklyn",
    address: "789 Bedford Ave, Brooklyn, NY 11211",
    phone: "(718) 555-9012",
  },
]

export default function StoreLocatorPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageLayout 
      title="Store Locator" 
      subtitle="Find a Cosmetic Store near you"
    >
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search by city, state, or zip code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button>Search</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{store.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{store.address}</p>
                <p className="text-gray-600">{store.phone}</p>
                <Button className="mt-4 w-full">Get Directions</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No stores found. Please try a different search term.
        </p>
      )}
    </PageLayout>
  )
}

