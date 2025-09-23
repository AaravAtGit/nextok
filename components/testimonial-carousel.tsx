"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Testimonial = {
  name: string
  handle?: string
  role?: string
  avatar?: string
  initials?: string
  quote: string
  company?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Avery Thompson",
    role: "Head of Growth",
    company: "Nordic Naturals",
    avatar: "/testimony/p1.jpg",
    initials: "AT",
    quote:
      "NEXTOK helped us go from zero to consistent five-figure GMV on TikTok Shop within eight weeks. Their workflow and communication are top-notch.",
  },
  {
    name: "Kafka",
    role: "Writer",
    company: "Freelance",
    avatar: "/testimony/kafka.jpg",
    initials: "K",
    quote:
      "Don't bend; don't water it down; don't try to make it logical; don't edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly."
  },
  {
    name: "Sun Tzu",
    handle: "@suntzu",
    role: "General",
    company: "Ancient China",
    avatar: "/testimony/sun_tzu.jpg",
    initials: "ST",
    quote:
     "If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.", 
  },
  {
    name: "Rene Descartes",
    role: "Philosopher",
    company: "Thinking inc.",
    avatar: "/testimony/descartes.jpg",
    initials: "RD",
    quote:
      "If You Would Be a Real Seeker after Truth, It Is Necessary that at Least Once in Your Life You Doubt, as Far as Possible, All Things",
  },
  {
    name: "Nietzsche",
    role: "Nihilist",
    company: "Friedrich Inc.",
    avatar: "/testimony/Nietzsche.jpg",
    initials: "FN",
    quote:
      "Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.",
  },
]

export interface TestimonialCarouselProps {
  className?: string
  items?: Testimonial[]
  autoPlayDelay?: number
  heading?: string
  subheading?: string
  hideHeader?: boolean
  showRole?: boolean
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  className,
  items = testimonials,
  autoPlayDelay = 7000,
  heading = "What our clients say",
  subheading = "Real feedback from brands we've helped scale.",
  hideHeader = false,
  showRole = true,
}) => {
  const plugin = React.useRef(
    // Cast to any to avoid versioned Embla type conflicts between plugin and react wrapper
    Autoplay({ delay: autoPlayDelay, stopOnInteraction: true }) as any
  )
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section
      aria-label={heading}
      className={cn("relative w-full", className)}
    >
      {/* Edge arrows at screen boundary */}
      <button
        type="button"
        onClick={() => api?.scrollPrev()}
        aria-label="Previous testimonial"
        className="pointer-events-auto absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/80 p-3 text-slate-300 shadow-lg ring-1 ring-slate-700/60 backdrop-blur-md hover:text-white hover:bg-slate-800/80 md:flex xl:left-6"
        style={{ transform: "translateY(-50%)" }}
      >
        <ArrowLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={() => api?.scrollNext()}
        aria-label="Next testimonial"
        className="pointer-events-auto absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/80 p-3 text-slate-300 shadow-lg ring-1 ring-slate-700/60 backdrop-blur-md hover:text-white hover:bg-slate-800/80 md:flex xl:right-6"
        style={{ transform: "translateY(-50%)" }}
      >
        <ArrowRight className="h-7 w-7" />
      </button>
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        {!hideHeader && (
          <div className="mb-10 flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {heading}
            </h2>
            {subheading && (
              <p className="mx-auto max-w-prose text-sm text-slate-400 md:text-base">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div
          onMouseEnter={() => plugin.current?.stop?.()}
          onMouseLeave={() => plugin.current?.play?.()}
          className="relative"
        >
        <Carousel
          setApi={setApi}
          plugins={[plugin.current as any]}
          opts={{ align: "center", loop: true }}
          className="relative"
        >
          <CarouselContent>
            {items.map((t, i) => (
              <CarouselItem key={i} className="basis-full">
                <Card className="relative h-full overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-800/90 shadow-xl transition-colors duration-300 hover:border-slate-600">
                  <CardContent className="relative flex h-full flex-col gap-10 p-10 md:p-14">
                    <div className="flex flex-col items-center text-center gap-6">
                      <Avatar className="h-28 w-28 ring-2 ring-slate-600">
                        {t.avatar && <AvatarImage src={t.avatar} alt={t.name} />}
                        <AvatarFallback className="bg-slate-700 text-slate-300 text-2xl">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-semibold tracking-tight text-white">
                          {t.name}
                        </span>
                        {showRole && (
                          <span className="text-sm font-medium text-slate-400">
                            {[t.role, t.company].filter(Boolean).join(" • ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-slate-300 md:text-[1.4rem] md:leading-relaxed">
                      {t.quote}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-10 flex w-full items-center justify-center gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 w-8 rounded-full bg-slate-700/80 transition-all",
                i === current && "w-12 bg-cyan-400/80"
              )}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel
