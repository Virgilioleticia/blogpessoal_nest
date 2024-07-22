import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";


@Injectable()
export class PostagemService{

constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>
) {}

    async findAll(): Promise<Postagem[]>{
        // Select * from tb_postagens;
        return await this.postagemRepository.find();
    }

}
