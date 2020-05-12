import {required, minLength} from "@rxweb/reactive-form-validators";

export class GrupoTerapeutico{

    id:number;

    @required()
    @minLength({ value: 4 })
    descripcion:string;
}
