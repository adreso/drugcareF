import { TiposID, Sexo } from '../../config/enums';

export class Tercero {
    identificacion:string='';
    tipoidentificacion:TiposID=TiposID.CC;
    pnombre:string='';
    snombre:string='';
    papellido:string='';
    sapellido:string='';
    sexo:Sexo=null;
    fechanacimiento:Date=null;
    direccion:string='';
    telefono:string='';
    email:string='';
    foto:string='';
    estado:boolean=true;

}

export const fullName = (tercero:Tercero) => {
    return tercero.pnombre;
    // return tercero.pnombre +' ' + tercero.snombre || null + ' ' + tercero.papellido + tercero.sapellido || null;
}