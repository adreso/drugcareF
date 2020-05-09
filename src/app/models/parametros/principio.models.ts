import {required, minLength} from "@rxweb/reactive-form-validators";

export class Principio{

    id:number;

    @required()
    @minLength({ value: 4 })
    nombre:string;
}