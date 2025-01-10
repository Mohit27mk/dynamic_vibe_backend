import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {

   constructor(
      @Inject(DatabaseService) private readonly databaseService: DatabaseService,
      @Inject(JwtService) private readonly jwtService: JwtService,

    ) {}

    async insertUser(createAdminDto: CreateAdminDto, user: any) {
      try {
        // Prepare the parameters to be passed into the PostgreSQL function
        const {
          id,
          username,
          email,
          password,
          first_name,
          last_name,
          phone_number,
          role
        } = createAdminDto;
  
      
  
        const insertUserResult = await this.databaseService.executeQuery(
          `SELECT * FROM dv_insert_or_update_user($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            id,               // User ID (null for insert, or existing for update)
            username,             // User's username
            email,                // User's email
            password,             // User's password (it should be hashed before insertion in real-world use)
            first_name,           // User's first name
            last_name,            // User's last name
            phone_number,         // User's phone number
            role,                 // User's role (e.g. admin, user, etc.)
            true,            // User's active status
          ],
        );
  
        // If user was inserted or updated successfully, return the inserted or updated user data
        if (insertUserResult.length > 0) {
          return insertUserResult[0];  // Return the first result (inserted/updated user)
        }
  
        // If the query didn't return any results, there was an issue
        return 'Failed to insert or update user';
      } catch (error) {
        // Handle errors and return the error message
        console.error(error);
        return error.message || 'An error occurred during user insertion or update';
      }
    }

    async updateCarContactStatus(id: number, status: string): Promise<string> {
      try {
        await this.databaseService.executeQuery(
          `SELECT dv_update_car_contact_status($1, $2)`,
          [id, status]
        );
        return `Car contact status updated successfully.`;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update car contact status.');
      }
    }

    async assignUserToEventContact(contactId: number, userId: number): Promise<string> {
      try {
        await this.databaseService.executeQuery(
          `SELECT dv_assign_user_to_event_contact($1, $2)`,
          [contactId, userId]
        );
        return `User successfully assigned to event contact.`;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to assign user to event contact.');
      }
    }

    async assignUserToCarContact(contactId: number, userId: number): Promise<string> {
      try {
        await this.databaseService.executeQuery(
          `SELECT dv_assign_user_to_car_contact($1, $2)`,
          [contactId, userId]
        );
        return `User successfully assigned to car contact.`;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to assign user to car contact.');
      }
    }
    

    async updateEventContactStatus(id: number, status: string): Promise<string> {
      try {
        await this.databaseService.executeQuery(
          `SELECT dv_update_event_contact_status($1, $2)`,
          [id, status]
        );
        return `Event contact status updated successfully.`;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update event contact status.');
      }
    }
        

 async getCarContactUs(user:any,query:{
  status:string,
  username:string,
  email:string,
  phoneno:string
 }) {
    try { 
      console.log(user)
      const getCarContactUs = await this.databaseService.executeQuery(
        `select * from dv_get_car_contact_us($1,$2,$3,$4,$5,$6)`,
        [user.sub,user.usertype,query.status,query.username,user.email,user.phoneno],
      );
console.log(getCarContactUs);
     if(getCarContactUs.length)
      return getCarContactUs;

      
      return 'Failed to get';
    } catch (error) {
      // Handle errors and return the error message
      console.log(error)
      return error;
    }  
  }

  async getUser(user:any,query:{
    username:string,
    email:string,
    phoneno:string,
    id:number,
    login:boolean,
    role:string
   }) {
      try { 
        query.id= query.login?user.sub:query.id;
        const getUser = await this.databaseService.executeQuery(
          `select * from dv_get_user_search($1,$2,$3,$4,$5)`,
          [query.username,query.email,query.phoneno,query.id,query.role],
        );

        if(getUser.length)
        return getUser;
  
        
        return 'Failed to get';
      } catch (error) {
        // Handle errors and return the error message
        console.log(error)
        return error;
      }  
    }
  

  async getRentalContactUs(user:any,query:{
    status:string,
    username:string,
    email:string,
    phoneno:string
   }) {
      try { 
        console.log('hereeeee');
        const getRentalContactUs = await this.databaseService.executeQuery(
          `select * from dv_get_event_contact_us($1,$2,$3,$4,$5,$6)`,
          [user.sub,user.usertype,query.status,query.username,user.email,user.phoneno],
        );
 
       if(getRentalContactUs.length)
        return getRentalContactUs;
  
        
        return 'Failed to get';
      } catch (error) {
        // Handle errors and return the error message
        console.log(error)
        return error;
      }  
    }

  async emailLogin(
    emailLoginAuthDto: {
      email:string,
      password:string
    },
  ) {
    try {
      const user = await this.databaseService.executeQuery(
        `select * from dv_get_user($1,$2)`,
        [emailLoginAuthDto.email,emailLoginAuthDto.password],
      );

      if (user.length &&user[0].id) {
        return {
          ...user[0],
          Authorization: await this.jwtService.signAsync({
            sub: user[0].id,
            username: user[0].username,
            useremailid: user[0].email,
            usertype: user[0].role,
          }),
        }
      }

      
      return 'Email/password incorrect';
    } catch (error) {
      // Handle errors and return the error message
      console.log(error)
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
