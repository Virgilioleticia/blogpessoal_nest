import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { TemaService } from "../../tema/services/tema.service";

@Injectable()
export class PostagemService{

constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService
) {}

    async findAll(): Promise<Postagem[]>{
        // Select * from tb_postagens;
        return await this.postagemRepository.find({
            relations:{
                tema: true,
                usuario: true
            }
        });
    }

    async findByid(id: number): Promise<Postagem>{
    
        let buscaPostagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations:{
                tema: true,
                usuario: true
            }
        })

        if(!buscaPostagem)
            throw new HttpException('A postagem não foi encontrada!',HttpStatus.NOT_FOUND)

        return buscaPostagem;

    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{
    
       return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true,
                usuario: true
            }
        })

    }

    async create(postagem: Postagem): Promise<Postagem> {
        if (postagem.tema){

            let tema = await this.temaService.findByid(postagem.tema.id)

            //return await this.postagemRepository.save(postagem);
}

        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {

        let buscaPostagem = await this.findByid(postagem.id);

        if (!buscaPostagem || !postagem.id)
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        if(postagem.tema){
            await this.temaService.findByid(postagem.tema.id)

            return await this.postagemRepository.save(postagem);

        }
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        let buscaPostagem = await this.findByid(id)

        if (!buscaPostagem)
            throw new HttpException('A postagem não foi encontrada!', HttpStatus.NOT_FOUND)

        return await this.postagemRepository.delete(id);

    }

}