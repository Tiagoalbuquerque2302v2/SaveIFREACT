import React, {Component} from 'react';
        import {
        Grid, Row, Col,
                FormGroup, ControlLabel, FormControl, Table, Alert
        } from 'react-bootstrap';
        import {Card} from '../../../components/Card/Card.jsx';
        import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
        import {UserCard} from '../../../components/UserCard/UserCard.jsx';
        import Button from '../../../elements/CustomButton/CustomButton.jsx';
        import done from "../../../assets/img/done.png";
        import HelpBlock from "react-bootstrap/es/HelpBlock";
        import TopicService from './TopicService';
        import {Link} from 'react-router-dom';
        
        
        export default class NewTopic extends React.Component {

        constructor(props) {
            
        
                super(props);
                this.state = {
                topic: this.props.topic,
                campoNomeTopico:"none",
                adicionarTopico: "Novo Tópico",
                topico:{titulo:"teste"},
                campoTopico: false,   
                error: "",
                msgErro:"",
                alert: false
                };
                
                this.topicService = new TopicService();
                
                this.listarTopicos();
                
        }
        
    listarTopicos() {
        this.topicService.listarTopicosGrupo(this.props.idGrupo,
                (resultado) => {
            console.log(resultado);
            this.setarTopico(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );
    }   

    
    setarTopico(resultado) {
        this.setState({
            topico: resultado
        });
    }

        componentWillReceiveProps(proximoEstado) {
        this.setState({topic: proximoEstado.topic});
        }

        setNome(valor){
            this.setState(
                    (anterior)=>
                            {                                
                            anterior.topic.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setConfigNovoTopico(){
            this.setState({
            campoTopico: !this.state.campoTopico
            }); 
            
            if (!this.state.campoTopico){
            this.setState({
                campoNomeTopico: "",
                adicionarTopico: "Cancelar",             
            });  
        }else {
           this.setState({
                campoNomeTopico: "none",
                adicionarTopico: "Novo Tópico"
            }); 
        }
        this.setNome("");
        this.setError ("");
        
        }
        
        setError (estilo, msg){
            this.setState({
                error: estilo,
                msgErro: msg
            });
        }
        
        verificaSeErroMudou () {
        var nome = this.state.topic.nome;
        var convertido = nome.toLowerCase();
        
        if(convertido=="geral"){
            this.setError("error", "Tópico "+nome+" não pode ser utilizado!");
            return true;
        }else {
            this.setError ("", "");
            return false;
        }     
        }

        setAlert(valor){
        this.setState({
            alert: valor
        }); 
        }
        
        confirmar() {
            
      
        if (this.verificaSeErroMudou()){
            
        }else if (this.state.topic.nome) {
                this.props.inserir(this.state.topic);
                this.setAlert(true); 
                this.setConfigNovoTopico();
        } else {
                this.setError("error", "Campo nome não pode ser vazio!");
        }
        }
        
        verTopico(id,topico){  
            
           
            return (topico.nome === 'Geral')? `MyGroups/${id}/geral`:`MyGroups/${id}/posts/${topico.id}`;               
        }

        render() {
        let aviso=null;
    
    if (this.state.alert){
        aviso=<Alert bsStyle="success">
        <strong>Concluído!</strong> Topico criado com sucesso.
        </Alert>
    }
        
        let erroTopico=null;

        console.log(this.state.topico);
        if (this.state.error==="error"){
            
            erroTopico=<HelpBlock>{this.state.msgErro}</HelpBlock>
            
        }else erroTopico="";
        
        if(this.state.topico.titulo !== "teste")
        return (
                <Col md={4}>
                {aviso}
                        <Card
                            title="Tópicos"
                            
                            content={
                            <form>
                                <Table responsive>  
                                    {this.state.topico.map((topico) => {
                                       return <Link to={{ pathname: `/${this.verTopico(this.props.idGrupo,topico)}`}}>{topico.nome}<br/></Link>
                                    })}
                                        <tr>
                                        <td style={{display: this.state.campoNomeTopico}}>
                                        <FormGroup controlId="formControlsText" validationState={this.state.error}>
                                            <ControlLabel>Nome</ControlLabel>
                                
                                        <FormControl
                                            type="text"                                               
                                            placeholder="Nome do Tópico"
                                            value={this.state.topic.nome}
                                            onChange={(e) => this.setNome(e.target.value)}                     
                                            />  
                                        <FormControl.Feedback />
                                        
                                        </FormGroup>
                                        {erroTopico}
                                        </td>
                                        <td><Button style={{borderStyle: "none", display: this.state.campoNomeTopico}} onClick={(e) => {this.confirmar();}}><img src={done} width="28px" height="20px"/></Button></td>
                                        </tr>                                 
                                </Table>
             
                            <Button
                            bsStyle="danger"
                            pullRight
                            fill
                            block
                            onClick={(e) => {
                                            this.setConfigNovoTopico ();
                                            }}
                            >
                            {this.state.adicionarTopico}
                            </Button>
                            <div className="clearfix"></div>
                            </form>
                                }
                            
                          />
                    </Col>

    

    );
    else
        return <div></div>
    }
    }
