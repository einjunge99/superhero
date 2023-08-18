import { GridChildComponentProps } from "react-window";
import { Card } from "../../../../components/fragments/card";
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
