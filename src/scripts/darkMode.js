const html = document.querySelector("html");
const checkbox = document.getElementById("check");

const pegarEstilos = (elemento, estilo) =>
    //pegando estilos do css diretamente pelo elemento 
    window
        .getComputedStyle(elemento)
        .getPropertyValue(estilo);


const coresIniciais = {
    bg: pegarEstilos(html, "--bg"),
    darkPurple: pegarEstilos(html, "--dark-purple"),
    bgArea: pegarEstilos(html, "--bg-area")
}

const coresDarkMode = {
    bg: "#575778",
    darkPurple: "#E8E8E8",
    bgArea: "#8D8DC2"
}

const alteraChave = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();


const mudarCores = (cores) => {
    Object.keys(cores).map(key =>
        html.style.setProperty(alteraChave(key), cores[key]));
}

//adicionando evento no checkbox para chamar a função quando tiver mudanças no target
checkbox.addEventListener("change", ({ target }) => {
    //quando o target estiver como checked, muda as cores para as do darkmode
    //quando não estiver no checked mudará para cores iniciais 
    target.checked ? mudarCores(coresDarkMode) : mudarCores(coresIniciais)
});