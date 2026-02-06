require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Check if API Key exists
if (!process.env.NVIDIA_API_KEY) {
  console.error("CRITICAL ERROR: NVIDIA_API_KEY is missing in .env file!");
}

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.post('/analyze-thought', async (req, res) => {
  const { thought } = req.body;
  if (!thought) return res.status(400).json({ error: 'Thought is required' });

  console.log("Analyzing thought:", thought); // Log request

  try {
    const completion = await openai.chat.completions.create({
      // Hum thoda lighter model use karenge jo reliable ho
      model: "meta/llama-3.1-70b-instruct",
      messages: [
        {
          role: "system",
          content: `You are Thinkwell AI, a Strategic Consultant.
          
          OUTPUT INSTRUCTIONS:
          - Return ONLY valid JSON.
          - No conversational filler text before or after the JSON.
          
          JSON STRUCTURE:
          {
            "assumptions": ["Assumption 1", "Assumption 2"],
            "risks": ["Risk 1", "Risk 2"],
            "action_plan": ["Phase 1: ...", "Phase 2: ...", "Phase 3: ..."],
            "verdict": "2-sentence executive summary."
          }
          
          Be detailed and critical.`
        },
        { role: "user", content: `Analyze this strategy: "${thought}"` }
      ],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: false
    });

    const rawContent = completion.choices[0].message.content;
    console.log("AI Raw Response:", rawContent); // Debugging ke liye

    // --- SMART JSON EXTRACTOR (Safest Way) ---
    // Ye code AI ke response me se sirf {...} wala part dhundega
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Valid JSON not found in AI response");
    }

    const cleanContent = jsonMatch[0]; // Sirf JSON part uthaya
    const analysis = JSON.parse(cleanContent);
    
    res.json(analysis);

  } catch (error) {
    console.error('SERVER ERROR:', error.message); // Terminal me error dikhega
    res.status(500).json({ error: 'AI Brain Freeze. Check Server Terminal for details.' });
  }
});

app.listen(port, () => {
  console.log(`Thinkwell Server running on port ${port}`);
});