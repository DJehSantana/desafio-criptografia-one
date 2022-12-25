const textarea = document.getElementById("texto-original");
const criptografar = document.getElementById("criptografar");
const descriptografar = document.getElementById("descriptografar");
const bgMensagem = document.querySelector(".bg-mensagem");
const tituloMensagem = document.getElementsByClassName("titulo-mensagem");
const textoMensagem = document.getElementsByClassName("texto-mensagem");
const copiar = document.getElementsByClassName("copiar");
const areaTextoCriptografado = document.querySelector(".texto-criptografado");

const errorMessage = "Texto digitado vazio ou inválido!";
const mensagemOriginal = "Digite o texto que você deseja criptografar ou descriptografar";

function adicionarClasses() {
    copiar.item(0).classList.add("ativo");
    copiar.item(1).classList.add("ativo");
    bgMensagem.classList.add("desativar");
    tituloMensagem.item(0).classList.add("desativar");
    tituloMensagem.item(1).classList.add("desativar");
}

function removerClasses() {
    copiar.item(0).classList.remove("ativo");
    copiar.item(1).classList.remove("ativo");
    bgMensagem.classList.remove("desativar");
    tituloMensagem.item(0).classList.remove("desativar");
    tituloMensagem.item(1).classList.remove("desativar");

    textoMensagem.item(1).innerHTML = mensagemOriginal;
    textoMensagem.item(0).innerHTML = mensagemOriginal;

}

function criptografarTexto(mensagem) {
    const resultado = mensagem.replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    textoMensagem.item(1).innerHTML = resultado;
    textoMensagem.item(0).innerHTML = resultado;
}

function descriptografarTexto(mensagem) {
    const resultado = mensagem.replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    textoMensagem.item(1).innerHTML = resultado;
    textoMensagem.item(0).innerHTML = resultado;
}

const ativarCriptografia = () => {
    if (textarea.value !== '') {
        adicionarClasses();
        criptografarTexto(textarea.value);
    } else {
        alert(errorMessage);
        return;
    }
}

const ativarDescriptografia = () => {
    if (textarea.value !== '') {
        adicionarClasses();
        descriptografarTexto(textarea.value);
    } else {
        alert(errorMessage);
        return;
    }
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto);
}

function ativarBotaoCopiar() {
    const textoCopiado = navigator.clipboard.readText = textoMensagem.item(0).textContent;

    console.log(textoCopiado);

    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            copiarTexto(textoCopiado);
        }
    });

    removerClasses();
    alert("Texto copiado!");

}


criptografar.addEventListener("click", ativarCriptografia);
descriptografar.addEventListener("click", ativarDescriptografia);

//copiar.addEventListener("click", copiarTexto());

