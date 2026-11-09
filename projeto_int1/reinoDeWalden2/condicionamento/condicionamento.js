// Função para alternar os carrosseis mostrados
function mudarConceito(chave) {
    // Remove classe "ativa" de todos os cartões
    document.querySelectorAll('.cartao-conceito').forEach(c => c.classList.remove('ativo'));
    // Ativa o cartão clicado
    const card = document.getElementById('card-' + chave);
    if (card) card.classList.add('ativo');

    // Esconde todos os painéis
    document.querySelectorAll('.painel-conceito').forEach(p => p.classList.remove('ativo'));
    // Mostra o painel correspondente
    const painel = document.getElementById('painel-'- + chave) || document.getElementById('painel-' + chave);
    if (painel) painel.classList.add('ativo');
}

// Controle do carrossel interno de quadrinhos de cada painel
const indicesQuadros = {};

function mudarQuadro(botao, direcao) {
    const box = botao.closest('.quadrinhos-box');
    const grupo = box.getAttribute('data-grupo');
    
    if (indicesQuadros[grupo] === undefined) {
        indicesQuadros[grupo] = 0;
    }
    
    indicesQuadros[grupo] += direcao;
    if (indicesQuadros[grupo] > 3) indicesQuadros[grupo] = 0;
    if (indicesQuadros[grupo] < 0) indicesQuadros[grupo] = 3;
    
    atualizarQuadroVisual(box, indicesQuadros[grupo]);
}

function irQuadro(ponto, indice) {
    const box = ponto.closest('.quadrinhos-box');
    const grupo = box.getAttribute('data-grupo');
    
    indicesQuadros[grupo] = indice;
    atualizarQuadroVisual(box, indice);
}

function atualizarQuadroVisual(box, indice) {
    const imgs = box.querySelectorAll('.quadrinho-viewport img');
    const pontos = box.querySelectorAll('.mini-ponto');
    const contador = box.querySelector('.contador-q');
    
    imgs.forEach((img, idx) => {
        img.style.display = (idx === indice) ? 'block' : 'none';
    });
    
    pontos.forEach((p, idx) => {
        p.classList.toggle('ativo', idx === indice);
    });
    
    if (contador) {
        contador.innerText = `Quadro ${indice + 1} de 4`;
    }
}