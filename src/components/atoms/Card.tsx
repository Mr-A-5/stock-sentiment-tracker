import { Tooltip } from "flowbite-react";
import { IoMdInformationCircleOutline } from "react-icons/io";

type sizes = "sm" | "md" | "lg" | "xl";

type CardProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
  height?: sizes;
  width?: sizes;
  description?: string;
};
const heights: Record<sizes, string> = {
  sm: "min-h-fit h-70",
  md: "min-h-80 h-80",
  lg: "min-h-145 h-fit",
  xl: "h-[44rem]",
};
const widths: Record<sizes, string> = {
  sm: "sm:w-70",
  md: "sm:w-7/10 sm:max-w-7/10 md:w-6/10 md:max-w-6/10 lg:w-1/3 lg:max-w-1/3",
  lg: "sm:w-145",
  xl: "sm:w-full",
};

export default function Card({
  children,
  title,
  className,
  height = "md",
  width = "md",
  description,
}: CardProps) {
  return (
    <div
      className={
        "p-1 " + className + " " + heights[height] + " " + widths[width]
      }
    >
      <div className={"bg-white flex flex-col rounded-xl h-full w-full"}>
        <div className="items-center px-4 p-4 h-fit">
          <div className="pb-2 boder-b-5 flex flex-row justify-end w-full items-center border-b-5">
            <h1 className="text-xl font-extrabold w-full">{title}</h1>
            {description ? (
              <Tooltip content={description} className="w-60">
                <IoMdInformationCircleOutline
                  size={30}
                  className="text-black"
                />
              </Tooltip>
            ) : null}
          </div>
        </div>
        <div className="p-3 flex-1">{children}</div>
      </div>
    </div>
  );
}
