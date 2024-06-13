import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/providers/hash/hash.service';
import { HttpResponse } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<HttpResponse<User>> {
    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      withDeleted: true,
    });

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashService.hash(createUserDto.password);

    const createUserDtoWithHashedPassword = Object.assign(createUserDto, {
      password: hashedPassword,
    });

    const user = this.userRepository.create(createUserDtoWithHashedPassword);
    await this.userRepository.save(user);

    return {
      message: 'User created successfully',
    };
  }

  async findAll(): Promise<HttpResponse<User[]>> {
    const users = await this.userRepository.find({
      select: ['id', 'email', 'name'],
    });

    return {
      data: users,
    };
  }

  async findOne(id: string): Promise<HttpResponse<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      data: user,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<HttpResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    await this.userRepository.save(updatedUser);

    return {
      message: 'User updated successfully',
    };
  }

  async remove(id: string): Promise<HttpResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.softRemove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}
