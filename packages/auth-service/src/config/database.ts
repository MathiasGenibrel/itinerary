import { DataSource } from "typeorm";
import { User } from './../entities/User';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `./${process.env.DBNAME}`,
  entities: [User],
  synchronize: true,
});

AppDataSource.initialize()
  .catch((error) => console.log(error));

const userRepository = AppDataSource.getRepository(User);

export { userRepository };