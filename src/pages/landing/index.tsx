import React, { useEffect, useState } from "react";
import { Icon } from "../../components/elements/icon";
import { Input } from "../../components/elements/input";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { Card } from "../../components/fragments/card";
import { Liked } from "./components/liked/liked";
import { useStore } from "../../store";
import Typography from "../../components/elements/typography";

const rawSuperheroes = [
  {
    id: 1,
    name: "A-Bomb",
    slug: "1-a-bomb",
    powerstats: {
      intelligence: 38,
      strength: 100,
      speed: 17,
      durability: 80,
      power: 24,
      combat: 64,
    },
    appearance: {
      gender: "Male",
      race: "Human",
      height: ["6'8", "203 cm"],
      weight: ["980 lb", "441 kg"],
      eyeColor: "Yellow",
      hairColor: "No Hair",
    },
    biography: {
      fullName: "Richard Milhouse Jones",
      alterEgos: "No alter egos found.",
      aliases: ["Rick Jones"],
      placeOfBirth: "Scarsdale, Arizona",
      firstAppearance: "Hulk Vol 2 #2 (April, 2008) (as A-Bomb)",
      publisher: "Marvel Comics",
      alignment: "good",
    },
    work: {
      occupation: "Musician, adventurer, author; formerly talk show host",
      base: "-",
    },
    connections: {
      groupAffiliation:
        "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
      relatives:
        "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)",
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
    },
  },
  {
    id: 2,
    name: "Abe Sapien",
    slug: "2-abe-sapien",
    powerstats: {
      intelligence: 88,
      strength: 28,
      speed: 35,
      durability: 65,
      power: 100,
      combat: 85,
    },
    appearance: {
      gender: "Male",
      race: "Icthyo Sapien",
      height: ["6'3", "191 cm"],
      weight: ["145 lb", "65 kg"],
      eyeColor: "Blue",
      hairColor: "No Hair",
    },
    biography: {
      fullName: "Abraham Sapien",
      alterEgos: "No alter egos found.",
      aliases: ["Langdon Everett Caul", "Abraham Sapien", "Langdon Caul"],
      placeOfBirth: "-",
      firstAppearance: "Hellboy: Seed of Destruction (1993)",
      publisher: "Dark Horse Comics",
      alignment: "good",
    },
    work: {
      occupation: "Paranormal Investigator",
      base: "-",
    },
    connections: {
      groupAffiliation: "Bureau for Paranormal Research and Defense",
      relatives: "Edith Howard (wife, deceased)",
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/2-abe-sapien.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/2-abe-sapien.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/2-abe-sapien.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/2-abe-sapien.jpg",
    },
  },
  {
    id: 3,
    name: "Abin Sur",
    slug: "3-abin-sur",
    powerstats: {
      intelligence: 50,
      strength: 90,
      speed: 53,
      durability: 64,
      power: 99,
      combat: 65,
    },
    appearance: {
      gender: "Male",
      race: "Ungaran",
      height: ["6'1", "185 cm"],
      weight: ["200 lb", "90 kg"],
      eyeColor: "Blue",
      hairColor: "No Hair",
    },
    biography: {
      fullName: "",
      alterEgos: "No alter egos found.",
      aliases: ["Lagzia"],
      placeOfBirth: "Ungara",
      firstAppearance: "Showcase #22 (October, 1959)",
      publisher: "DC Comics",
      alignment: "good",
    },
    work: {
      occupation: "Green Lantern, former history professor",
      base: "Oa",
    },
    connections: {
      groupAffiliation: "Green Lantern Corps, Black Lantern Corps",
      relatives:
        "Amon Sur (son), Arin Sur (sister), Thaal Sinestro (brother-in-law), Soranik Natu (niece)",
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/3-abin-sur.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/3-abin-sur.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/3-abin-sur.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/3-abin-sur.jpg",
    },
  },
  {
    id: 4,
    name: "Abomination",
    slug: "4-abomination",
    powerstats: {
      intelligence: 63,
      strength: 80,
      speed: 53,
      durability: 90,
      power: 62,
      combat: 95,
    },
    appearance: {
      gender: "Male",
      race: "Human / Radiation",
      height: ["6'8", "203 cm"],
      weight: ["980 lb", "441 kg"],
      eyeColor: "Green",
      hairColor: "No Hair",
    },
    biography: {
      fullName: "Emil Blonsky",
      alterEgos: "No alter egos found.",
      aliases: ["Agent R-7", "Ravager of Worlds"],
      placeOfBirth: "Zagreb, Yugoslavia",
      firstAppearance: "Tales to Astonish #90",
      publisher: "Marvel Comics",
      alignment: "bad",
    },
    work: {
      occupation: "Ex-Spy",
      base: "Mobile",
    },
    connections: {
      groupAffiliation:
        "former member of the crew of the Andromeda Starship, ally of the Abominations and Forgotten",
      relatives: "Nadia Dornova Blonsky (wife, separated)",
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/4-abomination.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/4-abomination.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/4-abomination.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/4-abomination.jpg",
    },
  },
];

const parsedSuperheroes = rawSuperheroes.map((superhero) => ({
  id: superhero.id,
  image: superhero.images.sm,
  name: superhero.name,
  fullName: superhero.biography.fullName,
}));

const Cell: React.FC<GridChildComponentProps> = ({
  columnIndex,
  rowIndex,
  data,
  style,
}) => {
  const [handleFavorites] = useStore((state) => [state.handleFavorites]);

  const { superheroes, linearIndex } = data;
  const itemIndex = linearIndex(rowIndex, columnIndex);
  const superhero = superheroes[itemIndex];
  if (!superhero) {
    return null;
  }

  return (
    <Card
      superhero={superhero}
      onClick={() => handleFavorites(superhero.id)}
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE,
      }}
    />
  );
};

export interface ISuperhero {
  id: number;
  image: string;
  name: string;
  fullName: string;
}

const GUTTER_SIZE = 10;
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

  const windowHeight = window.innerHeight;

  useEffect(() => {
    // TODO: Fetch superheroes
    setSuperheroes(parsedSuperheroes);
  }, []);

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
    const columnCount = calculateColumns(windowWidth, COLUMN_WIDTH);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography tag="h1">All superheroes</Typography>
          <div
            style={{
              width: "371px",
            }}
          >
            <Input
              placeholder="Search"
              onChange={handleSearch}
              prefix={<Icon name="search" />}
              suffix={<Icon name="cancel" />}
            />
          </div>
        </div>
        <div style={{ marginTop: "34px" }} />
        {rowCount !== undefined && columnCount !== undefined && (
          <Grid
            columnCount={columnCount}
            columnWidth={COLUMN_WIDTH}
            rowCount={rowCount}
            rowHeight={174}
            height={windowHeight * (2 / 3)}
            width={columnCount * COLUMN_WIDTH}
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
