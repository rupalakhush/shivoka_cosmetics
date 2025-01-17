"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Home, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYouPage() {
  // const [orderNumber, setOrderNumber] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your order has been received and is being processed.
            </p>
          </motion.div>

          {/* <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-pink-50 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
            <p className="text-lg text-gray-700">Order Number: <span className="font-bold">{orderNumber}</span></p>
            <p className="text-gray-600 mt-2">You will receive an email confirmation shortly.</p>
          </motion.div> */}

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link href="/" passHref>
              <Button className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white">
                <Home className="w-5 h-5 mr-2" />
                Explore More
              </Button>
            </Link>
            <Link href={`/profile`} passHref>
              <Button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white">
                <Truck className="w-5 h-5 mr-2" />
                Track Shipment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
