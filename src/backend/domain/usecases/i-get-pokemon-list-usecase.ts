import { GetPokemonListInput } from "../input";
import { Pokemon } from "../models";

export interface IGetPokemonListUseCase {
  execute({
    page,
    perPage,
  }: GetPokemonListInput): Promise<IGetPokemonListUseCase.Result | undefined>;
}

export namespace IGetPokemonListUseCase {
  export type Result = Pokemon[];
}
