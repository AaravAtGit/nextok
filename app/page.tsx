"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Mail, Store, Users, LineChart, ClipboardList, ShieldCheck, Sparkles, Rocket, GaugeCircle, Menu } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/contact-form"
import OurServicesV4 from "@/components/our-services-v4"
import { ParticlesComponent } from "@/components/ui/particles"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const WHY_US_FEATURES = [
  {
    title: "Launch in weeks, not months",
    description: "Our sprint-based onboarding gets your TikTok Shop optimized, stocked, and conversion-ready in under 21 days.",
    stat: "21 day avg go-live",
    icon: Rocket,
  },
  {
    title: "Creator pipeline on autopilot",
    description: "We activate vetted creators, seed product, and turn winning UGC into evergreen ads while you stay focused on ops.",
    stat: "60+ creators activated",
    icon: Sparkles,
  },
  {
    title: "Decisions fueled by live data",
    description: "Daily dashboards highlight your GMV, retention, and ad ROI so every creative tweak is grounded in numbers.",
    stat: "43% avg GMV lift",
    icon: GaugeCircle,
  },
  {
    title: "Risk-free growth partners",
    description: "Clear SLAs, brand-safe messaging, and fulfillment support keep your team protected while we scale the demand side.",
    stat: "98% client retention",
    icon: ShieldCheck,
  },
] as const

const PageContent = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // GSAP and IntersectionObserver animations
    gsap.registerPlugin(ScrollTrigger)

    let allAnimatedElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    )
    const faqHeader = allAnimatedElements.find(el => el.dataset.animate === 'faq-header');
    const faqItems = allAnimatedElements.filter(
      (el) => el.dataset.animate === "faq-item"
    )
    const cssAnimatedElements = allAnimatedElements.filter(
      (el) => el.dataset.animate !== "faq-item" && el.dataset.animate !== "faq-header"
    )

    // GSAP animations for FAQ
    if (faqHeader && faqItems.length > 0) {
      const allFaqElements = [faqHeader, ...faqItems];
      gsap.set(allFaqElements, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: faqHeader.parentNode as Element, // Animate all when the container is in view
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(allFaqElements, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "elastic.out(1, 0.4)",
          });
        },
      });
    }

    // CSS animations for other elements
    if (cssAnimatedElements.length === 0) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    const counters = new Map<string, number>()

    const getNextIndex = (key: string) => {
      const current = counters.get(key) ?? 0
      counters.set(key, current + 1)
      return current
    }

    const delaySteps: Record<string, number> = {
      section: 80,
      card: 50,
      // "faq-item" is handled by GSAP
    }

    cssAnimatedElements.forEach((element) => {
      const type = element.dataset.animate ?? "section"
      const index = getNextIndex(type)
      const step = delaySteps[type] ?? delaySteps.section

      element.classList.add("scroll-animate-init")
      element.style.setProperty("--scroll-delay", `${Math.min(index, 8) * step}ms`)
    })

    if (prefersReducedMotion.matches) {
      cssAnimatedElements.forEach((element) => {
        element.classList.add("scroll-animate-visible")
      })
      // Also apply final state for GSAP animations
      if (faqHeader && faqItems.length > 0) {
        const allFaqElements = [faqHeader, ...faqItems];
        gsap.set(allFaqElements, { y: 0, opacity: 1 });
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            window.requestAnimationFrame(() => {
              target.classList.add("scroll-animate-visible")
            })
            return
          }

          if (entry.boundingClientRect.top > 0) {
            target.classList.remove("scroll-animate-visible")
          }
        })
      },
      {
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.15,
      }
    )

    cssAnimatedElements.forEach((element) => observer.observe(element))

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return
      }

      observer.disconnect()
      cssAnimatedElements.forEach((element) => {
        element.classList.add("scroll-animate-visible")
      })
    }

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleReducedMotionChange)
    } else {
      prefersReducedMotion.addListener(handleReducedMotionChange)
    }

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(t => t.kill())
      if (typeof prefersReducedMotion.removeEventListener === "function") {
        prefersReducedMotion.removeEventListener(
          "change",
          handleReducedMotionChange
        )
      } else {
        prefersReducedMotion.removeListener(handleReducedMotionChange)
      }
    }
  }, [])

  return (
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <header
          className={`px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 dark:bg-background/85 sticky top-0 z-40 transition-all duration-700 shadow-sm dark:shadow-none ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        >
          <Link className="flex items-center justify-center" href="/">
            <span className="text-brand-gradient text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow">NEXTOK</span>
          </Link>
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
            <Link
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
              href="#testimonials"
            >
              Testimonials
            </Link>
            <Link
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
              href="#contact"
            >
              Contact
            </Link>
            <Link
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
              href="#faq"
            >
              FAQ
            </Link>
            <Link
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
              href="#services"
            >
              Services
            </Link>
            <ThemeToggle />
          </nav>
          <div className="ml-auto md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
                    href="#testimonials"
                  >
                    Testimonials
                  </Link>
                  <Link
                    className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
                    href="#contact"
                  >
                    Contact
                  </Link>
                  <Link
                    className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
                    href="#faq"
                  >
                    FAQ
                  </Link>
                  <Link
                    className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300"
                    href="#services"
                  >
                    Services
                  </Link>
                  <div className="mt-4">
                    <ThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 relative z-10">
          {/* Hero Section */}
          <section
              className="relative w-full h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950/60 dark:to-transparent"
            >
              <div className="absolute inset-0">
                <ParticlesComponent
                  className="absolute inset-0 z-0 opacity-60 dark:opacity-90"
                  enableInLight
                  density={50}
                />
              </div>

              <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="mx-auto grid max-w-4xl gap-8 text-center">
                  <div
                    className={`flex flex-col items-center justify-center space-y-5 ${isLoaded ? "hero-text-animate" : "hero-text-initial"}`}
                  >
                    <div className="space-y-3 text-center">
                      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl xl:text-7xl/none text-center px-4">
                        Turn TikTok Views Into <span className="text-brand-gradient">Revenue</span>
                      </h1>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-100 text-center sm:text-2xl px-4">
                        Your TikTok Shop growth partner that actually delivers results.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center w-full md:w-auto">
                      <Button
                        size="lg"
                        className={`${isLoaded ? "hero-button-animate hero-button-delay-1" : "hero-button-initial"} bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 group w-full md:w-auto`}
                      >
                        Book a Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className={`${isLoaded ? "hero-button-animate hero-button-delay-2" : "hero-button-initial"} border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10 bg-white/70 hover:border-cyan-400 transition-all duration-300 hover:scale-105 dark:bg-slate-900/60 w-full md:w-auto`}
                      >
                        See Our Work
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section
              id="why-us"
              className="relative w-full overflow-hidden bg-slate-100/90 py-16 md:py-24 lg:py-28 dark:bg-slate-950/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-200/50 dark:from-slate-900 dark:via-slate-950/30 dark:to-slate-900" />
              <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div data-animate="section" className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center space-y-4">
                  <Badge className="bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">Why NEXTOK</Badge>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white text-center px-4">
                    Growth partners built for TikTok velocity
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 text-center px-4">
                    We combine creator firepower, paid social precision, and battle-tested playbooks so your brand can blitz
                    every campaign cycle with confidence.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-2 sm:px-0 max-w-7xl mx-auto">
                  {WHY_US_FEATURES.map(({ title, description, stat, icon: Icon }) => (
                    <div
                      key={title}
                      data-animate="card"
                      className="group relative flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:hover:border-cyan-500/70"
                    >
                      <div className="flex flex-col items-center justify-center w-full gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                          {stat}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white w-full text-center leading-snug">{title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 w-full text-center">{description}</p>
                      <div className="mt-auto pt-2 flex items-center gap-2 text-xs font-medium text-cyan-600 transition-colors group-hover:text-cyan-500 dark:text-cyan-300 dark:group-hover:text-cyan-200 w-full justify-center">
                        <span>See how it works</span>
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <OurServicesV4 />

            {/* Testimonials Section (Carousel) */}
      <section id="testimonials" className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950/40 dark:via-slate-950/20 dark:to-slate-950/50">
              <div className="container px-4 md:px-6 mx-auto">
                <div data-animate="section" className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="space-y-3 text-center">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100 text-center px-4">
                      What Our Clients Say
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 dark:text-blue-100 text-base md:text-xl/relaxed text-center px-4">
                      Real results from eCommerce brands we help scale with data-driven TikTok Shop growth systems.
                    </p>
                  </div>
                </div>
                <div data-animate="section" className="mx-auto max-w-5xl">
                  <TestimonialCarousel hideHeader />
                </div>
              </div>
            </section>

            {/* Contact Section */}
      <section id="contact" className="relative w-full py-12 md:py-24 lg:py-32 bg-slate-100/90 dark:bg-slate-950/50">
              <div className="container px-4 md:px-6 relative mx-auto">
                <div data-animate="section" className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100 text-center px-4">Get In Touch</h2>
                    <p className="max-w-[600px] text-slate-600 dark:text-slate-300 text-base md:text-xl/relaxed text-center mx-auto px-4">
                      Ready to scale your TikTok Shop? Let's discuss your growth strategy.
                    </p>
                  </div>
                </div>

                <div data-animate="section" className="mx-auto max-w-3xl">
                  {/* Contact Form */}
                  <ContactForm />
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative w-full py-12 md:py-24 lg:py-32 bg-white/90 dark:bg-slate-950/60">
              <div className="container px-4 md:px-6 mx-auto">
                <div data-animate="faq-header" className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100 text-center px-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="max-w-[600px] text-slate-600 dark:text-slate-300 text-base md:text-xl/relaxed text-center mx-auto px-4">
                      Everything you need to know about working with NEXTOK
                    </p>
                  </div>
                </div>

                <div className="mx-auto max-w-3xl px-2 sm:px-0">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem
                      value="item-1"
                      data-animate="faq-item"
                      className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                    >
                      <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300 text-base sm:text-lg">
                        <span className="font-semibold text-left">What does the onboarding process look like for a new brand?</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300 text-left">
                        Our onboarding is a streamlined 3-week sprint designed for rapid launch. <strong>Week 1: Strategy & Setup:</strong> We conduct a deep dive into your brand, goals, and catalog, then build your TikTok Shop from the ground up, optimizing listings and integrating your systems. <strong>Week 2: Creator Activation:</strong> We identify and onboard 5-10 initial creators from our vetted network, seed products, and develop creative briefs for authentic UGC. <strong>Week 3: Launch & First Ads:</strong> Your shop goes live, the first wave of UGC content is published, and we launch initial ad campaigns to drive early traffic and sales data. You get a dedicated account manager and a live dashboard from day one.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-2"
                      data-animate="faq-item"
                      className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                    >
                      <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300 text-base sm:text-lg">
                          <span className="font-semibold text-left">How do you measure success and what kind of reporting can I expect?</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300 text-left">
                        Success is measured against clear KPIs we set together, primarily focusing on Gross Merchandise Value (GMV), Return on Ad Spend (ROAS), and customer acquisition cost (CAC). You'll receive access to a live, 24/7 dashboard showing performance across the funnel—from creator content views to shop conversion rates. We also provide weekly summary reports with key insights and a monthly strategic review to discuss performance and plan for the upcoming month. Transparency is key; you'll see every number, every day.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-3"
                      data-animate="faq-item"
                      className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                    >
                      <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300 text-base sm:text-lg">
                        <span className="font-semibold text-left">My brand is already on TikTok Shop but we're not seeing growth. How can you help?</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300 text-left">
                        This is a common challenge. We'd start with our comprehensive TikTok Shop Audit. This process analyzes every aspect of your current setup: product feed optimization, creator content performance, ad campaign structure, and shop page conversion funnels. We identify key friction points and growth levers. From there, we'll propose a targeted 90-day growth plan focused on the highest-impact areas, whether it's revitalizing your creator strategy, scaling your ad spend with better creatives, or optimizing your shop for higher conversion rates.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-4"
                      data-animate="faq-item"
                      className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                    >
                      <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300 text-base sm:text-lg">
                        <span className="font-semibold text-left">How do you find and manage creators for our campaigns?</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300 text-left">
                        We have a private, vetted network of over 60 high-performing TikTok creators across various niches. Our process is data-driven. We match creators to your brand based on audience demographics, engagement rates, and past performance with similar products. We handle all communication, contract negotiations, product seeding, and creative brief management. Our system ensures a consistent flow of authentic, high-quality UGC that resonates with your target audience while you stay focused on your business operations.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-5"
                      data-animate="faq-item"
                      className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                    >
                      <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300 text-base sm:text-lg">
                        <span className="font-semibold text-left">What makes NEXTOK different from other TikTok marketing agencies?</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300 text-left">
                        Three things: <strong>1. We are TikTok Shop specialists.</strong> We don't just do "TikTok marketing"; we live and breathe the Shop ecosystem, from backend setup to affiliate commission structures. <strong>2. We are performance-driven.</strong> Our strategies are built around driving tangible sales (GMV), not just vanity metrics like views or likes. Every action is tied to a commercial outcome. <strong>3. We are your growth partner.</strong> We operate as an extension of your team, providing strategic guidance, transparent reporting, and a clear focus on your long-term success on the platform. We win when you win.
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
                <div className="absolute top-0 left-1/4 h-32 w-32 animate-pulse rounded-full bg-white/20 opacity-50"></div>
                <div className="absolute bottom-0 right-1/4 h-24 w-24 animate-pulse delay-1000 rounded-full bg-white/20 opacity-40"></div>
              </div>
              <div className="container px-4 md:px-6 relative max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white animate-fade-in text-center px-4">
                      Ready to Scale Your TikTok Shop?
                    </h2>
                    <p className="max-w-[600px] text-white/90 text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in-up delay-300 text-center mx-auto px-4">
                      Join the brands that have already transformed their TikTok Shop performance with NEXTOK.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-up delay-500 justify-center w-full md:w-auto">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-slate-900 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-white/25 transition-all duration-300 hover:scale-105 group w-full md:w-auto"
                    >
                      Book a Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 bg-transparent hover:scale-105 transition-all duration-300 w-full md:w-auto"
                    >
                      Email: awais@nextok.io
                      <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="flex flex-col gap-2 py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800 bg-slate-950 relative z-10 text-center">
              <p className="text-xs text-slate-600 transition-colors dark:text-slate-400 text-center">© {currentYear} NEXTOK. All rights reserved.</p>
              <nav className="flex gap-4 sm:gap-6 justify-center">
              <Link
                className="text-xs text-slate-500 underline-offset-4 transition-colors hover:text-cyan-600 hover:underline dark:text-slate-400 dark:hover:text-cyan-300"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-xs text-slate-500 underline-offset-4 transition-colors hover:text-cyan-600 hover:underline dark:text-slate-400 dark:hover:text-cyan-300"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs text-slate-500 underline-offset-4 transition-colors hover:text-cyan-600 hover:underline dark:text-slate-400 dark:hover:text-cyan-300"
                href="mailto:awais@nextok.io"
              >
                Contact
              </Link>
            </nav>
          </footer>
        </main>
      </div>
  )
}

export default function HomePage() {
  return <PageContent />
}
