import algoliasearch from "algoliasearch";
import { useEffect } from "react";
import { Hits, InstantSearch } from "react-instantsearch";
import CustomHits from "./CustomHits";
import SearchBox from "./CustomSearchBox";
import EmptyState from "./EmptyState";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX as string;

const algoliaClient = algoliasearch(APP_ID, API_KEY);

type Props = {
  searchModalOpen: boolean;
  setSearchModalOpen: (value: boolean) => void;
};

const GlobalSearchModal = (props: Props) => {
  const { searchModalOpen, setSearchModalOpen } = props;

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event: any) {
      if (!event.target.closest(".modal-content")) {
        setSearchModalOpen(false);
      }
    }

    if (searchModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  return (
    <div className="z-99999 backdrop-blur-xs fixed left-0 top-0 flex h-full min-h-screen w-full justify-center bg-[rgba(0,0,0,0.25)] px-4 py-[12vh]">
      <div className="modal-content relative flex w-full max-w-[600px] flex-col overflow-hidden rounded-xl bg-white dark:bg-black">
        <InstantSearch searchClient={algoliaClient} indexName={INDEX}>
          <SearchBox />
          <EmptyState />
          <div className="flex-1 overflow-y-auto">
            <Hits
              hitComponent={(props) => (
                <CustomHits
                  {...props}
                  setSearchModalOpen={setSearchModalOpen}
                />
              )}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
