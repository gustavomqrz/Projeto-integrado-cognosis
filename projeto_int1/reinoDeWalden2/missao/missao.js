// Altera a categoria ativa da interface, atualizando o painel de conteúdo e a aba selecionada
function mudarCategoria(cat, evento) {
    document.querySelectorAll('.painel-categoria').forEach(p => p.classList.remove('ativo'));
    document.querySelectorAll('.aba-cat').forEach(a => a.classList.remove('ativo'));
    document.getElementById('cat-' + cat).classList.add('ativo');
    if (evento && evento.currentTarget) {
        evento.currentTarget.classList.add('ativo');
    }
}