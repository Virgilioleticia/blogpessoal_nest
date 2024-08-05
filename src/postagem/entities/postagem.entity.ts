import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) //Criando tabela
export class Postagem{

    @ApiProperty()  
    @PrimaryGeneratedColumn() //Chave Primária AutoIncremento
    id: number;
    
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //Não aceitar titulo vazio
    @Column({length: 100, nullable: false}) //Definir tamanho e não aceitar valor
    titulo: string;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @ApiProperty() 
    @UpdateDateColumn() //A data e hora serão preenchidas automaticamente
    data: Date;

    @ApiProperty({ type: () => Tema })  
    // Muitos para Um, ou seja, Muitas postagens, possuem um tema
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"

    })
    tema: Tema;

    @ApiProperty({ type: () => Usuario })  
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario


}