import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState<{ [s: string]: string }>({});

  const usernameWatch = Form.useWatch("username", form);
  const passwordWatch = Form.useWatch("password", form);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    //TODO Call Api
    console.log("Success:", values);
  };

  useEffect(() => {
    setErrorFields({});
  }, [usernameWatch, passwordWatch]);

  const customizeRequiredMark = useCallback(
    (label: React.ReactNode, { required }: { required: boolean }) => (
      <>
        {label}
        &nbsp;
        {required ? <span style={{ color: "red" }}>*</span> : undefined}
      </>
    ),
    []
  );
  const navigate = useNavigate();

  return (
    <div className="">
      <img src="/image/logo-new.png" className="w-36 mx-auto py-5" alt="" />

      <div className="max-w-[600px] mx-auto border pt-6 px-6 rounded-xl">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark={customizeRequiredMark}
        >
          <Form.Item<FieldType>
            label="Tên đăng nhập"
            name="username"
            help={
              errorFields["name"] === "username"
                ? errorFields["error"]
                : undefined
            }
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            help={
              errorFields["name"] === "password"
                ? errorFields["error"]
                : undefined
            }
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <p
              className="text-blue-500"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Đăng ký
            </p>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
