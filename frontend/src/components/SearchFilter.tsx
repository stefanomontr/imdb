import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandIcon from "./ExpandIcon.tsx";
import {PropsWithChildren} from "react";

export interface FilterProps {
  fieldTitle: string;
}

export default function SearchFilter(props: PropsWithChildren<FilterProps>) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography fontWeight={"bold"}>{props.fieldTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
}