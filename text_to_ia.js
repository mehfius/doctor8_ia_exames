const { fetch_ia } = require("./fetch_ia");

const text_to_ia = async function (prompt) { 
    while (true) {
        try {                         
            const response = await fetch_ia(prompt);
            if (response.status !== 200) {
                console.error('Ngrok Offline');
                continue;
            }

            const IAServerResponse = await response.json();
            console.log(IAServerResponse)
            const matches = IAServerResponse.response.match(/\[.*?\]/s);      
            if (!matches || matches.length === 0) {
                throw new Error("Array de objetos não encontrado no texto da resposta.");
            }

            const responseObject = JSON.parse(matches[0]);                            
            responseObject.forEach(obj => {
                if (!obj.resumo ) {
                    throw new Error("Objeto no array não possui as chaves 'nome_exame', 'valor_exame' e 'descricao_exame'.");
                }
            });

            console.log("IA JSON no formato correto, objeto verificado.");
            return responseObject;

        } catch (error) {
            console.error("IA não conseguiu gerar JSON corretamente: ", error.message);
        }
    }
};

module.exports = { text_to_ia };
