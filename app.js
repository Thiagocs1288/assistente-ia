const chat = document.getElementById("chat");
const input = document.getElementById("input");

// histórico
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

  // mensagem de carregando
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

    loading.innerText = data.resposta || "Sem resposta da IA.";

    historico.push({ texto: loading.innerText, tipo: "bot" });
    localStorage.setItem("chat", JSON.stringify(historico));

  } catch (error) {
    loading.innerText = "Erro ao conectar na IA.";
    console.error(error);
  }
}
