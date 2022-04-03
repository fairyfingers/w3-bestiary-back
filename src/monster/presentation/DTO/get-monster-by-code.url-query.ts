import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class GetMonsterByCodeURLQuery {
    @ApiProperty({
        required: true,
    })
    @IsDefined()
    @IsString()
    code: string;

    @ApiProperty({
        required: true,
    })
    @IsDefined()
    @IsString()
    lang: string;
}
