import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) //Criando tabela
export class Postagem{

    @PrimaryGeneratedColumn() //Chave Primária AutoIncremento
    id: number;
    
    @IsNotEmpty() //Não aceitar titulo vazio
    @Column({length: 100, nullable: false}) //Definir tamanho e não aceitar valor
    titulo: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() //A data e hora serão preenchidas automaticamente
    data: Date;

}