const express = require('express');
const server = express();
const dadosDiscos = require('./data/disco.json');
const fs = require('fs');
const cors = require('cors');


server.use(express.json());
server.use(cors())


server.listen(3000, () => {
    console.log("O servidor está funcionando")
})

server.post('/disco', (req, res) => {
    const novoDiscos = req.body;

    novoDiscos.id = parseInt(novoDiscos.id);

    if (!novoDiscos.id || !novoDiscos.nome || !novoDiscos.imagem || !novoDiscos.musicaUm || !novoDiscos.musicaDois || !novoDiscos.musicaTres || !novoDiscos.anoLancamento) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        const discosExistente = dadosDiscos.disco.find(discos => discos.id === novoDiscos.id);
        if (discosExistente) {
            return res.status(400).json({ mensagem: "ID já existe, tente novamente com um ID diferente" });
        } else {
            dadosDiscos.disco.push(novoDiscos);
            salvarDadosDiscos(dadosDiscos);
            return res.status(201).json({ mensagem: "Novo disco cadastrada com sucesso!" });
        }
    }
});
server.get('/disco', (req, res) => {
    return res.json(dadosDiscos.disco);
});

server.put('/disco/:id', (req, res) => {
    const discosId = parseInt(req.params.id);
    const atualizarDiscos = req.body;
    const idDiscos = dadosDiscos.disco.findIndex(m => m.id === discosId);

    if (idDiscos === -1) {
        return res.status(404).json({ mensagem: "Discos não encontrado :/" });
    } else {
        dadosDiscos.disco[idDiscos].id = atualizarDiscos.id || dadosDiscos.disco[idDiscos].id;
        dadosDiscos.disco[idDiscos].nome = atualizarDiscos.nome || dadosDiscos.disco[idDiscos].nome;
        dadosDiscos.disco[idDiscos].imagem = atualizarDiscos.imagem || dadosDiscos.disco[idDiscos].imagem;
        dadosDiscos.disco[idDiscos].dmusicaUm = atualizarDiscos.musicaUm || dadosDiscos.disco[idDiscos].musicaUm;
        dadosDiscos.disco[idDiscos].dmusicaDois = atualizarDiscos.musicaDois || dadosDiscos.disco[idDiscos].musicaDois;
        dadosDiscos.disco[idDiscos].dmusicaTres = atualizarDiscos.musicaTres|| dadosDiscos.disco[idDiscos].musicaTres;
        dadosDiscos.disco[idDiscos].anoLancamento = atualizarDiscos.anoLancamento || dadosDiscos.disco[idDiscos].anoLancamento;
        salvarDadosDiscos(dadosDiscos);
        return res.json({ mensagem: "Discos atualizado com sucesso!" });
    }
});
server.delete("/disco/:id", (req, res) => {
    const discoId = parseInt(req.params.id);
    dadosDiscos.disco = dadosDiscos.disco.filter(m => m.id !== discoId);
    salvarDadosDiscos(dadosDiscos);
    return res.status(200).json({ mensagem: "Jogo excluído com sucesso" });
});
function salvarDadosDiscos() {
    fs.writeFileSync('./data/disco.json', JSON.stringify(dadosDiscos));
}
module.exports = { server, salvarDadosDiscos };