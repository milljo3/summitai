import {ResponseMeetingSummary, responseMeetingSummarySchema} from "@/types/meeting";

const url = "https://openrouter.ai/api/v1/chat/completions";
const headers = {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.LOCAL_URL || "https://summitai-seven.vercel.app",
    "X-Title": "Meeting Summarizer"
};

export async function summarizeMeeting(transcript: string): Promise<ResponseMeetingSummary> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({
                "model": "mistralai/mistral-small-3.2-24b-instruct:free",
                messages: [
                    {
                        role: "system",
                        content: `You are a meeting transcript analyzer. If the user's input is not a valid meeting transcript (e.g., irrelevant text, jokes, nonsense, or trolling), respond with the following default JSON:
                            {
                              "title": "Untitled Meeting",
                              "summary": "No valid meeting content found.",
                              "actions": [],
                              "questions": [],
                              "decisions": [],
                              "tags": []
                            }
                            
                            Otherwise, extract and return the following as JSON:
                            
                            {
                              "title": string (or "Untitled Meeting"),
                              "summary": string (concise),
                              "actions": [{"task": string, "responsible": string ("unknown" if missing), "deadline": string ("unknown" if missing)}],
                              "questions": string[],
                              "decisions": string[],
                              "tags": string[]
                            }
                            
                            Always be strict and never fabricate structure from clearly irrelevant content.`
                    },
                    {
                        role: "user",
                        content: `Meeting transcript:\n${transcript}`
                    }
                ],
                response_format: {
                  type: "json_schema",
                  json_schema: {
                      name: "Meeting Summarizer",
                      strict: true,
                      schema: {
                          type: "object",
                          properties: {
                              title: {
                                  type: "string",
                                  description: "Meeting title",
                              },
                              summary: {
                                  type: "string",
                                  description: "A concise summary of the meeting",
                              },
                              actions: {
                                  type: "array",
                                  description: "Action items (who is responsible and deadline)",
                              },
                              questions: {
                                  type: "array",
                                  description: "Questions raised for meeting",
                              },
                              decisions: {
                                  type: "array",
                                  description: "Decisions made in the meeting",
                              },
                              tags: {
                                  type: "array",
                                  description: "Key tags to to describe the meeting",
                              },
                          },
                          required: ["title", "summary", "actions", "questions", "decisions", "tags"],
                          additionalProperties: false,
                      },
                  },
                },
                temperature: 0.3
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        let jsonContent: unknown;
        try {
            const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
            jsonContent = JSON.parse(cleanedContent);
        } catch (e) {
            throw new Error(`Failed to parse API response: ${e instanceof Error ? e.message : String(e)}`);
        }

        const parsed = responseMeetingSummarySchema.safeParse(jsonContent);

        if (!parsed.success) {
            console.error("Validation errors:", parsed.error);
            throw new Error("Invalid response format");
        }

        return parsed.data;
    }
    catch (error) {
        console.error("Error occurred while summarize_meeting", error);
        throw new Error(`Failed to summarize meeting: ${error instanceof Error ? error.message : String(error)}`);
    }
}