import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagens"}) //Criando tabela
export class Postagem{

    @PrimaryGeneratedColumn() //Chave Primária AutoIncremento
    id: number;
    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //Não aceitar titulo vazio
    @Column({length: 100, nullable: false}) //Definir tamanho e não aceitar valor
    titulo: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() //A data e hora serão preenchidas automaticamente
    data: Date;


    // Muitos para Um, ou seja, Muitas postagens, possuem um tema
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"

    })
    tema: Tema;

}