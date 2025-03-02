import React from "react";
import clsx from "clsx";

import { ctaDetails } from "@/modules/Landing/data/cta";

const ExampleResultButton = ({ dark }: { dark?: boolean }) => {
  return (
    <a href={ctaDetails.exampleResultUrl}>
      <button
        type="button"
        className={clsx(
          "group flex items-center cursor-pointer justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit",
          "transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg",
          {
            "text-white bg-foreground hover:bg-foreground/90": dark,
            "text-foreground bg-white hover:bg-gray-50": !dark,
          }
        )}
      >
        <div className="mr-3 transition-transform duration-300 group-hover:rotate-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={dark ? "#22c55e" : "#16a34a"}
            viewBox="0 0 16 16"
          >
            <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
          </svg>
        </div>
        <div>
          <div className="text-xs">View Our</div>
          <div className="-mt-1 font-sans text-xl font-semibold">
            Example Results
          </div>
        </div>
      </button>
    </a>
  );
};

export default ExampleResultButton;
