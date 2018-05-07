import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';
import PostService from './PostsService';
import GroupService from '../GroupService';
import PostList from './PostList';
import NewPost from './NewPost';
import TopicCard from '../CreateTopic/TopicCard';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

class GroupView extends Component {

    constructor(props){

        super(props);

        this.state = {
            show: false,
            pagina:"",
            post:{titulo:"teste"},
            grupo:{id:this.props.id}
            
        }
        console.log(this.state.grupo);
        this.postService = new PostService();
        this.groupService = new GroupService();
        this.listar();
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
    
    setarGrupo(resultado) {
        this.setState({
            grupo: resultado
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

    render() {
        
        
            //<PostList posts={this.state.pagina}/>
        return (
            <div className="content">
    
                <h1 style={{fontSize: '30px'}}>{this.state.grupo.nome} - Tópico Geral</h1>
                
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
                    inserir ={(post)=>{ 
                                    this.postService.inserirEmTopico(post,this.state.grupo.id, 
                                    (post)=>{
                                        alert("Post criado com sucesso!");
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