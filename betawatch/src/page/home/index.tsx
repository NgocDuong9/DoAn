import { Carousel, Col, Row } from "antd";
import ChuyenGia from "../../assets/svg/ChuyenGia";
import NumberOne from "../../assets/svg/NumberOne";
import Dolar from "../../assets/svg/Dolar";
import { Card } from "../../types/product";
import CardWatch from "../../components/card/CardWatch";

const bgURL = [
  "/image/banner/bg-0.jpg",
  "/image/banner/bg-1.jpg",
  "/image/banner/bg-2.jpg",
];

const svgURL = [
  {
    icon: <ChuyenGia />,
    title: "Chuyên gia thẩm định",
    desc: "Đồng hồ thật giả",
  },
  {
    icon: <NumberOne />,
    title: "Đơn vị số 1 về",
    desc: "Bảo hành, hậu mãi",
  },
  {
    icon: <Dolar />,
    title: "Đền gấp 10 lần",
    desc: "Nếu phát hiện fake",
  },
];

const fakeWatch: Card[] = [
  {
    img: "/image/op.jpg",
    name: "OP990-45ADGS-GL-T",
    description: "OP Olym Pianus - Olympia Star Nam - 42mm - Kính Sapphire",
    price: 7960000,
    discount: 10,
  },

  {
    img: "/image/op.jpg",
    name: "OP990-45ADGS-GL-T",
    description: "OP Olym Pianus - Olympia Star Nam - 42mm - Kính Sapphire",
    price: 7960000,
    discount: 10,
  },
  {
    img: "/image/op.jpg",
    name: "OP990-45ADGS-GL-T",
    description: "OP Olym Pianus - Olympia Star Nam - 42mm - Kính Sapphire",
    price: 7960000,
    discount: 10,
  },
  {
    img: "/image/op.jpg",
    name: "OP990-45ADGS-GL-T",
    description: "OP Olym Pianus - Olympia Star Nam - 42mm - Kính Sapphire",
    price: 7960000,
    discount: 10,
  },
  {
    img: "/image/op.jpg",
    name: "OP990-45ADGS-GL-T",
    description: "OP Olym Pianus - Olympia Star Nam - 42mm - Kính Sapphire",
    price: 7960000,
    discount: 10,
  },
  {
    img: "/image/op.jpg",
    name: "OP990-45ADGS-GL-T",
    description: "OP Olym Pianus - Olympia Star Nam - 42mm - Kính Sapphire",
    price: 7960000,
    discount: 10,
  },
];

const Home = () => (
  <div className="w-full max-w-main mx-auto flex flex-col gap-y-4">
    <Carousel autoplay>
      {bgURL.map((item, idx) => (
        <div key={idx} className="">
          <img src={item} alt={item} className="mx-auto w-full" />
        </div>
      ))}
    </Carousel>
    <div className="flex justify-between mx-auto min-w-[700px] bg-slate-200 py-3 px-6 relative z-10">
      {svgURL.map((item, idx) => (
        <div
          className="flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 "
          key={idx}
        >
          <div
            className={` ${idx === 1 ? " w-12" : " w-16"} min-h-16 h-[70px]`}
          >
            {item.icon}
          </div>
          <p className="uppercase font-bold">{item.title}</p>
          <p className="uppercase ">{item.desc}</p>
        </div>
      ))}
    </div>
    <h1 className="relative text-center mt-1">
      <span className="z-10 relative bg-white px-2 text-5xl">
        Sản phẩm nổi bật
      </span>
      <span className="absolute inset-0 border-t-2 border-gray-300 top-2/3 transform -translate-y-1/2"></span>
    </h1>
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
      {fakeWatch.map((item, idx) => (
        <div key={idx}>
          <CardWatch props={item} />
        </div>
      ))}
    </div>
  </div>
);

export default Home;
