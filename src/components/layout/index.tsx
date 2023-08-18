import { ReactNode } from "react";

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
      {children}
    </div>
  );
};
