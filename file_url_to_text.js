const file_url_to_text = async function (param) {
   
    try {
        const response = await fetch('http://localhost:8081/pdf_to_text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                param
            )
        });

        if (!response.ok) {
            throw new Error('Fetch request failed');
        }

        const jsonResponse = await response.json();
        return jsonResponse;

    } catch (error) {
        console.error('Erro ao acessar o link do fetch:', error.message);
        throw error;
    }

};

module.exports = { file_url_to_text };
