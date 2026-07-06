// ==========================
// NAVEGAÇÃO SEGURA
// ==========================

function mostrarTela(id) {

    const secoes = document.querySelectorAll("main section");

    secoes.forEach(secao => {
        secao.style.display = "none";
    });

    const alvo = document.getElementById(id);

    if (alvo) {
        alvo.style.display = "block";
    } else {
        console.warn("Tela não encontrada:", id);

        document.getElementById("home").style.display = "block";
    }
}


// ==========================
// IA SIMULADA FUNCIONAL
// ==========================

async function perguntarIA() {

    const input = document.getElementById("pergunta");
    const resposta = document.getElementById("respostaIA");

    if (!input || !resposta) return;

    const pergunta = input.value.trim();

    if (pergunta === "") {
        resposta.innerHTML = "⚠️ Digite uma pergunta.";
        return;
    }

    resposta.innerHTML = "🧠 Pensando...";

    setTimeout(() => {

        resposta.innerHTML = `
            <div style="
                background:#111827;
                color:#fff;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
            ">
                <strong>Você:</strong> ${pergunta}
                <br><br>
                <strong>IA:</strong> Estou funcionando corretamente. Em breve este sistema será conectado a uma IA real.
            </div>
        `;

    }, 1000);
}


// ==========================
// BLOQUEIO DE "EM CONSTRUÇÃO"
// ==========================

document.addEventListener("click", function (e) {

    const texto = e.target.innerText?.toLowerCase();

    if (texto && texto.includes("em construção")) {
        e.preventDefault();

        e.target.innerHTML = "✔ Em breve disponível";

        console.log("Seção em desenvolvimento clicada");
    }
});
