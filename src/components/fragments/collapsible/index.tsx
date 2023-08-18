import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

interface IProps {
  title: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: ReactNode;
  icon: ReactNode;
  prefix?: ReactNode;
}

export const Collapsible: React.FC<IProps> = ({
  title,
  isOpen: isOpenControlled,
  onOpenChange,
  children,
  icon,
  prefix,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    const result = isOpen || isOpenControlled;
    setIsOpen(!result);
    if (!onOpenChange) {
      return;
    }
    onOpenChange(!result);
  };

  return (
    <div
      className={cx(styles.collapsible, {
        [styles.open]: isOpen || isOpenControlled,
      })}
    >
      <div className={styles.header} onClick={toggleCollapse}>
        <div className={styles.title}>
          {prefix}
          {title}
        </div>
        <span
          className={cx(styles.icon, {
            [styles.open]: isOpen || isOpenControlled,
          })}
        >
          {icon}
        </span>
      </div>
      {(isOpen || isOpenControlled) && (
        <div className={styles.content}>{children}</div>
      )}
    </div>
  );
};
