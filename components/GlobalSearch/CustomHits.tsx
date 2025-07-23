import Image from "next/image";
import Link from "next/link";

function CustomHits(props: any) {
  const { hit, setSearchModalOpen } = props;
  return (
    <div className="border-stroke dark:border-strokedark border-t bg-black first-of-type:border-0">
      <div className="bg-white px-[22px] py-3.5 duration-300 hover:bg-[#F9FAFB] dark:bg-black dark:hover:bg-slate-800">
        <Link
          onClick={() => setSearchModalOpen(false)}
          href={hit?.url}
          className="flex items-center gap-4"
        >
          {hit?.imageURL && (
            <Image
              src={hit.imageURL}
              className="aspect-[53/30] rounded-lg object-cover object-center"
              alt={"Image for " + hit.title}
              width={106}
              height={60}
              quality={100}
            />
          )}

          <div>
            <h3 className="text-base font-medium text-black dark:text-gray-400">
              {hit.title}
            </h3>

            <div className="text-body-color flex text-sm">
              {hit.type}: {hit.url}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default CustomHits;
