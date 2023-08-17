// export interface Auth{
//   message?: string;
//   success?: boolean;
//   user?:AuthN;
//   token:string;
//   // email:string;
// }
export interface AuthN{
  name:string
  email:string
}





export interface Auth {
  id?: number;
  email: string;
  user?:AuthN;
  password?: string;
  profil_id?: number | null;
  uuid?: string;
  resetToken?: string | null;
  resetTokenExpiration?: Date | null;
}
