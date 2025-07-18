window.alertarErro = function(texto){
    Swal.fire({
        html:`<span class="text-error">` + texto + `</span>`,
        showConfirmButton: false,
        customClass: {
            popup: 'red-alert'
        }
    });
}

window.alertarOperacaoRealizada = function(texto){
    Swal.fire({
        html:`<span class="text-alert">` + texto + `</span>`,
        showConfirmButton: false,
        customClass: {
            popup: 'black-alert'
        }
    });
}

window.exibirErroCampo = function(nome, campo, texto){
    const mensagemErro = document.createElement("p");
    mensagemErro.classList.add("message-field");
    mensagemErro.textContent = texto;
    campo.insertAdjacentElement('afterend', mensagemErro);
    campo.style.backgroundColor = "#8E8E93";
    campo.style.border = "0.5px solid rgba(248, 113, 113, 1)";
    campo.style.color = "rgba(248, 113, 113, 1)";
    nome.style.color = "rgba(248, 113, 113, 1)";
}

window.exibirErroForm = function(){
    document.querySelectorAll(".input-field").forEach(input => {
        input.style.backgroundColor = "#8E8E93"; 
        input.style.border = "0.5px solid rgba(248, 113, 113, 1)";
        input.style.color = "rgba(248, 113, 113, 1)";
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('message-field')) {
            const mensagemErro = document.createElement("p");
            mensagemErro.classList.add("message-field");
            mensagemErro.textContent = "Campo obrigatório";
            input.parentNode.insertBefore(mensagemErro, input.nextSibling);
        }
    });
    document.querySelectorAll(".label").forEach(label => {
        label.style.color = "rgba(248, 113, 113, 1)";
    });
    const textarea = document.querySelector(".textarea-field");
    if(textarea){
        textarea.style.backgroundColor = "#8E8E93"; 
        textarea.style.border = "0.5px solid rgba(248, 113, 113, 1)";
        textarea.style.color = "rgba(248, 113, 113, 1)";
        if (!textarea.nextElementSibling || !textarea.nextElementSibling.classList.contains('message-field')) {
            const mensagemErro = document.createElement("p");
            mensagemErro.classList.add("message-field");
            mensagemErro.textContent = "Campo obrigatório";
            textarea.insertAdjacentElement('afterend', mensagemErro);
        }
    }
}

window.eventoForm = function(){
    document.querySelectorAll(".input-field").forEach(input => {
        input.style.backgroundColor = ""; 
        input.style.border = "";
        input.style.color = "";
    });
    const elementos = document.querySelectorAll('.message-field');
    for (const elemento of elementos){
        elemento.remove();
    }
    document.querySelectorAll(".label").forEach(label => {
        label.style.color = "";
    });
    const textarea = document.querySelector(".textarea-field");
    if(textarea){
        textarea.style.backgroundColor = ""; 
        textarea.style.border = "";
        textarea.style.color = "";
    }
}

window.retornarPagina = function(pagina){
    window.location.href = pagina;
}