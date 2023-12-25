import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateReservationController } from './controllers/reservation.controller'
import { CreateRestaurantController } from './controllers/restaurant.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate-controller'
import { AuthModule } from './auth/auth.module'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateReservationController,
    CreateRestaurantController,
    CreateAccountController,
    AuthenticateController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
