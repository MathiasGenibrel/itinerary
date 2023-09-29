import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export function configureDatabase() {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: `./${process.env.DBNAME}`,
    entities: [User],
    synchronize: true,
  });

  AppDataSource.initialize().catch((error) => console.log(error));
}