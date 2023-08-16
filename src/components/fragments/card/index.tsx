import styles from "./styles.module.scss";

// TODO: Set to Superhero interface once created
interface IProps {
  superhero: {
    image: string;
    name: string;
    fullName: string;
  };
}

export const Card: React.FC<IProps> = ({
  superhero: { fullName, image, name },
}) => {
  return (
    <div className={styles.container}>
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
          <h4>8.4/10</h4>
        </div>
      </div>
    </div>
  );
};
