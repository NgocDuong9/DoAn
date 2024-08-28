export type ISignIn = { email: string; password: string };
export type IProfile = {
  app_meta: { profile: string };
  aud: string;
  email: string;
  id: string;
  phone: string;
  role: string;
};
