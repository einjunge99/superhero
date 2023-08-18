import styles from "./index.module.scss";

const tagMapping: { [key: string]: keyof JSX.IntrinsicElements } = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag?: keyof typeof tagMapping;
  variant?: string;
  color?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  tag = "p",
  variant,
  color,
  ...props
}) => {
  const Component = tag ? tagMapping[tag] : "p";
  const _className = variant ? styles[`${tag}--${variant}`] : styles[tag];

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component className={_className} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
