//ELEMENTOS HTML
const botoesAlterar = document.querySelectorAll('.btn-alterar');
const botoesExcluir = document.querySelectorAll('.btn-excluir');
const botaoPesquisar = document.querySelector('.btn-pesquisar');
const botaoLimparPesquisa = document.querySelector('.clear-search');

let cardapio = {
    "American Bacon":{
        id: "1",
        ingredientes: "Hambúrguer, bacon, queijo, presunto, tomate e alface",
        valor: "R$ 20,00"
    },
    "Churrasquinho":{
        id: "2",
        ingredientes: "Picanha, bacon, milho, cebola, tomate e alface",
        valor: "R$ 22,00"
    },
    "Galinha Mista":{
        id: "3",
        ingredientes: "Frango, picanha, milho, presunto, queijo, tomate e alface",
        valor: "R$ 22,00"
    },
};

function pesquisarCardapio(){ 
    let pesquisa = document.querySelector('.termo-pesquisado').value.trim();
    if (cardapio[pesquisa]) {
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

function alterarCardapio(botao){
    let itemAtual = null;
    const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
    itemAtual = item;

    const id = item.dataset.id;
    const nome = item.querySelector('#produto-nome').innerText;
    const desc = item.querySelector('#produto-desc').innerText;
    const preco = item.querySelector('#produto-preco').innerText.replace('R$', '').trim();

    const url = new URL('cardapio/alterar.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('nome', nome);
    url.searchParams.set('descricao', desc);
    url.searchParams.set('preco', preco);
 
    window.location.href = url;
}

 document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if(params.has('id')) {
      const id = params.get('id');
      const nome = params.get('nome');
      const desc = params.get('desc');
      const preco = params.get('preco');

      const item = document.querySelector(`#${id}`);
      if(item) {
        item.querySelector('#produto-nome').innerText = nome;
        item.querySelector('#produto-desc').innerText = desc;
        item.querySelector('#produto-preco').innerText = `R$ ${preco}`;
      }
    }
});

botaoPesquisar.addEventListener('click', pesquisarCardapio);

botaoLimparPesquisa.addEventListener('click', limparPesquisa);

botoesAlterar.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarCardapio(botao);
    });
});

botoesExcluir.forEach(botao => {
    botao.addEventListener('click', () => {
        const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
        if(item){
            const objeto = item.querySelector('#produto-nome').innerText;
            const texto = "Você tem certeza que deseja excluir o cardápio " + objeto + "?";
            alertarConfirmacaoExclusao(texto, botao)
        } 
    });
})