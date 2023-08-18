import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IProps {
  count: number;
}

export const CustomSkeleton: React.FC<IProps> = ({ count }) => {
  return (
    <>
      <Skeleton
        height={"27px"}
        width={"285px"}
        baseColor="rgba(106, 77, 188, 0.24)"
        highlightColor="#6A4DBC"
        style={{ borderRadius: "16px" }}
      />
      <div style={{ marginTop: "21px" }} />
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {Array.from({ length: count }, (_, index) => (
          <Skeleton
            key={index}
            height={"174px"}
            width={"285px"}
            baseColor="rgba(106, 77, 188, 0.24)"
            highlightColor="#6A4DBC"
            style={{ borderRadius: "16px" }}
          />
        ))}
      </div>
    </>
  );
};
