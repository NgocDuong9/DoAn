import { ReactNode } from "react";
import classes from "./button.submit.module.css";
import { UnstyledButton, UnstyledButtonProps } from "@mantine/core";
import classNames from "classnames";

interface IProps extends UnstyledButtonProps {
  children: ReactNode;
}

function BtnSubmit(props: IProps) {
  const { children, className, ...style } = props;
  return (
    <UnstyledButton className={classNames(classes.btn, className)} {...style}>
      {children}
    </UnstyledButton>
  );
}
export default BtnSubmit;
