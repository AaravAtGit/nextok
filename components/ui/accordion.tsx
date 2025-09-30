"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const itemRef = React.useRef<HTMLDivElement>(null)
  const composedRefs = React.useMemo(() => mergeRefs(ref, itemRef), [ref])

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const element = itemRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.set(element, {
        opacity: 0,
        xPercent: -55,
        y: 0,
        scaleX: 0.92,
        transformOrigin: "left center"
      })

      gsap.to(element, {
        opacity: 1,
        xPercent: 0,
        y: 0,
        scaleX: 1,
        duration: 1.05,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true
        }
      })
    }, element)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <AccordionPrimitive.Item
      ref={composedRefs}
      className={cn("border-b will-change-transform", className)}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
) {
  return (node: T) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === "function") {
        ref(node)
      } else {
        try {
          ;(ref as React.MutableRefObject<T>).current = node
        } catch {
          // noop
        }
      }
    }
  }
}
