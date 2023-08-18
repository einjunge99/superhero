import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div
      style={{
        padding: `50px 129px 85px 129px`,
      }}
    >
      {children}
    </div>
  );
};
