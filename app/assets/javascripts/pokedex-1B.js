Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $div = $('<div></div>');
  $div.addClass('detail');
  var id = pokemon.get('id');
  var
  $div.append('<img src="' + pokemon.escape('image_url') + '">');
  for (var attr in pokemon.attributes) {
    if (attr !== 'image_url') {
      $div.append(attr + ': ' + pokemon.get(attr) + '<br>');
    }
  }
  this.$pokeDetail.html($div);

  // this.$pokeDetail.append(
  //
  // )

  var $toys = $('<ul class="toys"></ul>');
  $div.append($toys);
  pokemon.fetch({
    success: (function() {
      this.renderToysList(pokemon.toys());
    }).bind(this)
  });
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var selectedPokemon = event.currentTarget;
  var id = $(selectedPokemon).data('id');
  // thing.data('key') => value
  // <thing data-key="value"></thing>
  var pokemonstar = this.pokes.get(id);
  pokemonstar.fetch({
    success: this.renderPokemonDetail.bind(this)
  });
};
