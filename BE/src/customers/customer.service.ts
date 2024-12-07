import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService, // Inject JwtService để tạo token
  ) {}

  async createCustomer(
    name: string,
    phone_number: string,
    password: string,
  ): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = this.customerRepository.create({
      name,
      phone_number,
      password: hashedPassword,
    });
    return await this.customerRepository.save(customer);
  }

  async validatePassword(
    phone_number: string,
    password: string,
  ): Promise<boolean> {
    const customer = await this.customerRepository.findOne({
      where: { phone_number },
    });
    if (!customer) {
      return false;
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    return isMatch;
  }

  // Phương thức tạo token khi đăng nhập thành công
  async generateJwtToken(customer: Customer) {
    const payload = { customer_id: customer.customer_id, name: customer.name };
    return this.jwtService.sign(payload); // Tạo JWT token
  }

  // Tìm khách hàng theo email để lấy thông tin khi login
  async findByPhone(phone_number: string): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { phone_number },
    });
  }

  // Phương thức để thay đổi mật khẩu
  async changePassword(
    customerId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    const { oldPassword, newPassword, confirmPassword, otp } = changePasswordDto;

    // Kiểm tra mã OTP (mã OTP mặc định là '111111')
    if (otp !== '111111') {
      throw new Error('Invalid OTP');
    }

    // Kiểm tra khách hàng tồn tại
    const customer = await this.customerRepository.findOne({
      where: { customer_id: customerId },  
    });
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Kiểm tra mật khẩu cũ
    const isOldPasswordValid = await bcrypt.compare(oldPassword, customer.password);
    if (!isOldPasswordValid) {
      throw new Error('Incorrect old password');
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
      throw new Error('New password and confirm password do not match');
    }

    // Hash mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới
    customer.password = hashedNewPassword;
    await this.customerRepository.save(customer);

    return 'Password changed successfully';
  }
}
