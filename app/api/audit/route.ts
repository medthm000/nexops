import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a senior AI consultant at NexOps. NexOps builds custom AI agents for SMBs:
• Marketing AI (Houda): content creation, ad optimisation, social media automation
• Customer Support AI (Soufiane): 24/7 chatbot, lead qualification, WhatsApp & web
• Email AI (Ilyas): inbox automation, personalised outreach, follow-up sequences
• Finance AI (Reda): invoice processing, KPI dashboards, automated reporting

Write a personalised 200-word AI audit report for the client. Structure:
1. Warm opening using their first name and company name
2. 2 specific insights based on their actual answers (be concrete)
3. 2 NexOps solutions best suited to their situation with tangible benefits
4. Clear CTA to book a free strategy call

Tone: professional, confident, opportunity-focused. Highlight GROWTH, SPEED, and COMPETITIVE EDGE — never frame AI as replacing people.`

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
          max_tokens: 340,
          temperature: 0.72,
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
