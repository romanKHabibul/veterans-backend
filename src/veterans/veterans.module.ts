import { Module } from '@nestjs/common';
import { VeteransService } from './veterans.service';
import { VeteransController } from './veterans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeteranEntity } from './veteran.entity';
import {ServeStaticModule} from "@nestjs/serve-static"
import {path} from 'app-root-path';

@Module({
  imports: [
    TypeOrmModule.forFeature([VeteranEntity]),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    })
  ],
  controllers: [VeteransController],
  providers: [VeteransService]
})
export class VeteransModule {}
