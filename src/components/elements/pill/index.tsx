import Typography from "../typography";
import styles from "./styles.module.scss";
import cx from "classnames";

interface IProps {
  label: string;
  className?: string;
}

export const Pill: React.FC<IProps> = ({ label, className }) => {
  return (
    <div className={cx(styles.content, className)}>
      <Typography tag="h5">{label}</Typography>
    </div>
  );
};
