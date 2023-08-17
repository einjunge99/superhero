import { CSSProperties } from "react";
import { Icon } from "../../elements/icon";
import styles from "./styles.module.scss";

// TODO: Set to Superhero interface once created
interface IProps {
  onClick: () => void;
  style?: CSSProperties;
  superhero: {
    image: string;
    name: string;
    fullName: string;
  };
}

export const Card: React.FC<IProps> = ({
  superhero: { fullName, image, name },
  style,
  onClick,
}) => {
  return (
    <div className={styles.container} style={style}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className={styles.content}>
        <img className={styles.avatar} src={image} />
        <div className={styles.info}>
          <h2
            style={{
              fontSize: "20px",
            }}
          >
            {name}
          </h2>
          <h3
            style={{
              fontSize: "12px",
            }}
          >
            Real name: {fullName}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            <Icon name="fist" />
            <h4>8.4/10</h4>
          </div>
        </div>
        <div className={styles.icon}>
          <Icon
            name="medium-filled-heart"
            shape="circle"
            fillColor="#6A4DBC"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
