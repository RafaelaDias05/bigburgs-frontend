//variaveis e constantes
let pedidos = {
    "Pedido 01":{
        tipo: "serviço de mesa",
        mesa: "Mesa 01",
        cliente: "João Silva",
        cardapio: "Churrasquinho",
        bebida: "Coca-Cola Lata 350ml",
        preco: 25.50,
        situacao: "Em preparo", 
        observacoes: ""
    },
    "Pedido 02":{
        tipo: "delivery",
        mesa: "Mesa 02",
        cliente: "Maria de Jesus",
        cardapio: "Galinha Mista",
        bebida: "Guaraná Antarctica Lata 350ml",
        preco: 25.50,
        situacao: "Concluído",
        observacoes: ""
    },
};

let clientes = ["João Silva", "Maria de Jesus", "Paulo Souza"];

//ELEMENTOS HTML
const tipo = document.querySelector("#tipo");
const mesa = document.querySelector("#mesa");
const cliente = document.querySelector("#cliente");
const cardapio = document.querySelector("#cardapio");
const bebida = document.querySelector("#bebida");
const preco = document.querySelector("#preco");
const situacao = document.querySelector("#situacao");
const observacoes = document.querySelector("#observacoes");
const botaoSalvarPedido = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');
const textarea = document.querySelector(".textarea-field");

tipo.value = "";
mesa.value = "";
cliente.value = "";
cardapio.value = "";
bebida.value = "";
situacao.value = "";
observacoes.value = "";
preco.value = "";

inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

textarea.addEventListener("focus", eventoForm);

let id = "";

function limparCampos(){
    tipo.value = "";
    mesa.value = "";
    cliente.value = "";
    cardapio.value = "";
    bebida.value = "";
    situacao.value = "";
    observacoes.value = "";
    preco.value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    tipo.value = urlParams.get('tipo') || '';
    mesa.value = urlParams.get('mesa') || '';
    cliente.value = urlParams.get('cliente') || '';
    cardapio.value = urlParams.get('cardapio') || '';
    bebida.value = urlParams.get('bebida') || '';
    situacao.value = urlParams.get('situacao') || '';
    observacoes.value = urlParams.get('observacoes') || '';
    preco.value = urlParams.get('preco') || '';
    id = urlParams.get('id');
  });

function alterarPedido(){

    let temErro = false;
    let temErroLanche = false;

    eventoForm();

    if (tipo.value.trim() == "") {
        exibirErroForm();
        temErro = true;
    }

    if (preco.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } 

    if (situacao.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    if(cardapio.value.trim() == ""){
        exibirErroCampo(document.querySelector("#bebida-label"), bebida, "Erro");
        temErroLanche = true;
    }

    if(bebida.value.trim() == ""){
        exibirErroCampo(document.querySelector("#cardapio-label"), cardapio, "Erro");
        temErroLanche = true;
    }

     if (temErroLanche) {
        alertarErro("É necessário selecionar pelo menos um item de cardápio ou bebida para o pedido.");
        return;
    }

    if(!clientes.includes(cliente.value.trim())){
        exibirErroCampo(document.querySelector("#cliente-label"), cliente, "Erro");
        alertarErro("Cliente não encontrado. Por favor, cadastre o cliente primeiro ou selecione um cliente existente.");
        return;
    }

    pedidos["Pedido 03"] = {
        tipo: tipo.value.trim(),
        mesa: mesa.value.trim(),
        cliente: cliente.value.trim(),
        cardapio: cardapio.value.trim(),
        bebida: bebida.value.trim(),
        preco: `R$ ${parseFloat(preco.value).toFixed(2).replace(".", ",")}`,
        situacao: situacao.value.trim(),
        observacoes: observacoes.value.trim(),
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
    const url = new URL('pedido/index.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('tipo', tipo.value);
    url.searchParams.set('mesa', mesa.value);
    url.searchParams.set('cliente', cliente.value);
    url.searchParams.set('cardapio', cardapio.value);
    url.searchParams.set('bebida', bebida.value);
    url.searchParams.set('preco', preco.value);
    url.searchParams.set('situacao', situacao.value);
    url.searchParams.set('observacoes', observacoes.value);
}

botaoSalvarPedido.addEventListener('click', alterarPedido);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});