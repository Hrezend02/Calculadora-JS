// Exibe números e operações no visor
function insert(valor) {
    // Pega o conteúdo mostrado no visor
    let resposta = document.getElementById('resposta');
    
    // Substitui o 0 do visor pelo número
    if (resposta.innerHTML === '0') {
        resposta.innerHTML = valor;
    } else {
        resposta.innerHTML += valor; // Adiciona o valor à expressão existente e concatena
    }
}

// Limpar o visor
function cleanDisplay() {
    document.getElementById('resposta').innerHTML = '0'; // Reseta o visor para 0
}

// Calcula o resultado da expressão
function calculate() {
    let expressao = document.getElementById('resposta').innerHTML;

    // Substitui símbolos matemáticos usados na calculadora para os usados no javascript
    expressao = expressao.replace(/÷/g, '/').replace(/×/g, '*'); 

    try {
        let resultado = eval(expressao); // Verificação de possíveis erros digitados pelo usuário.
        document.getElementById('resposta').innerHTML = resultado; // Exibe o resultado
    } catch (e) {
        document.getElementById('resposta').innerHTML = 'Erro'; // Caso haja erro na expressão
    }
}

// FUNÇÕES DA CALCULADORA 

// AQUI É A LÓGICA DO BOTÃO QUE TROCA 

var modoGraus = true; //GLOBAL
function graus() {
    modoGraus = !modoGraus; // Inverte o modo
    let btn = document.getElementById('graus');

    if (modoGraus) {
        btn.innerText = "Deg";
    } else {
        btn.innerText = "Rad";
    }  
}

// FUNÇÕES AUXILIARES

// Converte graus para radianos (porque Math.sin/cos/tan usam radianos)
function toRadians(graus) {
    return graus * Math.PI / 180;
}

// Recebe a função trigonométrica e o valor e aplica a conversão se necessário
function calcularTrig(funcaoTrigonometrica, valor) {
    if (modoGraus) {
        valor = toRadians(valor);
    }
    return funcaoTrigonometrica(valor);
}

// Função para pegar o valor atual do visor (como número)
function getDisplayValue() {
    return parseFloat(document.getElementById('resposta').innerText);
}

// Atualiza o visor com o resultado ou texto
function atualizarDisplay(valor) {
    document.getElementById('resposta').innerText = valor;
}

// FUNÇÕES TRIGONOMÉTRICAS

function seno() {
    var valor = getDisplayValue();

    if (isNaN(valor)) {
        atualizarDisplay("Erro");
        return;
    }

    var resultado = calcularTrig(Math.sin, valor);
    atualizarDisplay(resultado);
}

function cosseno() {
    var valor = getDisplayValue();

    if (isNaN(valor)) {
        atualizarDisplay("Erro");
        return;
    }

    var resultado = calcularTrig(Math.cos, valor);
    atualizarDisplay(resultado);
}

function tangente() {
    var valor = getDisplayValue();

    if (isNaN(valor)) {
        atualizarDisplay("Erro");
        return;
    }

    var resultado = calcularTrig(Math.tan, valor);
    atualizarDisplay(resultado);
}

//ATÉ AQUI OK!

const pi = 3.14159265358979323846;

var exibirPi = document.getElementById('pi').innerHTML;
