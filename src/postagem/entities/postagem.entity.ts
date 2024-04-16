import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//create table tb_postagem;
@Entity({name: "tb_postagem"})
export class Postagem{

  @PrimaryGeneratedColumn()  // Define a chave primaria e auto_incremente
  id: number;

  @IsNotEmpty()
  @Column({length: 100, nullable: false}) 
  titulo: string;
  
  @IsNotEmpty()
  @Column({length: 1000, nullable: false})
  texto: string;
  
  @UpdateDateColumn()
  data: Date;
}