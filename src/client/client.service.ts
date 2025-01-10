import { Inject, Injectable } from '@nestjs/common';
import { CreateCarContactDto,CreateRentalContactDto } from './dto/create-client.dto';
import { UpdateCarContactDto,UpdateRentalContactDto } from './dto/update-client.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientService { 
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

 async createcarContactUs(createCarContactDto: CreateCarContactDto) {
    const carContactUs = await this.databaseService.executeQuery(
      `select * from dv_insert_car_contact_us($1,$2,$3,$4,$5)`,
      [createCarContactDto.email,createCarContactDto.name,createCarContactDto.message,createCarContactDto.phoneno,createCarContactDto.service],
    );
    if(carContactUs.length>0){
   return carContactUs[0];
    }

  }

  async createRentalContact(createRentalContactDto: CreateRentalContactDto) {
    const eventContact = await this.databaseService.executeQuery(
      `SELECT * FROM dv_insert_event_contact(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      )`,
      [
        createRentalContactDto.name,
        createRentalContactDto.email,
        createRentalContactDto.phoneNumber,
        createRentalContactDto.location,
        createRentalContactDto.eventDate,
        createRentalContactDto.guestCount,
        createRentalContactDto.eventType,
        createRentalContactDto.needsPackage,
        createRentalContactDto.additionalInfo || null,
        createRentalContactDto.tentTypes,
        createRentalContactDto.tableTypes,
        createRentalContactDto.chairTypes,
        createRentalContactDto.lightingTypes,
        createRentalContactDto.danceFloorTypes,
        createRentalContactDto.barTypes,
        createRentalContactDto.accessoryTypes,
      ]
    );
  
    if (eventContact.length > 0) {
      return eventContact[0]; // Return the first record (e.g., event contact ID or confirmation)
    }
  }
  

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
