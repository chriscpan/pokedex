json.extract! pokemon, :id, :attack, :defense, :image_url, :moves, :name, :poke_type

# json.toys pokemon.toys, partial: 'toys/toy', as: :toy


if display_toys
  json.toys pokemon.toys, partial: 'toys/toy', as: :toy
end
