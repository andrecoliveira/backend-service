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
    console.log('BODY: ', body)

    if (body.phone === '558597496471' && body.text.message === 'webhook') {
      try {
        const response = await instance.post(
          'https://api.z-api.io/instances/3C9395131E4380A8AC883A6238F22DFA/token/254F6FD8A40E02F2C93DE806/send-text',
          {
            phone: body.phone,
            message: 'É isso aí Felipe, agora o negócio está automático.',
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
