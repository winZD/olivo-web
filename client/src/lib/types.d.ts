import { User } from "../app/models/userSession.model";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt: string;
    user: User;
  }
}
