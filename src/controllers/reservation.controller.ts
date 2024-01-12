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
import axios from 'axios'

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

    try {
      const response = await axios.post(
        'https://api.z-api.io/instances/3C9395131E4380A8AC883A6238F22DFA/token/254F6FD8A40E02F2C93DE806/send-text',
        {
          phone,
          message: name,
        },
        {
          headers: {
            Authorization: 'Bearer 254F6FD8A40E02F2C93DE806',
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('Mensagem enviada com sucesso:', response.data)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }

    await this.prisma.reservation.create({
      data: {
        name,
        phone,
      },
    })
  }
}
