import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from 'typeorm'
import { UserEntity } from './user.entity';
import {path} from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async getAll(){
        const users = await this.userRepository.find({
            where: {

            },
            relations: {
                feedBack: true
            }
        })
        if(!users) throw new NotFoundException("Пользователей нет")
        return users
    }

    async getById(id: number){
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                feedBack: true
            }
        })
        if(!user) throw new NotFoundException(`Пользователя с id ${id} нет`)
        return user
    }

    async deleteUser(id: number){
        const deleted = await this.userRepository.delete(id)
        if(!deleted.affected) throw new NotFoundException(`Пользователя с id ${id} нет`)
        return `Пользователь с id ${id} удалён`
    }

    async updateUser(id: number, request: UserEntity){
        const updated = await this.userRepository.update(id, request)
        if(!updated.affected) throw new NotFoundException(`Пользователя с id ${id} нет`)
        return `Пользователь с id ${id} обновлён`
    }

    async saveMedia(mediaFile: Express.Multer.File, id: number, folder= 'default'){
        const uploadFolder = `${path}/uploads/${folder}`
        await ensureDir(uploadFolder)
        await writeFile(
            `${uploadFolder}/${mediaFile.originalname}`,
            mediaFile.buffer
        )
        const url = `https://veterans-backend.onrender.com/uploads/${folder}/${mediaFile.originalname}`
        const user = await this.userRepository.update(+id, {avatatPath: url})
        return user
    }

}

