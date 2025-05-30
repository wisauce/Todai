import Together from "together-ai"
import { NextResponse } from "next/server"

const together = new Together() // akan pakai TOGETHER_API_KEY dari env

export async function POST(req: Request) {
  const { input } = await req.json()

  // Buat prompt berdasarkan diary user
  const prompt = `Based on this user diary input, please determine what the user is feeling and give them reassurance and maybe tips:\n\n${input}`

  try {
    const response = await together.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3", // atau bisa juga ganti dengan model lain
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI therapist assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const message = response.choices?.[0]?.message?.content || "Sorry, I couldn't understand that."
    return NextResponse.json({ result: message })
  } catch (err: any) {
    console.error("Together API error:", err)
    return NextResponse.json({ result: "An error occurred while contacting the AI." }, { status: 500 })
  }
}
