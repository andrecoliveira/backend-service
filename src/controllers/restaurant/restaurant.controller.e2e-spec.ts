import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create restaurant information', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('POST /restaurants', async () => {
    const response = await request(app.getHttpServer())
      .post('/restaurants')
      .send({
        name: 'Doc bar',
        phone: '85999999992',
        category: 'bar',
        city: 'São Paulo',
        state: 'SP',
        streetName: 'Rua dos bobos',
        streetNumber: '10',
        streetComplement: 'Apto 10',
        zipCode: '00000000',
        schedule: '10:00-22:00',
        description: 'Barzinho da esquina',
        instagramPath: 'https://www.instagram.com/docbar',
        websitePath: 'https://www.docbar.com.br',
      })

    expect(response.status).toBe(201)
  })

  test('GET /restaurants', async () => {
    const response = await request(app.getHttpServer()).get('/restaurants')

    const reservations = response.body
    const names = reservations.map((reservation) => reservation.name)

    expect(names.includes('Doc bar')).toBeTruthy()
  })
})
