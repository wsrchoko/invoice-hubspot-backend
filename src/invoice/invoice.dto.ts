import {
  IsDate,
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  IsObject,
  IsNotEmpty,
  IsOptional,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
//
import {
  Item as ItemType,
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

  @IsArray()
  @ApiProperty()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  readonly headers: string[];

  @IsArray()
  @IsOptional()
  @Type(() => Item)
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => [Item], required: false })
  readonly items: ItemType[];

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

export class Item {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly cell1: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly cell2: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly cell3: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly cell4: string;
}

export class InvoiceSuccess {}
