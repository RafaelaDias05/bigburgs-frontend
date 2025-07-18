//variaveis e constantes
let cardapio = {
    "American Bacon":{
        ingredientes: "Hambúrguer, bacon, queijo, presunto, tomate e alface",
        valor: "R$ 20,00"
    },
    "Churrasquinho":{
        ingredientes: "Picanha, bacon, milho, cebola, tomate e alface",
        valor: "R$ 22,00"
    },
    "Galinha Mista":{
        ingredientes: "Frango, picanha, milho, presunto, queijo, tomate e alface",
        valor: "R$ 22,00"
    },
};

//ELEMENTOS HTML
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const campoIngredientes = document.querySelector("#ingredientes");
const botaoSalvarCardapio = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');

campoNome.value = "";
campoPreco.value = "";
campoIngredientes.value = "";

let id = "";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    campoNome.value = urlParams.get('nome') || '';
    campoIngredientes.value = urlParams.get('descricao') || '';
    campoPreco.value = urlParams.get('preco') || '';
    id = urlParams.get('id');
  });

function alterarCardapio(){
    nome = campoNome.value;
    valor =  campoPreco.value;
    ingredientes = campoIngredientes.value;

    let temErro = false;

    eventoForm();

    if (nome.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (cardapio[nome.trim()]) {
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

    if (ingredientes.trim() === "") {
        exibirErroForm();
        temErro = true;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    cardapio[nome.trim()] = {
        ingredientes: ingredientes.value.trim(),
        valor: `R$ ${parseFloat(valor.value).toFixed(2).replace(".", ",")}`
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
    const url = new URL('index.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('nome', nome);
    url.searchParams.set('desc', desc);
    url.searchParams.set('preco', preco);

    window.location.href = url;
}

botaoSalvarCardapio.addEventListener('click', alterarCardapio);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});