'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, American Express, and PayPal. All transactions are secure and encrypted."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site."
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, all of our products are cruelty-free. We do not test on animals and do not work with suppliers who test on animals."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to select international destinations. Shipping rates and delivery times vary by location. Please check our shipping policy for more details."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused and unopened items. Please refer to our Returns & Exchanges page for full details on how to initiate a return."
  },
  {
    question: "How do I know which products are right for my skin type?",
    answer: "We recommend taking our skin quiz on our website to get personalized product recommendations. You can also contact our customer service team for expert advice."
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageLayout 
      title="Frequently Asked Questions" 
      subtitle="Find answers to common questions about our products and services"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </motion.div>

        <Accordion type="single" collapsible>
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {filteredFAQs.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No FAQs found. Please try a different search term or contact our customer support for assistance.
          </p>
        )}
      </div>
    </PageLayout>
  )
}

