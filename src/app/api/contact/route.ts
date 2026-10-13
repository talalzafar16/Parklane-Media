import { NextResponse } from 'next/server'

import { siteConfig } from '@/data/site'
import { parseEnquiry, type EnquiryResponse } from '@/lib/enquiry'

function respond(body: EnquiryResponse, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

// Enquiries are forwarded as JSON to CONTACT_WEBHOOK_URL (Formspree, Zapier, Slack, a CRM…).
// Without it the form falls back to a prefilled email.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return respond({ ok: false, code: 'bad_request' }, 400)

  const { values, errors, isSpam } = parseEnquiry(body)
  if (errors) return respond({ ok: false, code: 'invalid', errors }, 422)
  if (isSpam) return respond({ ok: true })

  const endpoint = process.env.CONTACT_WEBHOOK_URL
  if (!endpoint) return respond({ ok: false, code: 'not_configured' }, 503)

  try {
    const delivery = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, source: siteConfig.url, submittedAt: new Date().toISOString() }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    if (!delivery.ok) throw new Error(`Webhook responded ${delivery.status}`)
  } catch (error) {
    console.error('[api/contact] delivery failed', error)
    return respond({ ok: false, code: 'delivery_failed' }, 502)
  }

  return respond({ ok: true })
}
