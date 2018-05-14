import React, { Component } from 'react';
import { Grid, Col, Row, Modal, Alert} from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';
import PostService from './PostsService';
import GroupService from '../GroupService';
import PostList from './PostList';
import NewPost from './NewPost';
import TopicCard from '../CreateTopic/TopicCard';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import servicoLogin from "../../../login/ServicoLogin";

class GroupView extends Component {

    constructor(props){

        super(props);

        this.state = {
            show: false,
            loading: "none",
            pagina:"",
            post:{titulo:"teste"},
            grupo:{id:this.props.id},
            topico:{id:this.props.idt},
            alert: false
        }
        console.log(this.state.topico.id);
        
        this.postService = new PostService();
        this.groupService = new GroupService();
        (this.state.topico.id)? this.listarPostEspecifico():this.listar();
        this.listarGrupo();
    }

    setarItem(paginaResultado) {
        //console.log(paginaResultado);
        this.setState({
            pagina: paginaResultado
        });
    }
    
    abrirNovoPost() { 
        this.setState({
            show: true
        });
    }
    
    loading(value) { 
        this.setState({
            loading: value
        });
    }

    listar() {
        this.paginaAtual=0;
        console.log(this.state.grupo.id);
        this.postService.listarPostGeral(this.state.grupo.id,
                (resultado) => {
            console.log(resultado);
            this.setarItem(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );

    } 
    
    setAlert(valor){
        this.setState({
            alert: valor
        }); 
        }
    
    listarPostEspecifico() {
        this.paginaAtual=0;
        this.postService.listarPostEspecifico(this.state.grupo.id,this.state.topico.id,
                (resultado) => {
            console.log(resultado);
            this.setarItem(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );

    } 
    
    setarGrupo(resultado) {
        this.setState({
            grupo: resultado
        });
    }
    
    
    setAnexoId(resultado) {
        this.setState({
            anexo: resultado
        });
    }

    
    listarGrupo() {
        this.groupService.listarGrupoEspecifico(this.state.grupo.id,
                (resultado) => {
            console.log(resultado);
            this.setarGrupo(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );
    }  
    
    upload(form, idPost) {
         
        let formData = new FormData(form);
        fetch("/api/posts/"+idPost+"/anexo", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            
            if (resultado.ok) {
                this.setState(
                (anterior) =>
        {
            anterior.update = anterior.update+1; 
            console.log("Mudou");
            
            
    
            return anterior;
        }
        );            
            } else {
                resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                )
            }
        });
        
    }
    
    render() {
        
    let aviso=null;
    
    if (this.state.alert){
        aviso=<Alert bsStyle="success">
        <strong>Concluído!</strong> Post realizado com sucesso.
        </Alert>
    }
            //<PostList posts={this.state.pagina}/>     
        return (
                
            <div className="content">
                {aviso}
                <h1 style={{fontSize: '30px'}}>{this.state.grupo.nome} - Geral</h1>
                
                <Grid fluid>
                    <Row>
                
                        <Col md={8}>
                            <Card 
                                title="Postagens"                                                            
                                content={
                                
                                <from>
                                    
                                    <PostList posts={this.state.pagina}/>
                                    
                        
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                        
                                            onClick={(e) => {
                                                this.abrirNovoPost();                               
                                            }}
                                        >   
                                            Novo Post
                                        </Button>
                                        <div className="clearfix"></div>
                                        
                                </from>

                         }
                    />
                    </Col>
                    
                    <TopicCard
                    idGrupo={this.state.grupo.id}
                    />
                    
            </Row>
                    <NewPost 
                    voltar={()=>{this.setState({show:false});}}
                    show={this.state.show}
                    loading={this.state.loading}
                    
                    upload={(anexo)=>{this.upload(anexo);}}
                    inserir ={(post, anexo, estadoArquivo)=>{
                        
                                    this.loading("");
                                    
                                    let topicoId;
                                    if(this.state.topico.id){
                                    topicoId=this.state.topico.id;
                                    }else topicoId=1;
                                    
                                    this.postService.inserirEmTopico(post, this.state.grupo.id, topicoId,
                                    (post)=>{
                                    
                                    if(estadoArquivo){
                                        
                                        this.upload(anexo, post.id);
                                        }
                                        
                                        this.loading("none");
                                        
                                        this.setAlert (true);
                                        this.setState({show: false});                            
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                        
                }}
                post={this.state.post} 
                    />

                </Grid>
                
            </div>
        );
    }
    
}

export default GroupView;