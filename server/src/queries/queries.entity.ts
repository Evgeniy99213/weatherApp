import { Global } from '@nestjs/common'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { City } from '../cities/cities.entity'


@Entity()
export class QueryRecord extends BaseEntity {

    constructor(city: City){
        super()
        this.city = city
    }

    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public date: Date

    @ManyToOne(() => City, city => city.name)
    city: City;

}