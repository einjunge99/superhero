import { ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

interface IProps {
  onChange?: (e: React.InputHTMLAttributes<HTMLInputElement>) => void;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input: React.FC<IProps> = ({
  onChange,
  type = "text",
  value,
  placeholder,
  prefix,
  suffix,
}) => {
  return (
    <div className={styles.container}>
      {prefix}
      <input
        className={cx({
          [styles.prefix]: !!prefix,
          [styles.suffix]: !!suffix,
        })}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        value={value}
      />
      {suffix}
    </div>
  );
};
