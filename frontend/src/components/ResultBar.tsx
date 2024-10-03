import SearchSorting from "./SearchSorting.tsx";
import ResultCount from "./ResultCount.tsx";
import border from "../utils/css-utils.ts";

export default function ResultBar() {
  return (
    <div className={border()}>
      <ResultCount />
      <SearchSorting />
    </div>
  );
}