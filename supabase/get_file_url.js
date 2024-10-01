const { createClient } = require("@supabase/supabase-js");

const get_file_url = async function (param) {

    const supabase = createClient(process.env.URL, process.env.KEY);

    let { data, error } = await supabase.rpc('list_download', param);

    if (error) {
        console.error('Erro ao chamar RPC:', error.message);
        throw error;
    }

    const fileUrls = data.files.map(item => {
        const filename = item.filename;
        const url = `https://vflhuqqzjmgkdhjgxzni.supabase.co/storage/v1/object/public/pdf/${item.files}/${filename}`;
        const prontuarios = param.data.id;
        return { filename, url, prontuarios };
    });

    return { files: fileUrls };
};

module.exports = { get_file_url };
