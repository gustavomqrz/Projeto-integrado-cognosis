// Índice e seletores dos slides teóricos e seus pontos de navegação
let slideAtual = 0;
const slides = document.querySelectorAll('.teorico-slide');
const pontos = document.querySelectorAll('.indicador-ponto');

// Função para alternar e exibir o slide teórico ativo de forma circular
function mostrarSlide(indice) {
    slides.forEach(s => s.classList.remove('ativo'));
    pontos.forEach(p => p.classList.remove('ativo'));
    if (indice >= slides.length) slideAtual = 0;
    else if (indice < 0) slideAtual = slides.length - 1;
    else slideAtual = indice;
    slides[slideAtual].classList.add('ativo');
    pontos[slideAtual].classList.add('ativo');
}

function mudarSlide(direcao) { mostrarSlide(slideAtual + direcao); }
function irParaSlide(indice) { mostrarSlide(indice); }

// Estado para controlar o quadro ativo de cada HQ (grupo) de forma isolada
const quadrosEstado = { 2: 0 };

function mudarQuadro(grupo, direcao) {
    let atual = quadrosEstado[grupo] || 0;
    atual += direcao;
    if (atual > 3) atual = 0;
    if (atual < 0) atual = 3;
    quadrosEstado[grupo] = atual;
    atualizarVisualQuadro(grupo, atual);
}

function irParaQuadro(grupo, indice) {
    quadrosEstado[grupo] = indice;
    atualizarVisualQuadro(grupo, indice);
}

// Atualiza a interface visual do carrossel de quadrinhos (imagens, pontos e contador)
function atualizarVisualQuadro(grupo, indice) {
    const slideAtivo = document.querySelector('.teorico-slide.ativo');
    if (!slideAtivo) return;
    const box = slideAtivo.querySelector('.quadrinhos-box');
    if (!box) return;
    const imgs = box.querySelectorAll('img');
    const pontosMini = box.querySelectorAll('.mini-ponto');
    const contador = box.querySelector('[id^="contador-quadrinho"]');

    imgs.forEach((img, idx) => { img.style.display = (idx === indice) ? 'block' : 'none'; });
    pontosMini.forEach((p, idx) => { p.classList.toggle('ativo', idx === indice); });
    if (contador) { contador.innerText = `Quadro ${indice + 1} de 4`; }
}