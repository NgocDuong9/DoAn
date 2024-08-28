"use client";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface Props {
  searchParams: ReadonlyURLSearchParams;
}
function useGetSearchParams({ searchParams }: Props) {
  const paramsString = searchParams.toString();

  return {
    paramsString,
    paramsObj: queryString.parse(paramsString),
  };
}

export default useGetSearchParams;
