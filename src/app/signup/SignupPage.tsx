import { Box, Text } from "@mantine/core";

import { Card } from "@/components/custom/card/card";
import Link from "next/link";
import { OAuthButtons } from "../login/oauthSignin";
import Signup from "./Signup";

function SignupPage() {
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <Card className="mx-auto min-w-[600px] py-10 px-8">
        <Box>
          <Text className="text-3xl text-center uppercase font-bold">
            Đăng ký tài khoản
          </Text>
        </Box>
        <Box className="flex flex-col gap-4">
          <Signup />
          <div className="border-t"></div>
          <label className="text-sm text-center">Hoặc tiếp tục với</label>
          <OAuthButtons />
          <div className="border-t"></div>
          <div className="text-center text-sm">
            Bạn đã có tài khoản?{" "}
            <Link href="login" className="text-[#F8664F]">
              Đăng nhập
            </Link>
          </div>
        </Box>
      </Card>
    </section>
  );
}

export default SignupPage;
