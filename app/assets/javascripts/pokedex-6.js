Pokedex.Router = Backbone.Router.extend({
  routes: {
    '': 'pokemonIndex',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail',
    'pokemon/:id': 'pokemonDetail'
  },
  // callback
  pokemonDetail: function (id, callback) {
    if(!this._pokemonIndex) {
      this.pokemonIndex(function(){
        this.pokemonDetail(id, callback);
      }.bind(this));
      return;
    }
    var pokemon = this._pokemonIndex.collection.get(id);
    this._pokemonDetail = new Pokedex.Views.PokemonDetail({model: pokemon});
    $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
    this._pokemonDetail.refreshPokemon({callback: callback});
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon({callback: callback});
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
    if(!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, (function (){
        this.toyDetail(pokemonId, toyId);
      }.bind(this)));
      return;
    }
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({model: toy});
    $("#pokedex .toy-detail").html(toyDetail.$el);
    // debugger
    toyDetail.render();
  },

  pokemonForm: function () {
    var model = new Pokedex.Models.Pokemon();
    var pokemonForm = new Pokedex.Views.PokemonForm({model: model, collection: this._pokemonIndex.collection});
    pokemonForm.render();
    $('#pokedex .pokemon-form').html(pokemonForm.$el);
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
