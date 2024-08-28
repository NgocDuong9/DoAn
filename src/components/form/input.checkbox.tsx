import { InputHTMLAttributes } from "react";
import { useFormContext } from "../context/form.context";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

function CheckboxInputForm(props: IProps) {
  const form = useFormContext();

  return (
    // <Checkbox
    //   name={name}
    //   className={cn(className)}
    //   ref={ref}
    //   // defaultChecked={props?.defaultChecked}
    //   {...props}
    //   {...form.getInputProps(name, { type: "checkbox" })}
    // />
    <></>
  );
}

export default CheckboxInputForm;
