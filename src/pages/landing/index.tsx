import { useEffect, useState } from "react";
import { Liked } from "./components/liked/liked";
import { useStore } from "../../store";
import { PADDING } from "../../components/layout";
import { useSuperheroes } from "../../services/superheroes";
import { Superheroes } from "./components/superheroes";

// TODO: If rendering, show a skeleton component instead

export interface ISuperhero {
  id: number;
  image: string;
  name: string;
  fullName: string;
  score: string;
}

const COLUMN_WIDTH = 285;

export const LandingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [columnCount, setColumnCount] = useState<number>();
  const [rowCount, setRowCount] = useState<number>();
  const [favoritesIds] = useStore((state) => [state.favoritesIds]);

  const [searchQuery, setSearchQuery] = useState("");
  const [superheroes, setSuperheroes] = useState<ISuperhero[]>([]);
  const [filteredSuperheroes, setFilteredSuperheroes] = useState<ISuperhero[]>(
    []
  );

  const { superherores: rawSuperheroes, isLoading } = useSuperheroes();

  const windowHeight = window.innerHeight;

  useEffect(() => {
    if (isLoading || !rawSuperheroes) {
      return;
    }
    const parsedSuperheroes = rawSuperheroes.map((superhero) => ({
      id: superhero.id,
      image: superhero.images.sm,
      name: superhero.name,
      fullName: superhero.biography.fullName,
      score: (
        Object.values(superhero.powerstats).reduce(
          (acc, value) => acc + value
        ) /
        (Object.keys(superhero.powerstats).length * 10)
      ).toFixed(1),
    }));

    setSuperheroes(parsedSuperheroes);
  }, [isLoading, rawSuperheroes]);

  useEffect(() => {
    const filtered = superheroes.filter((superhero) => {
      const { id, name, fullName } = superhero;
      const normalizedQuery = searchQuery.toLowerCase();
      return (
        !favoritesIds.includes(id) &&
        (name.toLowerCase().includes(normalizedQuery) ||
          fullName.toLowerCase().includes(normalizedQuery))
      );
    });
    setFilteredSuperheroes(filtered);
  }, [superheroes, favoritesIds, searchQuery]);

  useEffect(() => {
    const columnCount = calculateColumns(
      windowWidth - PADDING * 2,
      COLUMN_WIDTH
    );
    const rowCount = Math.ceil(filteredSuperheroes.length / columnCount);
    setColumnCount(columnCount);
    setRowCount(rowCount);
  }, [columnCount, windowWidth, filteredSuperheroes]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const calculateColumns = (width: number, minCardWidth: number) => {
    const columns = Math.floor(width / minCardWidth);
    return columns < 1 ? 1 : columns;
  };

  return (
    <>
      <Liked superheroes={superheroes} isLoading={isLoading} />
      <div style={{ marginTop: "50px" }} />
      <Superheroes
        columnCount={columnCount}
        rowCount={rowCount}
        windowHeight={windowHeight}
        superheroes={filteredSuperheroes}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        isLoading={isLoading}
      />
    </>
  );
};
