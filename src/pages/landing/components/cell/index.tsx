import { GridChildComponentProps } from "react-window";
import { MotionCard } from "../../../../components/fragments/card";
import { useStore } from "../../../../store";
import { GUTTER_SIZE } from "../../constants";

export const Cell: React.FC<GridChildComponentProps> = ({
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
    <MotionCard
      // <Card
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      superhero={superhero}
      onClick={() => handleFavorites(superhero.id)}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        left: style.left + GUTTER_SIZE,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        top: style.top + GUTTER_SIZE,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        width: style.width - GUTTER_SIZE,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        height: style.height - GUTTER_SIZE,
      }}
    />
  );
};
