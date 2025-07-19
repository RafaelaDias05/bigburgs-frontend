//variaveis e constantes
let mesas = {
    "1":{
        status: "Ocupada"
    },
    "2":{
         status: "Livre"
    },
};

//elementos HTML
const botaoSalvarMesa = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');

function limparCampos(){
    document.querySelector("#numero").value = "";
    document.querySelector("#status").value = "";
}

function cadastrarMesa(){
    const numero = document.querySelector("#numero");
    const status = document.querySelector("#status");

    let temErro = false;

    eventoForm();

    if (numero.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (mesas[numero.value.trim()]) {
        exibirErroCampo(document.querySelector("#numero-label"), numero, "Erro");
        alertarErro("Erro ao criar mesa: Já existe uma mesa com este número.");
        return;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    mesas[numero.value.trim()] = {
        status: status.value.trim()
    };
    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
}

inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

botaoSalvarMesa.addEventListener('click', cadastrarMesa);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});
