"use client";

import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

import { Button } from "@mantine/core";
import { navigate } from "@/apis/auth";
import { useEffect } from "react";

interface IData {
  title?: string;
  message?: string;
  navigateTitle?: string;
  onCancel: () => void;
  onSubmit: () => void;
  onOpen: boolean;
  loading?: boolean;
  onNavigate?: string;
  type: "" | "success" | "error";
}
function ModalMessage({
  title,
  message,
  type,
  onCancel,
  onSubmit,
  onOpen,
  loading,
  onNavigate,
  navigateTitle,
}: IData) {
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, [onCancel]);
  const handleNavigate = () => {
    navigate(onNavigate);
    onCancel();
  };
  if (!onOpen) return null;
  return (
    <>
      <div className="fixed top-0 left-0 inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-opacity duration-300 ">
        <div className="bg-white p-5 rounded-md shadow-lg w-[80%] max-w-md mx-auto transition-transform duration-300 transform-gpu flex-col">
          {type && (
            <div className="flex justify-center">
              {type === "success" ? (
                <IconCircleCheck color="green" size={60} />
              ) : (
                <IconCircleX color="red" size={60} />
              )}
            </div>
          )}
          <h1 className="text-3xl text-center py-4 font-bold ">
            {title ? title : ""}
          </h1>
          <p className="text-sm text-center pb-4 font-normal">
            {message ? message : ""}
          </p>
          {onNavigate ? (
            <Button className="w-full " onClick={handleNavigate}>
              {navigateTitle ? navigateTitle : "Đóng"}
            </Button>
          ) : (
            <Button className="w-full" onClick={onCancel}>
              Đóng
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalMessage;
