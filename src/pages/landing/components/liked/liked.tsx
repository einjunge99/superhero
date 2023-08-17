import { Icon } from "../../../../components/elements/icon";
import { Card } from "../../../../components/fragments/card";
import { Collapsible } from "../../../../components/fragments/collapsible";
import { useStore } from "../../../../store";

interface IProps {
  superheros: [];
}

export const Liked: React.FC<IProps> = ({ superheros }) => {
  const [favoritesIds, removeFavorite] = useStore((state) => [
    state.favoritesIds,
    state.removeFavorite,
  ]);

  const favorites =
    favoritesIds.map((id) => {
      return superheros.find((superhero) => superhero.id === id);
    }) || [];

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
            <Card superhero={favorite} />
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
