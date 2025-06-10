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

//Funcao E
function E() {
  document.getElementById("resultado").textContent = Math.E; // Valor de e
}

//Ans
let ultimaResposta = 0; // valor global

function calculate() {
    let expressao = document.getElementById('resposta').innerHTML;

    // Substituições para que o eval funcione corretamente
    expressao = expressao.replace(/÷/g, '/')
                         .replace(/×/g, '*')
                         .replace(/π/g, Math.PI)
                         .replace(/Ans/g, ultimaResposta); // Substitui 'Ans' pelo valor real

    try {
        let resultado = eval(expressao);
        if (!isFinite(resultado)) throw new Error("Divisão por zero");

        document.getElementById('resposta').innerHTML = resultado;
        ultimaResposta = resultado; // Salva para uso futuro
    } catch (e) {
        document.getElementById('resposta').innerHTML = 'Erro';
    }

    //teclado
}
document.addEventListener('keydown', function(event) {
    const tecla = event.key;

    // Se o visor estiver com erro, limpa automaticamente ao digitar algo
    if (document.getElementById('resposta').innerText === 'Erro') {
        cleanDisplay();
    }

    if (!isNaN(tecla)) {
        insert(tecla); // números de 0 a 9
    } else if (tecla === '.') {
        insert('.');
    } else if (tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') {
        // Adiciona os operadores convertendo * e / para × e ÷ como no visor
        if (tecla === '*') insert('×');
        else if (tecla === '/') insert('÷');
        else insert(tecla);
    } else if (tecla === 'Enter' || tecla === '=') {
        event.preventDefault(); // evita comportamento padrão do Enter
        calculate();
    } else if (tecla === 'Backspace') {
        apagarUltimoDigito();
    } else if (tecla === 'Escape') {
        cleanDisplay();
    }
    //Apagar com teclado
    function apagarUltimoDigito() {
    let resposta = document.getElementById('resposta');
    let texto = resposta.innerText;

    if (texto.length > 1) {
        resposta.innerText = texto.slice(0, -1);
    } else {
        resposta.innerText = '0';
    }
}

});

//ATÉ AQUI OK.....................................................................

function fatorial() {
    let valorTexto = document.getElementById('resposta').innerText;
    let numero = parseInt(valorTexto);

    if (isNaN(numero) || numero < 0) {
        document.getElementById('resposta').innerText = "Erro";
        return;
    }

    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }

    document.getElementById('resposta').innerText = resultado;
}

function porcentagem() {
  let visor = document.getElementById('resposta');
  if (visor.textContent === '0' || visor.textContent === 'Erro') {
    visor.textContent = '%';
  } else {
    visor.textContent += '%';
  }
}

function calculate() {
  let visor = document.getElementById('resposta');
  let exp = visor.textContent;

  // troca 25%1000 por (25/100)*1000
  exp = exp.replace(/(\d+)%(\d+)/g, '($1/100)*$2');

  // troca símbolos para JS
  exp = exp.replace(/×/g, '*').replace(/÷/g, '/');

  try {
    let resultado = eval(exp);
    visor.textContent = resultado;
  } catch {
    visor.textContent = 'Erro';
  }
}

function ln() {
  let visor = document.getElementById('resposta');
  let valor = parseFloat(visor.textContent);

  if (valor > 0) {
    visor.textContent = Math.log(valor);
  } else {
    visor.textContent = 'Erro';
  }
}

// FUNÇÃO DO LOG
function log() {
  let visor = document.getElementById('resposta').innerText;
  let num = Number(visor);

  if (num <= 0 || isNaN(num)) {
    document.getElementById('resposta').innerText = "Erro";
    return;
  }

  let resultado = Math.log10(num);
  document.getElementById('resposta').innerText = resultado;
}


