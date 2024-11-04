import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
