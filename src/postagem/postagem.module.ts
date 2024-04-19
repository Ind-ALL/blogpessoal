import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaService } from "src/tema/services/tema.service";
import { TemaModule } from "src/tema/tema.module";


@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  providers: [PostagemService, TemaService],
  controllers: [PostagemController],
  exports: [TypeOrmModule]
})
export class PostagemModule{}