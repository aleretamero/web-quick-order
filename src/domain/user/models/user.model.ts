import { Role } from "@/domain/user/enums/role.enum";

export interface UserModel {
  id: string;
  email: string;
  role: Role;
}
