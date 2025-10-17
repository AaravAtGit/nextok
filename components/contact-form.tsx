"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  interest: z
    .string()
    .min(1, "Please select an interest"),
  message: z.string().min(10, "Please include at least 10 characters"),
})

type ContactValues = z.infer<typeof ContactSchema>

export default function ContactForm() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "",
      message: "",
    },
    mode: "onTouched",
  })

  async function onSubmit(values: ContactValues) {
    try {
      setSubmitting(true)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Request failed")
      toast({ title: "Message sent", description: "We’ll get back to you shortly." })
      form.reset()
    } catch (e) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-xl dark:border-slate-700/70 dark:bg-slate-900/70">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-slate-900 dark:text-white text-center">Send Us a Message</CardTitle>
        <CardDescription className="text-center">Tell us about your brand and goals</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/80" placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/80" placeholder="you@brand.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/80" placeholder="Brand Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I'm interested in</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-slate-300 focus:ring-0 dark:border-slate-700 dark:bg-slate-900/80">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="shop-management">TikTok Shop Setup & Management</SelectItem>
                        <SelectItem value="influencer">Influencer Seeding & UGC</SelectItem>
                        <SelectItem value="ads-scaling">Paid Ads & GMV Scaling</SelectItem>
                        <SelectItem value="audit">Consultation / Audit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea rows={6} className="rounded-2xl border-slate-300 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/80" placeholder="Share context, goals, current challenges..." {...field} />
                  </FormControl>
                  <FormDescription className="text-slate-500 dark:text-slate-400">We typically reply within 1 business day.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2 h-11 rounded-xl bg-cyan-500 hover:bg-cyan-600 shadow-md hover:shadow-cyan-500/20 transition-shadow w-full" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
