import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  async register(@Body() registerCustomerDto: RegisterCustomerDto) {
    const { name, phone_number, password } = registerCustomerDto;
    try {
      // Đăng ký khách hàng mới
      const customer = await this.customerService.createCustomer(
        name,
        phone_number,
        password,
      );
      return { message: 'Registration successful', customer };
    } catch {
      throw new HttpException(
        'Registration failed, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    const { phone_number, password } = loginCustomerDto;

    try {
      // Kiểm tra tài khoản có tồn tại
      const customer = await this.customerService.findByPhone(phone_number);
      if (!customer) {
        throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
      }

      // Kiểm tra mật khẩu
      const isValidPassword = await this.customerService.validatePassword(
        phone_number,
        password,
      );
      if (!isValidPassword) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }

      // Tạo JWT token
      const token = await this.customerService.generateJwtToken(customer);

      // Trả về kết quả
      return {
        message: 'Login successful',
        token,
        customer: {
          name: customer.name,
          phone_number: customer.phone_number,
        },
      };
    } catch (error) {
      // Log lỗi chi tiết để hỗ trợ debug
      console.error('Login error:', error.message);

      // Trả về lỗi chung nếu không xác định được nguyên nhân
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Login failed. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('find-by-phone/:phone')
  async findByPhone(@Param('phone') phone_number: string) {
    try {
      // Gọi hàm findByPhone từ service
      const customer = await this.customerService.findByPhone(phone_number);
      if (!customer) {
        // Nếu không tìm thấy khách hàng, trả về lỗi 404
        throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
      }
      // Trả về thông tin khách hàng
      return customer;
    } catch (error) {
      // Nếu có lỗi, trả về lỗi chung
      console.error('Error fetching customer:', error);
      throw new HttpException(
        'Error fetching customer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Route thay đổi mật khẩu
  @Patch('change-password/:customerId')
  async changePassword(
    @Param('customerId') customerId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    return this.customerService.changePassword(customerId, changePasswordDto);
  }
}
