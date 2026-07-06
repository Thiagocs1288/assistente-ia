export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { mensagem } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  try {
   const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
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
  data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  "ERRO: resposta vazia do Gemini";
    res.status(200).json({ resposta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na IA" });
  }
}
