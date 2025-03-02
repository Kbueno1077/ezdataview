import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IPricing } from "@/modules/landing/types";

interface Props {
  tier: IPricing;
  highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
  const { name, price, features } = tier;

  return (
    <div
      className={clsx(
        "w-full max-w-sm mx-auto rounded-2xl lg:max-w-full  transition-transform duration-200 hover:scale-[1.02]",
        highlight
          ? "bg-gradient-to-br from-violet-600/90 to-indigo-600/90 text-white shadow-xl shadow-violet-500/20"
          : "bg-white/80 border border-gray-200/50"
      )}
    >
      <div className="p-8 space-y-4">
        {highlight && (
          <span className="px-4 py-1 text-xs font-semibold tracking-wider text-white bg-white/20 rounded-full">
            MOST POPULAR
          </span>
        )}
        <h3
          className={clsx("text-2xl font-bold", !highlight && "text-gray-900")}
        >
          {name}
        </h3>
        <div className="flex items-baseline">
          <span
            className={clsx(
              "text-5xl font-extrabold tracking-tight",
              !highlight && "text-gray-900"
            )}
          >
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {typeof price === "number" && (
            <span
              className={clsx(
                "ml-1 text-xl font-semibold",
                highlight ? "text-white/70" : "text-gray-500"
              )}
            >
              /month
            </span>
          )}
        </div>

        <button
          className={clsx(
            "w-full py-4 cursor-pointer px-6 text-base font-semibold rounded-xl transition-all duration-200",
            highlight
              ? "bg-white text-violet-600 hover:bg-gray-100"
              : "bg-violet-600 text-white hover:bg-violet-700"
          )}
        >
          Get Started Now
        </button>
      </div>

      <div
        className={clsx(
          "p-8 rounded-b-2xl space-y-6",
          highlight ? "bg-white/10" : "bg-gray-50/50"
        )}
      >
        <div>
          <p
            className={clsx(
              "font-semibold mb-1",
              highlight ? "text-white/90" : "text-gray-900"
            )}
          >
            INCLUDED FEATURES
          </p>
          <p className={clsx(highlight ? "text-white/70" : "text-gray-600")}>
            Everything you need to get started
          </p>
        </div>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <BsFillCheckCircleFill
                className={clsx(
                  "h-5 w-5",
                  highlight ? "text-white" : "text-violet-600"
                )}
              />
              <span
                className={clsx(
                  "text-sm",
                  highlight ? "text-white/90" : "text-gray-600"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;
