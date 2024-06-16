import {init,addgamesCompleted,checkGameCompleted} from "../models/gameStateModel.js"


let options = [
    {
        pergunta: "Qual é o valor decimal do número binário 1010?",
        certo: `10`,
        opt: [`8`,`9`,`10`,`12`,]
    },{
        pergunta: "Qual é o valor decimal do número binário 0111?",
        certo: `7`,
        opt: [`5`,`9`,`4`,`7`,]
    },{
        pergunta: "Qual é o valor binario do número binário 9?",
        certo: `1001`,
        opt: [`0101`,`0111`,`1001`,`0001`,]
    },{
        pergunta: "Qual é o valor binario do número binário 2?",
        certo: `0010`,
        opt: [`0010`,`1111`,`0001`,`1000`,]
    },{
        pergunta: `Como você imprime "Hello, World!" em Python?`,
        certo: `print("Hello, World!")`,
        opt: [`console.log("Hello Word")`,`print("Hello, World!")`,`printf("Hello, World!")`,`System.out.println("Hello, World!")`,]
    },{
        pergunta: `Qual tag HTML é usada para criar um parágrafo?`,
        certo: `p`,
        opt: [`p`,`span`,`h1`,`div`,]
    }
];
init();
let Exercise = [];
let progress = 1;
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame3"));
let modalIntro =  new bootstrap.Modal(document.querySelector("#intro3"));
let gameDone =  new bootstrap.Modal(document.querySelector("#gameDone"));
let vitoria = new bootstrap.Modal(document.querySelector("#victoryModal"));


let startGame = () =>{  
    let index = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    console.log(index);
    console.log(Exercise);
    if (Exercise.some(element => element.certo == options[index].certo)) {
        startGame();
    }else{
        Exercise.push(options[index]); 
        document.querySelector(".Question").textContent = options[index].pergunta;
        console.log(options[index]);
        options[index].opt.forEach((element,i) => {
            let p = document.createElement("p");
            p.classList.add("textminigame3", "text-black", "text-center" ,"p-1", "m-1");
            p.innerHTML = element;
            console.log(element);
            if (element == options[index].certo) {
                document.querySelector(`.card${i+1}`).addEventListener("click", optionRight)
            }else{
                document.querySelector(`.card${i+1}`).addEventListener("click",gameOver)
            }
            document.querySelector(`.card${i+1}`).appendChild(p)
        });
    }
}

function optionRight(e) { 
    progress += 33

    if (progress == 100) {
        modalGame.hide();
        vitoria.show();
        addgamesCompleted("minigame3");
        return;
    }
    let bar = document.querySelector(".progress-bar");
    bar.style.width = `${progress}%`;    
    modalGame.hide();
    setTimeout(() => {
        modalGame.show();
    }, 500);
}
function gameOver(e) {
    progress = 1;
    document.querySelector(".progress-bar").style.width = `1%`;
    for (let i = 1; i <= 4; i++) {
        document.querySelector(`.card${i}`).innerHTML = "X";
    }
    setTimeout(() => {
        modalGame.hide();
    }, 1000);
    setTimeout(() => {
        modalGame.show();
    }, 1500);
    Exercise=[];
}


let resetGame = ()=>{
    document.querySelector(".gameBoard").innerHTML =`
        <div class="up ">
            <button class="card1 m-2 "></button>
            <button class="card2 m-2 "></button>
        </div>
        <div class="down">
            <button class="card3 m-2 "></button>
            <button class="card4 m-2 "></button>
        </div>   
    `
}


document.querySelector("#sala211Computer").addEventListener("click", ()=>{
    if (!checkGameCompleted("minigame3")) {
        modalIntro.show();
    } else {
        gameDone.show();
    }
})


document.querySelector("#miniGame3").addEventListener('shown.bs.modal', () => {
    startGame();

})

document.querySelector("#miniGame3").addEventListener('hidden.bs.modal', () => {
    resetGame();
});


document.querySelector(".closeGame").addEventListener("click",() =>{
    progress = 1;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
    Exercise=[];
})