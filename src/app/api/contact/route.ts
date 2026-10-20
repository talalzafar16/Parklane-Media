import { NextResponse } from 'next/server'

import { siteConfig } from '@/data/site'
import { parseEnquiry } from '@/lib/enquiry'

// Forwards enquiries as JSON to CONTACT_WEBHOOK_URL (Formspree, Zapier, Slack, a CRM…).
export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL
  if (!endpoint) return NextResponse.json({ ok: false }, { status: 503 })

  const { enquiry, valid, isSpam } = parseEnquiry(await request.json().catch(() => null))
  if (!valid) return NextResponse.json({ ok: false }, { status: 422 })
  if (isSpam) return NextResponse.json({ ok: true })

  try {
    const delivery = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...enquiry, source: siteConfig.url, submittedAt: new Date().toISOString() }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    if (!delivery.ok) throw new Error(`Webhook responded ${delivery.status}`)
  } catch (error) {
    console.error('[api/contact] delivery failed', error)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
