import { useRef } from "react";
import { useSearchBox } from "react-instantsearch";

function CustomSearchBox() {
  const { refine } = useSearchBox();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      role="search"
      className="z-999 border-stroke dark:border-strokedark sticky top-0 border-b bg-white dark:bg-black"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
    >
      <input
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        type="search"
        onChange={(e) => refine(e.currentTarget.value)}
        placeholder="Search Entire Site | Products, Docs, Pages ..."
        className="outline-hidden h-[74px] w-full rounded-lg pl-[60px] pr-5 text-black dark:bg-black"
      />

      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-waterloo left-5.5 pointer-events-none absolute top-1/2 -translate-y-1/2"
      >
        <path
          d="M19.1875 17.4063L14.0313 13.2188C16.1563 10.3125 15.9375 6.15625 13.2812 3.53125C11.875 2.125 10 1.34375 8 1.34375C6 1.34375 4.125 2.125 2.71875 3.53125C-0.1875 6.4375 -0.1875 11.1875 2.71875 14.0938C4.125 15.5 6 16.2813 8 16.2813C9.90625 16.2813 11.6875 15.5625 13.0938 14.2813L18.3125 18.5C18.4375 18.5938 18.5938 18.6563 18.75 18.6563C18.9688 18.6563 19.1562 18.5625 19.2812 18.4063C19.5312 18.0938 19.5 17.6563 19.1875 17.4063ZM8 14.875C6.375 14.875 4.875 14.25 3.71875 13.0938C1.34375 10.7188 1.34375 6.875 3.71875 4.53125C4.875 3.375 6.375 2.75 8 2.75C9.625 2.75 11.125 3.375 12.2812 4.53125C14.6562 6.90625 14.6562 10.75 12.2812 13.0938C11.1562 14.25 9.625 14.875 8 14.875Z"
          fill="currentColor"
        />
      </svg>
    </form>
  );
}

export default CustomSearchBox;
