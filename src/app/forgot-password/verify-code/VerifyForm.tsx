"use client";

import { Button } from "@mantine/core";
import { Input } from "@/components/custom/input/input";
import ModalMessage from "@/components/custom/modal/modal-message";
import Validation from "./Validation";
import { useState } from "react";
import { validateOTP } from "@/utils/validation";
import { verifyOTPNew } from "@/apis/client/auth";

export default function VerifyOTPForm({
  phoneNumber,
  setOTP,
  handleNextTab,
}: any) {
  const [value, setValue] = useState<any>({
    phoneNumber: "",
    OTP: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [message, setMessage] = useState("");
  const [errorVerify, setErrorVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleForgot = async () => {
    setErrors(
      Validation({
        ...value,
        OTP: value.OTP.trim(),
      })
    );

    const checkValidation = Validation({
      ...value,
      OTP: value.OTP.trim(),
    });

    if (Object.keys(checkValidation).length === 0) {
      setLoading(true);

      const result = await verifyOTPNew({
        phoneNumber: phoneNumber,
        OTP: value.OTP,
      });

      if (result?.data?.isSuccess) {
        setLoading(false);
        setOTP(value.OTP);
        handleNextTab();
      } else {
        setLoading(false);
        setMessage("OTP không chính xác");
        setErrorVerify(true);
      }
    }
  };
  const handleOnChange = (e: any) => {
    const { name, value: valueTarget } = e.target;
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    let errorMessage = "";
    if (name === "OTP") {
      errorMessage = validateOTP(valueTarget);
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  return (
    <div>
      <div className="flex-col gap-4">
        <div className="flex-1 gap-2 mt-4 mb-8">
          <Input
            value={value?.OTP}
            onChange={handleOnChange}
            id="OTP"
            name="OTP"
            type="OTP"
            placeholder="Nhập mã xác thực"
            required
            label="Mã xác thực"
            labelColor={true}
          />
          {errors.OTP && (
            <p className="p text-[#F8664F] text-xs">{errors.OTP}</p>
          )}{" "}
        </div>

        <Button
          loading={loading}
          disabled={loading}
          onClick={handleForgot}
          className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
        >
          Xác nhận
        </Button>
        {errorVerify && (
          <ModalMessage
            onSubmit={() => setErrorVerify(false)}
            title="Lỗi"
            message={message}
            onCancel={() => {
              // setLoading(false);
              setErrorVerify(false);
            }}
            onOpen={errorVerify}
            onNavigate=""
            type="error"
            navigateTitle="Đóng"
          />
        )}
      </div>
    </div>
  );
}
