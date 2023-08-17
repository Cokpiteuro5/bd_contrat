export interface Programme {
  id?: number;
  nomprog: string;
  deletedAt?: Date | null;
  createdAt?: Date | null;
  updatedAt?:Date | null ;
}
export interface ApiProgramme {
  programme?: Programme;
  success?: boolean;
}
