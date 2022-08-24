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
  @ApiProperty()
  readonly logo: string;


  @IsArray()
  @ApiProperty()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  readonly dateHeaders: string[];

  @IsString()
  @ApiProperty()
  readonly no: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  readonly date: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  readonly dueDate: Date;

  @IsArray()
  @ApiProperty()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  readonly itemsHeaders: string[];

  @IsArray()
  @Type(() => Item)
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => [Item], required: false })
  readonly items: ItemType[];

  @IsArray()
  @ApiProperty()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  readonly amountHeaders: string[];

  @IsNumber()
  @ApiProperty()
  readonly subtotal: number;

  @IsNumber()
  @ApiProperty()
  readonly tax: number;

  @IsNumber()
  @ApiProperty()
  readonly discount: number;

  @IsNumber()
  @ApiProperty()
  readonly total: number;

  @IsString()
  @ApiProperty()
  readonly notes: string;

  @IsObject()
  @ValidateNested()
  @Type(() => YourCompany)
  @ApiProperty({ type: () => YourCompany })
  readonly yourCompany: YourCompanyType;

  @IsObject()
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
  @ApiProperty()
  readonly address: string;

  @IsString()
  @ApiProperty()
  readonly city: string;

  @IsString()
  @ApiProperty()
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
  @ApiProperty()
  readonly company: string;

  @IsString()
  @ApiProperty()
  readonly fullName: string;

  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsString()
  @ApiProperty()
  readonly city: string;

  @IsString()
  @ApiProperty()
  readonly country: string;
}

export class Item {
  @IsString()
  @ApiProperty()
  readonly cell1: string;

  @IsString()
  @ApiProperty()
  readonly cell2: string;

  @IsString()
  @ApiProperty()
  readonly cell3: string;

  @IsString()
  @ApiProperty()
  readonly cell4: string;
}

export class InvoiceSuccess {}
