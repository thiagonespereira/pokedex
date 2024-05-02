import { Pokemon } from "../../domain/models";
import { IPokemonRepository } from "../protocols";
import { IGetPokemonListUseCase } from "../../domain/usecases";
import { GetPokemonListInput } from "@/backend/domain/input";

export class GetPokemonListUseCase implements IGetPokemonListUseCase {
  private readonly pokemonRepository: IPokemonRepository;
  constructor(repository: IPokemonRepository) {
    this.pokemonRepository = repository;
  }

  async execute({ page, perPage }: GetPokemonListInput) {
    let list = await this.pokemonRepository.getPokemonList({ page, perPage });

    if (list?.length === 0) {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const newList = await res.json();

      const pokemons = [];

      for (let i = 0; i < newList.results.length; i++) {
        const result = newList.results[i];
        const pokeindex = result.url.split("/")[6];
        const res2 = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species/" + pokeindex
        );
        const pokemonSpecie = await res2.json();

        const description = pokemonSpecie.flavor_text_entries
          .find((flavor: any) => flavor.language.name === "en")
          .flavor_text.replace(/[\n\f]/g, " ");
        const name = pokemonSpecie.name;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeindex}.svg`;
        const types = pokemonSpecie.egg_groups.map((type: any) => type.name);

        const newPokemon: Pokemon = {
          id: parseInt(pokeindex),
          pokeindex: parseInt(pokeindex),
          name: name,
          image: image,
          description: description,
          type: types,
        };

        const returnedNewPokemon = await this.pokemonRepository.createPokemon(
          newPokemon
        );

        pokemons.push(returnedNewPokemon);
      }

      list = pokemons.slice((page - 1) * perPage, page * perPage);
    }

    return list;
  }
}
