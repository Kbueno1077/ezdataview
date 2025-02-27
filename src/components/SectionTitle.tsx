import React from "react";

interface ChildProps {
  className?: string;
  [key: string]: unknown; // Allow other props but in a type-safe way
}

interface SectionTitleProps {
  children: React.ReactElement<ChildProps>;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return React.cloneElement(children, {
    className:
      children.props.className +
      " text-3xl lg:text-5xl lg:leading-tight font-bold",
  });
};

export default SectionTitle;
