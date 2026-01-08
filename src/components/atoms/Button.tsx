import React from "react";
import {
  Button as FlowbiteButton,
  createTheme,
  ThemeProvider,
} from "flowbite-react";

const customTheme = createTheme({
  button: {
    color: {
      primary:
        "bg-transparent border-4 rounded-4xl text-sent-purple border-sent-purple font-bold",

      secondary:
        "bg-sent-purple border-4 rounded-4xl text-white border-sent-purple font-bold",
      green:
        "bg-transparent border-4 rounded-4xl text-white border-sent-green font-bold",
      red: "bg-sent-red border-4 rounded-4xl text-white border-sent-red font-bold",
    },
    size: {
      base: "px-5 py-2 text-lg w-fit",
    },
  },
});

type ButtonProps = {
  children?: React.ReactNode;
  color: string;
  size: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  color,
  size,
  onClick,
}: ButtonProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <FlowbiteButton
        color={color}
        size={size}
        onClick={onClick}
        className="cursor-pointer"
      >
        {children}
      </FlowbiteButton>
    </ThemeProvider>
  );
}
