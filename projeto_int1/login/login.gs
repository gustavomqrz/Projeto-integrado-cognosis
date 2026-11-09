var NOME_ABA_AUTORIZADOS = 'Alunos';
var NOME_ABA_LOGINS = 'Acessos';

function doGet(e) {
  var acao = e.parameter.acao;

  if (acao === 'login') {
    return processarLogin(e.parameter.matricula);
  }

  if (acao === 'visitante') {
    return processarVisitante();
  }

function processarLogin(matriculaBruta) {
  var matricula = (matriculaBruta || '').toString().trim();

  if (!matricula) {
    return respostaJson({ sucesso: false, mensagem: 'Matrícula não informada.' });
  }

  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var abaAutorizados = planilha.getSheetByName(NOME_ABA_AUTORIZADOS);
  var abaLogins = planilha.getSheetByName(NOME_ABA_LOGINS);

  if (!abaAutorizados || !abaLogins) {
    return respostaJson({
      sucesso: false,
      mensagem: 'Configuração da planilha incorreta (abas "Alunos"/"Acessos" não encontradas).'
    });
  }

  var alunos = obterAlunosAutorizados(abaAutorizados);
  var alunoEncontrado = alunos.filter(function (aluno) {
    return aluno.matricula === matricula;
  })[0];

  if (alunoEncontrado) {
    registrarAcesso(abaLogins, alunoEncontrado.nome, alunoEncontrado.matricula, 'Aluno');
  }

  return respostaJson({
    sucesso: !!alunoEncontrado,
    mensagem: alunoEncontrado
      ? 'Login autorizado.'
      : 'Matrícula não encontrada. Verifique com o professor.'
  });
}

function processarVisitante() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var abaLogins = planilha.getSheetByName(NOME_ABA_LOGINS);

  if (!abaLogins) {
    return respostaJson({
      sucesso: false,
      mensagem: 'Configuração da planilha incorreta (aba "Acessos" não encontrada).'
    });
  }

  registrarAcesso(abaLogins, '-', '-', 'Visitante');

  return respostaJson({ sucesso: true, mensagem: 'Acesso de visitante registrado.' });
}

function obterAlunosAutorizados(abaAutorizados) {
  var ultimaLinha = abaAutorizados.getLastRow();
  if (ultimaLinha < 2) {
    return [];
  }

  return abaAutorizados
    .getRange(2, 1, ultimaLinha - 1, 2) // colunas A (matrícula) e B (nome)
    .getValues()
    .map(function (linha) {
      return {
        matricula: linha[0].toString().trim(),
        nome: linha[1].toString().trim()
      };
    })
    .filter(function (aluno) {
      return aluno.matricula !== '';
    });
}

function registrarAcesso(abaLogins, nome, matricula, tipo) {
  var agora = new Date();
  var fusoHorario = Session.getScriptTimeZone();
  var data = Utilities.formatDate(agora, fusoHorario, 'dd/MM/yyyy');
  var horario = Utilities.formatDate(agora, fusoHorario, 'HH:mm:ss');

  abaLogins.appendRow([nome, matricula, tipo, data, horario]);
}

function respostaJson(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
}