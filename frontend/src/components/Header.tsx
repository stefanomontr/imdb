import ImdbLogo from "./ImdbLogo.tsx";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.mainHeader}>
      <nav>
        <ImdbLogo/>
      </nav>
    </header>
  );
}