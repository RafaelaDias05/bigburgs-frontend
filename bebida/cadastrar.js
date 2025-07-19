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

//elementos HTML
const botaoSalvarBebidas = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');

function limparCampos(){
    document.querySelector("#nome").value = "";
    document.querySelector("#preco").value = "";
}

function cadastrarBebidas(){
    const nome = document.querySelector("#nome");
    const valor = document.querySelector("#preco");

    let temErro = false;

    eventoForm();

    if (nome.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (bebidas[nome.value.trim()]) {
        exibirErroCampo(document.querySelector("#nome-label"), nome, "Erro");
        alertarErro("Erro ao criar bebida: Já existe uma bebida com este nome.");
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

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    bebidas[nome.value.trim()] = {
        valor: `R$ ${parseFloat(valor.value).toFixed(2).replace(".", ",")}`
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
}

inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

botaoSalvarBebidas.addEventListener('click', cadastrarBebidas);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});
