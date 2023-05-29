import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { FeedBackEntity } from './feedback.entity';
import { addDto } from './dto/add.dto';

@Injectable()
export class FeedbackService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(FeedBackEntity)
        private readonly feedbackRepository: Repository<FeedBackEntity>,
    ){}

    async addFeedback(id: number, request: addDto){
        const feedBack = this.feedbackRepository.create({
            title: request.title,
            description: request.description,
            userId: {id}
        })
        await this.feedbackRepository.save(feedBack)
        return "Успешно отправлено"
    }

    async deleteFeedBack(id: number){
        const deleted = await this.feedbackRepository.delete(id)
        if(!deleted.affected) throw new NotFoundException("Не найдено")
        return "Успешно удалено"
    }

    async getAll(){
        const feedback = await this.feedbackRepository.find({
            relations: {
                userId: true
            }
        })
        if(!feedback) throw new NotFoundException("Обратной связи нет")
        return feedback
    }
}
