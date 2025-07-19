//ELEMENTOS HTML
const botoesAlterar = document.querySelectorAll('.btn-alterar');
const botoesExcluir = document.querySelectorAll('.btn-excluir');
const botaoPesquisar = document.querySelector('.btn-pesquisar');
const botaoLimparPesquisa = document.querySelector('.clear-search');

let mesas = {
    "Mesa 01":{
        status: "Ocupada"
    },
    "Mesa 02":{
         status: "Livre"
    },
};

function pesquisarMesas(){ 
    let pesquisa = document.querySelector('.termo-pesquisado').value.trim();
    if (mesas[pesquisa]) {
        elementos =  document.querySelectorAll('.ctn-flex.ctn-flex-grid.ctn-table-line');
        for (elemento of elementos){
            if(elemento.querySelector("#numero").innerText != pesquisa){
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

function alterarMesa(botao){
    let itemAtual = null;
    const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
    itemAtual = item;

    const id = item.dataset.id;
    const numero = item.querySelector('#numero').innerText;
    const status = item.querySelector('#status').innerText;

    const url = new URL('mesa/alterar.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('numero', numero);
    url.searchParams.set('status', status);
 
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if(params.has('id')) {
      const id = params.get('id');
      const numero = params.get('numero');
      const status = params.get('status');

      const item = document.querySelector(`#${id}`);
      if(item) {
        item.querySelector('#numero').innerText = "Mesa " + numero;
        item.querySelector('#status').innerText = `${status}`;
      }
    }
});

botaoPesquisar.addEventListener('click', pesquisarMesas);

botaoLimparPesquisa.addEventListener('click', limparPesquisa);

botoesAlterar.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarMesa(botao);
    });
});

botoesExcluir.forEach(botao => {
    botao.addEventListener('click', () => {
        const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
        if(item){
            const objeto = item.querySelector('#numero').innerText;
            const texto = "Você tem certeza que deseja excluir a mesa " + objeto + "?";
            alertarConfirmacaoExclusao(texto, botao)
        } 
    });
})
