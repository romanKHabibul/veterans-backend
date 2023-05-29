import {ConfigService} from "@nestjs/config"
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const getTypeOrmModule = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: "postgres",
    url: configService.get("DB_URL"),
    entities: [],    
    autoLoadEntities: true, 
    synchronize: true   
})