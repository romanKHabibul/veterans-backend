import { IsEmail, Length } from "class-validator";

export class loginDto {

    @IsEmail()
    email: string;

    @Length(6,30)
    password: string;

}