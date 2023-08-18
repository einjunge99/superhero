import { ISuperhero } from "../..";
import { Icon } from "../../../../components/elements/icon";
import Typography from "../../../../components/elements/typography";
import { Card } from "../../../../components/fragments/card";
import { Collapsible } from "../../../../components/fragments/collapsible";
import { useStore } from "../../../../store";

interface IProps {
  superheroes: ISuperhero[];
}

export const Liked: React.FC<IProps> = ({ superheroes }) => {
  const [favoritesIds, handleFavorites] = useStore((state) => [
    state.favoritesIds,
    state.handleFavorites,
  ]);

  const favorites = superheroes.filter((superhero) =>
    favoritesIds.includes(superhero.id)
  );

  return (
    <Collapsible
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
          {favorites.map((favorite, index) => (
            <Card
              key={favorite.id}
              superhero={favorite}
              onClick={() => handleFavorites(favorite.id)}
              showPill={index + 1 === favorites.length}
              scrollIntoView={true}
              isFavorite
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            padding: "48px 0",
          }}
        >
          <Icon name="medium-heart" size="2" />
          <Typography tag="h3">You haven’t liked any superhero yet</Typography>
        </div>
      )}
    </Collapsible>
  );
};
