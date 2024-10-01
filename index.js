const functions = require('@google-cloud/functions-framework');
const cors = require('cors');
const corsMiddleware = cors({ origin: true });
const fs = require('fs');
const path = require('path');

const { get_prompt } = require("./supabase/get_prompt");
const { get_file_url } = require("./supabase/get_file_url");
const { file_url_to_text } = require("./file_url_to_text");
const { text_to_ia } = require("./text_to_ia");

functions.http('ia_exames', async (req, res) => {
    corsMiddleware(req, res, async () => {
        try {
            if (!req.body.data || !req.body.data.id || !req.body.data.session) {
                return res.status(400).json({ status: 0, erro: 'Parâmetros id ou session não recebidos' });
            }

            let param = {
                data: {
                    id: req.body.data.id,
                    session: req.body.data.session
                }
            }

            let json = await get_file_url(param);      
          
            let results = await file_url_to_text(json);        
            
            let iaResults = [];      

            for (const item of results.results) {
                
                let prompt = await get_prompt('prompt_ai_exames_teste');         
                prompt = prompt.replace("[key]", item.text);           

                let ia = await text_to_ia(prompt);  
                iaResults.push(ia); 

            }

            res.status(200).json({ status: 1, ia: iaResults });

        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ status: 0, erro: error.message });
        }
    });
});