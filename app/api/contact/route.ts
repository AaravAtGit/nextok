import { NextResponse } from "next/server"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  interest: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const parsed = ContactSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const payload = parsed.data

    // TODO: Integrate email provider or CRM here
    console.log("Contact submission:", payload)

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
