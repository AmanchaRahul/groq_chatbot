import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY // Note: No NEXT_PUBLIC_ prefix here
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024
    });

    return NextResponse.json({ 
      content: completion.choices[0]?.message?.content || "" 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}