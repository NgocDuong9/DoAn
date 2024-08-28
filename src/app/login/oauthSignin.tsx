"use client";

import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";

import { Box } from "@mantine/core";
import { Provider } from "@supabase/supabase-js";
import { oAuthSignIn } from "@/apis/auth";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "facebook",
      displayName: "Facebook",
      icon: <IconBrandFacebook className="size-5" />,
    },
    {
      name: "google",
      displayName: "Google",
      icon: <IconBrandGoogle className="size-5" />,
    },
  ];

  return (
    <>
      <div className="flex justify-center gap-2 cursor-pointer">
        {/* <Button
          className="flex-1 items-center justify-center gap-2 border-[#717171] text-[#717171]"
          variant="outline"
          onClick={async () => {
            // await oAuthSignIn(oAuthProviders[0].name);
          }}
        >
          {oAuthProviders[0].icon}
          {oAuthProviders[0].displayName}
        </Button> */}
        <Box
          className="flex items-center justify-center gap-2 bg-white p-2 rounded-xl"
          // variant="outline"
          onClick={async () => {
            await oAuthSignIn(oAuthProviders[1].name);
          }}
        >
          <img src="/icons/google-logo.png" width={24} />
        </Box>
      </div>
    </>
  );
}
