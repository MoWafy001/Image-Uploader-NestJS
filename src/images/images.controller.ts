import { Body, Controller, Get, Param, Patch, Post, Redirect, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './interfaces/image.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';


@Controller('images')
export class ImagesController {
    constructor(private readonly imageService: ImagesService){}

    // READ
    @Get()
    @Render('app')
    async index(){
        return { images: await this.imageService.findAll() }
    }


    // Create
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async addImage(@UploadedFile() image_file: Express.Multer.File, @Body('title') title: string, @Res() res: Response){
        if(image_file === undefined)
            return res.sendStatus(400);
        
        const img: Image = await this.imageService.addImage(image_file, title)
        return res.redirect('/images')
    }


    // Delete
    @Get('/:id/delete')
    async deleteImage(@Param('id') image_id: string, @Res() res: Response){
        await this.imageService.deleteImage(image_id)
        res.redirect('/images')
    }


    // Update
    @Patch('/:id')
    async updateImageTitle(@Body('title') new_title: string, @Param('id') image_id: string){
        await this.imageService.updateImageTitle(image_id, new_title);
    }

}
