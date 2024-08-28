import { ReactNode } from "react";

import { Container } from "@mantine/core";

type ITemplateProps = {
  children: ReactNode;
};

const PageTemplate = (props: ITemplateProps) => {
  return <Container>{props.children}</Container>;
};
export default PageTemplate;
