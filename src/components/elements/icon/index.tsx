import mediumHeart from "../../../assets/medium-heart.svg";
import mediumFilledHeart from "../../../assets/medium-filled-heart.svg";
import fist from "../../../assets/fist.svg";
import styles from "./styles.module.scss";

export type IconName = "medium-heart" | "medium-filled-heart" | "fist";

const iconMap: Record<IconName, string> = {
  "medium-heart": mediumHeart,
  "medium-filled-heart": mediumFilledHeart,
  fist: fist,
};

interface IProps {
  name: IconName;
  size?: string;
  shape?: "circle";
  fillColor?: string;
}

export const Icon: React.FC<IProps> = ({ name, size, shape, fillColor }) => {
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
      className={styles[shape]}
      style={{
        backgroundColor: fillColor,
      }}
    >
      {icon}
    </div>
  );
};
