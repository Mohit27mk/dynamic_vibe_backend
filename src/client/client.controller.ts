import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateCarContactDto,CreateRentalContactDto } from './dto/create-client.dto';
import { UpdateCarContactDto,UpdateRentalContactDto } from './dto/update-client.dto';

@Controller('api/v1/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(200)
  async createcarContactUs(@Body() createCarContactDto: CreateCarContactDto) { 
    const response = await this.clientService.createcarContactUs(createCarContactDto);
    if (typeof response !== 'string')
      return {
        message: 'Contactus inserted successfully',
        data: response,
      };

    return {
      message: response,
      data: [],
    };
  }

  @Post('rental')
  @HttpCode(200)
  async createRentalContact(@Body() createRentalContactDto: CreateRentalContactDto) { 
    const response = await this.clientService.createRentalContact(createRentalContactDto);
    if (typeof response !== 'string')
      return {
        message: 'Contactus inserted successfully',
        data: response,
      };

    return {
      message: response,
      data: [],
    };
  }
  

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
