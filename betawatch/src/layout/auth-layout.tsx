import { Flex } from "antd";
import { Outlet } from "react-router";

interface Props {
  overwrite?: JSX.Element;
  title?: string;
}

export const AuthLayout = ({ overwrite, title = "Trolyoto!" }: Props) => {
  return (
    <Flex
      style={{ height: "100vh", width: "100wh", backgroundColor: "#f8f8fb" }}
      justify="center"
    >
      <div>
        <Outlet />
        {overwrite}
      </div>
    </Flex>
  );
};
