//ELEMENTOS HTML
const botoesAlterar = document.querySelectorAll('.btn-alterar');
const botoesExcluir = document.querySelectorAll('.btn-excluir');
const botaoPesquisar = document.querySelector('.btn-pesquisar');
const botaoLimparPesquisa = document.querySelector('.clear-search');

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

function pesquisarBebidas(){ 
    let pesquisa = document.querySelector('.termo-pesquisado').value.trim();
    if (bebidas[pesquisa]) {
        elementos =  document.querySelectorAll('.ctn-flex.ctn-flex-grid.ctn-table-line');
        for (elemento of elementos){
            if(elemento.querySelector("#produto-nome").innerText != pesquisa){
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

function alterarBebida(botao){
    let itemAtual = null;
    const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
    itemAtual = item;

    const id = item.dataset.id;
    const nome = item.querySelector('#produto-nome').innerText;
    const preco = item.querySelector('#produto-preco').innerText.replace('R$', '').trim();

    const url = new URL('bebida/alterar.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('nome', nome);
    url.searchParams.set('preco', preco);
 
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if(params.has('id')) {
      const id = params.get('id');
      const nome = params.get('nome');
      const preco = params.get('preco');

      const item = document.querySelector(`#${id}`);
      if(item) {
        item.querySelector('#produto-nome').innerText = nome;
        item.querySelector('#produto-preco').innerText = `R$ ${preco}`;
      }
    }
});

botaoPesquisar.addEventListener('click', pesquisarBebidas);

botaoLimparPesquisa.addEventListener('click', limparPesquisa);

botoesAlterar.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarBebida(botao);
    });
});

botoesExcluir.forEach(botao => {
    botao.addEventListener('click', () => {
        const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
        if(item){
            const objeto = item.querySelector('#produto-nome').innerText;
            const texto = "Você tem certeza que deseja excluir a bebida " + objeto + "?";
            alertarConfirmacaoExclusao(texto, botao)
        } 
    });
})