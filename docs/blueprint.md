# **App Name**: WhiteLabel AI Advisor

## Core Features:

- Landing Page with Consultant Modes: Display 10 consultant modes (Relationship, Business, Legal etc.) with icons and descriptions.
- Friendly AI Model Selection: Allow users to select one of 5 AI models (Elena, Roy, Sophia, David, Zara) each with a short bio, influencing the persona of the consultant.
- Real-Time Chat Interface: Enable real-time text chat between the user and the selected AI consultant. Chat history is stored locally in the browser.
- Privacy Focused Data Handling: Ensure no user accounts or logins. Chat history stored locally with a 'Clear Chat History' button.
- AI Consultant Persona: Use an LLM tool to adapt its communication style and expertise based on the selected Consultant Mode and AI Model. The LLM orchestrator chooses the correct model via API.
- Multi-LLM Orchestration: Backend system to manage multiple LLMs (Google Gemini, GPT, Groq, Claude) and intelligently route user requests based on cost, rate limits, latency, and specialization, including a fallback system.
- Admin Panel: Provide an admin panel with traffic analytics, site/content management tools and AI API Management tools. Allow the business customer to white-label their brand through the tool.

## Style Guidelines:

- Primary color: Quora Blue (#B2C7F2) to create familiarity and trust. (Quora's hex code is #B2C7F2).
- Background color: Very light gray (#F0F2F5), echoing Quora's clean background (Quora's hex code is #F0F2F5).
- Accent color: Slightly darker gray (#D3D3D3) for subtle accents and dividers (Quora's is approximately #D3D3D3).
- Body and headline font: 'Inter' for a modern, objective, and neutral feel. The primary consideration for this selection is legibility. (Note: currently only Google Fonts are supported.)
- Mimic Quora's clean layout with clear sections for consultant modes, AI model selection, and chat interface. Maintain a professional and trustworthy appearance.
- Use flat, modern icons to represent consultant modes and AI models.
- Subtle animations on hover for consultant modes and AI model selection. Minimal loading animations during chat responses.