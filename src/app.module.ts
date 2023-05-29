import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { VeteransModule } from './veterans/veterans.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModule
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    FeedbackModule,
    VeteransModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
