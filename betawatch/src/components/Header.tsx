import type { MenuProps } from "antd";
import { Image, Menu } from "antd";
import { useLocation, useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "/home",
  },
  {
    label: "Thương hiệu",
    key: "/brand",
  },
  {
    label: "Đồng hồ nam",
    key: "/male",
    children: [
      {
        label: "Item 1",
        key: "/male-1",
      },
      {
        label: "Item 2",
        key: "/male-2",
      },
    ],
  },
  {
    label: "Đồng hồ nữ",
    key: "/female",
    children: [
      {
        label: "Item 1",
        key: "/female-1",
      },
      {
        label: "Item 2",
        key: "/female-2",
      },
    ],
  },
  {
    label: "Cặp đôi",
    key: "/couple",
  },
  {
    label: "Sửa chữa",
    key: "/repair",
  },
  {
    label: "Phụ kiện",
    key: "/accessory",
  },
  {
    label: "Đăng nhập",
    key: "/login",
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <div className="flex w-full justify-center gap-3 bg-white py-3">
      <Image
        src="/image/logo-nt.png"
        preview={false}
        className="max-w-[50px] bg-white"
      />

      <Menu
        onClick={onClick}
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items}
        className="min-w-[800px]"
        // style={{ minWidth: 0 }}
      />
    </div>
  );
};

export default Header;
