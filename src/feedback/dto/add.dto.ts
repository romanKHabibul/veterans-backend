import { Length } from "class-validator";


export class addDto {

    @Length(10,50)
    title: string;

    @Length(50,1500)
    description: string;

}