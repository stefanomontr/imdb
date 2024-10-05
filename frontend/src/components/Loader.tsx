import {BarLoader} from "react-spinners";
import classes from "../css/MovieSearch.module.css";

export default function Loader() {
  return (
    <div className={classes.search__spinnerContainer}>
      <BarLoader
        color="#57c2f8"
        loading={true}
        width={"100%"}
        height={"8px"}
      />
    </div>
  );
}