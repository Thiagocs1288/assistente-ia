export default async function handler(req, res) {
  
  // permitir CORS (evita erro de conexão)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const { mensagem } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API KEY não encontrada no Vercel" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
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

    console.log("RESPOSTA GEMINI:", JSON.stringify(data));

    const resposta =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resposta) {
      return res.status(500).json({
        error: "Sem resposta da IA",
        debug: data
      });
    }

    return res.status(200).json({ resposta });

  } catch (error) {
    console.error("ERRO CHAT:", error);

    return res.status(500).json({
      error: "Erro interno na IA",
      detalhe: error.message
    });
  }
}
