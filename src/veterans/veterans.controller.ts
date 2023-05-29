import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request } from '@nestjs/common';
import { VeteransService } from './veterans.service';
import { Auth } from 'src/decorators/auth.decorator';
import { VeteranEntity } from './veteran.entity';

@Controller('veterans')
export class VeteransController {
  constructor(private readonly veteransService: VeteransService) {}

  @Get("/pagination")
  @HttpCode(200)
  getAllWithPagination(@Query('page') page: string, @Query('limit') limit: string){
    return this.veteransService.getAllWithPagination(+page,+limit)
  }

  @Get()
  @HttpCode(200)
  getAll(){
    return this.veteransService.getAll()
  }

  @Post()
  @HttpCode(200)
  @Auth()
  addVeteran(@Body() request: VeteranEntity){
    return this.veteransService.addVeteran(request)
  }

  @Put("/:id")
  @HttpCode(200)
  @Auth()
  updateVeteran(@Param('id') id: string, @Body() request: VeteranEntity){
    return this.veteransService.updateVeteran(+id, request)
  }

  @Delete("/:id")
  @HttpCode(200)
  @Auth()
  deleteVeteran(@Param('id') id: string){
    return this.veteransService.deleteVeteran(+id)
  }
}
