import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common'

@Controller('webhook')
export class WebhookController {
  @Post()
  @HttpCode(200)
  async sendMessage(@Body() body: any, @Response() res: any) {
    console.log(body)

    res.send({ message: 'ok' })
  }
}
