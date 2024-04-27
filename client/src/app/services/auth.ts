import axios from "axios";

const strapiUrl = process.env.STRAPI_URL;

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axios.post(`$http://localhost:1337/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
