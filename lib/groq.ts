export async function getGroqResponse(message: string) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}