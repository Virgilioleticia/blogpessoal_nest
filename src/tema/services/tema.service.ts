import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService{

constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>
) {}

    async findAll(): Promise<Tema[]>{
        // Select * from tb_postagens;
        return await this.temaRepository.find({
            relations:{
                postagem:true
            }
        });
    }

    async findByid(id: number): Promise<Tema>{
    
        let tema = await this.temaRepository.findOne({
            where:{
                id
            },
            relations:{
                postagem:true
            }
        })

        if(!Tema)
            throw new HttpException('O Tema não foi encontrado!',HttpStatus.NOT_FOUND);

        return tema;

    }

    async findByDescricao(descricao: string): Promise<Tema[]>{
    
       return await this.temaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations:{
                postagem:true
            }
        })

    }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema);
    }

    async update(Tema: Tema): Promise<Tema> {

        let buscatema = await this.findByid(Tema.id);

        if (!buscatema || !Tema.id)
            throw new HttpException('o tema não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.temaRepository.save(Tema);
    }

    async delete(id: number): Promise<DeleteResult> {

        let buscatema = await this.findByid(id)

        if (!buscatema)
            throw new HttpException('O Tema não foi encontrado!', HttpStatus.NOT_FOUND);

        return await this.temaRepository.delete(id);

    }

}