import { Weather } from '../weather/weather.entity'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class City extends BaseEntity {
  constructor(name: string, region: string, country: string) {
    super()
    this.name = name
    this.region = region
    this.country = country
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public region: string

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public country: string

  @OneToMany(() => Weather, (weather) => weather.city)
  weather: Weather[]
}
