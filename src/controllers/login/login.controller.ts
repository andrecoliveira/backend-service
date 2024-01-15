import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { compare } from 'bcryptjs'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/login')
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = authenticateBodySchema.parse(body)

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const accessTokenPayload = { sub: user.id }

    const accessToken = this.jwt.sign(accessTokenPayload)
    const refreshToken = this.jwt.sign(accessTokenPayload, { expiresIn: '7d' })

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }
}
