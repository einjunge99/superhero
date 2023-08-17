import { ISuperhero } from "../..";
import { Icon } from "../../../../components/elements/icon";
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
      prefix={<Icon name="medium-heart" fillColor="#6A4DBC" shape="circle" />}
      title="Liked"
      icon={
        <Icon
          name="arrow-up"
          fillColor="rgba(255, 255, 255, 0.10)"
          shape="circle"
        />
      }
    >
      {favorites.length > 0 ? (
        <>
          {favorites.map((favorite) => (
            <Card
              superhero={favorite}
              onClick={() => handleFavorites(favorite.id)}
            />
          ))}
        </>
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
          <div> You haven’t liked any superhero yet</div>
        </div>
      )}
    </Collapsible>
  );
};
