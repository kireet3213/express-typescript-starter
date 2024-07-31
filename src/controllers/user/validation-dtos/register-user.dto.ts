import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}
