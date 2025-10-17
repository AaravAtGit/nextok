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
      <div className="container px-4 md:px-6 relative">
        <div data-animate="section" className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge className="bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">
            Our Services
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-slate-100">
            Your TikTok Shop Growth Engine
          </h2>
          <p className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed">
            We provide a complete suite of services to launch, manage, and scale your brand on the world's fastest-growing social commerce platform.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full w-full md:w-[calc(50%_-_1rem)] lg:w-[calc(33.333%_-_1.333rem)]"
              >
                <Card className="h-full flex flex-col rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"
                      >
                        <Icon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">{service.description}</p>
                    <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-200">
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
