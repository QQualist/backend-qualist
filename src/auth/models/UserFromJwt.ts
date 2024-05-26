export interface UserFromJwt {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  canChangeQa: boolean;
  sendNonConformitiesToEmail: boolean;
  departament_uuid: string;
  creator_uuid: string;
  role_uuid: string;
  type_id: number;
  superior_uuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
