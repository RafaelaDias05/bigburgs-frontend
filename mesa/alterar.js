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
const campoNumero = document.querySelector("#numero");
const campoStatus = document.querySelector("#status");
const botaoSalvarMesa = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');

inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

let id = "";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    campoNumero.value = urlParams.get('numero') || '';
    campoStatus.value = urlParams.get('status') || '';
    id = urlParams.get('id');
  });

function alterarMesa(){
    let numero = campoNumero.value;
    let status =  campoStatus.value;

    let temErro = false;

    eventoForm();

    if (numero.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if (mesas[numero.trim()]) {
        exibirErroCampo(document.querySelector("#numero-label"), campoNumero, "Erro");
        alertarErro("Erro ao criar a mesa: Já existe uma mesa com este numero.");
        return;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    mesas[numero.trim()] = {
        status: status
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
    const url = new URL('mesa/index.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('numero', numero);
    url.searchParams.set('status', status);
}

botaoSalvarMesa.addEventListener('click', alterarMesa);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});