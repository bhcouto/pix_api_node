export function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function currentDate() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');

    const data = `${ano}-${mes}-${dia}`;

    return data
}

export function apiResponseError(error, code, mensagem) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        error.message = error.response.data.message ?? error.message;

    } else {
        console.log(error)
        return res.status(code).json({message: mensagem})
    }
}