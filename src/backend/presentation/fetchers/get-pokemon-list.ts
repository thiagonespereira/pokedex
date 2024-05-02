import { GetPokemonListUseCase } from "@/backend/data/usecases";
import { PokemonRepository } from "../../infra/db/postgres";
import { GetPokemonListInput } from "@/backend/domain/input";

export async function getPokemonList({page = 1, perPage = 20}: GetPokemonListInput) {
  const pokemonRepository = new PokemonRepository();
  const useCase = new GetPokemonListUseCase(pokemonRepository);
  const pokemonList = await useCase.execute({page, perPage});
  return pokemonList;
}
