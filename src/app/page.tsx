import Image from "next/image";
import styles from "./page.module.css";
import { getPokemonList } from "../backend/presentation/fetchers";
import PokemonLogo from "../assets/pokemon_logo.png";

const POKEMON_PER_PAGE = 20;

const renderPagination = () => {
  const pageNumbers = [];
  pageNumbers.push(<a href="/">First</a>);
  for (let i = 1; i <= 160 / POKEMON_PER_PAGE; i++) {
    pageNumbers.push(<a href={`/?p=${i}`}>{i}</a>);
  }
  pageNumbers.push(<a href="/?p=8">Last</a>);
  return pageNumbers;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageNumber = parseInt(searchParams["p"] ? searchParams["p"][0] : "1");

  const data = await getPokemonList({
    page: pageNumber,
    perPage: POKEMON_PER_PAGE,
  });

  return (
    <main className={styles.container}>
      <Image src={PokemonLogo} alt="Pokemon" className={styles.logo} />
      <div className={styles.main}>
        {data.map((pokemon) => (
          <div key={pokemon.id} className={styles.card}>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <h2>{pokemon.name}</h2>
            <p>{pokemon.description}</p>
            <h3>Types:</h3>
            <ul>
              {pokemon.type.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>{renderPagination()}</div>

      {/* {JSON.stringify(data)} */}
    </main>
  );
}
