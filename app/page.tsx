"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Calendar, Mail, MapPin, MessageCircle, Globe, Store, Users, LineChart, ClipboardList } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ContactForm from "@/components/contact-form"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

  const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Background handled by particles + body vars */}

      {/* Header */}
      <header
        className={`px-4 lg:px-6 h-16 flex items-center border-b border-white/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/70 sticky top-0 z-40 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <Link className="flex items-center justify-center" href="/">
          <span className="text-brand-gradient text-xl sm:text-2xl font-extrabold tracking-tight">NEXTOK</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium text-white hover:text-blue-200 transition-all duration-300"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm font-medium text-white hover:text-blue-200 transition-all duration-300"
            href="#contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium text-white hover:text-blue-200 transition-all duration-300"
            href="#faq"
          >
            FAQ
          </Link>
          <Link
            className="text-sm font-medium text-white hover:text-blue-200 transition-all duration-300"
            href="#services"
          >
            Services
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
  <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div
                className={`flex flex-col justify-center space-y-4 transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
              >
                <div className="space-y-2">
                  
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white animate-fade-in">
                    Scale Your TikTok Shop With <span className="text-brand-gradient">NEXTOK</span>
                  </h1>
                  <p className="text-xl text-white/90 font-medium animate-fade-in-up delay-500">
                    Experts in growing brands through TikTok Shop strategy, influencer seeding & GMV-maximizing
                    campaigns.
                  </p>
                  <p className="max-w-[600px] text-white/80 md:text-lg animate-fade-in-up delay-700">
                    We help eCommerce brands unlock their next level of sales using performance-driven TikTok Shop
                    growth systems.
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-2 min-[400px]:flex-row transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <Button
                    size="lg"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent hover:border-cyan-400 transition-all duration-300 hover:scale-105"
                  >
                    See Our Work
                  </Button>
                </div>
              </div>
              <div
                className={`flex items-center justify-center transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
              >
                <div className="relative">
                  <Image
                    alt="TikTok Shop Growth Dashboard"
                    className="relative mx-auto overflow-hidden rounded-xl object-contain transition-all duration-500 hover:scale-105 rotate-12 hover:rotate-0"
                    height="600"
                    src="/tiktok.gif?text=TikTok+Shop+Dashboard"
                    width="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
  <section id="services" className="w-full py-12 md:py-24 lg:py-32 relative bg-transparent">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-gradient">Our Services</h2>
                <p className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed">
                  Comprehensive TikTok Shop solutions to scale your brand
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              {/* TikTok Shop Setup & Management */}
              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="relative grid h-14 w-14 place-items-center rounded-lg bg-slate-900/80 ring-1 ring-white/10">
                        <Store className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white group-hover:text-cyan-500 transition-all duration-300">
                        TikTok Shop Setup & Management
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Onboarding & compliance</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Product uploads</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Shop health & orders</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Influencer Seeding & UGC */}
              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="relative grid h-14 w-14 place-items-center rounded-lg bg-slate-900/80 ring-1 ring-white/10">
                        <Users className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white group-hover:text-cyan-500 transition-all duration-300">
                        Influencer Seeding & UGC
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Barter & paid partnerships</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Content collection</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Performance tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Paid Ads & GMV Scaling */}
              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="relative grid h-14 w-14 place-items-center rounded-lg bg-slate-900/80 ring-1 ring-white/10">
                        <LineChart className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white group-hover:text-cyan-500 transition-all duration-300">
                        Paid Ads & GMV Scaling
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Max Ads setup</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Creative testing</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Scaling strategy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Consultations & Audits */}
              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="relative grid h-14 w-14 place-items-center rounded-lg bg-slate-900/80 ring-1 ring-white/10">
                        <ClipboardList className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white group-hover:text-cyan-500 transition-all duration-300">
                        Consultations & Audits
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>1:1 sessions</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Custom strategy plans</span>
                    </li>
                    <li className="flex items-center gap-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>In-depth shop audits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section (Carousel) */}
  <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <h2 className="text-brand-gradient text-3xl font-bold tracking-tight sm:text-5xl">
                  What Our Clients Say
                </h2>
                <p className="max-w-[800px] mx-auto text-blue-100 md:text-xl/relaxed">
                  Real results from eCommerce brands we help scale with data-driven TikTok Shop growth systems.
                </p>
              </div>
            </div>
            <div className="mx-auto">
              <TestimonialCarousel hideHeader />
            </div>
          </div>
        </section>

        {/* Contact Section */}
  <section id="contact" className="w-full py-12 md:py-24 lg:py-32 relative bg-transparent">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-gradient">Get In Touch</h2>
                <p className="max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed">
                  Ready to scale your TikTok Shop? Let's discuss your growth strategy.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-2xl">
              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-gradient">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                  Everything you need to know about working with NEXTOK
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem
                  value="item-1"
                  className="border border-slate-700/50 rounded-lg px-6 bg-slate-800/30 backdrop-blur hover:bg-slate-800/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white hover:text-cyan-400">
                    <span className="font-semibold">I'm new to TikTok Shop. Can you help me from scratch?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4">
                    Yes. We offer full onboarding, from setting up your Shop to building your influencer & ad pipeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border border-slate-700/50 rounded-lg px-6 bg-slate-800/30 backdrop-blur hover:bg-slate-800/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white hover:text-cyan-400">
                    <span className="font-semibold">Do you work on commission or fixed fees?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4">
                    We offer flexible pricing—fixed retainers, performance-based, or hybrid models depending on brand
                    stage.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="border border-slate-700/50 rounded-lg px-6 bg-slate-800/30 backdrop-blur hover:bg-slate-800/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white hover:text-cyan-400">
                    <span className="font-semibold">How fast can I expect results?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4">
                    Most brands see traction within 2-4 weeks. For scaling, we recommend a 60-90 day timeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="border border-slate-700/50 rounded-lg px-6 bg-slate-800/30 backdrop-blur hover:bg-slate-800/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400">
                    <span className="font-semibold">Can you handle logistics & fulfillment too?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4">
                    While we don't fulfill orders, we guide your team or connect you with trusted partners for smooth
                    ops.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="border border-slate-700/50 rounded-lg px-6 bg-slate-800/30 backdrop-blur hover:bg-slate-800/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400">
                    <span className="font-semibold">What kind of brands do you work with?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4">
                    Primarily eCommerce brands in health, wellness, beauty, and gadgets—especially with a high AOV.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 to-cyan-600/90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white animate-fade-in">
                  Ready to Scale Your TikTok Shop?
                </h2>
                <p className="max-w-[600px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in-up delay-300">
                  Join the brands that have already transformed their TikTok Shop performance with NEXTOK.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-up delay-500">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-slate-900 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-white/25 transition-all duration-300 hover:scale-105 group"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent hover:scale-105 transition-all duration-300"
                >
                  Email: awais@nextok.io
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur relative z-10">
        <p className="text-xs text-gray-400">© 2024 NEXTOK. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white transition-colors"
            href="mailto:awais@nextok.io"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
