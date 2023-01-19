import { IsString , IsNumber, IsBoolean} from 'class-validator';

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}
