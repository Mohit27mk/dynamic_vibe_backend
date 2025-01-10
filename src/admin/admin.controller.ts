import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UnauthorizedException, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/decorators/user.decorator';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Post('user')
  @HttpCode(200)
  async insertUser(@AuthUser() user: any,@Body() createAdminDto: CreateAdminDto) { 
    const response = await  this.adminService.insertUser(createAdminDto,user);
    if (typeof response !== 'string')
      return {
        message: 'Created successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
    
  }

  @ApiOperation({ summary: 'Login a user using email' })
  @Post('email-login')
  @HttpCode(200)
  async emailLogin(
    @Body() emailLoginAuthDto: {
      email:string,
      password:string
    },
  ) {
    const response = await this.adminService.emailLogin(emailLoginAuthDto);
    if (typeof response !== 'string')
      return {
        message: 'Logged in successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }

  

  @UseGuards(AuthGuard('jwt'))
  @Get('/car')
  async getCarContactUs(@AuthUser() user: any,
  @Query() query:{
    status:string,
    username:string,
    email:string,
    phoneno:string
   }
  ) {
    const response = await this.adminService.getCarContactUs(user,query);
    if (typeof response !== 'string')
      return {
        message: 'Car contact fetched successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async getUser(@AuthUser() user: any,
  @Query() query:{
    username:string,
    email:string,
    phoneno:string,
    id:number,
    login:boolean,
    role:string
   }
  ) {
    const response = await this.adminService.getUser(user,query);
    if (typeof response !== 'string')
      return {
        message: 'User  fetched successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('car-status')
  async updateCarContactStatus(@Body() body: { id: number; status: string }) {
    const { id, status } = body;
    const response = await this.adminService.updateCarContactStatus(id, status);
    try{
      return {
        message: 'Car contact status changed successfully',
        data: response,
      };
    }catch(err){
      throw new UnauthorizedException({
        message: response,
        data: {},
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('rental-status')
  async updateEventContactStatus(@Body() body: { id: number; status: string }) {
    const { id, status } = body;
    const response = await this.adminService.updateEventContactStatus(id, status);
    try{
      return {
        message: 'Rental contact status changed successfully',
        data: response,
      };
    }catch(err){
      throw new UnauthorizedException({
        message: response,
        data: {},
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('car-assign-user')
  async assignUserToCarContact(@Body() body: { contactId: number; userId: number }) {
    const { contactId, userId } = body;
    const response = await this.adminService.assignUserToCarContact(contactId, userId);
    try{
      return {
        message: 'Event rental contact fetched successfully',
        data: response,
      };
    }catch(err){
      throw new UnauthorizedException({
        message: response,
        data: {},
      });
    }
    
  }

  @UseGuards(AuthGuard('jwt'))
   @Patch('rental-assign-user')
  async assignUserToEventContact(@Body() body: { contactId: number; userId: number }) {
    const { contactId, userId } = body;
    const response = await this.adminService.assignUserToEventContact(contactId, userId);
    if (typeof response !== 'string')
      return {
        message: 'Event rental contact fetched successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/rental')
  async getRentalContactUs(@AuthUser() user: any,
  @Query() query:{
    status:string,
    username:string,
    email:string,
    phoneno:string
   }
  ) {
    const response = await this.adminService.getRentalContactUs(user,query);
    if (typeof response !== 'string')
      return {
        message: 'Event rental contact fetched successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
