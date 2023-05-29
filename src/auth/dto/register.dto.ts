import { IsEmail, Length } from "class-validator";

export class registerDto {

    @IsEmail()
    email: string;

    @Length(6,30)
    password: string;

    @Length(3,30)
    name: string;

    role?: string;
}