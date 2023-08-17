import { Icon } from "../../../../components/elements/icon";
import { Collapsible } from "../../../../components/fragments/collapsible";

export const Liked = () => {
  return (
    <Collapsible
      prefix={<Icon name="medium-heart" fillColor="#6A4DBC" shape="circle" />}
      title="test"
      icon={
        <Icon
          name="arrow-up"
          fillColor="rgba(255, 255, 255, 0.10)"
          shape="circle"
        />
      }
    >
      {/* TODO: Render cards */}
    </Collapsible>
  );
};
