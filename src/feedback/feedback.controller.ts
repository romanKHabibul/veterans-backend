import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { addDto } from './dto/add.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(200)
  @Auth()
  addFeedBack(@CurrentUser('id') id: string, @Body() request: addDto){
    return this.feedbackService.addFeedback(+id, request)
  }

  @Delete("/:id")
  @HttpCode(200)
  @Auth()
  deleteFeedBack(@Param('id') id: string){
    return this.feedbackService.deleteFeedBack(+id)
  }

  @Get()
  @HttpCode(200)
  @Auth()
  getAll(){
    return this.feedbackService.getAll()
  }
}
