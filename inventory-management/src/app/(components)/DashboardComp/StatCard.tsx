import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};
interface Props {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
}
export interface Person {
  name: string;
  age: number;
  // dob: Date;
  height: number;
}

function StatCard(props: Props) {
  const { title, primaryIcon, details, dateRange } = props;

  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };
  const getChangeColor = (value: number) => {
    return value >= 0 ? "text-green-500" : "text-red-500";
  };
  return (
    <div className="md:row-span-1 xl:row-span-3 bg-white col-span-2 shadow-md rounded-2xl">
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-grey-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>
      <div className="flex mb-6 items-center justify-around gap-4 px-5">
        <div className="rounded-full p-5 bg-blue-50 border-[1px] mt-5">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                <span className="text-gray-500">{detail.title}</span>
                <span className="text-gray-500">{detail.amount}</span>
                <span className="text-gray-500">{detail.changePercentage}</span>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
        {<p></p>}
      </div>
    </div>
  );
}

export default StatCard;
