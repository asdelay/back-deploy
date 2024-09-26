import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';
import { Deal} from "./deals/deals.model";

@Module ( {
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRESS_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRESS_PASSWORD,
          uri: process.env.POSTGRESS_URL,
          database: process.env.POSTGRES_DB,
          models: [User, Deal],
          autoLoadModels: true,
          dialectOptions: {
            ssl: {
              require: true, // This will help you. But you will see nwe error
              rejectUnauthorized: false // This line will fix new error
            }
          },
        }),
        UsersModule,
        AuthModule,
        DealsModule,
      ],
})
export class AppModule {

}