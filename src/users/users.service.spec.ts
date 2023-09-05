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

  describe("findAll()", () => {
    it("ユーザーの取得に成功すること", () => {
      jest.spyOn(service, "findAll").mockImplementation(async () => {
        const users: User[] = [{ id: 1, name: "一郎" }];
        return users;
      });

      expect(service.findAll()).resolves.toEqual([{ id: 1, name: "一郎" }]);
    });

    it("ユーザーのデータが無い場合は、空の配列を返すこと", () => {
      jest.spyOn(service, "findAll").mockImplementation(async () => {
        const users: User[] = [];
        return users;
      });

      expect(service.findAll()).resolves.toEqual([]);
    });
  });

  describe("findOne()", () => {
    it("ユーザーの取得に成功すること", () => {
      jest.spyOn(service, "findOne").mockImplementation(async () => {
        const user: User = { id: 1, name: "一郎" };
        return user;
      });

      expect(service.findOne(1)).resolves.toEqual({ id: 1, name: "一郎" });
    });

    it("存在しないIDを指定するとエラーを返すこと", () => {
      jest.spyOn(service, "findOne").mockRejectedValue({
        statusCode: 404,
        message: "Not Found",
      });

      expect(service.findOne(3)).rejects.toEqual({
        statusCode: 404,
        message: "Not Found",
      });
    });
  });
});
