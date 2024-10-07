import {useRef} from "react";

export interface TextFieldProps {
  value: string | undefined;
  placeholder: string;
  setField: (text: string | undefined) => void;
  dataTestId: string;
}

export default function TextField(props: TextFieldProps) {

  const fieldRef = useRef<HTMLInputElement>(null);

  // @ts-expect-error `e` is generic browser event
  const setFieldHandler = e => {
    e.preventDefault();
    const newValue = e.target.value;
    if (newValue && newValue !== props.value) {
      props.setField(newValue)
    } else if (!newValue && props.value) {
      props.setField(undefined);
    }
  };

  return (
    <input
      type="text"
      ref={fieldRef}
      data-test-id={props.dataTestId}
      defaultValue={props.value}
      placeholder={props.placeholder}
      style={{width: '100%'}}
      onBlur={setFieldHandler}
      onKeyDown={e => {
        if (e.key === "Enter") {
          setFieldHandler(e);
        }
      }}
    />
  );
}