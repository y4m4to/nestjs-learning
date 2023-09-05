import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe("create()", () => {
    it("ユーザーが作成されること", () => {
      const dto: CreateUserDto = {
        name: "一郎",
      };

      jest
        .spyOn(service, "create")
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = { id: 1, ...dto };
          return user;
        });

      expect(controller.create(dto)).resolves.toEqual({ id: 1, ...dto });
    });
  });

  describe("findAll()", () => {
    it("ユーザーが取得されること", () => {
      jest.spyOn(service, "findAll").mockImplementation(async () => {
        const users: User[] = [{ id: 1, name: "一郎" }];
        return users;
      });

      expect(controller.findAll()).resolves.toEqual([{ id: 1, name: "一郎" }]);
    });

    it("ユーザーが存在しない場合は、空の配列が返されること", () => {
      jest.spyOn(service, "findAll").mockImplementation(async () => {
        const users: User[] = [];
        return users;
      });

      expect(controller.findAll()).resolves.toEqual([]);
    });
  });

  describe("findOne()", () => {
    it("ユーザーが取得されること", () => {
      jest.spyOn(service, "findOne").mockImplementation(async () => {
        const user: User = { id: 1, name: "一郎" };
        return user;
      });

      expect(controller.findOne(1)).resolves.toEqual({ id: 1, name: "一郎" });
    });

    it("存在しないIDを指定するとエラーを返すこと", () => {
      jest.spyOn(service, "findOne").mockRejectedValue({
        statusCode: 404,
        message: "Not Found",
      });

      expect(controller.findOne(3)).rejects.toEqual({
        statusCode: 404,
        message: "Not Found",
      });
    });
  });
});
