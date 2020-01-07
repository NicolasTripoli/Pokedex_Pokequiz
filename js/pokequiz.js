// Esconde a parte dos resultados
$('#Resultados').hide();

// Coloca a musica em loop e faz a vefificação dos botoes mute

let sound = true;

$('audio#music')[0].play();

document.getElementById("music").loop = true;;

$('#Volume').on('click', () => {
    if (sound) {
        sound = false;
        $('#Volume').attr('src', 'src/svg/volume-mute.svg');
        $('audio#music')[0].pause()
    } else {
        sound = true;
        $('#Volume').attr('src', 'src/svg/volume-up.svg')
        $('audio#music')[0].play()
    }
});
// -----------------------------------------------------------------------------

// Passa pro documento pai, esta pagina se apresenta dento do index no iframe, que foi solicitado a troca e pagina para a pokedex
$('#Pokedex').on('click', () => {
    var pokequiz = new CustomEvent('Sinal', { detail: 'pokedex' })
    window.parent.document.dispatchEvent(pokequiz)
})
// -----------------------------------------------------------------------------

// Ao click do botão normal game
$('#normal').on('click', () => {
    $('#normal').attr('disabled', 'disabled');
    pokemons = [];
    inf = false;
    pokeSelection(10, 151);
    $('#menu').fadeOut();
    setTimeout(function(){$('#Quiz').fadeIn()}, 1000);
});
// -----------------------------------------------------------------------------

// Ao clicar ativa o modo game 300
$('#infinity').on('click', () => {
    $('#normal').attr('disabled', 'disabled');
    pokemons = [];
    inf = true;
    pokeSelection(300, 650);
    $('#menu').fadeOut();
    setTimeout(function(){$('#Quiz').fadeIn()}, 1000);
    
});
// -----------------------------------------------------------------------------

// Cria a variavel com os IDs dos pokemons de forma randomica
let pokemons = [];
let question = [];
let rodada = 0;
let pontuacao = 0;
let inf = false;

function pokeSelection(quant, geracao) {

    let poke;
    let respostas = [];
    pokemons = [];
    question = [];
    for (let y = 0; y < quant; y++) {

        respostas = [];

        for (let i = 0; i < 4; i++) {
            poke = Math.floor((Math.random() * geracao) + 1);
            while (pokemons.indexOf(poke) >= 0 || respostas.indexOf(poke) >= 0) {
                poke = Math.floor((Math.random() * geracao) + 1);
            }
            respostas.push(poke);
        }

        respostas.push(respostas[Math.floor((Math.random() * (4 - 0)) + 0)])

        question.push({
            opcao1: respostas[0],
            opcao2: respostas[1],
            opcao3: respostas[2],
            opcao4: respostas[3],
            resposta: respostas[4]
        })

        pokemons.push(respostas[4]);
    }

    recebePokemon();
}
// -----------------------------------------------------------------------------
// Requisições dos pokemons e apresentação deles
function recebePokemon() {

    $('#Perguntas').fadeOut();
    setTimeout(
        function () {

            $('#respostas').html('');

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + question[rodada].opcao1,
                type: 'GET'
            }).done(item => {
                $('#respostas').append('<button type="button" id="' + item.id + '" class="btn btn-primary btn-lg resp" style="background-color:' + Type(item.types[(item.types.length - 1)].type.name) + '">' +
                    '<h4 class="col">' + item.species.name + '</h4>'
                    + '</button>');
            });

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + question[rodada].opcao2,
                type: 'GET'
            }).done(item => {
                $('#respostas').append('<button type="button" id="' + item.id + '" class="btn btn-primary btn-lg resp" style="background-color:' + Type(item.types[(item.types.length - 1)].type.name) + '">' +
                    '<h4 class="col">' + item.species.name + '</h4>'
                    + '</button>');
            });

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + question[rodada].opcao3,
                type: 'GET'
            }).done(item => {
                $('#respostas').append('<button type="button" id="' + item.id + '" class="btn btn-primary btn-lg resp" style="background-color:' + Type(item.types[(item.types.length - 1)].type.name) + '">' +
                    '<h4 class="col">' + item.species.name + '</h4>'
                    + '</button>');
            });

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + question[rodada].opcao4,
                type: 'GET'
            }).done(item => {
                $('#respostas').append('<button type="button" id="' + item.id + '" class="btn btn-primary btn-lg resp"  style="background-color:' + Type(item.types[(item.types.length - 1)].type.name) + '">' +
                    '<h4 class="col">' + item.species.name + '</h4>'
                    + '</button>');
            });

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + question[rodada].resposta,
                type: 'GET'
            }).done(item => {
                $('#ImgPoke').html(
                    '<div class="carousel-item active">' +
                    '<img class="d-block" src="' + item.sprites.front_default + '" alt="First slide">' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<img class="d-block" src="' + item.sprites.back_default + '" alt="Second slide">' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<img class="d-block" src="' + item.sprites.front_shiny + '" alt="Third slide">' +
                    '</div>' +
                    '<div class="carousel-item">' +
                    '<img class="d-block" src="' + item.sprites.back_shiny + '" alt="Third slide">' +
                    '</div>'
                )

                $('#Perguntas').fadeIn();
                $('button.resp').attr('disabled', null);
            });

            if (!inf) {
                $('#rodada').text((rodada + 1) + '/10')
            } else {
                $('#rodada').text((rodada + 1) + '°')
            }
        }
        , 2000);
        
}
// -----------------------------------------------------------------------------
// Escolha da opção de resposta
$(document).on('click', "button.resp", function () {
    let x = $(this).attr('id');
    $('.resp').attr('disabled', 'disabled')

    if (x == pokemons[rodada]) {
        $('.resp').css({ 'border': '5px solid red', 'background-color': 'rgba(228,41,41,0.8)' });

        $(this).css({ 'border': '5px solid green', 'opacity': '1', 'background-color': 'rgba(78,219,81,0.8)' });

        let miniatura = $('.carousel-item').children().first().attr('src');

        pontuacao += 100;

        Swal.fire({
            position: 'center',
            type: 'success',
            showConfirmButton: false,
            timer: 1000,
            background: 'rgba(0,0,0,0)'
        })

        $('#Miniaturas').append('<img src="' + miniatura + '" alt="Miniatura de um pokemon acertado" width="60px" height="60px" class="certo">')

    } else {
        $('.resp').css({ 'border': '5px solid red', 'background-color': 'rgba(228,41,41,0.8)' });

        $('#' + pokemons[rodada] + '').css({ 'border': '5px solid green', 'opacity': '1', 'background-color': 'rgba(78,219,81,0.8)' });

        $(this).css({'opacity': '1'});

        let miniatura = $('.carousel-item').children().first().attr('src');

        Swal.fire({
            type: 'error',
            position: 'center',
            showConfirmButton: false,
            timer: 1000,
            background: 'rgba(0,0,0,0)'
        })

        $('#Miniaturas').append('<img src="' + miniatura + '" alt="Miniatura de um pokemon acertado" width="60px" height="60px" class="errado">')
    }
    if (rodada == 299 && inf) {
        setTimeout(
            function () {
                Finalizar();
            }
            , 2000);
    } else {
        if (!(x == pokemons[rodada]) && inf) {
            setTimeout(
                function () {
                    Finalizar();
                }
                , 2000);
        } else {
            if (inf) {
                rodada++;
                setTimeout(
                    function () {
                        recebePokemon();
                    }
                    , 2000);
            } else {
                setTimeout(
                    function () {
                        rodada++;
                        if (rodada != 10) {
                            recebePokemon();
                        } else {
                            Finalizar();
                        }
                    }
                    , 2000);
            }
        }
    }
});
// -----------------------------------------------------------------------------
// Finaliza o jogo e mostra a tela de pontuação
function Finalizar() {
    $('#normal').attr('disabled', null);

    $('#Perguntas').hide();

    $('#Resultados').show();

    $('#Pontuacao').attr('style',null)

    $('#Pontuacao').text(pontuacao)

    if (rodada == 299) {
        $('#Pontuacao').css({'font-size':'4em','margin':'20px'})
        $('#Pontuacao').text('+8000 Você é um mestre pokemon')
    }

}
// -----------------------------------------------------------------------------
// Botão que roda o game novamente
$('#JogarNovo').on('click', () => {
    rodada = 0;
    pontuacao = 0;
    $('#Miniaturas').html('');
    $('#Resultados').fadeOut();
    if (inf) {
        pokeSelection(300, 650);
    } else {
        pokeSelection(10, 151);
    }
})
// -----------------------------------------------------------------------------
// Esconde o quiz e abre novamente o menu
function Menu() {
    rodada = 0;
    pontuacao = 0;
    $('#Miniaturas').html('');
    $('#Quiz').fadeOut();
    $('#menu').fadeIn();
    $('#Resultados').hide();
}
// -----------------------------------------------------------------------------
// Função que pelo tipo do pokemon devolve a cor do fundo da div 
function Type(x) {
    switch (x) {
        case 'normal':
            return 'rgba(168, 168, 120, 1)';
        case 'water':
            return 'rgba(104, 144, 240, 1)';
        case 'electric':
            return 'rgba(248, 208, 48, 1)';
        case 'fighting':
            return 'rgba(192, 48, 40, 1)';
        case 'ground':
            return 'rgba(224, 192, 192, 1)';
        case 'psychic':
            return 'rgba(248, 88, 136, 1)';
        case 'rock':
            return 'rgba(184, 160, 56, 1)';
        case 'dark':
            return 'rgba(112, 88, 72, 1)';
        case 'steel':
            return 'rgba(184, 184, 208, 1)';
        case 'fire':
            return 'rgba(240, 128, 48, 1)';
        case 'grass':
            return 'rgba(120, 200, 80, 1)';
        case 'ice':
            return 'rgba(152, 216, 216, 1)';
        case 'poison':
            return 'rgba(160, 64, 160, 1)';
        case 'flying':
            return 'rgba(168, 144, 240, 1)';
        case 'bug':
            return 'rgba(168, 184, 32, 1)';
        case 'ghost':
            return 'rgba(112, 88, 152, 1)';
        case 'dragon':
            return 'rgba(112, 56, 248, 1)';
        case 'fairy':
            return 'rgba(240, 182, 188, 1)';
    }
}
// -----------------------------------------------------------------------------
