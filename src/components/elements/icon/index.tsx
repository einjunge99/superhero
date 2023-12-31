import mediumHeart from "../../../assets/medium-heart.svg";
import mediumFilledHeart from "../../../assets/medium-filled-heart.svg";
import fist from "../../../assets/fist.svg";
import search from "../../../assets/search.svg";
import cancel from "../../../assets/cancel.svg";
import arrowUp from "../../../assets/arrow-up.svg";
import styles from "./styles.module.scss";
import cx from "classnames";

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
  shapeSize?: string;
  fillColor?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IProps> = ({
  name,
  size,
  shape,
  shapeSize = "50px",
  fillColor,
  onClick,
}) => {
  const svgUrl = iconMap[name];

  if (!svgUrl) {
    return null;
  }

  const icon = (
    <img
      onClick={!shape ? onClick : undefined}
      src={svgUrl}
      alt={name}
      style={{
        transform: `scale(${size})`,
      }}
    />
  );
  if (!shape) {
    return icon;
  }
  return (
    <div
      onClick={onClick}
      className={cx(styles.shape, styles[shape])}
      style={{
        backgroundColor: fillColor,
        width: shapeSize,
        height: shapeSize,
      }}
    >
      {icon}
    </div>
  );
};
