import { Suspense } from "react";
import CarManagePage from "./CarManagePage";

const CarDetail = () => {
  return (
    <Suspense>
      <CarManagePage />
    </Suspense>
  );
};

export default CarDetail;
