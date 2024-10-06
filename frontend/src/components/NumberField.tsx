export interface NumberFieldProps {
  value: number | undefined;
  min: number;
  max: number;
  placeholder: string;
  setField: (num: number | undefined) => void;
  dataTestId: string;
}

export default function NumberField(props: NumberFieldProps) {

  // @ts-expect-error `e` is generic browser event
  const setFieldHandler = e => {
    e.preventDefault();
    const newValue = e.target.value && Number(e.target.value);
    if (newValue && newValue !== props.value) {
      props.setField(Number(e.target.value));
    } else if (!newValue && props.value) {
      props.setField(undefined);
    }
  };

  return (
    <input
      type="number"
      data-testid={props.dataTestId}
      min={props.min}
      max={props.max}
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