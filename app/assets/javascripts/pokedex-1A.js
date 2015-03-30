Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var id = pokemon.get('id');
  var $li = $("<li data-id=" + id + "></li>");
  $li.addClass('poke-list-item');
  var name = pokemon.get('name');
  var type = pokemon.get('poke_type');
  $li.text(name + ': ' + type);
  this.$pokeList.append($li);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  var rootView = this;
  this.pokes.fetch({
    success: function(){
      rootView.pokes.each(function(pokemon){
        window.Pokedex.rootView.addPokemonToList(pokemon);
      });
    }
  });
};
