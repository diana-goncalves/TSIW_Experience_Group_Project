import setItems from "../views/inventoryView.js";
import setCollectibles from "../views/collectiblesView.js";
import GameStateView from "./GameStateView.js";
import {checkItemInventory} from "../models/inventoryModel.js"

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

let noKey =  new bootstrap.Modal(document.querySelector("#noKeyModal"));

// Cofre e código
let cofreModal = new bootstrap.Modal(document.querySelector("#cofreModal"));

let code1 = parseInt(document.querySelector("#code1").textContent);
document.querySelector("#code1UP").addEventListener("click", () => {
    code1===10 ? code1 : code1++;
    document.querySelector("#code1").textContent = `${code1}`;
})
document.querySelector("#code1DOWN").addEventListener("click", () => {
    code1===0 ? code1 : code1--;
    document.querySelector("#code1").textContent = `${code1}`;
})

let code2 = parseInt(document.querySelector("#code2").textContent);
document.querySelector("#code2UP").addEventListener("click", () => {
    code2===10 ? code2 : code2++;
    document.querySelector("#code2").textContent = `${code2}`;
})
document.querySelector("#code2DOWN").addEventListener("click", () => {
    code2===0 ? code2 : code2--;
    document.querySelector("#code2").textContent = `${code2}`;
})

let code3 = parseInt(document.querySelector("#code3").textContent);
document.querySelector("#code3UP").addEventListener("click", () => {
    code3===10 ? code3 : code3++;
    document.querySelector("#code3").textContent = `${code3}`;
})
document.querySelector("#code3DOWN").addEventListener("click", () => {
    code3===0 ? code3 : code3--;
    document.querySelector("#code3").textContent = `${code3}`;
})

let code4 = parseInt(document.querySelector("#code4").textContent);
document.querySelector("#code4UP").addEventListener("click", () => {
    code4===10 ? code4 : code4++;
    document.querySelector("#code4").textContent = `${code4}`;
})
document.querySelector("#code4DOWN").addEventListener("click", () => {
    code4===0 ? code4 : code4--;
    document.querySelector("#code4").textContent = `${code4}`;
})

const abrirCofre = document.querySelector("#abrirCofre");
const bodyCofreModal = document.querySelector("#bodyCofreModal");
const heroIMG = document.querySelector("#heroHall3");
const chaveTSIW = document.querySelector("#chaveTSIW");

// Clicar no botão para abrir cofre. Comparar codigo inserido com codigo na session storage.
abrirCofre.addEventListener("click", () => {
    const codigoInserido = `${code1}` + `${code2}` +`${code3}` + `${code4}`;
    
    const jogo = JSON.parse(sessionStorage.getItem("gameStatus"));
    const codigoJogo = `${jogo.code[0]}` + `${jogo.code[1]}` +`${jogo.code[2]}` + `${jogo.code[3]}`;

    if (codigoInserido === codigoJogo) {
        cofreModal.hide();
        heroIMG.src = "../../media/img/ER-assets/hall3CofreAberto.png";
        chaveTSIW.style.display = "block";
    }
})

// Cofre e código

function hall3View() {
    GameStateView("hall 3");
    // Mete os items na sala
    setItems("hall 3");
    setCollectibles("hall 3")
    //--------------------------------------------------------------------
    // PORTA ESQUERDA
    const hall3LeftArea = document.querySelector("#hall3Left");
    const imgLeft = document.querySelector(".imgLeft");

    // PORTA DIREITA
    const hall3RightArea = document.querySelector("#hall3Right");
    const imgRight = document.querySelector(".imgRight");

    // CORREDOR ATRAS
    const hall3BackArea = document.querySelector("#hall3tohall2");
    const imgBack = document.querySelector(".imgBack");

    // COFRE
    const cofre = document.querySelector("#cofre");

    // PORTA FINAL
    const portaFinal = document.querySelector("#portaFinal");

    // CHAVE TSIW
    

    // PARA APARECER O RELEVO NA PORTA ESQUERDA
    hall3LeftArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgLeft.style.display = "block";
    });

    hall3LeftArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgLeft.style.display = "none";
    });

    // PARA APARECER O RELEVO NA PORTA DIREITA
    hall3RightArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block";
    });

    hall3RightArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none";
    });

    // PARA APARECER O RELEVO NO CORREDOR EM BAIXO
    hall3BackArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgBack.style.display="block";
    });

    hall3BackArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgBack.style.display="none";
    });

    hall3LeftArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 210")) {
            location.href="./Sala210.html"
        } else {
            noKey.show();
        }
    })

    hall3RightArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 211")) {
            location.href="./Sala211.html"
        } else {
            noKey.show();
        }
    })

    portaFinal.addEventListener("click", (e)=>{
        if (checkItemInventory("chaveTSIW")) {
            // Trocar por modal de vitoria e trocar hero img por hall3 sem a porta final
            alert("vitoria")
        } else {
            noKey.show();
        }
    })

    cofre.addEventListener("click", (e) => {
        e.preventDefault();
        cofreModal.show();
    })

    chaveTSIW.addEventListener("click", (e) => {
        e.preventDefault();
        // chamar função que coloca chave no inventario
        chaveTSIW.style.display = "none";
    })

}
hall3View();

//--------------------------------------------------------------------
