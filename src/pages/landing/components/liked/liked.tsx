import styles from "./styles.module.scss";
import { ISuperhero } from "../..";
import { Icon } from "../../../../components/elements/icon";
import Typography from "../../../../components/elements/typography";
import { MotionCard } from "../../../../components/fragments/card";
import { Collapsible } from "../../../../components/fragments/collapsible";
import { CustomSkeleton } from "../../../../components/fragments/skeleton/skeleton";
import { useStore } from "../../../../store";
import { AnimatePresence } from "framer-motion";

interface IProps {
  superheroes: ISuperhero[];
  isLoading?: boolean;
}

export const Liked: React.FC<IProps> = ({ superheroes, isLoading }) => {
  const [
    favoritesIds,
    isCollapsibleOpen,
    handleFavorites,
    setIsCollapsibleOpen,
  ] = useStore((state) => [
    state.favoritesIds,
    state.isCollapsibleOpen,
    state.handleFavorites,
    state.setIsCollapsibleOpen,
  ]);

  const favorites = superheroes.filter((superhero) =>
    favoritesIds.includes(superhero.id)
  );

  if (isLoading) {
    return <CustomSkeleton count={4} />;
  }

  return (
    <Collapsible
      isOpen={isCollapsibleOpen}
      onOpenChange={setIsCollapsibleOpen}
      prefix={
        <Icon
          name="medium-heart"
          fillColor="#6A4DBC"
          shape="circle"
          shapeSize="35px"
        />
      }
      title={<Typography tag="h1">Liked</Typography>}
      icon={
        <Icon
          name="arrow-up"
          fillColor="rgba(255, 255, 255, 0.10)"
          shape="circle"
          shapeSize="35px"
        />
      }
    >
      {favorites.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <AnimatePresence>
            {favorites.map((favorite, index) => (
              <MotionCard
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                key={favorite.id}
                superhero={favorite}
                onClick={() => handleFavorites(favorite.id)}
                showPill={index + 1 === favorites.length}
                scrollIntoView={true}
                isFavorite
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className={styles.container}>
          <Icon name="medium-heart" size="2" />
          <Typography tag="h3">You haven’t liked any superhero yet</Typography>
        </div>
      )}
    </Collapsible>
  );
};
