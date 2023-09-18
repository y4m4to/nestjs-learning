import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * ユーザーを作成する
   * @returns 作成したユーザーの情報
   */
  async create({ name }: CreateUserDto): Promise<User> {
    return await this.userRepository.save({ name }).catch((err) => {
      throw new InternalServerErrorException(
        `[${err.message}]: ユーザーの登録に失敗しました。`,
      );
    });
  }

  /**
   * ユーザーの一覧を取得する
   * @returns ユーザーの一覧
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find().catch((err) => {
      throw new InternalServerErrorException(
        `[${err.message}]: ユーザーの取得に失敗しました。`,
      );
    });
  }

  /**
   * 指定したIDのユーザーを取得する
   * @returns 指定したIDのユーザー
   */
  async findOne(id: number): Promise<User> {
    return this.userRepository
      .findOne({
        where: { id },
      })
      .then((res) => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      });
  }

  /**
   * 指定したnameのユーザーを取得する
   * @returns 指定したnameのユーザー
   */
  async findOneByName(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name } }).then((res) => {
      if (!res) {
        throw new NotFoundException();
      }
      return res;
    });
  }

  /**
   * 指定したIDのユーザーを更新する
   * @returns 更新したユーザーの情報
   */
  async update(id: number, createUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }

    user.name = createUserDto.name;
    return await this.userRepository.save(user);
  }

  /**
   * 指定したIDのユーザーを削除する
   * @returns 削除した結果
   */
  async remove(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }

    return await this.userRepository.delete(user);
  }
}
