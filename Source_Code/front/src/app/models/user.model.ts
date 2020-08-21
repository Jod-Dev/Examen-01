

export class User {
  constructor (
    public nombre: string,
    public apellido: string,
    public tel: number,
    public email: string,
    public pass?: string,
    public google?: boolean,
    public role?: string,
    public unique_id?: string,
  ){}
}
