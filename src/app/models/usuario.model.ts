export class Usuario {
  constructor(
    public usuario: string,
    public password: string,
    public role: number,
    public id?: number
  ){

  }
}
