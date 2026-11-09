$(document).ready(function() {
    
    var livroInicializado = false;

    // Função que fecha o vídeo e revela o livro interativo
    window.fecharAbertura = function() {
        var video = document.getElementById("videoAbertura");
        if (video) {
            video.pause();
        }

        // Esconde a camada de vídeo
        $("#overlay-abertura").fadeOut(400, function() {
            $(this).remove(); // Remove o elemento do DOM para liberar memória
        });

        // Mostra o livro com uma transição suave
        $("#secao-livro").css("opacity", "1");

        // Inicializa o Turn.js apenas após o vídeo sumir (evita bugs de renderização)
        if (!livroInicializado) {
            $("#livro-interativo").turn({
                width: 900,
                height: 600,
                autoCenter: true,
                gradients: true,
                display: 'double',
                elevation: 50,
                page: 2,
                when: {
                    turning: function(evento, paginaDestino, visualizacao) {
                        // Impede o usuário de passar da primeira capa ou da última contracapa
                        if (paginaDestino === 1 || paginaDestino >= 8) {
                            evento.preventDefault();
                        }
                    }
                }
            });
            livroInicializado = true;
        }
    };

    // Monitora o fim do vídeo de abertura para passar direto ao livro
    var videoElement = document.getElementById("videoAbertura");
    if (videoElement) {
        videoElement.onended = function() {
            fecharAbertura();
        };

        // Tratamento para políticas de autoplay do navegador (caso bloqueie o som, inicia mutado ou aguarda clique)
        videoElement.play().catch(error => {
            console.log("Autoplay bloqueado pelo navegador. O usuário precisa interagir.", error);
        });
    }

    // botões laterais de navegação do livro
    $("#botao-anterior").click(function() {
        if(livroInicializado) $("#livro-interativo").turn("previous");
    });

    $("#botao-proximo").click(function() {
        if(livroInicializado) $("#livro-interativo").turn("next");
    });

    // passar página pelo teclado
    $(document).keydown(function(eventoDeTecla) {
        if (!livroInicializado) return;
        if (eventoDeTecla.keyCode == 37) { 
            $("#livro-interativo").turn("previous");
        } else if (eventoDeTecla.keyCode == 39) { 
            $("#livro-interativo").turn("next");
        }
    });

    // Efeito de quando entra no portal (da última página do livro para o mapa)
    $(document).on("click", "#botao-entrar-portal, .imagem-portal", function(evento) {
        evento.stopPropagation();
        
        $(this).css("pointer-events", "none");
        $("#botao-entrar-portal, .conteudo h2").fadeOut(300);

        var portalOriginal = $(".imagem-portal");
        var posicaoPortal = portalOriginal.offset();
        
        var portalClone = portalOriginal.clone();
        
        portalClone.css({
            "position": "absolute",
            "top": posicaoPortal.top + "px",
            "left": posicaoPortal.left + "px",
            "width": portalOriginal.width() + "px",
            "height": portalOriginal.height() + "px",
            "z-index": "99999",
            "margin": "0" 
        });

        $("body").append(portalClone);
        portalOriginal.css("visibility", "hidden");

        setTimeout(function() {
            portalClone.addClass("portal-zoom-entrada");
            
            $("#livro-interativo").css({
                "transition": "opacity 1.2s ease",
                "opacity": "0"
            });
            
            $("body").css({
                "transition": "background-color 1.5s ease",
                "background-color": "#000"
            });
        }, 50);

        // Redireciona para o mapa depois do efeito do portal
        setTimeout(function() {
            window.location.href = "../mapa/mapa.html"; 
        }, 1500); 
    });
});