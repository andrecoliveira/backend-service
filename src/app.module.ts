import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateReservationController } from './controllers/reservation/reservation.controller'
import { CreateRestaurantController } from './controllers/restaurant/restaurant.controller'
import { CreateAccountController } from './controllers/createAccount/create-account.controller'
import { AuthenticateController } from './controllers/login/login.controller'
import { WebhookController } from './controllers/webhook/webhook.controller'
import { WhoamiController } from './controllers/whoami/whoami.controller'
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
    WebhookController,
    WhoamiController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
