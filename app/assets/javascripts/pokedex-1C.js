Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var pokemon = new Pokedex.Models.Pokemon(attrs);
  // for (var attr in attrs) {
  //   pokemon.set(attr, attrs[attr]);
  // }
  debugger;
  // return pokemon;
  pokemon.save({}, {
    success: function(){
      this.addPokemonToList(pokemon);
      callback(pokemon);
      // this.pokes.append(pokemon);
    }.bind(this)
  });

};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var $target = $(event.currentTarget);
  var data = $target.serializeJSON();
  this.createPokemon(data, this.renderPokemonDetail.bind(this));
};
