//ELEMENTOS HTML
const botoesAlterar = document.querySelectorAll('.btn-alterar');
const botoesExcluir = document.querySelectorAll('.btn-excluir');
const botaoPesquisar = document.querySelector('.btn-pesquisar');
const botaoLimparPesquisa = document.querySelector('.clear-search');

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

function pesquisarCliente(){ 
    let pesquisa = document.querySelector('.termo-pesquisado').value.trim();
    if (clientes[pesquisa]) {
        elementos =  document.querySelectorAll('.ctn-flex.ctn-flex-grid.ctn-table-line');
        for (elemento of elementos){
            if(elemento.querySelector("#nome").innerText != pesquisa){
                elemento.style.display = 'none';
            }
        }
    }else{
        alertarOperacaoRealizada("Nenhum resultado encontrado!");
    }
}

function limparPesquisa(){
    document.querySelector('.termo-pesquisado').value = "";
    elementos =  document.querySelectorAll('.ctn-flex.ctn-flex-grid.ctn-table-line');
    for (elemento of elementos){
        elemento.style.display = '';
    }
}

function alterarCliente(botao){
    let itemAtual = null;
    const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
    itemAtual = item;

    const id = item.dataset.id;
    const nome = item.querySelector('#nome').innerText;
    const endereco = item.querySelector('#endereco').innerText;

    const url = new URL('clientes/alterar.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('nome', nome);
    url.searchParams.set('endereco', endereco);
 
    window.location.href = url;
}

 document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if(params.has('id')) {
      const id = params.get('id');
      const nome = params.get('nome');
      const endereco = params.get('endereco');
      const telefone = params.get('telefone');

      const item = document.querySelector(`#${id}`);
      if(item) {
        item.querySelector('#nome').innerText = nome;
        item.querySelector('#endereco').innerText = endereco;
      }
    }
});

botaoPesquisar.addEventListener('click', pesquisarCliente);

botaoLimparPesquisa.addEventListener('click', limparPesquisa);

botoesAlterar.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarCliente(botao);
    });
});

botoesExcluir.forEach(botao => {
    botao.addEventListener('click', () => {
        const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
        if(item){
            const objeto = item.querySelector('#nome').innerText;
            const texto = "Você tem certeza que deseja excluir o cliente " + objeto + "?";
            alertarConfirmacaoExclusao(texto, botao)
        } 
    });
})