import { ReactNode } from "react";
import logo from "../../assets/logo.svg";
import styles from "./styles.module.scss";

interface IProps {
  children: ReactNode;
}

export const PADDING = 129;

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div
      style={{
        padding: `50px ${PADDING}px 85px ${PADDING}px`,
      }}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div style={{ marginBottom: "53px" }} />
      {children}
    </div>
  );
};
