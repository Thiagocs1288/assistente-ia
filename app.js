const chat = document.getElementById("chat");
const input = document.getElementById("input");

let historico = JSON.parse(localStorage.getItem("chat")) || [];

renderizar();

function enviar() {
  const texto = input.value.trim();
  if (!texto) return;

  adicionarMensagem(texto, "user");
  input.value = "";

  responderIA(texto);
}

function adicionarMensagem(texto, tipo) {
  const div = document.createElement("div");
  div.classList.add("msg", tipo);
  div.innerText = texto;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  historico.push({ texto, tipo });
  localStorage.setItem("chat", JSON.stringify(historico));
}

function renderizar() {
  chat.innerHTML = "";

  historico.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("msg", m.tipo);
    div.innerText = m.texto;
    chat.appendChild(div);
  });
}

async function responderIA(texto) {

  const loading = document.createElement("div");
  loading.classList.add("msg", "bot");
  loading.innerText = "🧠 Pensando...";
  chat.appendChild(loading);

  try {

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensagem: texto })
    });

    const data = await res.json();

    console.log("RESPOSTA BACKEND:", data);

    if (!res.ok) {
      throw new Error(data.error || "Erro no servidor");
    }

    loading.innerText = data.resposta;

    historico.push({ texto: data.resposta, tipo: "bot" });
    localStorage.setItem("chat", JSON.stringify(historico));

  } catch (error) {

    console.error(error);

    loading.innerText = "❌ Erro ao conectar na IA: " + error.message;
  }
}
