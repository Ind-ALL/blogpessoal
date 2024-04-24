import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { TemaService } from "src/tema/services/tema.service";


@Injectable()
export class PostagemService{
  constructor(
      @InjectRepository(Postagem)
      private postagemRespository: Repository<Postagem>,
      private temaService: TemaService
  ){}

  async findAll(): Promise<Postagem[]>{
    return await this.postagemRespository.find({
      relations: {
        tema: true,
        usuario: true
      }
    });
  }

  async findById(id: number): Promise<Postagem>{
    
    let postagem = await this.postagemRespository.findOne({
      where: {
        id
      },
      relations: {
        tema: true,
        usuario: true
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
      },
      relations: {
        tema: true,
        usuario: true
      }
    })
  }

  async create(postagem: Postagem):Promise<Postagem>{

    if(postagem.tema){
      
      let tema = await this.temaService.findById(postagem.tema.id)

      if(!tema)
        throw new HttpException("Tema não econtrado!", HttpStatus.NOT_FOUND);

      return await this.postagemRespository.save(postagem);
    }

    return await this.postagemRespository.save(postagem);
  }

  async update(postagem: Postagem):Promise<Postagem>{

    let buscaPostagem: Postagem = await this.findById(postagem.id);

    if(!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

    if (postagem.tema){

      let tema = await this.temaService.findById(postagem.tema.id)

      if(!tema)
        throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND);

      return await this.postagemRespository.save(postagem);
    }

    return await this.postagemRespository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult>{
    
    let buscaPostagem: Postagem = await this.findById(id);

    if(!buscaPostagem)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)

    return await this.postagemRespository.delete(id);
  }
    
}  
