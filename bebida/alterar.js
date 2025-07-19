//variaveis e constantes
let bebidas = {
    "Coca-Cola Lata 350ml":{
        valor: "R$ 5,00"
    },
    "Guaraná Antarctica Lata 350ml":{
        valor: "R$ 5,00"
    },
    "Coca-Cola 1 Litro":{
        valor: "R$ 8,00"
    },
};

//ELEMENTOS HTML
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const botaoSalvarBebida = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');

campoNome.value = "";
campoPreco.value = "";

inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

let id = "";

function limparCampos(){
    campoNome.value = "";
    campoPreco.value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    campoNome.value = urlParams.get('nome') || '';
    campoPreco.value = urlParams.get('preco') || '';
    id = urlParams.get('id');
  });

function alterarBebida(){
    let nome = campoNome.value;
    let preco =  campoPreco.value.replace(",", ".");

    let temErro = false;

    eventoForm();

    if (nome.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (bebidas[nome.trim()]) {
        exibirErroCampo(document.querySelector("#nome-label"), campoNome, "Erro");
        alertarErro("Erro ao criar o cardápio: Já existe um cardápio com este nome.");
        return;
    }

    if (preco.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (isNaN(Number(preco)) || Number(preco) <= 0) {
        exibirErroCampo(document.querySelector("#preco-label"), campoPreco, "Preço inválido");
        alertarErro("Preço inválido! Insira um valor numérico positivo.");
        return;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    bebidas[nome.trim()] = {
        valor: `R$ ${parseFloat(preco).toFixed(2).replace(".", ",")}`
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
    const url = new URL('bebida/index.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('nome', nome);
    url.searchParams.set('preco', preco);
}

botaoSalvarBebida.addEventListener('click', alterarBebida);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});