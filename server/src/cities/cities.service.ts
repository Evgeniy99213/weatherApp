import { Injectable } from '@nestjs/common';
import { City } from './cities.entity'


@Injectable()
export class CitiesService {

    // public async setCities(): Promise<void> {
    //     const fetch = require('node-fetch');
    //     (async () => {
    //     const response = await fetch(process.env.CITIES_API_URL,
    //         {
    //         headers: {
    //             'X-Parse-Application-Id': process.env.CITIES_API_ID,
    //             'X-Parse-Master-Key': process.env.CITIES_API_KEY,
    //         }
    //         }
    //     );
    //      const data = await response.json();
    //      console.log(data.results) 
    //      for(let e of data.results){
    //         const newCity: City = new City(e.capital, e.name, 'US')
    //         await newCity.save()
    //      }
       
    //     })();
    // }

    public getCities = async (): Promise<City[]> => await City.find()
}


