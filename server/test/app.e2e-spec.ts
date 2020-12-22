import * as request from 'supertest'

const app = 'http://localhost:3000'

describe('CitiesController (e2e)', () => {
  describe('GET /cities', () => {
    it('status code 200', () => {
      return request(app).get('/cities').expect(200)
    })
    it('should return a not empty array of objects', () => {
      return request(app)
        .get('/cities')
        .expect(({ body }) => {
          expect(body).not.toBe([])
          for (let i = 0; i < body.length; i++) {
            expect(body[i]).toBeInstanceOf(Object)
          }
        })
    })

    it('should return 50 test-cities', () => {
      return request(app)
        .get('/cities')
        .expect(({ body }) => {
          expect(body).toHaveLength(50)
        })
    })
  })
})

describe('WeatherController (e2e)', () => {
  describe('GET /weather/:city/:date', () => {
    it('status code 200', () => {
      return request(app).get('/weather/Saint Paul/2020-12-20').expect(200)
    })
    it('Should return a not empty object', () => {
      return request(app)
        .get('/weather/Saint Paul/2020-12-20')
        .expect(({ body }) => {
          expect(body).toBeInstanceOf(Object)
          expect(body).not.toBe({})
        })
    })

    it('If incorrect params, status code 404', () => {
      return request(app).get('/weather/Paul/2020-').expect(404)
    })

    it('If incorrect params, should return a not empty exception body', () => {
      return request(app)
        .get('/weather/Paul/2020-')
        .expect(({ body }) => {
          expect(body).toBeInstanceOf(Object)
          expect(body).not.toBe({})
        })
    })

    it(`If incorrect params { :city=Poul, :date=2020- }, should match an exception message "The weather for the city: Paul for the date: 2020- was not found!"`, () => {
      return request(app)
        .get('/weather/Paul/2020-')
        .expect(404)
        .expect(({ body }) => {
          expect(body.message).toEqual(
            'The weather for the city: Paul for the date: 2020- was not found!',
          )
        })
    })
  })

  describe('GET weather/avgtemp/:city', () => {
    it('status code 200', () => {
      return request(app).get('/weather/avgtemp/Saint Paul').expect(200)
    })

    it('Should return a not empty object', () => {
      return request(app)
        .get('/weather/avgtemp/Saint Paul')
        .expect(({ body }) => {
          expect(body).toBeInstanceOf(Object)
          expect(body).not.toBe({})
        })
    })

    it('If incorrect params, status code 404', () => {
      return request(app).get('/weather/avgtemp/2er4rds').expect(404)
    })

    it('If incorrect params, should return a not empty exception body', () => {
      return request(app)
        .get('/weather/avgtemp/2er4rds')
        .expect(({ body }) => {
          expect(body).toBeInstanceOf(Object)
          expect(body).not.toBe({})
        })
    })

    it(`If incorrect params { :city=2er4rds }, should match an exception message "The average temperature for the city 2er4rds was not found!"`, () => {
      return request(app)
        .get('/weather/avgtemp/2er4rds')
        .expect(({ body }) => {
          expect(body.message).toEqual(
            'The average temperature for the city 2er4rds was not found!',
          )
        })
    })
  })
})

describe('QueriesController (e2e)', () => {
  describe('GET queries/most-popular-city', () => {
    it('status code 200', () => {
      return request(app).get('/queries/most-popular-city').expect(200)
    })
    it('should return a not empty object', () => {
      return request(app)
        .get('/queries/most-popular-city')
        .expect(({ body }) => {
          expect(body).toBeInstanceOf(Object)
          expect(body).not.toEqual({})
        })
    })

    it('body.sumQueries unable to be 0', () => {
      return request(app)
        .get('/queries/most-popular-city')
        .expect(({ body }) => {
          expect(body.sumQueries).not.toEqual(0)
        })
    })
  })
})
