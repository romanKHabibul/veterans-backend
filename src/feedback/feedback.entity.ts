import { UserEntity } from "src/users/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("FeedBack")
export class FeedBackEntity extends BaseEntity {

    @Column() 
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, user => user.feedBack, {onDelete: 'CASCADE'})
    @JoinColumn({name: "user_id"})
    userId: UserEntity;
}