import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";

@Entity("veterans")
export class VeteranEntity extends BaseEntity {

    @Column({default: "НЕИЗВЕСТНО"})
    surname?: string;

    @Column({default: "НЕИЗВЕСТНО"})
    name?: string;

    @Column({default: "НЕИЗВЕСТНО"})
    patronomyc?: string;

    @Column({default: "НЕИЗВЕСТНО"})
    dates?: string;

    @Column({default: "НЕИЗВЕСТНО"})
    grades?: string;

    @Column({default: "НЕИЗВЕСТНО"})
    description?: string;

    @Column({default: "./image/soldier.png"})
    imagePath?: string;
}