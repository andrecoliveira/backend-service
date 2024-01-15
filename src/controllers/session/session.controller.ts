import {
  Controller,
  HttpCode,
  Get,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { AuthGuard } from '@/auth/auth.guard'

@Controller('/session')
@UseGuards(AuthGuard)
export class SessionController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  async handle(@Req() req) {
    const { sub: userId } = req.user

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    return {
      email: user.email,
      role: user.role,
    }
  }
}
