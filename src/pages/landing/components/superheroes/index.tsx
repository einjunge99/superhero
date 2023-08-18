import { Input } from "../../../../components/elements/input";
import Typography from "../../../../components/elements/typography";
import { FixedSizeGrid as Grid } from "react-window";
import { Cell } from "../cell";
import styles from "./styles.module.scss";
import { Icon } from "../../../../components/elements/icon";
import { ISuperhero } from "../..";
import { GUTTER_SIZE } from "../../constants";
import { CustomSkeleton } from "../../../../components/fragments/skeleton/skeleton";

interface IProps {
  columnCount?: number;
  rowCount?: number;
  windowHeight: number;
  isLoading?: boolean;
  superheroes: ISuperhero[];
  setSearchQuery: (searchQuery: string) => void;
  searchQuery: string;
}

const COLUMN_WIDTH = 285;
const CARD_HEIGHT = 184;

export const Superheroes: React.FC<IProps> = ({
  columnCount,
  rowCount,
  windowHeight,
  isLoading,
  superheroes,
  setSearchQuery,
  searchQuery,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const linearIndex = (rowIndex: number, columnIndex: number) => {
    if (!columnCount) {
      return;
    }
    return rowIndex * columnCount + columnIndex;
  };

  if (isLoading || columnCount === undefined || rowCount === undefined) {
    return <CustomSkeleton count={8} />;
  }

  return (
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
      <Grid
        columnCount={columnCount}
        columnWidth={COLUMN_WIDTH}
        rowCount={rowCount}
        rowHeight={CARD_HEIGHT}
        height={windowHeight * (3 / 5)}
        width={columnCount * (COLUMN_WIDTH + GUTTER_SIZE)}
        itemData={{
          superheroes,
          linearIndex,
        }}
      >
        {Cell}
      </Grid>
    </div>
  );
};
