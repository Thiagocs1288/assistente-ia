export default async function handler(req, res) {

  // Permitir comunicação
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );


  if (req.method === "OPTIONS") {

    return res.status(200).end();

  }


  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Use POST"
    });

  }


  try {


    const { mensagem } = req.body;


    if (!mensagem) {

      return res.status(400).json({
        error:"Mensagem vazia"
      });

    }



    const apiKey =
      process.env.GEMINI_API_KEY;



    if (!apiKey) {

      return res.status(500).json({

        error:
        "GEMINI_API_KEY não configurada"

      });

    }



    const response = await fetch(

      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
      + apiKey,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },


        body:JSON.stringify({

          contents:[

            {

              parts:[

                {

                  text:
                  mensagem

                }

              ]

            }

          ]

        })


      }

    );



    const data =
    await response.json();



    console.log(
      "GEMINI:",
      JSON.stringify(data)
    );



    if(!response.ok){

      return res.status(500).json({

        error:
        data?.error?.message ||
        "Erro Gemini"

      });

    }



    const resposta =
    data
    ?.candidates
    ?.[0]
    ?.content
    ?.parts
    ?.[0]
    ?.text;



    if(!resposta){

      return res.status(500).json({

        error:
        "Gemini não retornou texto",

        debug:data

      });

    }



    return res.status(200).json({

      resposta

    });



  } catch(error){


    console.error(
      error
    );


    return res.status(500).json({

      error:
      error.message

    });


  }

}
