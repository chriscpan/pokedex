Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $div = $('<div></div>');
  $div.addClass('detail');
  var id = pokemon.get('id');
  $div.append('<img src="' + pokemon.escape('image_url') + '">');
  for (var attr in pokemon.attributes) {
    if (attr !== 'image_url') {
      $div.append(attr + ': ' + pokemon.get(attr) + '<br>');
    }
  }
  this.$pokeDetail.html($div)
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var selectedPokemon = event.currentTarget;
  var datapoke = $(selectedPokemon).data('id');
  // thing.data('key') => value
  // <thing data-key="value"></thing>
  var pokemonstar = _.where(this.pokes.models, {id: parseInt(datapoke)});
  pokemonstar = pokemonstar[0];
  this.renderPokemonDetail(pokemonstar);

};
