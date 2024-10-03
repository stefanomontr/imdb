import SearchCriteria from "../dtos/SearchCriteria.ts";
import Filter from "./Filter.tsx";
import {Dispatch, SetStateAction, useCallback} from "react";
import NumberField from "./NumberField.tsx";
import TextField from "./TextField.tsx";

export interface FilterListProps {
  searchCriteria: SearchCriteria;
  setSearchCriteria: Dispatch<SetStateAction<SearchCriteria>>
}

export default function FilterList(props: FilterListProps) {

  const setTitle = useCallback((title: string | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      title
    }));
  }, []);

  const setMaxRuntime = useCallback((maxRuntime: number | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      maxRuntime
    }));
  }, []);

  const setMinRuntime = useCallback((minRuntime: number | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      minRuntime
    }));
  }, []);

  const setGenre = useCallback((genre: string | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      genre
    }));
  }, []);

  const setYear = useCallback((year: number | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      year
    }));
  }, []);

  const setMaxRating = useCallback((maxRating: number | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      maxRating
    }));
  }, []);

  const setMinRating = useCallback((minRating: number | undefined) => {
    props.setSearchCriteria(searchCriteria => ({
      ...searchCriteria,
      minRating
    }));
  }, []);


  return (
    <>
      <Filter fieldTitle={"Title"}>
        <TextField value={props.searchCriteria.title} placeholder={"e.g. The GodFather"} setField={setTitle} />
      </Filter>
      <Filter fieldTitle={"Runtime"}>
        <span>More than minutes </span>
        <NumberField
          value={props.searchCriteria.minRuntime}
          min={0}
          max={props.searchCriteria.maxRuntime || 1000}
          placeholder={"Set min runtime minutes"}
          setField={setMinRuntime}
        />
        <span>Less than minutes </span>
        <NumberField
          value={props.searchCriteria.maxRuntime}
          min={props.searchCriteria.minRuntime || 0}
          max={1000}
          placeholder={"Set max runtime minutes"}
          setField={setMaxRuntime}
        />
      </Filter>
      <Filter fieldTitle={"Genre"}>
        <TextField value={props.searchCriteria.genre} placeholder={"e.g. Drama"} setField={setGenre} />
      </Filter>
      <Filter fieldTitle={"Year"}>
        <NumberField
          value={props.searchCriteria.year}
          min={1800}
          max={2500}
          placeholder={"YYYY"}
          setField={setYear}
        />
      </Filter>
      <Filter fieldTitle={"Average Rating"}>
        <span>More than stars </span>
        <NumberField
          value={props.searchCriteria.minRating}
          min={0}
          max={props.searchCriteria.maxRating || 10}
          placeholder={"Set min average rating"}
          setField={setMinRating}
        />
        <span>Less than minutes </span>
        <NumberField
          value={props.searchCriteria.maxRating}
          min={props.searchCriteria.minRating || 0}
          max={10}
          placeholder={"Set max average rating"}
          setField={setMaxRating}
        />
      </Filter>
    </>
  );
}