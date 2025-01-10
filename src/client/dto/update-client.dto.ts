import { PartialType } from '@nestjs/swagger';
import { CreateCarContactDto,CreateRentalContactDto } from './create-client.dto';

export class UpdateCarContactDto extends PartialType(CreateCarContactDto) {}
export class UpdateRentalContactDto extends PartialType(CreateRentalContactDto) {}

