// ===== Navegação entre telas =====

function mostrarTela(id) {

    const telas = document.querySelectorAll("main section");

    telas.forEach(tela => {
        tela.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

// ===== IA (temporária) =====

async function perguntarIA(){

    const pergunta = document.getElementById("pergunta").value.trim();

    const resposta = document.getElementById("respostaIA");

    if(pergunta === ""){

        resposta.innerHTML = "Digite uma pergunta.";

        return;

    }

    resposta.innerHTML = "🧠 Pensando...";

    setTimeout(()=>{

        resposta.innerHTML =
`Você perguntou:

"${pergunta}"

Em breve esta tela será conectada à IA real para responder automaticamente.`;

    },1500);

}
