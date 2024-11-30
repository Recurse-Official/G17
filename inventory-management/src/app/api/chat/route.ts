// app/api/chat/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Create a streaming response
    const response = new Response(
      new ReadableStream({
        async start(controller) {
          const stream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful customer support agent for our inventory management system. to get popular products you will find Popular Products Overview option click on explore now in dashboard then you will be redirected to popular products page where you can see popular products. to see sales, purchases and expenses summary you should click at explore now for sales and purchases option in dashboard. to know anything about inventory like ID Product Name Rating Price Stock Quantity you need to click at inventory in sidebar. to add or search a product you need to click products section in sidebar. to manage users click on users in sidebar. to know about expenses like filter by category or date click on expenses in sidebar. when giving the response make sure that you give the step by step route to go like dashboard→Popular Products Overview→explore now→popular products give like this always give ARROWS no points along with a small response'
              },
              ...messages
            ],
            stream: true,
          });

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        },
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}