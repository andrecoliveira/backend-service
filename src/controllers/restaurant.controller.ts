import { Body, Controller, Get, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

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

type CreateRestaurantBodySchema = z.infer<typeof createRestaurantBodySchema>

@Controller('restaurants')
export class CreateRestaurantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getRestaurants() {
    return this.prisma.basicRestaurantInformation.findMany()
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createRestaurantBodySchema))
  async postRestaurants(@Body() body: CreateRestaurantBodySchema) {
    await this.prisma.basicRestaurantInformation.create({
      data: {
        name: body.name,
        phone: body.phone,
        category: body.category,
        city: body.city,
        state: body.state,
        streetName: body.streetName,
        streetNumber: body.streetNumber,
        streetComplement: body.streetComplement,
        zipCode: body.zipCode,
        schedule: body.schedule,
        description: body.description,
        instagramPath: body.instagramPath,
        websitePath: body.websitePath,
      },
    })
  }
}
