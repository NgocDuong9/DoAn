import { Image } from "antd";
import { Card } from "../../types/product";

const CardWatch = (props: Card) => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Image src={props.img} />
        <div className="absolute w-7 h-7 right-4 top-4 rounded-2xl bg-red-500 text-white">
          {props.discount}
        </div>
      </div>
      <p className="text-xl">{props.name}</p>
      <p className="text-xs text-gray-600">{props.description}</p>
    </div>
  );
};

export default CardWatch;
