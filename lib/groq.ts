import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY ?? '' 
});

export async function getGroqResponse(message: string) {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    throw new Error('GROQ API key is not configured');
  }

  try {
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

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}