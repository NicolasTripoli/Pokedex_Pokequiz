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

// Requisição dos Pokemons
$.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=151',
    type: 'GET'
}).done(item => {
    item.results.forEach((element, i) => {
        $('#OpcoesPokemon').append('<option class="center" value="' + (i + 1) + '" name="OptionPokemon">' + (i + 1) + ' # ' + element.name + '</option>');
    });
    AtivarPokemon(1);
});
// -----------------------------------------------------------------------------

// Requisição de um pokemon expecifico
function AtivarPokemon(id) {

    $.ajax({

        url: 'https://pokeapi.co/api/v2/pokemon/' + id,
        type: 'GET'

    }).done(item => {

        // Adiciona o barulho que o pokemon faz
        $('#cry').attr('src', 'src/sounds/cry/' + id + '.wav')

        // Mostra o nome e o id do pokemon
        $('#namePokemon').text(item.id + ' # ' + item.name);

        // Adiciona as imagens do pokemon no carrocel
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

        // Pega os status e adiciona a tabela
        $('#Status').html('');
        item.stats.forEach(x => {
            $('#Status').append('<tr><td>' + x.stat.name + '</td><td>' + x.base_stat + '</td></tr>');
        });

        // Adiciona o tipo do pokemon,caso tenha só um aparece apenas 1 , caso tenha 3 apareceria os 3
        $('#Tipos').html('');
        item.types.forEach((x) => {
            $('#Tipos').append(
                '<div class="col-2" style="background-color: '+Type(x.type.name)+'">'
                    +'<h5>'+x.type.name+'</h5>' +
                '</div>')
        });

        // Caso o som esteja ativado ele da play no barulho do pokemon definido no inicio da função
        if (sound) {
            setTimeout(
                function () {
                    $('audio#cry')[0].play()
                }
            , 400);
        }

    });
}
// -----------------------------------------------------------------------------

// Seta o seletor como um select2 (biblioteca)
$(document).ready(() => {
    $('#OpcoesPokemon').select2();
});
// -----------------------------------------------------------------------------

// A cada alteração do pokemon no seletor ele chama o pokemon selecionado
$('#OpcoesPokemon').change(() => {
    let id = $('#OpcoesPokemon').val()
    AtivarPokemon(id);
});
// -----------------------------------------------------------------------------

// Função que pelo tipo do pokemon é trazido a cor do fundo da div tipo 
function Type(x) {
    switch (x) {
        case 'normal':
            return 'rgba(168, 168, 120, 0.52)';
        case 'water':
            return 'rgba(104, 144, 240, 0.52)';
        case 'electric':
            return 'rgba(248, 208, 48, 0.52)';
        case 'fighting':
            return 'rgba(192, 48, 40, 0.52)';
        case 'ground':
            return 'rgba(224, 192, 192, 0.52)';
        case 'psychic':
            return 'rgba(248, 88, 136, 0.52)';
        case 'rock':
            return 'rgba(184, 160, 56, 0.52)';
        case 'dark':
            return 'rgba(112, 88, 72, 0.52)';
        case 'steel':
            return 'rgba(184, 184, 208, 0.52)';
        case 'fire':
            return 'rgba(240, 128, 48, 0.52)';
        case 'grass':
            return 'rgba(120, 200, 80, 0.52)';
        case 'ice':
            return 'rgba(152, 216, 216, 0.52)';
        case 'poison':
            return 'rgba(160, 64, 160, 0.52)';
        case 'flying':
            return 'rgba(168, 144, 240, 0.52)';
        case 'bug':
            return 'rgba(168, 184, 32, 0.52)';
        case 'ghost':
            return 'rgba(112, 88, 152, 0.52)';
        case 'dragon':
            return 'rgba(112, 56, 248, 0.52)';
        case 'fairy':
            return 'rgba(240, 182, 188, 0.52)';
    }
}
// -----------------------------------------------------------------------------


// Passa pro documento pai, esta pagina se apresenta dento do index no iframe, que foi solicitado a troca e pagina para a quiz
$('#Quiz').on('click', () => {
    var pokequiz = new CustomEvent('Sinal', { detail: 'pokequiz' })
    window.parent.document.dispatchEvent(pokequiz)
})