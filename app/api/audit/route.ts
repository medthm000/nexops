import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are an AI at NexOps. NexOps builds custom AI agents for SMBs:
- Marketing AI (Houda): content creation, ad optimisation, social media automation
- Customer Support AI (Soufiane): 24/7 chatbot, lead qualification, WhatsApp & web
- Email AI (Ilyas): inbox automation, personalised outreach, follow-up sequences
- Finance AI (Reda): invoice processing, KPI dashboards, automated reporting

Write a concise personalised AI audit report. Keep it under 120 words. Structure:
1. One short opening sentence using their first name and company name
2. The 2 most urgent pain points you see from their answers (be specific, no fluff)
3. Exactly 2 NexOps solutions that fit their situation — name the specialist responsible for each
4. One short CTA sentence to book a strategy call

Rules:
- Plain text only. No markdown. No asterisks. No bold. No bullet symbols.
- Tone: direct, professional, opportunity-focused
- Never mention cost-cutting or replacing people — focus on growth and speed
- Sign off as: NexOps AI`

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json()

    const profile = Object.entries(answers as Record<string, string>)
      .map(([q, a]) => `${q}: ${a}`)
      .join('\n')

    const res = await fetch(
      'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk-9aebd922b58e40489df125822084472e',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen-flash',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Client audit profile:\n\n${profile}\n\nGenerate the personalised report.` },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      }
    )

    const data = await res.json()
    const report =
      data.choices?.[0]?.message?.content ??
      'Unable to generate your report at this time. Please try again.'

    return NextResponse.json({ report })
  } catch {
    return NextResponse.json(
      { report: 'A network error occurred. Please try again in a moment.' },
      { status: 500 }
    )
  }
}
