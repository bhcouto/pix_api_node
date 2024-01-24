#
__Visão Geral__

__Esta API fornece funcionalidades para transações PIX. Inclui endpoints para simular pagamentos e gerar códigos QR PIX.__
#

__Gerar Código QR PIX__

Gera um código QR PIX para pagamento.

__Endpoint__
POST: /gerar-pix

__Corpo da Requisição__
```
{
    "referenciaExterna": "UUID referência do boleto/devedor",
    "valor": 1.50,
    "chavePix": "<env.PIX_KEY>",
    "conta": "<env.ACCOUNT_ID>",
    "expiracao": 30, 
    "vencimento": dataVencimento 
}
```


__Consultar Resposta__

Consulta a última resposta da API.

__Endpoint__
GET: /

Respostas
200 OK: Sucesso. Retorna a última resposta da API.`

```
{
  "idTransacao": "<ID_TRANSACAO>",
  "valorTotal": "<VALOR_TOTAL>",
  "pagamento": "<COPIA_E_COLA_PIX>
  "pagamentoQrCode": "<CODIGO_QR_CODE_BASE_64>"
}
```

404 Not Found: Nenhuma resposta disponível. Faça uma solicitação POST primeiro.

```
{    
  "mensagem": "Nenhuma resposta disponível. Faça uma solicitação POST primeiro."
}
```

__Simular o pagamento de um código QR em um ambiente de teste.__

__Endpoint__
POST: /simular

__Corpo da Requisição__
```
{
  "referenciaExterna": "UUID referência do boleto/devedor",
  "idTransacao": "UUID gerada junto com o QrCode"
}
```

__Endpoint__
GET: /confirm

Respostas
200 OK: Sucesso. Retorna o Status do pagamento e informações complementares
```
{
    "id": "3d0a65db-e42d-434a-b88c-b0362bbcc5e4",
    "pix": "00020101021226990014br.exemplo.com.com.br/23114447/qrs2/v2/022rv6rvKfEE3fTWyJaTQigOqh5jrP41HVP6EOAr4gteste24398654041.305802BR5917INFO12345LTDA6009SAO teste62070503***6304E3CB",
    "transacaoId": "9E183080-DA56-BDC8-8E16-50C0A9BB564E",
    "dataHora": "2024-01-19T13:20:22.972-03:00",
    "status": 0,
    "valorBruto": 1.3,
    "valorPago": 0,
    "valorLiquido": 0.7,
    "taxa": 0.6,
    "nomePagador": null,
    "documentoMascarado": null,
    "instituicao": null,
    "agencia": null,
    "conta": null,
    "informacoesGerador": null,
    "razaoSocialRecebedor": null,
    "fantasiaRecebedor": null,
    "cnpjRecebedor": null,
    "cobranca": null
}

```


    

