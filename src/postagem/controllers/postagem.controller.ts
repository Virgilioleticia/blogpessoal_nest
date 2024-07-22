import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/Postagens")
export class PostagemController{

    constructor(private readonly postagemService: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK) //Http status 200
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
    
}