Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    'submit form': 'savePokemon'
  },

  render: function () {
    var content = JST['pokemonForm']()
    this.$el.html(content);
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();
    var that = this;
    var info = $(event.currentTarget).serializeJSON();
    this.model.save(info.pokemon, { success: function () {
      that.collection.add(that.model);
      Backbone.history.navigate('pokemon/' + that.model.id, {trigger: true});
    }});
  }
});
