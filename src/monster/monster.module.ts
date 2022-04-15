import { CqrsModule } from '@nestjs/cqrs';
import { FileModule } from 'src/file/file.module';
import { GetMonstersByCategoriesHandler } from './application/queries/get-monsters-by-category.handler';
import { GetMonsterByCodeHandler } from './application/queries/get-monster-by-code.handler';
import { GetMonsterImageHandler } from './application/queries/get-monster-image.handler';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonsterController } from './presentation/monster.controller';
import { MonsterRepoProvider } from './persistence/repositories/monster-repository.provider';
import { monsterSchema } from './persistence/entities/monster-entity';
import { ReportTextTypoHandler } from './application/commands/report-text-typo.handler';
import { TypoRepoProvider } from './persistence/repositories/typo-repository.provider';
import { typoSchema } from './persistence/entities/typo-entity';

const commandHandlers = [ReportTextTypoHandler];
const queryHandlers = [
    GetMonstersByCategoriesHandler,
    GetMonsterByCodeHandler,
    GetMonsterImageHandler
];

@Module({
    controllers: [MonsterController],
    exports: [],
    imports: [
        CqrsModule,
        FileModule,
        MongooseModule.forFeature([{ name: 'Monster', schema: monsterSchema }]),
        MongooseModule.forFeature([{ name: 'Typo', schema: typoSchema }]),
    ],
    providers: [
        MonsterRepoProvider,
        ...commandHandlers,
        ...queryHandlers,
        TypoRepoProvider,
    ],
})
export class MonsterModule {}
