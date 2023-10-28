import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import * as twilio from 'twilio'

const accountSid = 'AC116c33c4b022251d4d1f7aaa56bcd1ce'
const authToken = '3306e1d881634d1bcf703776db46b06a'

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

  @Post('/message/:userID')
  @HttpCode(200)
  async postMessage(@Param('userID') userID: string, @Body() body: any) {
    const client = twilio(accountSid, authToken)

    const account = await this.prisma.reservation.findUnique({
      where: {
        id: userID,
      },
    })

    if (account) {
      await client.messages
        .create({
          body: body.message,
          from: 'whatsapp:+14155238886',
          to: `whatsapp:+55${account.phone}`,
        })
        .then(async () => {
          await this.prisma.reservation.update({
            where: { id: userID },
            data: { status: 'confirmed' },
          })
        })
        .catch((error) => {
          throw new HttpException(
            'Erro ao enviar a mensagem: ' + error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          )
        })
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }
}
