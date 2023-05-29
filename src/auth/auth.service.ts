import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import { UserEntity } from 'src/users/user.entity';
import {Repository} from 'typeorm'
import {JwtService} from '@nestjs/jwt'
import { loginDto } from './dto/login.dto';
import * as bcrypt from "bcryptjs"
import { registerDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private readonly jwtService: JwtService
    ){}

    async register(request: registerDto){
        const oldUser = await this.userRepository.findOneBy({email: request.email})
        if(oldUser) throw new BadRequestException(`Почта ${request.email} уже используется`)
        const newUser = this.userRepository.create({
            email: request.email,
            password: await bcrypt.hash(request.password, 7),
            name: request.name,
            role: request.role, 
        })
        const user = await this.userRepository.save(newUser) 
        return {
            user: this.returnUserFields(user),
            accessToken: await this.issueAccessToken(user.id)
        }
    }

    async login(request: loginDto){
        const user = await this.validateUser(request)
        return {
            user: this.returnUserFields(user),
            accessToken: await this.issueAccessToken(user.id)
        }
    }

    async validateUser(request: loginDto){
        const user = await this.userRepository.findOne({
            where: {
                email: request.email
            },
            select: ['id', 'email', 'password']
        })
        if(!user) throw new NotFoundException(`Пользователя с почтой ${request.email} не существует`)
        const isValid = await bcrypt.compare(request.password, user.password)
        if(!isValid) throw new BadRequestException("Не верный пароль")
        return user
    }

    async issueAccessToken(userId: number){
        const data = {
            id: userId
        }
        return await this.jwtService.signAsync(data, {expiresIn: "24h"})
    }

    returnUserFields(user: UserEntity){
        return {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }
}
