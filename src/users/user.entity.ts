import { FeedBackEntity } from "src/feedback/feedback.entity";
import { BaseEntity } from "src/utils/base.entity";
import {Column, Entity, OneToMany} from "typeorm"

@Entity("users")
export class UserEntity extends BaseEntity {

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column() 
    name: string;

    @Column({default: "USER"})
    role?: string;

    @Column({default: './image/avatar.png'})
    avatatPath?: string;

    @OneToMany(() => FeedBackEntity, feed => feed.userId)
    feedBack: FeedBackEntity[];

}