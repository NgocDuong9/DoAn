import { Box, Menu } from "@mantine/core";

import { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
  handleSignOut: () => void;
}
export default function DropDown({ children, handleSignOut }: DropdownProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Box
            onClick={handleSignOut}
            className="w-full justify-center items-center text-center text-base cursor-pointer"
          >
            Sign out
          </Box>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
}
