import React, { CSSProperties, useEffect, useRef } from "react";
import { Icon } from "../../elements/icon";
import styles from "./styles.module.scss";
import Typography from "../../elements/typography";
import { ISuperhero } from "../../../pages/landing";
import { Pill } from "../../elements/pill";
import { motion } from "framer-motion";

interface IProps {
  onClick: () => void;
  style?: CSSProperties;
  superhero: ISuperhero;
  showPill?: boolean;
  scrollIntoView?: boolean;
  isFavorite?: boolean;
}

export const Card: React.FC<IProps> = React.forwardRef(
  (
    {
      superhero: { fullName, image, name, score },
      showPill,
      scrollIntoView,
      isFavorite,
      style,
      onClick,
    },
    forwardRef
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (localRef && scrollIntoView) {
        localRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, [scrollIntoView, localRef]);

    return (
      <div ref={localRef}>
        <div
          className={styles.container}
          style={style}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={forwardRef}
        >
          <div></div>
          {showPill && <Pill label="Liked recently" className={styles.pill} />}
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <div className={styles.content}>
            <img className={styles.avatar} src={image} />
            <div className={styles.info}>
              <Typography tag="h2">{name}</Typography>
              <Typography
                tag="h4"
                style={{ color: "rgba(255, 255, 255, 0.49)" }}
              >
                Real name: {fullName}
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <Icon name="fist" />
                <Typography tag="h4" style={{ fontWeight: 600 }}>
                  {score}
                </Typography>
                <Typography
                  tag="h4"
                  style={{
                    fontWeight: 275,
                    color: "rgba(255, 255, 255, 0.49)",
                  }}
                >
                  /
                </Typography>
                <Typography
                  tag="h4"
                  style={{
                    fontWeight: 275,
                    color: "rgba(255, 255, 255, 0.49)",
                  }}
                >
                  10
                </Typography>
              </div>
            </div>
            <div className={styles.icon}>
              <Icon
                name={isFavorite ? "medium-filled-heart" : "medium-heart"}
                shape="circle"
                fillColor="#6A4DBC"
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export const MotionCard = motion(Card);
