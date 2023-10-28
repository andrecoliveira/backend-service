import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createReservationBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
})

type CreateReservationBodySchema = z.infer<typeof createReservationBodySchema>

@Controller('reservations')
export class CreateReservationController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getReservations() {
    return this.prisma.user.findMany()
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createReservationBodySchema))
  async postReservations(@Body() body: CreateReservationBodySchema) {
    const { name, phone } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    })

    if (userWithSameEmail)
      throw new ConflictException('User with same email already exists')

    await this.prisma.user.create({
      data: {
        name,
        phone,
      },
    })
  }
}
