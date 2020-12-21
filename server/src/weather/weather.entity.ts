import { City } from '../cities/cities.entity'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { IWeather } from './interfaces/weather.interface'

@Entity()
export class Weather extends BaseEntity {
  constructor(data: Partial<IWeather>) {
    super()
    for (const key in data) {
      this[key] = data[key]
    }
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  public date: string

  @Column({
    type: 'text',
    nullable: true,
  })
  public condition: string

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public maxtemp_c: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public maxtemp_f: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public mintemp_c: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public mintemp_f: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public avgtemp_c: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public avgtemp_f: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public maxwind_mph: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public maxwind_kph: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public totalprecip_mm: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public totalprecip_in: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public avgvis_km: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public avgvis_miles: number

  @Column({
    type: 'decimal',
    nullable: true,
  })
  public avghumidity: number

  @ManyToOne(() => City, (city) => city.name)
  city: City
}
