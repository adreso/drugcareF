import {required, minLength} from "@rxweb/reactive-form-validators";

export class Propiedad{

    id:number;

    @required()
    @minLength({ value: 4 })
    descripcion:string;
    
    @required()
    @minLength({ value: 4 })
    categoria:string;
}