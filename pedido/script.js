//ELEMENTOS HTML
const botoesAlterar = document.querySelectorAll('.btn-alterar');
const botoesExcluir = document.querySelectorAll('.btn-excluir');
const botaoPesquisar = document.querySelector('.btn-pesquisar');
const botaoLimparPesquisa = document.querySelector('.clear-search');

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

function pesquisarPedido(){ 
    let pesquisa = document.querySelector('.termo-pesquisado').value.trim();
    if (pedidos[pesquisa]) {
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

function alterarPedido(botao){
    let itemAtual = null;
    const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
    itemAtual = item;

    const id = item.dataset.id;
    const numero = item.querySelector('#numero').innerText;
    const tipo = pedidos[numero].tipo;
    const mesa = pedidos[numero].mesa;
    const cliente = pedidos[numero].cliente;
    const cardapio = pedidos[numero].cardapio;
    const bebida = pedidos[numero].bebida;
    const observacoes = pedidos[numero].observacoes;
    const situacao = item.querySelector('#status').innerText;
    const preco = pedidos[numero].preco;

    const url = new URL('pedido/alterar.html', window.location.origin);
    url.searchParams.set('id', id);
    url.searchParams.set('tipo', tipo);
    url.searchParams.set('mesa', mesa);
    url.searchParams.set('cliente', cliente);
    url.searchParams.set('cardapio', cardapio);
    url.searchParams.set('bebida', bebida);
    url.searchParams.set('observacoes', observacoes);
    url.searchParams.set('situacao', situacao);
    url.searchParams.set('preco', preco);
 
    window.location.href = url;
}

 document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if(params.has('id')) {
      const id = params.get('id');
      const tipo = params.get('tipo');
      const mesa = params.get('mesa');
      const cliente = params.get('cliente');
      const cardapio = params.get('cardapio');
      const bebida = params.get('bebida');
      const observacoes = params.get('observacoes');
      const situacao = params.get('situacao');
      const preco = params.get('preco');

      const item = document.querySelector(`#${id}`);
      if(item) {
        item.querySelector('#status').innerText = situacao;
      }
    }
});

botaoPesquisar.addEventListener('click', pesquisarPedido);

botaoLimparPesquisa.addEventListener('click', limparPesquisa);

botoesAlterar.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarPedido(botao);
    });
});

botoesExcluir.forEach(botao => {
    botao.addEventListener('click', () => {
        const item = botao.closest('.ctn-flex.ctn-flex-grid.ctn-table-line');
        if(item){
            const objeto = item.querySelector('#numero').innerText;
            const texto = "Você tem certeza que deseja excluir o " + objeto + "?";
            alertarConfirmacaoExclusao(texto, botao)
        } 
    });
})