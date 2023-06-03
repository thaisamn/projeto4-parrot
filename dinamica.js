
window.addEventListener('load', () => {
    inicioDoJogo()
})


let cartas = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
]
let baralho = []
let qtdCartasDigitadas = 0;
let jogadas = 0, acertos = 0;
let parUm, parDois;
let timer = 0
let interval = undefined

function iniciarTimer(){
    timer = 0
    if(interval){
        clearInterval(interval)
    }
    interval = setInterval(incrementarTimer, 1000)
}

function incrementarTimer(){
    ++timer;
    const timerElement = document.querySelector('.timer > span');
    timerElement.innerHTML = timer;
}

function inicioDoJogo(){
    let e_numeroValido = false
    while(!e_numeroValido){
        qtdCartasDigitadas = Number(prompt('Digite quantas cartas quer jogar (4,6,8,10,12,14):'));
        if (qtdCartasDigitadas% 2 === 0 && qtdCartasDigitadas >= 4 && qtdCartasDigitadas <= 14){
            e_numeroValido = true
        }
    }

    distribuir();
    iniciarTimer();
}


function comparador() { 
	return Math.random() - 0.5; 
}

function distribuir() {
    for ( let i = 0; i < qtdCartasDigitadas/2 ; i++){
        let cartaSelecionada = cartas[i];
        baralho.push(cartaSelecionada);
        baralho.push(cartaSelecionada);
    }
    baralho.sort(comparador);

    const container = document.querySelector('.container');

    for( let i = 0; i < baralho.length; i++){
        
        let carta = baralho[i];

        container.innerHTML += `
        <div onclick="virarCarta(this)" data-test="card" class="carta">
        <div class="front-face face">
           <img data-test="face-down-image" src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/back.png" alt="">
         </div>
         <div class="back-face face">
           <img data-test="face-up-image"  src="./projeto__parrots__imagens/Arquivos Úteis - Projeto 04 - Parrot Card Game/${carta}.gif" alt="">
         </div>
        </div>        
        `;
    }
}

function virarCarta(element){
    if(parUm && parDois){
        return;
    }

    if(element.classList.contains('virado')){
        return;
    }
    element.classList.add('virado');
    jogadas++;

    if(!parUm){
        parUm = element
        return;
    }

    if (!parDois){
        parDois = element;
        if ( parDois.innerHTML === parUm.innerHTML ){
            acertos = acertos + 2;
            limparCartasSelecionadas()
        }else{  
            setTimeout( removerClassVirada, 1000);
        }
    }

    acabarJogo();

}

function reiniciarJogo(){
    const container = document.querySelector('.container');
    container.innerHTML = '';
    baralho = []
    qtdCartasDigitadas = 0;
    jogadas = 0, acertos = 0;
    timer = 0
    parUm, parDois = undefined;
    inicioDoJogo();
}

function acabarJogo(){

    if ( acertos === baralho.length ){
        alert(`Você ganhou em ${jogadas} jogadas!`);
        let respostaValida = false

        while(!respostaValida){
            const resposta = prompt('gostaria de jogar de novo? sim ou nao');

            if(resposta == 'sim'){
                respostaValida = true;
                reiniciarJogo();
            }else if(
                resposta == 'nao'
            ){
                respostaValida = true;
                break;
            } else{
                alert(`não entendi, poderia responder com sim ou nao`)
            }
        }
    }

}

function limparCartasSelecionadas(){
    parUm = undefined;
    parDois = undefined;
}


function removerClassVirada(){
    parDois.classList.remove('virado');
    parUm.classList.remove('virado');
    limparCartasSelecionadas()            
}


