//variaveis e constantes
let clientes = {
    "João Silva":{
        telefone: "7788123456",
        endereco: "Avenida Otávio Santos, 123 - Recreio"
    },
    "Maria de Jesus":{
        telefone: "7798123456",
        endereco: "Avenida Lauro de Freitas, 456 - Centro"
    },
    "Paulo Souza":{
        telefone: "7781123456",
        endereco: "Rua das Acácias, 789 - Jardins"
    },
};

//elementos HTML
const botaoSalvarCliente = document.querySelector("#salvar");
const botaoCancelarCadastro = document.querySelector('#cancelar');
const inputs = document.querySelectorAll('.input-field');
const textarea = document.querySelector(".textarea-field");
const campoNome = document.querySelector("#nome");
const campoEndereco =  document.querySelector("#endereco");
const campoTelefone = document.querySelector("#telefone");

inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

textarea.addEventListener("focus", eventoForm);

let id = "";

function limparCampos(){
    campoNome.value = "";
    campoEndereco.value = "";
    campoTelefone.value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    campoNome.value = urlParams.get('nome') || '';
    campoEndereco.value = urlParams.get('endereco') || '';
    campoTelefone.value = urlParams.get('telefone') || '';
    id = urlParams.get('id');
  });

function alterarCliente(){
    const nome = document.querySelector("#nome");
    const endereco = document.querySelector("#endereco");
    const telefone = document.querySelector("#telefone");

    let temErro = false;

    eventoForm();

    if (nome.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    }

    if (endereco.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } 

    if (telefone.value.trim() === "") {
        exibirErroForm();
        temErro = true;
    } else if(telefone.value.trim().length != 10){
        exibirErroCampo(document.querySelector("#telefone-label"), telefone, "Telefone inválido!");
        alertarErro("Telefone inválido!");
        return;
    }

    if (temErro) {
        alertarErro("Preencha todos os campos obrigatórios");
        return;
    }

    clientes[nome.value.trim()] = {
        telefone: telefone.value.trim(),
        endereco: endereco.value.trim()
    };

    alertarOperacaoRealizada("Operação realizada com sucesso!");
    limparCampos();
    const url = new URL('cliente/index.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('nome', nome.value);
    url.searchParams.set('endereco', endereco.value);
    url.searchParams.set('telefone', telefone.value);
}


inputs.forEach(input => {
  input.addEventListener("focus", eventoForm)
});

textarea.addEventListener("focus", eventoForm);

botaoSalvarCliente.addEventListener('click', alterarCliente);
botaoCancelarCadastro.addEventListener('click', function () {
  retornarPagina("index.html");
});


