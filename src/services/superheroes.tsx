import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { IRawSuperhero } from "./interfaces/superhero";

export const useSuperheroes = () => {
  const { data, error, isLoading } = useSWR<IRawSuperhero[]>(
    "/all.json",
    fetcher
  );

  return {
    superherores: data,
    isLoading,
    isError: error,
  };
};
