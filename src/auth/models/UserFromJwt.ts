export interface UserFromJwt {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  canChangeQa: boolean;
  sendNonConformitiesToEmail: boolean;
  departament_uuid: string | null;
  role_uuid: string | null;
  type_id: number;
  superior_uuid: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
