import SectionTitle from "./SectionTitle";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  title,
  description,
  icon,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <section id={id} className="py-10 lg:py-20">
      <div className="mb-12">
        <SectionTitle>
          <h2 className="text-center mb-4 text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {icon && <span className="inline-block mr-2">{icon}</span>}
            {title}
          </h2>
        </SectionTitle>
        <p className="mb-8 text-center text-foreground-accent max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex justify-center">
          <div
            className="h-1 w-20 rounded-full"
            style={{
              background: [
                "linear-gradient(135deg, #FF9966, #FF5E62)",
                "linear-gradient(135deg, #56CCF2, #2F80ED)",
                "linear-gradient(135deg, #A770EF, #CF8BF3, #FDB99B)",
                "linear-gradient(135deg, #11998e, #38ef7d)",
                "linear-gradient(135deg, #4776E6, #8E54E9)",
              ][Math.floor(Math.random() * 5)],
            }}
          ></div>
        </div>
      </div>
      {children}
    </section>
  );
};

export default Section;
