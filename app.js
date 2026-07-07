const chat = document.getElementById("chat");
const input = document.getElementById("input");


let historico = JSON.parse(
    localStorage.getItem("aura_chat")
) || [];


renderizar();


function enviar(){

    const texto = input.value.trim();

    if(!texto) return;


    adicionarMensagem(texto,"user");


    input.value="";


    responderIA(texto);

}



function adicionarMensagem(texto,tipo){

    const div=document.createElement("div");

    div.className="msg "+tipo;

    div.innerText=texto;


    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;


    historico.push({
        texto:texto,
        tipo:tipo
    });


    salvar();

}



function renderizar(){

    chat.innerHTML="";


    historico.forEach(msg=>{


        const div=document.createElement("div");


        div.className="msg "+msg.tipo;


        div.innerText=msg.texto;


        chat.appendChild(div);


    });


}



function salvar(){

    localStorage.setItem(
        "aura_chat",
        JSON.stringify(historico)
    );

}



async function responderIA(texto){


    const loading=document.createElement("div");


    loading.className="msg bot";


    loading.innerText="🧠 Pensando...";


    chat.appendChild(loading);



    try{


        const resposta=await fetch("/api/chat",{


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                mensagem:texto


            })


        });



        const dados=await resposta.json();



        console.log(
            "Resposta servidor:",
            dados
        );



        if(!resposta.ok){


            throw new Error(
                dados.error || "Erro no servidor"
            );


        }



        loading.innerText=
        dados.resposta ||
        "Sem resposta da IA";



        historico.push({

            texto:loading.innerText,

            tipo:"bot"

        });


        salvar();



    }catch(erro){


        console.error(
            "Erro IA:",
            erro
        );


        loading.innerText=
        "❌ Erro: "+
        erro.message;



    }


}



function limparChat(){


    historico=[];


    localStorage.removeItem(
        "aura_chat"
    );


    renderizar();


}
