import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { CheckEmailDto } from './dto/check-email.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) throw new ConflictException('User already exists');

    await this.userService.createUser(email, password);
    return { message: 'User registered successfully' };
  }

  async signin(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async checkEmailExists(
    checkEmailDto: CheckEmailDto
  ): Promise<{ isRegistered: boolean }> {
    const { email } = checkEmailDto;

    // Check if the email check result is already cached
    const cachedResult = await this.cacheManager.get<{ isRegistered: boolean }>(
      `email_check_${email}`
    );
    if (cachedResult) {
      return cachedResult;
    }

    const userExists = await this.userService.findByEmail(email);

    // Cache the result for 60*1000 milliseconds or 10 minutes
    await this.cacheManager.set(
      `email_check_${email}`,
      { isRegistered: !!userExists },
      600 * 1000
    );

    return { isRegistered: !!userExists };
  }
}
