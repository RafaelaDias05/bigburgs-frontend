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

//elementos HTML
const botaoSalvarCardapio = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');
const textarea = document.querySelector(".textarea-field");

function limparCampos(){
    document.querySelector("#nome").value = "";
    document.querySelector("#preco").value = "";
    document.querySelector("#ingredientes").value = "";
}

function cadastrarCardapio(){
    const nome = document.querySelector("#nome");
    const valor = document.querySelector("#preco");
    const ingredientes = document.querySelector("#ingredientes");

    let temErro = false;

    eventoForm();

    if (nome.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (cardapio[nome.value.trim()]) {
        exibirErroCampo(document.querySelector("#nome-label"), nome, "Erro");
        alertarErro("Erro ao criar o cardápio: Já existe um cardápio com este nome.");
        return;
    }

    if (valor.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (isNaN(Number(valor.value)) || Number(valor.value) <= 0) {
        exibirErroCampo(document.querySelector("#preco-label"), valor, "Preço inválido");
        alertarErro("Preço inválido! Insira um valor numérico positivo.");
        return;
    }

    if (ingredientes.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    cardapio[nome.value.trim()] = {
        ingredientes: ingredientes.value.trim(),
        valor: `R$ ${parseFloat(valor.value).toFixed(2).replace(".", ",")}`
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
}


inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

textarea.addEventListener("focus", eventoForm);

botaoSalvarCardapio.addEventListener('click', cadastrarCardapio);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});
