Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    'click li.poke-list-item': 'selectPokemonFromList'
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, 'add sync', this.refreshPokemon.bind(this));
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    var that = this;
    this.collection.fetch({
      success: function(){
        that.render();
        options.callback && options.callback();
      }
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(poke){
      this.addPokemonToList(poke);
    }.bind(this));
  },

  selectPokemonFromList: function (event) {
    var pokemonId = $(event.currentTarget).data('id');
    Backbone.history.navigate(('pokemon/' + pokemonId), {trigger: true});
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    'click .toys li': 'selectToyFromList'
  },

  refreshPokemon: function (options) {
    var that = this;
    this.model.fetch({
      success: function(){
        that.render();
        options.callback && options.callback();
      }
    });
  },

  render: function () {
    var content = JST['pokemonDetail']({pokemon: this.model});
    this.$el.html(content);
    var $ul = this.$el.find("ul.toys");
    this.model.toys().each(function(toy){
      var content = JST['toyListItem']({toy: toy});
      $ul.append(content);
    })
    return this;
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('id');
    var toy = this.model.toys().get(toyId);
    var pokemon = toy.pokemon();
    var pokemonId = pokemon.id;
    Backbone.history.navigate('pokemon/' + pokemonId + '/toys/' + toyId, {trigger: true});
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST["toyDetail"]({toy: this.model, pokes: _([])})
    this.$el.html(content);
    return this;
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
