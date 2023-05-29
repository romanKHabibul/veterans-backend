import {ConfigService} from "@nestjs/config"
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const getTypeOrmModule = async (configService: ConfigService) :Promise<TypeOrmModuleOptions> => ({
    type: "postgres",
    host: "localhost",
    port: configService.get("PORT"),
    username: configService.get("USER"),
    password: configService.get("PASSWORD"),
    database: configService.get("DATABASE"),
    entities: [],
    autoLoadEntities: true,
    synchronize: true
})