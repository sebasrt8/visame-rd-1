import { useHits } from "react-instantsearch";

const EmptyState = () => {
  const { hits } = useHits();
  return (
    <>
      {hits?.length == 0 ? (
        <div className="p-8">
          <p className="text-body-color text-center text-base">
            No items found...
          </p>
        </div>
      ) : null}
    </>
  );
};

export default EmptyState;
