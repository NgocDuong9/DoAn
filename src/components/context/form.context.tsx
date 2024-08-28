import { ReactNode } from "react";

import { createFormContext, UseFormReturnType } from "@mantine/form";

type IFormContextProps = {
  form: UseFormReturnType<unknown, (values: unknown) => unknown>;
  children: ReactNode;
};

const [FormProvider, useFormContext, useContextForm] = createFormContext();
function FormContext(props: IFormContextProps) {
  return <FormProvider form={props.form}>{props.children}</FormProvider>;
}
export { FormContext, useFormContext, useContextForm };
