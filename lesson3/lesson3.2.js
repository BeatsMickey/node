const express = require('express');
const axios = require('axios');
const IAM_TOKEN = 't1.9f7L7euelZqRj56VmJaZm5yLkc2KnpzGkuXz905ZXwL67xcaB3L93fP3DghdAvrvFxoHcv0.CZW-ijkEfmInRuNPeqEdiPtkAf8FTG3GQTBD-47sTL5pzL-IcKg1SB5buQ6ElM9NhyPSyqX9jmI_APyWoTnOAg';
const FOLDER = 'b1gdqnr6coa2edd42jim'


const app = express();
app.use(express.static(__dirname));
app.use(express.json());
const translateRouter = express.Router();

translateRouter.get('/:text', (req, res) => {
    let text = req.params.text;
    axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
        "folder_id": FOLDER,
        "texts": [text],
        "targetLanguageCode": "ru"
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + IAM_TOKEN
        }
    }).then((res2) => {
        let textTranslate = res2.data.translations[0].text;
        res.send(textTranslate);
    }).catch((err) => {
        console.log(err);
        res.send("Ошибка");
    })
});

app.use('/', translateRouter);

app.listen(3000, () => console.log('Listening on port 3000'));