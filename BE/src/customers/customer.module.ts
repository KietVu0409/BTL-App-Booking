import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),

    // Đảm bảo ConfigModule được import để lấy giá trị từ .env
    ConfigModule.forRoot(),

    // Cấu hình JwtModule sử dụng ConfigService để lấy JWT secret từ .env
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule
      inject: [ConfigService], // Inject ConfigService vào JwtModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Lấy giá trị từ biến JWT_SECRET
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
