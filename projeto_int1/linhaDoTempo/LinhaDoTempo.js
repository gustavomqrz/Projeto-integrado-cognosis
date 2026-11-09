// Variáveis de controle do carrossel
let indiceSlideAtual = 0;
const quantidadeTotalSlides = 5;
const trilhaCarrossel = document.getElementById('trilhaCarrossel');

// Função para avançar ou recuar os slides do carrossel
function moverCarrossel(direcao) {
    indiceSlideAtual += direcao;
    
    // Loop do carrossel
    if (indiceSlideAtual >= quantidadeTotalSlides) {
        indiceSlideAtual = 0;
    } else if (indiceSlideAtual < 0) {
        indiceSlideAtual = quantidadeTotalSlides - 1;
    }
    
    // Deslocamento horizontal carrossel
    trilhaCarrossel.style.transform = `translateX(-${indiceSlideAtual * 100}%)`;
}