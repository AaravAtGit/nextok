"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Users, LineChart, ClipboardList, ShieldCheck, ArrowRight, Bot } from "lucide-react"

const services = [
  {
    id: "setup",
    title: "TikTok Shop Setup & Management",
    icon: Store,
    description:
      "Comprehensive onboarding, product uploads, and daily shop health monitoring to ensure your store is always optimized for sales.",
  },
  {
    id: "ugc",
    title: "Influencer Seeding & UGC",
    icon: Users,
    description:
      "We activate our network of 60+ vetted creators to generate authentic UGC, driving brand trust and organic conversions.",
  },
  {
    id: "ads",
    title: "Paid Ads & GMV Scaling",
    icon: LineChart,
    description:
      "Data-driven ad strategies using TikTok Ads Manager to maximize your GMV, from creative testing to full-funnel scaling.",
  },
  {
    id: "compliance",
    title: "TikTok Shop Compliance",
    icon: ShieldCheck,
    description:
      "Navigate the complexities of TikTok's policies with our expert guidance, ensuring your shop stays compliant and secure.",
  },
  {
    id: "consultations",
    title: "Consultations & Audits",
    icon: ClipboardList,
    description:
      "Get expert, 1:1 guidance on your TikTok Shop strategy or a comprehensive audit to identify growth opportunities.",
  },
]

const OurServicesV4 = () => {
  return (
    <section id="services" className="relative w-full py-16 md:py-24 lg:py-32 bg-slate-50/90 dark:bg-slate-950/50">
      <div className="container px-4 md:px-6 relative mx-auto">
        <div data-animate="section" className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge className="bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">
            Our Services
          </Badge>
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100 text-center px-4">
            Your TikTok Shop Growth Engine
          </h2>
          <p className="max-w-[900px] text-slate-600 dark:text-slate-300 text-base md:text-xl/relaxed text-center mx-auto px-4">
            We provide a complete suite of services to launch, manage, and scale your brand on the world's fastest-growing social commerce platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 px-2 sm:px-0 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            // First 3 cards span 2 columns each (2/6 = 1/3), last 2 cards span 2 columns each but with offset
            const colSpan = index < 3 ? "lg:col-span-2" : "lg:col-span-2";
            const colStart = index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : "";
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group flex ${colSpan} ${colStart}`}
              >
                <Card className="h-full w-full flex flex-col rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-cyan-300 dark:hover:border-cyan-500 p-6">
                  <CardHeader className="w-full pb-3">
                    <div className="flex flex-col items-center gap-3 justify-center w-full">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300 transition-colors duration-300 group-hover:bg-cyan-500/20"
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white text-center leading-snug">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow w-full pt-0">
                    <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow text-center leading-relaxed">{service.description}</p>
                    <a href="#contact" className="mt-5 inline-flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-200 justify-center w-full transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurServicesV4
