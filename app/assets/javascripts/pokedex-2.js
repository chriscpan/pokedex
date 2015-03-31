Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $li = $('<li class="toy-list-item"></li>');

  $li.data('id', toy.get('id'));
  $li.data('pokemon-id', toy.get('pokemon_id'));

  var info = ['name', 'happiness', 'price'];
  info.each.forEach(function(attr){
    $li.append(attr + ': ' + toy.get(attr) + '<br>');
  });

  this.pokeDetail.find('.toys').append($li);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $target = $(event.target);

  var toyId = $target.data('id');
  var pokemonId = $target.data('pokemon-id');

  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);

  this.renderToyDetail(toy);
};
