import { formatNumber } from "../../libs/ultis";
import { Card } from "../../types/product";

const CardWatch = ({ props }: { props: Card }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <img src={props.img} className="w-full" />
        <div className="absolute w-12 h-12 right-4 top-4 rounded-full bg-red-500 text-white">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap">
            {props.discount}
            <span>%</span>
          </p>
        </div>
      </div>
      <p className="text-xl text-center">{props.name}</p>
      <p className="text-xs text-gray-600 text-center">{props.description}</p>
      <p className="text-xs text-center line-through text-gray-500">
        {formatNumber(props.price)}
      </p>
      <p className="text-xl  text-center text-red-500">
        {formatNumber(props.price - (props.price * props.discount) / 100)}
      </p>
    </div>
  );
};

export default CardWatch;
