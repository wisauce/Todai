import Together from "together-ai";
import { NextResponse } from "next/server";

const together = new Together();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { input } = body;

    if (!input || typeof input !== 'string' || input.trim() === '') {
      return NextResponse.json(
        { message: "Input is required and must be a non-empty string." },
        { status: 400 }
      );
    }
    const prompt = `Based on this user diary input, please determine what the user is feeling and give them reassurance and tips:\n\n${input}`;

    const response = await together.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        { role: "system", content: "You are a compassionate AI therapist assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const message = response.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
    
    return NextResponse.json({ result: message });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Together API error:", errorMessage);
    
    return NextResponse.json(
      { result: "An error occurred while contacting the AI." },
      { status: 500 }
    );
  }
}
