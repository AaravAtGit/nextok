"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Mail, Store, Users, LineChart, ClipboardList, ShieldCheck, Sparkles, Rocket, GaugeCircle } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import ContactForm from "@/components/contact-form"
import { ParticlesComponent } from "@/components/ui/particles"

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

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // IntersectionObserver-based scroll animations for marked sections/elements
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    )

    if (animatedElements.length === 0) {
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const counters = new Map<string, number>()

    const getNextIndex = (key: string) => {
      const current = counters.get(key) ?? 0
      counters.set(key, current + 1)
      return current
    }

    const delaySteps: Record<string, number> = {
      section: 140,
      card: 90,
      "faq-item": 70,
    }

    animatedElements.forEach((element) => {
      const type = element.dataset.animate ?? "section"
      const index = getNextIndex(type)
      const step = delaySteps[type] ?? delaySteps.section

      element.classList.add("scroll-animate-init")
      element.style.setProperty("--scroll-delay", `${Math.min(index, 8) * step}ms`)
    })

    if (prefersReducedMotion.matches) {
      animatedElements.forEach((element) => {
        element.classList.add("scroll-animate-visible")
      })
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

    animatedElements.forEach((element) => observer.observe(element))

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return
      }

      observer.disconnect()
      animatedElements.forEach((element) => {
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
      if (typeof prefersReducedMotion.removeEventListener === "function") {
        prefersReducedMotion.removeEventListener("change", handleReducedMotionChange)
      } else {
        prefersReducedMotion.removeListener(handleReducedMotionChange)
      }
    }
  }, [])

  return (
  <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Background handled by particles + body vars */}

      {/* Header */}
      <header
        className={`px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 dark:bg-background/85 sticky top-0 z-40 transition-all duration-700 shadow-sm dark:shadow-none ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <Link className="flex items-center justify-center" href="/">
          <span className="text-brand-gradient text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow">NEXTOK</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
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
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section
          data-animate="section"
          className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950/60 dark:to-transparent py-16 md:py-28 lg:py-36"
        >
          <div className="absolute inset-0">
            <ParticlesComponent
              className="absolute inset-0 z-0 opacity-60 dark:opacity-90"
              enableInLight
              density={50}
            />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto grid max-w-4xl gap-8 text-center">
              <div
                className={`flex flex-col items-center justify-center space-y-5 ${isLoaded ? "hero-text-animate" : "hero-text-initial"}`}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-6xl/none">
                    Scale Your TikTok Shop With <span className="text-brand-gradient">NEXTOK</span>
                  </h1>
                  <p className="text-xl font-semibold text-slate-600 dark:text-slate-200">
                    Experts in growing brands through TikTok Shop strategy, influencer seeding & GMV-maximizing
                    campaigns.
                  </p>
                  <p className="mx-auto max-w-[640px] text-slate-600 dark:text-slate-300 md:text-lg">
                    We help eCommerce brands unlock their next level of sales using performance-driven TikTok Shop
                    growth systems.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className={`${isLoaded ? "hero-button-animate hero-button-delay-1" : "hero-button-initial"} bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 group`}
                  >
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className={`${isLoaded ? "hero-button-animate hero-button-delay-2" : "hero-button-initial"} border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10 bg-white/70 hover:border-cyan-400 transition-all duration-300 hover:scale-105 dark:bg-slate-900/60`}
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
          data-animate="section"
          className="relative w-full overflow-hidden bg-slate-100/90 py-16 md:py-24 lg:py-28 dark:bg-slate-950/60"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-200/50 dark:from-slate-900 dark:via-slate-950/30 dark:to-slate-900" />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center space-y-4">
              <Badge className="bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">Why NEXTOK</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                Growth partners built for TikTok velocity
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                We combine creator firepower, paid social precision, and battle-tested playbooks so your brand can blitz
                every campaign cycle with confidence.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {WHY_US_FEATURES.map(({ title, description, stat, icon: Icon }) => (
                <div
                  key={title}
                  data-animate="card"
                  className="group relative flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:hover:border-cyan-500/70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                      {stat}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-cyan-600 transition-colors group-hover:text-cyan-500 dark:text-cyan-300 dark:group-hover:text-cyan-200">
                    <span>See how it works</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" data-animate="section" className="relative w-full py-12 md:py-24 lg:py-32 bg-slate-50/90 dark:bg-slate-950/50">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-slate-100">Our Services</h2>
                <p className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed">
                  Comprehensive TikTok Shop solutions to scale your brand
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              {/* TikTok Shop Setup & Management */}
              <Card
                data-animate="card"
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group"
              >
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
              <Card
                data-animate="card"
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group"
              >
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
              <Card
                data-animate="card"
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group"
              >
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
              <Card
                data-animate="card"
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500 group"
              >
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
  <section id="testimonials" data-animate="section" className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950/40 dark:via-slate-950/20 dark:to-slate-950/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900 dark:text-slate-100">
                  What Our Clients Say
                </h2>
                <p className="mx-auto max-w-[800px] text-slate-600 dark:text-blue-100 md:text-xl/relaxed">
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
  <section id="contact" data-animate="section" className="relative w-full py-12 md:py-24 lg:py-32 bg-slate-100/90 dark:bg-slate-950/50">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-slate-100">Get In Touch</h2>
                <p className="max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed">
                  Ready to scale your TikTok Shop? Let's discuss your growth strategy.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" data-animate="section" className="relative w-full py-12 md:py-24 lg:py-32 bg-white/90 dark:bg-slate-950/60">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-slate-100">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed">
                  Everything you need to know about working with NEXTOK
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem
                  value="item-1"
                  data-animate="faq-item"
                  className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                >
                  <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300">
                    <span className="font-semibold">I'm new to TikTok Shop. Can you help me from scratch?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300">
                    Yes. We offer full onboarding, from setting up your Shop to building your influencer & ad pipeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  data-animate="faq-item"
                  className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                >
                  <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300">
                      <span className="font-semibold">Do you work on commission or fixed fees?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300">
                    We offer flexible pricing—fixed retainers, performance-based, or hybrid models depending on brand
                    stage.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  data-animate="faq-item"
                  className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                >
                  <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300">
                    <span className="font-semibold">How fast can I expect results?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300">
                    Most brands see traction within 2-4 weeks. For scaling, we recommend a 60-90 day timeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  data-animate="faq-item"
                  className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                >
                  <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-cyan-500 hover:to-sky-500 dark:text-slate-100">
                    <span className="font-semibold">Can you handle logistics & fulfillment too?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300">
                    While we don't fulfill orders, we guide your team or connect you with trusted partners for smooth
                    ops.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  data-animate="faq-item"
                  className="group rounded-2xl border border-slate-200/80 bg-white px-6 py-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:border-cyan-500/70"
                >
                  <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-cyan-500 hover:to-sky-500 dark:text-slate-100">
                    <span className="font-semibold">What kind of brands do you work with?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300">
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
            <div className="absolute top-0 left-1/4 h-32 w-32 animate-pulse rounded-full bg-white/20 opacity-50"></div>
            <div className="absolute bottom-0 right-1/4 h-24 w-24 animate-pulse delay-1000 rounded-full bg-white/20 opacity-40"></div>
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
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800 bg-slate-950 relative z-10">
  <p className="text-xs text-slate-600 transition-colors dark:text-slate-400">© {currentYear} NEXTOK. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
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
    </div>
  )
}
