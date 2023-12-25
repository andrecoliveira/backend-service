import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createReservationBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
})

type CreateReservationBodySchema = z.infer<typeof createReservationBodySchema>

@Controller('reservations')
@UseGuards(AuthGuard('jwt'))
export class CreateReservationController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getReservations() {
    return this.prisma.reservation.findMany()
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createReservationBodySchema))
  async postReservations(@Body() body: CreateReservationBodySchema) {
    const { name, phone } = body

    await this.prisma.reservation.create({
      data: {
        name,
        phone,
      },
    })
  }
}
