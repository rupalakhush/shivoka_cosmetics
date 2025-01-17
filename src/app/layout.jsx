import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
// import Toaster from "../components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en" className="dark">
        <body>
          <Toaster />
          <div className="min-h-screen bg-pink-50">
            {/* Top Banner */}
            {/* <div className="bg-pink-500 text-white text-center py-2">
              Enjoy Free Shipping For Orders Over $30! Shop Now
            </div> */}

            <Header />

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-white mt-12">
              {/* Top Section with Background */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16 px-4 rounded-b-3xl shadow-lg">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-serif mb-4">
                    Experience the Beauty Revolution
                  </h2>
                  <p className="text-white/90 mb-8">
                    Join our community and discover the latest in beauty
                    innovations
                  </p>
                  <div className="flex justify-center space-x-6">
                    <Link
                      href="/auth/signup"
                      className="bg-white text-pink-500 hover:bg-pink-100 transition-colors px-6 py-3 rounded-full font-medium"
                    >
                      Join Now
                    </Link>
                    <Link
                      href="/shop"
                      className="border border-white text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-full font-medium"
                    >
                      Explore Products
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Footer Content */}
              <div className="py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Brand Section */}
                  <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-2">
                      <Image
                        src="/placeholder.svg"
                        alt="Cosmetic Store"
                        width={32}
                        height={32}
                      />
                      <span className="text-xl font-serif">Cosmetic Store</span>
                    </Link>
                    <p className="text-gray-600">
                      Elevating beauty through premium skincare and cosmetic
                      solutions.
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/about"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          Beauty Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/careers"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/store-locator"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          Store Locator
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Customer Service */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Customer Service
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/contact"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shipping"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          Shipping Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/returns"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          Returns & Exchanges
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/faq"
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          FAQs
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Monday - Friday: 9am - 6pm</li>
                      <li>Saturday: 10am - 4pm</li>
                      <li>Sunday: Closed</li>
                      <li className="pt-2">
                        <Link
                          href="mailto:hello@cosmeticstore.com"
                          className="text-pink-500 hover:text-pink-600"
                        >
                          hello@cosmeticstore.com
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t py-6 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-gray-600 text-sm">
                    © 2024 Cosmetic Store. All rights reserved.
                  </p>
                  <div className="flex space-x-6 text-sm">
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </footer>

            {/* <Toaster /> */}
          </div>
        </body>
      </html>
    </Providers>
  );
}

import "./globals.css";
