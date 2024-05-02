import { GetPokemonListInput } from "@/backend/domain/input";
import { Pokemon } from "../../domain/models";

export interface IPokemonRepository {
  getPokemonList({
    page,
    perPage,
  }: GetPokemonListInput): Promise<Pokemon[] | []>;
  createPokemon(pokemon: Pokemon): Promise<Pokemon>;
}
