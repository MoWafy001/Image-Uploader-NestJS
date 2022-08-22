import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './interfaces/image.interface';
import { writeFileSync, unlinkSync } from 'fs';


const save_image_in_dir =(image_file: Express.Multer.File): string =>{
  const url = `image-storage/${image_file.originalname}`;
  writeFileSync(`public/${url}`, image_file.buffer);
  return url
}


@Injectable()
export class ImagesService {
  constructor(@InjectModel('Image') private readonly ImageModel: Model<Image>) {}

  async findAll(): Promise<Image[]> {
    return await this.ImageModel.find();
  }


  async addImage(image_file: Express.Multer.File, title: string): Promise<Image>{
    const url = save_image_in_dir(image_file);
    const new_image: Image = {
      title: title,
      URL: url
    }
    const newImage = new this.ImageModel(new_image);
    return await newImage.save();
  }


  async deleteImage(image_id: string){
    const img:Image = await this.ImageModel.findOneAndRemove({_id: image_id});
    const file_url: string = img.URL;
    unlinkSync(`public/${file_url}`)
  }


  async updateImageTitle(image_id: string, new_title: string){
    await this.ImageModel.updateOne({_id: image_id}, {title: new_title})
  }

}
