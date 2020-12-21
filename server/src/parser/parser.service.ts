import { Injectable } from '@nestjs/common'
import { City } from '../cities/cities.entity'
import { Weather } from '../weather/weather.entity'
import * as fetch from 'node-fetch'
import { Logger } from '@nestjs/common'

@Injectable()
export class ParserService {
  private logger: Logger = new Logger('ParserService')

  private async parseCities(): Promise<City[]> {
    try {
      const res = await fetch(process.env.CITIES_API_URL, {
        headers: {
          'X-Parse-Application-Id': process.env.CITIES_API_ID,
          'X-Parse-Master-Key': process.env.CITIES_API_KEY,
        },
      })
      const data = await res.json()
      const cities: City[] = []
      for (const e of data.results) {
        e.name === 'Minnesota' ? (e.capital = 'Saint Paul') : null
        const newCity: City = new City(e.capital, e.name, 'US')
        await newCity.save()
        cities.push(newCity)
      }
      return cities
    } catch (err) {
      this.logger.error(`ERROR in "parseCities" function!`)
      console.trace(err)
    }
  }

  private async parseWeather(city: City, date: string): Promise<void> {
    try {
      const url = `${process.env.WEATHER_API_URL}key=${process.env.WEATHER_API_KEY}&q=${city.name}&dt=${date}`
      const res: any = await fetch(url)
      const data = (await res.json()).forecast.forecastday[0].day
      data.condition = data.condition.text
      data.date = date
      data.city = city
      const newWeather: Weather = new Weather(data)
      await newWeather.save()
    } catch (err) {
      this.logger.error(`ERROR in "parseWeather" function!`)
      console.trace(err)
    }
  }

  public async parserStart(): Promise<void> {
    try {
      this.logger.log(`Parser Bot start working!`)
      const cities: City[] = await this.parseCities()
      const period: number | any = new Number(process.env.WEATHER_PERIOD)
      for (let i = 0; i < period; i++) {
        const today: Date = new Date(Date.now() - i * 86400000)
        const date: string = today.toISOString().substring(0, 10)
        for (const city of cities) {
          await this.parseWeather(city, date)
        }
      }
      this.logger.log(`Parsing process was successfully completed!`)
    } catch (err) {
      this.logger.error(`ERROR in "parserStart" function!`)
      console.trace(err)
    }
  }
}
