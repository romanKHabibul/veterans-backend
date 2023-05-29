import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@HttpCode(200)
	@Auth()
	getAll(){
		return this.usersService.getAll()
	}
	
	@Get("/profile") 
	@HttpCode(200) 
	@Auth()
	getProfile(@CurrentUser('id') id: number){
		return this.usersService.getById(id)
	} 
	
	@Get("/:id")
	@HttpCode(200)
	@Auth()
	getById(@Param('id') id: string){
		return this.usersService.getById(+id)
	}

	
	@Delete()
	@HttpCode(200)
	@Auth()
	deleteUser(@CurrentUser('id') id: string){
		return this.usersService.deleteUser(+id)
	}

	@Put()
	@HttpCode(200)
	@Auth()
	updateUser(@CurrentUser('id') id: string, @Body() request: UserEntity){
		return this.usersService.updateUser(+id, request)
	}

	
}
