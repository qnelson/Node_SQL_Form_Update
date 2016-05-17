$(document).ready(function () {
  getMovies();

  // add a movie
  $('#movieSubmit').on('click', postMovie);
});

function getMovies() {
  $.ajax({
    type: 'GET',
    url: '/movies',
    success: function (movies) {
      console.log(movies);
      movies.forEach(function (movie) {
        $('#movieList').append('<div>' + '<br>' + movie.title + '</br>' +
          '<br>' + movie.year + '</br>' +
          '<br>' + movie.genre + '</br>' +
          '<br>' + movie.director + '</br>' +
          '<br>' + movie.main_actor + '</br>' +
          '<br>' + 'Favorite? ' + movie.favorite + '</br>' +
      '</div>');
      });
    },
  });


}

function postMovie() {
  event.preventDefault();

  var movie = {};

  $.each($('#movieForm').serializeArray(), function (i, field) {
    movie[field.name] = field.value;
    if (movie.favorite == null) {
      movie.favorite = false
    }
  });

  $.ajax({
    type: 'POST',
    url: '/movies',
    data: movie,
    success: function (data) {
      getMovies();
      console.log('Successful post!');
    },
  });
}
