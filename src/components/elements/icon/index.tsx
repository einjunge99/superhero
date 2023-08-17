import mediumHeart from "../../../assets/medium-heart.svg";
import mediumFilledHeart from "../../../assets/medium-filled-heart.svg";
import fist from "../../../assets/fist.svg";
import search from "../../../assets/search.svg";
import cancel from "../../../assets/cancel.svg";
import arrowUp from "../../../assets/arrow-up.svg";
import styles from "./styles.module.scss";

export type IconName =
  | "medium-heart"
  | "medium-filled-heart"
  | "fist"
  | "search"
  | "cancel"
  | "arrow-up";

const iconMap: Record<IconName, string> = {
  "medium-heart": mediumHeart,
  "medium-filled-heart": mediumFilledHeart,
  fist: fist,
  search: search,
  cancel: cancel,
  "arrow-up": arrowUp,
};

interface IProps {
  name: IconName;
  size?: string;
  shape?: "circle";
  fillColor?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IProps> = ({
  name,
  size,
  shape,
  fillColor,
  onClick,
}) => {
  const svgUrl = iconMap[name];

  if (!svgUrl) {
    return null;
  }

  const icon = (
    <img
      src={svgUrl}
      alt={name}
      style={{
        fontSize: size,
      }}
    />
  );
  if (!shape) {
    return icon;
  }
  return (
    <div
      onClick={onClick}
      className={styles[shape]}
      style={{
        backgroundColor: fillColor,
      }}
    >
      {icon}
    </div>
  );
};
