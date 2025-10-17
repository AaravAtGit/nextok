"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Users, LineChart, ClipboardList, ShieldCheck, ArrowRight } from "lucide-react"

const services = [
  {
    id: "setup",
    title: "TikTok Shop Setup & Management",
    icon: Store,
    description:
      "Comprehensive onboarding, product uploads, and daily shop health monitoring to ensure your store is always optimized for sales.",
    bgColor: "bg-sky-500/10",
    textColor: "text-sky-500",
    darkBgColor: "dark:bg-sky-500/10",
    darkTextColor: "dark:text-sky-300",
  },
  {
    id: "ugc",
    title: "Influencer Seeding & UGC",
    icon: Users,
    description:
      "We activate our network of 60+ vetted creators to generate authentic UGC, driving brand trust and organic conversions.",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-500",
    darkBgColor: "dark:bg-pink-500/10",
    darkTextColor: "dark:text-pink-300",
  },
  {
    id: "ads",
    title: "Paid Ads & GMV Scaling",
    icon: LineChart,
    description:
      "Data-driven ad strategies using TikTok Ads Manager to maximize your GMV, from creative testing to full-funnel scaling.",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    darkBgColor: "dark:bg-emerald-500/10",
    darkTextColor: "dark:text-emerald-300",
  },
  {
    id: "compliance",
    title: "TikTok Shop Compliance",
    icon: ShieldCheck,
    description:
      "Navigate the complexities of TikTok's policies with our expert guidance, ensuring your shop stays compliant and secure.",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    darkBgColor: "dark:bg-purple-500/10",
    darkTextColor: "dark:text-purple-300",
  },
  {
    id: "consultations",
    title: "Consultations & Audits",
    icon: ClipboardList,
    description:
      "Get expert, 1:1 guidance on your TikTok Shop strategy or a comprehensive audit to identify growth opportunities.",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    darkBgColor: "dark:bg-orange-500/10",
    darkTextColor: "dark:text-orange-300",
  },
]

const OurServicesV3 = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <Card className="h-full flex flex-col rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-cyan-300 dark:hover:border-cyan-500">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${service.bgColor} ${service.darkBgColor}`}
                      >
                        <Icon className={`h-6 w-6 ${service.textColor} ${service.darkTextColor}`} />
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

export default OurServicesV3
