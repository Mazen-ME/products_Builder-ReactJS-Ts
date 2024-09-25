import { ButtonHTMLAttributes, ReactNode } from "react";

interface buttonsProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

export default function Buttons(props: buttonsProps) {
  const { children, className, width = "w-full", ...rest } = props;
  return (
    <>
      <button
        {...rest}
        className={`${className} ${width} text-white p-2 rounded-md`}>
        {children}
      </button>
    </>
  );
}
