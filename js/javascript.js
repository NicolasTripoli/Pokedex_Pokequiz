let x = 'pokedex';
let grau = 0;

// Quando a tela é alterado o tamanho o altera o tamanho do iframe
$(window).resize(() => {
  $('#Tela2').width($('#Tela').width());
  $('#Tela2').height($('#Tela').height());
});

// Quando Clicado na pokebola faz as requisições e animações
$("#PokemonImg").on('click', () => {
    Animacoes(x,360);
});

// Recebe evento de dentro do iframe e executa as funções de troca de site
window.document.addEventListener('Sinal', PokeQuiz,false)
function PokeQuiz(e) {
  x = e.detail;
  $('#Tela2').fadeOut(() => {
    $('#Tela2').attr('src', '');
    $('#PokedexA').animate({ "right": '' });
    $('#PokedexB').animate({ "left": '' });
    $('#Tela').animate({ 'width': '50vw' }, () => {
      $('#PokemonImg').fadeIn();     
      Animacoes(x,360);
    });
  });
}

// Executa as Animações e define a page do iframe
function Animacoes(x,y){
  $('audio#init')[0].play();
  grau += y;
  setTimeout(
    function () {
      $('#PokemonImg').animate(
        { deg: grau },
        {
          duration: 500,
          step: function (now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          },
          complete: function () {
            $('#PokedexA').animate({ "right": '3vw' });
            $('#PokedexB').animate({ "left": '3vw' });
            $('#Tela').animate({ 'width': '67vw' }, () => {
              $('#PokemonImg').fadeOut(() => {
                $('#Tela2').width($('#Tela').width());
                $('#Tela2').height($('#Tela').height());
                $('#Tela2').attr('src', ''+x+'.html');
                $('#Tela2').fadeIn();
              })
            });
          }
        }
      )
    }, 300);
}