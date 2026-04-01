import { IsString, IsNumber, IsArray, Min, Max } from 'class-validator';

export class CreateCvDto {
    @IsString()
    name: string;

    @IsString()
    firstname: string;

    @IsNumber()
    @Min(18)
    @Max(100)
    age: number;

    @IsString()
    cin: string;

    @IsString()
    job: string;

    @IsString()
    path: string;

    @IsNumber()
    userId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    skillIds: number[];
}
