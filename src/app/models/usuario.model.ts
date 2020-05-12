import { Tercero } from './generales/terceros.models';
import { Role } from './configuraciones/roles.model';
export class Usuario {
  public usuario: string ='';
  public password: string='';
  public role: Role=new Role();
  public id: number=null;
  public tercero:Tercero=new Tercero();
}
