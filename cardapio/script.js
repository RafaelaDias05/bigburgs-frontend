//ELEMENTOS HTML
const botoesAlterar = document.querySelectorAll('.btn-alterar');

function alterarCardapio(botao){
    let itemAtual = null;
    const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
    itemAtual = item;

    const id = botao.getAttribute('data-id');
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
    // Verifica se tem dados editados na URL
    const params = new URLSearchParams(window.location.search);

    if(params.has('id')) {
      const id = params.get('id');
      const nome = params.get('nome');
      const desc = params.get('desc');
      const preco = params.get('preco');

      const item = document.querySelector(`.ctn-flex[data-id="${id}"]`);
      if(item) {
        item.querySelector('.produto-nome').innerText = nome;
        item.querySelector('.produto-desc').innerText = desc;
        item.querySelector('.produto-preco').innerText = `R$ ${preco}`;
      }
       window.history.replaceState({}, document.title, window.location.pathname);
    }
});

botoesAlterar.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarCardapio(botao);
    });
});