import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'test',
  username: 'test',
  password: 'password',
  entities: ['dist/**/entities/**/*.entity.js'],
  migrations: ['dist/**/migrations/**/*.js'],
  logging: true,
  /**
   * @note
   * synchronize は開発時にのみ使用する。
   * trueにすると、エンティティの変更を検知して、自動的にテーブルが更新される
   * @todo 本番環境では、falseにすること
   **/
  synchronize: true,
});
