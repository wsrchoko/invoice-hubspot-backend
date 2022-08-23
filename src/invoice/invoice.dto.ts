import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsDate,
  IsNumber,
  IsEmail,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
//
import {
  YourCompany as YourCompanyType,
  ClientCompany as ClientCompanyType
} from '../@types/invoice';

export class Invoice {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly logo: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly no: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ required: false })
  readonly date: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ required: false })
  readonly dueDate: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly subtotal: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly tax: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly discount: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly total: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly notes: string;

  @IsObject()
  @ValidateNested()
  @Type(() => YourCompany)
  @ApiProperty({ type: () => YourCompany })
  readonly yourCompany: YourCompanyType;

  @IsObject()
  @IsOptional()
  @Type(() => ClientCompany)
  @ApiProperty({ type: () => ClientCompany, required: false })
  readonly clientCompany: ClientCompanyType;
}

export class YourCompany {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly company: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly website: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly country: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
}

export class ClientCompany {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly company: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly country: string;
}

export class InvoiceSuccess {}
