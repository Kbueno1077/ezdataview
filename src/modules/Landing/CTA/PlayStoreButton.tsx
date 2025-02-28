import React from "react";
import clsx from "clsx";

import { ctaDetails } from "@/modules/Landing/data/cta";

const ExampleBuildButton = ({ dark }: { dark?: boolean }) => {
  return (
    <a href={ctaDetails.exampleBuildUrl}>
      <button
        type="button"
        className={clsx(
          "flex items-center cursor-pointer justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit",
          {
            "text-white bg-foreground": dark,
            "text-foreground bg-white": !dark,
          }
        )}
      >
        <div className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={dark ? "#FFD700" : "#DAA520"}
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
          </svg>
        </div>
        <div>
          <div className="text-xs">Learn How To</div>
          <div className="-mt-1 font-sans text-xl font-semibold">
            Build Charts
          </div>
        </div>
      </button>
    </a>
  );
};

export default ExampleBuildButton;
