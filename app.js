// ===============================
// SISTEMA ROBUSTO DE NAVEGAÇÃO
// ===============================

function mostrarTela(id) {
    const telas = document.querySelectorAll("main section");

    telas.forEach(tela => {
        tela.style.display = "none";
    });

    const destino = document.getElementById(id);

    if (destino) {
        destino.style.display = "block";
    } else {
        console.warn("Tela não encontrada:", id);

        const fallback = document.querySelector("main");
        if (fallback) {
            fallback.innerHTML = `
                <div style="
                    padding:20px;
                    font-family:sans-serif;
                    text-align:center;
                ">
                    <h2>⚠️ Tela em desenvolvimento</h2>
                    <p>Esta seção ainda não foi configurada corretamente.</p>
                </div>
            `;
        }
    }
}


// ===============================
// IA (VERSÃO CORRIGIDA)
// ===============================

async function perguntarIA() {

    const perguntaEl = document.getElementById("pergunta");
    const respostaEl = document.getElementById("respostaIA");

    if (!perguntaEl || !respostaEl) {
        console.error("Elementos da IA não encontrados");
        return;
    }

    const pergunta = perguntaEl.value.trim();

    if (pergunta === "") {
        respostaEl.innerHTML = "Digite uma pergunta.";
        return;
    }

    respostaEl.innerHTML = "🧠 Pensando...";

    // simulação de resposta mais inteligente
    setTimeout(() => {

        respostaEl.innerHTML = `
            <div style="
                background:#f3f4f6;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
                font-family:sans-serif;
            ">
                <strong>👤 Você:</strong> ${pergunta}
                <br><br>
                <strong>🤖 Assistente:</strong> 
                Estou funcionando corretamente. Em breve você poderá conectar uma IA real (API) para respostas automáticas.
            </div>
        `;

    }, 1200);
}


// ===============================
// BLOQUEIA "EM CONSTRUÇÃO"
// ===============================

// Intercepta qualquer clique com texto "em construção"
document.addEventListener("click", function (e) {

    const texto = e.target.innerText?.toLowerCase();

    if (texto && texto.includes("em construção")) {
        e.preventDefault();

        alert("🚧 Esta funcionalidade já está sendo desenvolvida.");
    }
});
