import React, { useEffect, useState } from "react";
import { Icon } from "../../components/elements/icon";
import { Input } from "../../components/elements/input";
import { FixedSizeGrid as Grid } from "react-window";
import { Liked } from "./components/liked/liked";
import { useStore } from "../../store";
import Typography from "../../components/elements/typography";
import { PADDING } from "../../components/layout";
import styles from "./styles.module.scss";
import { GUTTER_SIZE } from "./constants";
import { Cell } from "./components/cell";
import { useSuperheroes } from "../../services/superheroes";

// TODO: Change heart icon to filled if it's on the favorites list
// TODO: If rendering, show a skeleton component instead

export interface ISuperhero {
  id: number;
  image: string;
  name: string;
  fullName: string;
  score: string;
}

const COLUMN_WIDTH = 285;
const CARD_HEIGHT = 184;

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

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const calculateColumns = (width: number, minCardWidth: number) => {
    const columns = Math.floor(width / minCardWidth);
    return columns < 1 ? 1 : columns;
  };

  const linearIndex = (rowIndex: number, columnIndex: number) => {
    if (!columnCount) {
      return;
    }
    return rowIndex * columnCount + columnIndex;
  };

  return (
    <>
      <Liked superheroes={superheroes} />
      <div style={{ marginTop: "50px" }} />
      <div className={styles.superheroes}>
        <div className={styles.bar}>
          <Typography tag="h1">All superheroes</Typography>
          <div
            style={{
              width: "371px",
            }}
          >
            <Input
              placeholder="Search"
              onChange={handleSearch}
              value={searchQuery}
              prefix={<Icon name="search" />}
              suffix={<Icon name="cancel" onClick={clearSearch} />}
            />
          </div>
        </div>
        <div style={{ marginTop: "34px" }} />
        {rowCount !== undefined && columnCount !== undefined && (
          <Grid
            columnCount={columnCount}
            columnWidth={COLUMN_WIDTH}
            rowCount={rowCount}
            rowHeight={CARD_HEIGHT}
            height={windowHeight * (3 / 5)}
            width={columnCount * (COLUMN_WIDTH + GUTTER_SIZE)}
            itemData={{
              superheroes: filteredSuperheroes,
              linearIndex,
            }}
          >
            {Cell}
          </Grid>
        )}
      </div>
    </>
  );
};
