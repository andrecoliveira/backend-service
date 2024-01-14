import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { z } from 'zod'
import { PrismaService } from '@/prisma/prisma.service'
import { CurrentUser } from '@/auth/current-user.decorator'
import { userPayload } from '@/auth/jwt.strategy'

const createRestaurantBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  category: z.string(),
  city: z.string(),
  state: z.string(),
  streetName: z.string(),
  streetNumber: z.string(),
  streetComplement: z.string(),
  zipCode: z.string(),
  schedule: z.string(),
  description: z.string(),
  instagramPath: z.string(),
  websitePath: z.string(),
})

type UserPayload = z.infer<typeof userPayload>
type CreateRestaurantBodySchema = z.infer<typeof createRestaurantBodySchema>

@Controller('restaurants')
@UseGuards(AuthGuard('jwt'))
export class CreateRestaurantController {
  constructor(private prisma: PrismaService) {}

  getRestaurantInformation(userId: string) {
    return this.prisma.basicRestaurantInformation.findFirst({
      where: { userId },
    })
  }

  updateRestaurantInformation(
    restaurantId: string,
    newData: CreateRestaurantBodySchema,
  ) {
    return this.prisma.basicRestaurantInformation.update({
      where: { id: restaurantId },
      data: {
        ...newData,
      },
    })
  }

  createRestaurantInformation(
    userId: string,
    data: CreateRestaurantBodySchema,
  ) {
    return this.prisma.basicRestaurantInformation.create({
      data: { ...data, userId },
    })
  }

  @Get()
  getRestaurants(@CurrentUser() user: UserPayload) {
    return this.prisma.basicRestaurantInformation.findFirst({
      where: { userId: user.sub },
    })
  }

  @Post()
  @HttpCode(201)
  async postRestaurants(
    @Body() body: CreateRestaurantBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const restaurant = await this.getRestaurantInformation(userId)

    if (restaurant) {
      await this.updateRestaurantInformation(restaurant.id, body)
    } else {
      await this.createRestaurantInformation(userId, body)
    }
  }
}
