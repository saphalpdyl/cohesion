"use server";

import OpenAI from "openai";

import engineeredPrompt from "@/prompts/prompt-flow-generator";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function generateFlowDataFromSchema(schema: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        "role": "user",
        "content": `Generate a Nodes and Edges based on this SQL schema: ${schema}`
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "json_object"
    },
  });

  return response;
}