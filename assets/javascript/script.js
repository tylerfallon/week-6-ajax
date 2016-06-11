$(document).ready(function(){
  
  var noMove = [];
  var move = [];
  var movies = [];

  $('#addMovie').click(function(){
      var buttonAdd = $('#userInput').val();
      $ ('#userInput').val(null);
      movies.push(buttonAdd);
      makeGif();
  });

  function makeGif() {
    $('#buttonList').empty();
    for (var x=0; x<movies.length; x++){
          var makeButton = $('<button>');
          makeButton.text(movies[x]);
          makeButton.addClass('btn btn-primary clickGif');
          makeButton.attr('data-name', movies[x]);
          $('#buttonList').append(makeButton);
    };
    $('.clickGif').click(function() {
      move = [];
      noMove = [];
      $('#gifs').empty();
      var info = $(this).attr('data-name');
      var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + info + '&api_key=dc6zaTOxFJmzC&limit=10';

      $.ajax({url: queryUrl, method:'GET'})
      .done(function(gif){

				for (var x=0; x<10; x++){
          move.push(gif.data[x].images.original.url);
          noMove.push(gif.data[x].images.original_still.url);
          var newImg = $('<div>');
          newImg.addClass('gifDiv');
          var rating = $('<p>');
          rating.text(gif.data[x].rating);

          var newGif = $('<img>');
          	newGif.attr('src', gif.data[x].images.original.url);
          	newGif.attr('data-num', x);
          	newGif.attr('data-play', true);
          	newGif.addClass('moveToggle');
          newImg.append(rating);
          newImg.append(newGif);
          $('#gifs').append(newImg);
         	};

          $(document).on('click', '.moveToggle', function(){
            if ($(this).attr('data-play') == 'false'){
              $(this).attr('data-play', "true");
              $(this).attr('src', move[$(this).attr('data-num')]);
            } 
            else{
              $(this).attr('data-play', 'false');
              $(this).attr('src', noMove[$(this).attr('data-num')]);
           }
         })
      });
    });
  };
});
