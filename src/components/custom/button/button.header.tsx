import Link, { LinkProps } from "next/link";

import { Text } from "@mantine/core";
import classes from "./button.header.module.css";

interface IProps extends LinkProps {
  title: string;
  active?: boolean;
  color?: string;
}

const BtnHeader = ({
  title,
  active = false,
  color = "#fff",
  ...linkProps
}: IProps) => {
  return (
    <Link {...linkProps}>
      <button aria-current={active} className={classes.button_header}>
        <Text size="16px" className="cursor-pointer" fw={500} c={color}>
          {title}
        </Text>
      </button>
    </Link>
  );
};
export default BtnHeader;
