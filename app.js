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

  adicionarMensagem("...", "bot");

  // 🔴 AQUI entra IA real depois
  setTimeout(() => {
    chat.lastChild.innerText = "Estou funcionando. Conecte uma IA real agora.";
  }, 800);
}
