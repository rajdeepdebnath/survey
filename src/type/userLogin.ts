import { BaseType } from "./baseType";

export interface UserLogin extends BaseType {
  username: string | null;
  action: string | null;
  password: string | null;
  token: string | null;
}
