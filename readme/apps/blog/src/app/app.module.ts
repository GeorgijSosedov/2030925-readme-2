import { Module } from '@nestjs/common';
import { ENV_FILE_PATH } from './app.constant';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    PrismaModule,
    BlogCategoryModule,
    BlogPostModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
