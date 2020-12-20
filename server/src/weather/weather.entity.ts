import { City } from 'src/cities/cities.entity'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'


@Entity()
export class Weather extends BaseEntity {

    constructor(
        maxtemp_c: number,
        maxtemp_f: number,
        mintemp_c: number,
        mintemp_f: number,
        avgtemp_c: number,
        avgtemp_f: number,
        maxwind_mph: number,
        maxwind_kph: number,
        totalprecip_mm: number,
        totalprecip_in: number,
        avgvis_km: number,
        avgvis_miles: number,
        avghumidity: number,
        condition: string,
        date: string,
        city: City
        ) {
        super()
        this.maxtemp_c = maxtemp_c
        this.maxtemp_f = maxtemp_f
        this.mintemp_c = mintemp_c
        this.mintemp_f = mintemp_f
        this.avgtemp_c = avgtemp_c
        this.avgtemp_f = avgtemp_f
        this.maxwind_mph = maxwind_mph
        this.maxwind_kph = maxwind_kph
        this.totalprecip_mm = totalprecip_mm
        this.totalprecip_in = totalprecip_in
        this.avgvis_km = avgvis_km
        this.avgvis_miles = avgvis_miles
        this.avghumidity = avghumidity
        this.condition = condition
        this.date = date
        this.city = city
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

    @ManyToOne(() => City, city => city.name)
    city: City;

}