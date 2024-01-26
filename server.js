import Express from "express";
import cors from "cors";
import { api } from "./src/services/api.js";
import { currentDate, generateUUIDv4 } from "./src/services/utils.js";


const app = Express();
app.use(cors());
app.use(Express.json());

let respostaPOST;


app.post('/gerar-pix', generatePix);
app.get('/', response);
app.get('/confirm', statusPix);
app.get('/simular', simulatePay);
app.get('/consultar', consultPay )

async function generatePix(req, res) {
    try {
        let token = await acess();
        const { valor, expiracao, cnpj, slug } = req.body;

        const dataVencimento = currentDate();
        const uuid = generateUUIDv4();

        const data = {
            referenciaExterna: uuid,
            valor,
            "chavePix": `${process.env.ID_KEY}`,
            "conta": `${process.env.ID_ACCOUNT}`,
            "expiracao": expiracao || 40,
            "versaoCallback": "1",
            "informacoesGerador": JSON.stringify(
                {
                    CNPJ: cnpj,
                    EMPRESA: slug
                }
            )
        }

        const response = await api.post('/transacao/gerar-qr-code-pdv', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        respostaPOST = response.data;
        res.json(response.data);

        setTimeout(() => {
            token = null;
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao gerar QR Code');
    }
}

function response(req, res) {
    if (respostaPOST) {
        res.json(respostaPOST);
    } else {
        res.json({ mensagem: 'Nenhuma resposta disponível. Faça uma solicitação POST primeiro.' });
    }

}

async function statusPix(req, res) {
    try {
        let token = await acess();

        if (respostaPOST) {

            const response = await api.get(`/transacao/v1/${process.env.ID_ACCOUNT}/${respostaPOST.idTransacao}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return res.json(response.data);

        } else {
            return res.status(500).json({ mensagem: 'Nenhum pagamento Pix foi gerado.' });
        }

    } catch (error) {
        console.error(error)
    }
}

async function simulatePay(req, res) {
    try {
        const token = await acess();

        const uuid = generateUUIDv4();

        if (respostaPOST) {
            const response = await api.post('/transacao/simular-pagamento', { idTransacao: respostaPOST.idTransacao, referenciaExterna: uuid }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return res.status(200).json({ message: "QRCode pago." });

        } else {
            return res.status(500).json({ mensagem: 'Nenhum pagamento Pix foi gerado.' });
        }



    } catch (error) {
        console.error('Erro ao simular pagamento:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao simular pagamento.' });
    }
}

async function consultPay(req, res) {
    try {

        let token = await acess();
        const { dataInicio, dataFim, quantidade } = req.query

        const response = await api.get(`transacao/${process.env.ID_ACCOUNT}/ultimas`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                "data-inicial": dataInicio,
                "data-final": dataFim,
                "quantidade": quantidade

            }
        })
        return res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro ao realizar consulta.' })
    }
}

async function acess() {

    const Data = {
        "cnpj": "25.228.224/0001-86",
        "conta": `${process.env.ID_ACCOUNT}`,
        "pdv": "Link PDV"
    };

    try {
        const response = await api.post('/usuarios/login-pdv', Data);
        const token = response.data.accessToken;

        return token;

    } catch (error) {
        console.error(error);
        throw new Error('Erro ao autenticar');
    }
}

app.listen(process.env.PORT || 3333, () => {
    console.log(`API rodando na porta ${process.env.PORT || 3333}`);
});