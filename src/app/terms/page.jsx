'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services."
    },
    {
      title: "Use of Our Services",
      content: "You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable local, state, national, or international law or regulation."
    },
    {
      title: "Product Information and Pricing",
      content: "We strive to provide accurate product information and pricing. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. In the event of a pricing error, we reserve the right to cancel any orders placed for products listed at the incorrect price."
    },
    {
      title: "User Accounts",
      content: "When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure."
    },
    {
      title: "Intellectual Property",
      content: "The content on our website, including text, graphics, logos, and images, is owned by or licensed to us and is protected by copyright and other intellectual property rights. You may not use, reproduce, or distribute any content from our website without our express written permission."
    },
    {
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by law, Cosmetic Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the services."
    }
  ]

  return (
    <PageLayout 
      title="Terms of Service" 
      subtitle="Please read these terms carefully before using our services"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Terms of Service Agreement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Welcome to Cosmetic Store. By using our website and services, you agree to comply with and be bound by the following terms and conditions. 
              Please read these carefully before using our platform.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{section.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will always post the most current version on our website. 
              By continuing to use our platform after changes have been made, you agree to be bound by the revised terms.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> legal@cosmeticstore.com<br />
              <strong>Address:</strong> 123 Beauty Lane, New York, NY 10001, United States
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  )
}

