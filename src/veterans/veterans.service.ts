import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VeteranEntity } from './veteran.entity';
import { Repository } from 'typeorm';

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
                surname: "DESC"
            },
            take: limit,
            skip: (page-1) * limit
        })
        if(!veterans) throw new NotFoundException("Ветеранов нет")
        return veterans
    }

    async getAll(){
        const veterans = await this.veteranRepository.find()
        if(!veterans) throw new NotFoundException("Ветеранов нет")
        return veterans
    }

}
