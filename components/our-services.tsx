
"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Users, LineChart, ClipboardList, ShieldCheck } from "lucide-react"

const services = [
  {
    id: "setup",
    title: "TikTok Shop Setup & Management",
    icon: Store,
    description:
      "Comprehensive onboarding, product uploads, and daily shop health monitoring to ensure your store is always optimized for sales.",
    features: [
      "Full Shop Onboarding & Compliance",
      "Product Catalog Integration",
      "Shipping & Tax Configuration",
      "Daily Health & Order Monitoring",
    ],
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
    features: [
      "Creator Vetting & Activation",
      "Product Seeding & Gifting",
      "UGC Collection & Licensing",
      "Performance Tracking & Reporting",
    ],
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
    features: [
      "TikTok Max Ads Setup",
      "Creative Ideation & Testing",
      "Audience Targeting & Optimization",
      "GMV & ROAS Scaling Strategy",
    ],
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
    features: [
      "Policy Violation Audits",
      "Content & Product Compliance Checks",
      "Appeals & Reinstatement Support",
      "Proactive Policy Updates",
    ],
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
    features: [
      "1:1 Strategy Sessions",
      "In-Depth Shop & Content Audits",
      "Custom Growth Playbooks",
      "Team Training & Workshops",
    ],
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    darkBgColor: "dark:bg-orange-500/10",
    darkTextColor: "dark:text-orange-300",
  },
]

const OurServices = () => {
  const [hoveredId, setHoveredId] = useState(services[0].id)

  const activeService = services.find((s) => s.id === hoveredId)

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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  onHoverStart={() => setHoveredId(service.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    hoveredId === service.id
                      ? "bg-white dark:bg-slate-900 shadow-2xl scale-105 border-cyan-400/60 dark:border-cyan-500/70"
                      : "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${service.bgColor} ${service.darkBgColor}`}
                    >
                      <Icon className={`h-6 w-6 ${service.textColor} ${service.darkTextColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{service.title}</h3>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`shadow-2xl border-cyan-400/60 dark:border-cyan-500/70 bg-white dark:bg-slate-900`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-lg ${activeService.bgColor} ${activeService.darkBgColor}`}
                        >
                          <activeService.icon
                            className={`h-7 w-7 ${activeService.textColor} ${activeService.darkTextColor}`}
                          />
                        </div>
                        <CardTitle className="text-2xl text-slate-900 dark:text-white">
                          {activeService.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">{activeService.description}</p>
                      <ul className="space-y-3">
                        {activeService.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                activeService.id === "setup" ? "bg-sky-400" :
                                activeService.id === "ugc" ? "bg-pink-400" :
                                activeService.id === "ads" ? "bg-emerald-400" :
                                activeService.id === "compliance" ? "bg-purple-400" :
                                "bg-orange-400"
                              }`}
                            ></div>
                            <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurServices
