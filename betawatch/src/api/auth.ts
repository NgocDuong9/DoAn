import axios from "axios";
import { User } from "../types/user";
import { supabase } from "../libs/supabase/client";

const apiUrl = import.meta.env.VITE_API_URL;

export async function createUser(user: User) {
  console.log({ apiUrl });

  const newUser = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  console.log(newUser);

  return newUser;
}
