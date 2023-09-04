import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    // テスト用のモジュールを作成する
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    // テスト用のモジュールから、UsersServiceを取得する
    service = module.get<UsersService>(UsersService);
  });

  describe("create()", () => {
    it("ユーザーのinsertに成功すること", () => {
      const dto: CreateUserDto = { name: "一郎" };

      jest
        .spyOn(service, "create")
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = { id: 1, ...dto };
          return user;
        });

      expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
    });
  });
});
