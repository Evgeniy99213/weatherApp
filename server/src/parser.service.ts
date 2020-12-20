import { City } from './cities/cities.entity'
import { Weather } from './weather/weather.entity'
import * as fetch from 'node-fetch'

async function parseCities(): Promise<any> {
    const res = await fetch(process.env.CITIES_API_URL, {
            headers: {
                'X-Parse-Application-Id': process.env.CITIES_API_ID,
                'X-Parse-Master-Key': process.env.CITIES_API_KEY,
            }
        }
    )
    const data = await res.json()
    const cities: City[] = []
    for(let e of data.results){
        e.name === 'Minnesota' ? e.capital = 'Saint Paul' : null
        const newCity: City = new City(e.capital, e.name, 'US')
        await newCity.save()
        cities.push(newCity)
    }
    return cities
}

async function parseWeather(city: City, date: string) {
    try{
        const resP: any = await fetch(`${process.env.WEATHER_API_URL}key=${process.env.WEATHER_API_KEY}&q=${city.name}&dt=${date}`)
        const data = (await resP.json()).forecast.forecastday[0].day
        const newWeather: Weather = new Weather(
            data.maxtemp_c,
            data.maxtemp_f,
            data.mintemp_c,
            data.mintemp_f,
            data.avgtemp_c,
            data.avgtemp_f,
            data.maxwind_mph,
            data.maxwind_kph,
            data.totalprecip_mm,
            data.totalprecip_in,
            data.avgvis_km,
            data.avgvis_miles,
            data.avghumidity,
            data.condition.text,
            date,
            city
        )
        await newWeather.save()
    }catch(err){
        console.error(err)
    }

}

async function parserStart() {
    const cities: City[] = await parseCities()
    for(let i = 0; i < 7; i++) {
        const today: Date =  new Date(Date.now() - i*86400000)
        const date: string = today.toISOString().substring(0, 10)
        for(let city of cities) {
            await parseWeather(city, date)
        }
    }
    console.log('Parser was started')
}


export { parserStart }
