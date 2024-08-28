import { ITogetherType, MapAccompaniesLabel } from "@/types/order";
import React from "react";

const TagAccCompany = ({ type }: { type: ITogetherType }) => {
  const { color, label } = MapAccompaniesLabel?.[type];
  return (
    <span
      style={{
        border: `1px solid ${color}`,
        color,
      }}
      className="px-2 py-1 rounded-md border-2 font-semibold text-xs"
    >
      {label}
    </span>
  );
};

export default TagAccCompany;
