import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '@/auth/current-user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { get } from 'node:http'

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

const uploadProfileImageSchema = z.object({
  file: z.custom<File>(),
})

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

  @Post('upload')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(uploadProfileImageSchema))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const [, extension] = file.originalname.split('.')
          const uniqueSuffix = `${uuidv4()}.${extension}`
          cb(null, uniqueSuffix)
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @CurrentUser() user: UserPayload) {
    // console.log(file)
    // const filePath = `/uploads/${file.filename}`
    // const userId = user.sub
    // const restaurant = await this.getRestaurantInformation(userId)
    // if (restaurant) {
    // }
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
