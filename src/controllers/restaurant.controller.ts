import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

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
export class CreateRestaurantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getRestaurants() {
    return this.prisma.basicRestaurantInformation.findMany()
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
  async uploadFile(@UploadedFile() file) {
    const filePath = `/uploads/${file.filename}`
    await this.prisma.basicRestaurantInformation.create({
      data: { profileImage: filePath },
    })
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createRestaurantBodySchema))
  async postRestaurants(@Body() body: CreateRestaurantBodySchema) {
    await this.prisma.basicRestaurantInformation.create({
      data: { ...body },
    })
  }
}
