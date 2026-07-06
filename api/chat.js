export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }
  }

  const { mensagem } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  console.log("API KEY:", apiKey);

  try {
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: mensagem }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("RESPOSTA GEMINI:", JSON.stringify(data, null, 2));

    const resposta =
  data?.candidates?.[0]?.content?.parts?.[0]?.text ??
  data?.candidates?.[0]?.content?.parts?.[0] ??
  data?.candidates?.[0]?.content ??
  JSON.stringify(data);
    res.status(200).json({ resposta });

  } catch (error) {
    console.error("ERRO GEMINI:", error);
    res.status(500).json({ error: "Erro na IA" });
  }
}
