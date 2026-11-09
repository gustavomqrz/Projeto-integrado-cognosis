// URL do Google Apps Script responsável para validar a matrícula na planilha
const URL_SCRIPT_LOGIN = 'https://script.google.com/macros/s/AKfycby8dmnobtgexqQ7HfUTKbdGvne5H09SQrstEm_Rq8oxUk-Q6tzIYBNHGiXFvo1QWDh1/exec';

// Elementos da página
const botaoSobre = document.getElementById('botaoSobre');
const modalSobre = document.getElementById('modalSobre');
const botaoFecharModal = document.getElementById('botaoFecharModal');
const botaoEntendido = document.getElementById('botaoEntendido');
const botaoVisitante = document.getElementById('botaoVisitante');
const formularioLogin = document.getElementById('formularioLogin');
const campoMatricula = document.getElementById('campoMatricula');
const botaoEntrar = formularioLogin.querySelector('.botao-entrar');
const mensagemErro = document.getElementById('mensagemErroLogin');

// Modal
function abrirModal() {
    modalSobre.classList.remove('escondido');
}

function fecharModal() {
    modalSobre.classList.add('escondido');
}

botaoSobre.addEventListener('click', abrirModal);
botaoFecharModal.addEventListener('click', fecharModal);
botaoEntendido.addEventListener('click', fecharModal);

modalSobre.addEventListener('click', function (evento) {
    if (evento.target === modalSobre) {
        fecharModal();
    }
});

// Consulta da planilha do Google Sheets
async function verificarMatriculaNaPlanilha(matricula) {
    const urlRequisicao = `${URL_SCRIPT_LOGIN}?acao=login&matricula=${encodeURIComponent(matricula)}`;
    const resposta = await fetch(urlRequisicao);

    if (!resposta.ok) {
        throw new Error('Falha na comunicação com o servidor.');
    }

    return resposta.json();
}

// Erros
function mostrarErroLogin(texto) {
    if (!mensagemErro) return;
    mensagemErro.textContent = texto;
    mensagemErro.classList.remove('escondido');
}

function alternarBotaoCarregando(carregando) {
    botaoEntrar.disabled = carregando;
    botaoEntrar.textContent = carregando ? 'Verificando...' : 'Entrar';
}

// Entrar com matrícula
formularioLogin.addEventListener('submit', async function (evento) {
    evento.preventDefault();
    mensagemErro.classList.add('escondido');

    const matriculaDigitada = campoMatricula.value.trim();
    if (!matriculaDigitada) return;

    alternarBotaoCarregando(true);

    try {
        const resultadoValidacao = await verificarMatriculaNaPlanilha(matriculaDigitada);

        if (resultadoValidacao.sucesso) {
            // Se a matrícula for encontrada, avança para a pasta do livro
            window.location.href = '../livro/livro.html';
        } else {
            mostrarErroLogin(resultadoValidacao.mensagem || 'Matrícula não autorizada.');
        }
    } catch (erro) {
        mostrarErroLogin('Não foi possível verificar a matrícula agora. Tente novamente.');
    } finally {
        alternarBotaoCarregando(false);
    }
});

// Entrar como visitante
botaoVisitante.addEventListener('click', async function () {
    botaoVisitante.disabled = true;

    try {
        const urlVisitante = `${URL_SCRIPT_LOGIN}?acao=visitante`;
        await fetch(urlVisitante);
    } catch (erro) {
    } finally {
        window.location.href = '../livro/livro.html';
    }
});