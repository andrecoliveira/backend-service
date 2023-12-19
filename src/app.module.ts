import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateReservationController } from './controllers/reservation.controller'
import { CreateRestaurantController } from './controllers/restaurant.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    CreateReservationController,
    CreateRestaurantController,
    CreateAccountController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
