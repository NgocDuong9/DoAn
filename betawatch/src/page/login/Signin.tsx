import { Button, Form, FormProps, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createUser } from "../../api/auth";

type FieldType = {
  username: string;
  password: string;
  email: string;
  repassword?: string;
};

const Signin = () => {
  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState<{ [s: string]: string }>({});

  const usernameWatch = Form.useWatch("username", form);
  const passwordWatch = Form.useWatch("password", form);
  const repasswordWatch = Form.useWatch("repassword", form);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.password !== values.repassword) {
      setErrorFields({
        name: "repassword",
        error: "Mật khẩu không khớp",
      });
      return;
    }

    try {
      await createUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Success:", values);
  };

  useEffect(() => {
    setErrorFields({});
  }, [usernameWatch, passwordWatch, repasswordWatch]);

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
    <div className=" ">
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
            help={
              errorFields["name"] === "username"
                ? errorFields["error"]
                : undefined
            }
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            help={
              errorFields["name"] === "email" ? errorFields["error"] : undefined
            }
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item<FieldType>
            help={
              errorFields["name"] === "password"
                ? errorFields["error"]
                : undefined
            }
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            help={
              errorFields["name"] === "repassword"
                ? errorFields["error"]
                : undefined
            }
            label="Nhập lại mật khẩu"
            name="repassword"
            rules={[{ required: true, message: "Vui lòng nhập lại password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end">
            <p
              className="text-blue-500"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </p>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
