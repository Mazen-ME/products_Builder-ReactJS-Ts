import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}


export default function Inputes({...rest} : InputProps) {

 


  return (
    <input
      {...rest}
      className="border border-gray-300 rounded-md p-3 text-base tracking-wider text-gray-700 shadow-md
          focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
  );
}
