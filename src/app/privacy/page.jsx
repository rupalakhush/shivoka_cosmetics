'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect personal information that you provide to us, such as your name, email address, shipping address, and payment information when you make a purchase. We also automatically collect certain information about your device and how you interact with our website."
    },
    {
      title: "How We Use Your Information",
      content: "We use your information to process your orders, communicate with you about your purchases, improve our services, and send you marketing communications (if you've opted in). We may also use your information for internal analytics and to comply with legal obligations."
    },
    {
      title: "Information Sharing and Disclosure",
      content: "We do not sell your personal information. We may share your information with service providers who help us operate our business, with your consent, or as required by law."
    },
    {
      title: "Your Rights and Choices",
      content: "You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time. To exercise these rights, please contact us using the information provided at the end of this policy."
    },
    {
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage."
    },
    {
      title: "Cookies and Similar Technologies",
      content: "We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage your cookie preferences through your browser settings."
    }
  ]

  return (
    <PageLayout 
      title="Privacy Policy" 
      subtitle="We value your privacy and are committed to protecting your personal information"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              At Cosmetic Store, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our website or services.
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
            <CardTitle className="text-xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              If you have any questions or concerns about our Privacy Policy or how we handle your personal information, 
              please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> privacy@cosmeticstore.com<br />
              <strong>Address:</strong> 123 Beauty Lane, New York, NY 10001, United States
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  )
}

