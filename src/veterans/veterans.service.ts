import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VeteranEntity } from './veteran.entity';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import {path} from 'app-root-path';
import {ensureDir, writeFile} from 'fs-extra'

@Injectable()
export class VeteransService {

    constructor(
        @InjectRepository(VeteranEntity)
        private readonly veteranRepository: Repository<VeteranEntity>
    ){}

    async addVeteran(request: VeteranEntity){
        if(!request) throw new BadRequestException("Поля не заполнены")
        const newVeteran =  this.veteranRepository.create(request)
        const veteran = await this.veteranRepository.save(newVeteran)
        return "Ветеран успешно добавлен"
    }

    async deleteVeteran(id: number){
        const deleted = await this.veteranRepository.delete(id)
        if(!deleted.affected) throw new NotFoundException(`Ветерана с id ${id} нет`)
        return `Ветеран с id ${id} успешно удалён`
    }

    async updateVeteran(id: number, request: VeteranEntity){
        if(!request) throw new BadRequestException("Поля не заполнены")
        const updated = await this.veteranRepository.update(id, request)
        if(!updated.affected) throw new NotFoundException(`Ветерана с id ${id} нет`)
        return `Ветеран с id ${id} успешно обновлён`
    }

    async getAllWithPagination(page: number, limit: number){
        const veterans = await this.veteranRepository.find({
            order: {
                surname: "ASC"
            },
            take: limit,
            skip: (page-1) * limit
        })
        if(!veterans) throw new NotFoundException("Ветеранов нет")
        return veterans
    }

    async getAll(){
        const veterans =  this.veteranRepository.find({
            order: {
                surname: "ASC"
            }
        })
        if(!veterans) throw new NotFoundException("Ветеранов нет")
        return veterans
    }

    async saveMedia(mediaFile: Express.Multer.File, id: number, folder= 'default'){
        const uploadFolder = `${path}/uploads/${folder}`
        await ensureDir(uploadFolder)
        await writeFile(
            `${uploadFolder}/${mediaFile.originalname}`,
            mediaFile.buffer
        )
        const url = `https://veterans-backend.onrender.com/uploads/${folder}/${mediaFile.originalname}`
        const veteran = await this.veteranRepository.update(+id, {imagePath: url})
        return veteran
    }

}
