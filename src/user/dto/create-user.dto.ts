import { MinLength } from "class-validator"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateUserDto {
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name: string
    email: string
    password: string
}
