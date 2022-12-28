//elementos container principal
const textarea = document.getElementById("texto-original");
const botaoCriptografar = document.getElementById("criptografar");
const botaoDescriptografar = document.getElementById("descriptografar");
//elementos container desktop e mobile
const areaTextoCriptografado = document.querySelector(".texto-criptografado");
const bgMensagem = document.querySelector(".bg-mensagem");
const tituloMensagem = document.getElementsByClassName("titulo-mensagem");
const textoMensagem = document.getElementsByClassName("texto-mensagem");
const copiar = document.getElementsByClassName("copiar");
//elementos do modal
const modal = document.querySelector('dialog');
const botaoFechar = document.getElementById("botaoFechar");
const tituloModal = document.getElementsByClassName("titulo-modal");
const textoModal = document.getElementsByClassName("texto-modal");

//variáveis globais
const errorMessage = "Texto digitado vazio ou inválido!";
const mensagemOriginal = "Digite o texto que você deseja criptografar ou descriptografar";

//lógica de criptografia e descriptografia
const criptografarTexto = (mensagem, textoMensagem) => {
    const resultado = mensagem.replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    textoMensagem.item(1).innerHTML = resultado;
    textoMensagem.item(0).innerHTML = resultado;
}

const descriptografarTexto = (mensagem, textoMensagem) => {
    const resultado = mensagem.replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    textoMensagem.item(1).innerHTML = resultado;
    textoMensagem.item(0).innerHTML = resultado;
}

//funções para alterar classes
function adicionarClasses() {
    //ativa botão copiar 
    copiar.item(0).classList.add("ativo");
    copiar.item(1).classList.add("ativo");
    //desativa imagem e textos padrão
    bgMensagem.classList.add("desativar");
    tituloMensagem.item(0).classList.add("desativar");
    tituloMensagem.item(1).classList.add("desativar");
}

function removerClasses() {
    //desativa botão copiar
    copiar.item(0).classList.remove("ativo");
    copiar.item(1).classList.remove("ativo");
    //retorna mensagens e imagem padrão
    bgMensagem.classList.remove("desativar");
    tituloMensagem.item(0).classList.remove("desativar");
    tituloMensagem.item(1).classList.remove("desativar");
    textoMensagem.item(1).innerHTML = mensagemOriginal;
    textoMensagem.item(0).innerHTML = mensagemOriginal;
}

const ativarCriptografia = () => {
    //validação de conteúdo do textarea
    if (textarea.value !== '') {
        //conteúdo válido = chama funções para realizar criptografia e alteração das classes
        adicionarClasses();
        criptografarTexto(textarea.value, textoMensagem);
    } else {
        exibirMensagem("Atenção", errorMessage);
        return;
    }
}

const ativarDescriptografia = () => {
    //validação de conteúdo do textarea
    if (textarea.value !== '') {
        //conteúdo válido = chama funções para realizar descriptografia e alteração das classes
        adicionarClasses();
        descriptografarTexto(textarea.value, textoMensagem);
    } else {
        exibirMensagem("Atenção", errorMessage);
        return;
    }
}

//chamando funções para realizar criptografia e alteração das classes
botaoCriptografar.addEventListener("click", ativarCriptografia);
botaoDescriptografar.addEventListener("click", ativarDescriptografia);

//funções do botão copiar
function copiarTexto(texto) {
    navigator.clipboard.writeText(texto);
}

function ativarBotaoCopiar() {
    //Lê o texto e retorna o resultado para a variável
    const textoCopiado = navigator.clipboard.readText = textoMensagem.item(0).textContent;
    //verifica a permissão (mobile não funciona a permissão) 
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            //copia o texto exibe uma mensagem de sucesso e retorna a div ao estado inicial
            copiarTexto(textoCopiado);
            exibirMensagem("Sucesso!", "Texto copiado");
            removerClasses();
        } else {
            console.log(result.state);
        }
    });
}

//funções do modal
function exibirMensagem(titulo, mensagem) {
    //ativa o modal
    modal.showModal();
    //insere os textos recebidos por parâmetro
    tituloModal.item(0).textContent = titulo;
    textoModal.item(0).textContent = mensagem;
}

function fecharModal() {
    modal.close();
}

