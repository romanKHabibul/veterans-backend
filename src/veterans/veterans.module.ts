import { Module } from '@nestjs/common';
import { VeteransService } from './veterans.service';
import { VeteransController } from './veterans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeteranEntity } from './veteran.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VeteranEntity])
  ],
  controllers: [VeteransController],
  providers: [VeteransService]
})
export class VeteransModule {}
