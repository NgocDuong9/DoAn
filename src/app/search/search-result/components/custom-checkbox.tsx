import "./styles.css";

import { Checkbox } from "@mantine/core";

export function CustomCheckbox(props: any) {
  return <Checkbox {...props} classNames={{ input: "custom-checkbox" }} />;
}
