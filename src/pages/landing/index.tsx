import React, { useEffect, useState } from "react";
import { Icon } from "../../components/elements/icon";
import { Input } from "../../components/elements/input";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { Card } from "../../components/fragments/card";
import { Liked } from "./components/liked/liked";
import { useStore } from "../../store";

function duplicateArrayNTimes(array, n: number) {
  return [].concat(...Array(n).fill(array));
}

function calculateColumns(width: number, minCardWidth: number) {
  const columns = Math.floor(width / minCardWidth);
  return columns < 1 ? 1 : columns;
}

const superheros = [
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

const parsedSuperheros = duplicateArrayNTimes(superheros, 10).map(
  (superhero) => ({
    image: superhero.images.sm,
    name: superhero.name,
    fullName: superhero.biography.fullName,
  })
);

const Cell: React.FC<GridChildComponentProps> = ({
  columnIndex,
  rowIndex,
  data,
  style,
}) => {
  const itemIndex = linearIndex(rowIndex, columnIndex);
  const superhero = data[itemIndex];
  return (
    <Card
      superhero={superhero}
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

const COLUMN_COUNT = 4;
const GUTTER_SIZE = 10;
const ROW_COUNT = Math.ceil(parsedSuperheros.length / COLUMN_COUNT);
const COLUMN_WIDTH = 285;
const PADDING = 129;

const linearIndex = (rowIndex: number, columnIndex: number) => {
  return rowIndex * COLUMN_COUNT + columnIndex;
};

export const LandingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const windowHeight = window.innerHeight;
  const [columnCount, setColumnCount] = useState(COLUMN_COUNT);

  const [favoritesIds, addFavorite] = useStore((state) => [
    state.favoritesIds,
    state.addFavorite,
  ]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setColumnCount(calculateColumns(windowWidth - PADDING * 2, COLUMN_WIDTH));
  }, [columnCount, windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: `0 ${PADDING}px`,
      }}
    >
      <Liked superheros={parsedSuperheros} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 5px 0 20px",
          }}
        >
          <div
            style={{
              flex: "3",
            }}
          >
            All superheros
          </div>
          <div
            style={{
              flex: "2",
            }}
          >
            <Input
              placeholder="Search"
              prefix={<Icon name="search" />}
              suffix={<Icon name="cancel" />}
            />
          </div>
        </div>
        <Grid
          columnCount={columnCount}
          columnWidth={COLUMN_WIDTH}
          rowCount={ROW_COUNT}
          rowHeight={174}
          height={windowHeight * (2 / 3)}
          width={columnCount * COLUMN_WIDTH}
          itemData={parsedSuperheros}
        >
          {Cell}
        </Grid>
      </div>
    </div>
  );
};
