import { FC, HTMLAttributes, ElementType, ReactNode } from "react";
import classNames from "classnames";

interface QTextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  color?: "major" | "minor";
  size?: "xs" | "sm" | "md" | "lg";
  tag: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold";
  width?: string
}

const QText: FC<QTextProps> = ({
  children,
  color = "major",
  size = "md",
  tag: TagName,
  weight = "normal",
  width,
  ...rest
}) => {
  return (
    <TagName
      className={classNames([
        {
          xs: "text-xs",
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
        }[size],
        {
          light: "font-light",
          normal: "font-normal",
          medium: "font-medium",
          semibold: "font-semibold",
        }[weight],
        {
          major: "text-zinc-950 ",
          minor: "text-zinc-400",
        }[color],
      ])}
      style={{ width }}
      {...rest}
    >
      {children}
    </TagName>
  );
};

export default QText;
