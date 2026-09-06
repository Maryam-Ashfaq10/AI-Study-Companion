import openai from "../utils/openai.js";

interface ExplainNoteInput {
  title: string;
  content: string;
}

export const explainNote = async ({
  title,
  content,
}: ExplainNoteInput) => {
  const response = await openai.responses.create({
    model: "gpt-5-mini",
    instructions: `
You are an AI study assistant.

Explain the student's study note in a clear and educational way.

Rules:
- Use simple language.
- Break complicated concepts into smaller parts.
- Give examples when useful.
- Do not unnecessarily repeat the original note.
- Do not assume advanced knowledge unless the note requires it.
- Focus on helping the student understand the material.
    `,
    input: `
Note title:
${title}

Note content:
${content}
    `,
  });

  return response.output_text;
};