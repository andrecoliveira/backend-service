import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create a reservation', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('POST /reservations', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservations')
      .send({
        name: 'André Oliveira',
        phone: '123456',
      })

    expect(response.status).toBe(201)
  })

  test('GET /reservations', async () => {
    const response = await request(app.getHttpServer()).get('/reservations')

    const reservations = response.body
    const names = reservations.map((reservation) => reservation.name)

    expect(names.includes('André Oliveira')).toBeTruthy()
  })
})
