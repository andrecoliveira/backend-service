import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common'
import axios from 'axios'

const instance = axios.create({
  baseURL:
    'https://api.z-api.io/instances/3C9395131E4380A8AC883A6238F22DFA/token/254F6FD8A40E02F2C93DE806/send-text',
  timeout: 1000,
  headers: { 'client-token': 'Ff854860376ba486db3656fb87afcc396S' },
})

@Controller('webhook')
export class WebhookController {
  @Post()
  @HttpCode(200)
  async sendMessage(@Body() body: any, @Response() res: any) {
    const {
      phone,
      text: { message },
    } = body

    if (phone === '558588850088' && message === 'oi') {
      try {
        const response = await instance.post(
          'https://api.z-api.io/instances/3C9395131E4380A8AC883A6238F22DFA/token/254F6FD8A40E02F2C93DE806/send-text',
          {
            phone,
            message: 'Olá, tudo bem minha gatinha?',
          },
        )

        console.log('Mensagem enviada com sucesso:', response.data)
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
      }
    }

    res.send({ message: 'ok' })
  }
}
