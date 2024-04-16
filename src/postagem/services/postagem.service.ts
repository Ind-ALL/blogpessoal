import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";


@Injectable()
export class PostagemService{
  constructor(
      @InjectRepository(Postagem)
      private postagemRespository: Repository<Postagem>
  ){}

  async findAll(): Promise<Postagem[]>{
    return await this.postagemRespository.find();
  }

  async findById(id: number): Promise<Postagem>{
    
    let postagem = await this.postagemRespository.findOne({
      where: {
        id
      }
    });

    // Checar se a postagem não foi encontrada
    if(!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    // Retornar a postagem, caso ela exista
    return postagem;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]>{
    return await this.postagemRespository.find({
      where:{
        titulo: ILike(`%${titulo}%`)
      }
    })
  }

  async create(postagem: Postagem):Promise<Postagem>{
    return await this.postagemRespository.save(postagem);
  }

  async update(postagem: Postagem):Promise<Postagem>{

    let buscaPostagem: Postagem = await this.findById(postagem.id);

    if(!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)

    return await this.postagemRespository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult>{
    
    let buscaPostagem: Postagem = await this.findById(id);

    if(!buscaPostagem)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)

    return await this.postagemRespository.delete(id);
  }
    
}  
