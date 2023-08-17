import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

interface IProps {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  prefix?: ReactNode;
}

export const Collapsible: React.FC<IProps> = ({
  title,
  children,
  icon,
  prefix,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cx(styles.collapsible, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.header} onClick={toggleCollapse}>
        <div className={styles.title}>
          {prefix}
          {title}
        </div>
        <span
          className={cx(styles.icon, {
            [styles.open]: isOpen,
          })}
        >
          {icon}
        </span>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
