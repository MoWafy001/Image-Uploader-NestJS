import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesController } from './images.controller';
import { ImageSchema } from './schemas/image.schema';
import { ImagesService } from './images.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Image', schema: ImageSchema}])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
