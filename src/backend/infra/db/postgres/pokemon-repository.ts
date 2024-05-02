import { PrismaClient } from "@prisma/client";
import { getClient } from "./prisma-client-generator";
import { IPokemonRepository } from "../../../data/protocols";
import { Pokemon } from "../../../domain/models";
import { GetPokemonListInput } from "@/backend/domain/input";

export class PokemonRepository implements IPokemonRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getClient();
  }

  async getPokemonList({
    page,
    perPage,
  }: GetPokemonListInput): Promise<Pokemon[] | []> {
    const res = await this.prisma.pokemon.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    if (res === null || res === undefined) {
      return [];
    }

    return res.map((pokemon) => ({
      id: pokemon.id,
      pokeindex: pokemon.pokeindex,
      name: pokemon.name,
      image: pokemon.image,
      description: pokemon.description,
      type: pokemon.types,
    }));
  }

  async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const res = await this.prisma.pokemon.upsert({
      where: {
        id: pokemon.id,
      },
      create: {
        id: pokemon.id,
        pokeindex: pokemon.pokeindex,
        name: pokemon.name,
        image: pokemon.image,
        description: pokemon.description,
        types: pokemon.type,
      },
      update: {
        id: pokemon.id,
        pokeindex: pokemon.pokeindex,
        name: pokemon.name,
        image: pokemon.image,
        description: pokemon.description,
        types: pokemon.type,
      },
    });

    return {
      id: res.id,
      pokeindex: res.pokeindex,
      name: res.name,
      image: res.image,
      description: res.description,
      type: res.types,
    };
  }
}
