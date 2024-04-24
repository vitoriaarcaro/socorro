document.addEventListener('DOMContentLoaded', function () {
    loadDiscosList();
    document.getElementById('formAdicionarDisco').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarDisco();
    });
});
        
//-------------------------Função de adicionar música

function adicionarDisco() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeDisco').value;
    const imagem = document.getElementById('imagemDisco').value;
    const musicaUm = document.getElementById('musicaUmDisco').value;
    const musicaDois = document.getElementById('musicaDoisDisco').value;
    const musicaTres = document.getElementById('musicaTresDisco').value;
    const anoLancamento = document.getElementById('anoLancamentoDisco').value;

    if (!id || !nome || !imagem || !anoLancamento || !musicaUm || !musicaDois || !musicaTres) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/disco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            anoLancamento: anoLancamento,
            musicaUm: musicaUm,
            musicaDois: musicaDois,
            musicaTres: musicaTres
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar disco');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            loadDiscosList();
        })
        .catch(error => {
            alert(error);
        });
}

function loadDiscosList() {
    fetch('http://localhost:3000/disco')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar lista de discos');
            }
            if (response.headers.get('content-length') === '0') {
                throw new Error('Resposta vazia do servidor');
            }
            return response.json();
        })
        .then(data => displayDiscosList(data))
        .catch(error => console.error('Error:', error));
}


//--------------------------Funções para ver, e abrir as informações dos discos.

function displayDiscosList(data) {
    const listaDiscos = document.getElementById('listaDiscos');
    listaDiscos.innerHTML = '';
    data.forEach(disco => {
        const listItem = document.createElement('div');
        listItem.classList = `Discos`
        listItem.innerHTML =
            `
            <img src="${disco.imagem}" id="iconeDiscos">
            <h3 id="texto">${disco.nome}
        `
        listItem.addEventListener('click', function () {
            ver(disco.id);
        });
        listaDiscos.appendChild(listItem);
    });

  function ver(id) {
        const disco = data.find(disco => disco.id === id);
        if (disco) {

            const modalM = document.getElementById("dialogDiscos")
            modalM.showModal()

            const vish = document.getElementById('quadrado-preto');
            vish.innerHTML =
                `
            <h4 onclick="sairModal2()">Voltar</h4>
            <h2>Album:</h2>
            <div id="dentro">
                <img src="${disco.imagem}" id="iconeDiscos"></a>
                <br>
                <h3>ID: ${id}</p>
                <p>Nome: ${disco.nome}</p>
                <p>Ano de lançamento: ${disco.anoLancamento}</p>
                <h3>Principais Musicas</h3>
                <p>1º ${disco.musicaUm}</p>
                <p>2º ${disco.musicaDois}</p>
                <p>3º ${disco.musicaTres}</p>
                
            </div>
            <div id="botoes">
                <button type="button" onClick="deletarDisco(${disco.id})" class="botao">Deletar</button>
                <button type="button" onClick="alterarDiscos(${disco.id}, '${disco.nome}', '${disco.imagem}', '${disco.anoLancamento}', '${disco.musicaUm}', '${disco.musicaDois}', '${disco.musicaTres}')" class="botao" id="botaoAlt">Alterar</button>
            </div>
            `;
        }
    }
}

//------------Função de alteraro
function alterarDiscos(id, nome, imagem, anoLancamento, musicaUm, musicaDois, musicaTres) {
    const modalA = document.getElementById("dialogAlt")
    modalA.showModal()

    document.getElementById("idAlt").value = id;
    document.getElementById("nomeDiscosAlt").value = nome;
    document.getElementById("imagemDiscosAlt").value = imagem;
    document.getElementById("anoLancamentoDiscosAlt").value = anoLancamento;
    document.getElementById("musicaUmDiscosAlt").value = musicaUm;
    document.getElementById("musicaDoisDiscosAlt").value = musicaDois;
    document.getElementById("musicaTresDiscosAlt").value = musicaTres;

    document.getElementById('idAlt').readOnly = true;
}

function alterarDisco() {
    const id = parseInt(document.getElementById('idAlt').value);
    const nome = document.getElementById('nomeDiscosAlt').value;
    const imagem = document.getElementById('imagemDiscosAlt').value;
    const anoLancamento = parseInt(document.getElementById('anoLancamentoDiscosAlt').value);
    const musicaUm = document.getElementById('musicaUmDiscosAlt').value;
    const musicaDois = document.getElementById('musicaDoisDiscosAlt').value;
    const musicaTres = document.getElementById('musicaTresDiscosAlt').value;

    fetch(`http://localhost:3000/disco/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            anoLancamento: anoLancamento,
            musicaUm: musicaUm,
            musicaDois: musicaDois,
            musicaTres: musicaTres
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(error);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            loadDiscosList();
        })
        .catch(error => {
            alert(error);
        });
}

//-----------Função de Deletar

function deletarDisco(id) {
    fetch(`http://localhost:3000/disco/${id}`, {
        method: 'DELETE',
    })
}

function sairModal() {
    const modal = document.getElementById("dialogAdd")
    modal.close()
}

function sairModal2() {
    const modalM = document.getElementById("dialogDiscos")
    modalM.close()
}

function sairModal3() {
    const modalA = document.getElementById("dialogAlt")
    modalA.close()
}

function adicionarModal() {
    const modal = document.getElementById("dialogAdd")
    modal.showModal()
}