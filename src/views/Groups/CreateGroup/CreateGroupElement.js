/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Radio, Checkbox, HelpBlock
} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import InputGroup from "react-bootstrap/es/InputGroup";
import cancelar from "../../../assets/img/ic_highlight_off_black_48px.svg";
import avatar from "../../../assets/img/faces/face-3.jpg";

export default class CreateGroupElement extends React.Component {

    constructor(props) {

    super(props);
    this.state={
                group:this.props.group,
                page2: false,             
                //categoy:this.props.lista,
                categoria: null,
                errorGrupo: "",
                msgErroGrupo:"",
                category:"",
                nomeBotao: "Próximo",
                botao:""
            };
    }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({group:proximoEstado.group});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setDescricao(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.descricao=valor;
                            return anterior;
                            }
                    );
            
        }
        /*
        setCategoria(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.categoria=valor;
                            return anterior;
                            }
                    );
            
        }
        */
        setCategory(valor) {
        
        this.setState(
                    (anterior)=>
                            {
                            anterior.categoria=valor;
                            return anterior;
                            }
                    ); 
        
       }
       
       setBotao(valor) {
        
        this.setState(
                    (anterior)=>
                            {
                            anterior.botao=valor;
                            return anterior;
                            }
                    ); 
        
       }
        
        setPrivacidade(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.tipoPrivacidade=valor;
                            return anterior;
                            }
                    );
            
        }
   
        createGroup(){
            let regexNome = /^[a-zA-Z\u00C0-\u00FF ]+$/;
            
            if (this.state.group.nome &&
                this.state.group.descricao&&this.state.group.tipoPrivacidade) {
            
            this.setErrorGrupo("", "");
            if (this.state.group.id&&this.state.page2!=true) {  
                this.setState({page2: true});
                //this.props.editar();   
            } else if (this.state.group.id&&this.state.page2==true){
                this.setState({page2: false});
                    this.props.alert();
                    this.setBotao("none");
                    this.props.confirmar(); 
            } else {
                this.setState({page2: true});
                if(regexNome.test(this.state.group.nome)){
                this.props.inserir(this.state.group, this.state.categoria);
                this.setNomeBotao("Criar grupo");
                this.setErrorGrupo("", "");
                }else this.setErrorGrupo("error", "Não é permitido caracteres especiais!");
            }
        } else {
            this.setErrorGrupo("error", "Preencha todos os campos obrigatórios!");
        }
        
    }
    
    setErrorGrupo (estilo, msg){
            this.setState({
                errorGrupo: estilo,
                msgErroGrupo: msg
            });
        }
        
    setNomeBotao (nome){
            this.setState({
                nomeBotao: nome
            });
        }
            
    render () {
        
        let erroGrupo=null;

        if (this.state.errorGrupo==="error"){
            
            erroGrupo=<HelpBlock>{this.state.msgErroGrupo}</HelpBlock>
            
        }else erroGrupo="";
            return (
                        <Card
                                title="Criar Grupo"                   
                                content={ 
                                <form>
                                    
                                <FormGroup controlId="formControlsText">
                                            <ControlLabel>Nome</ControlLabel>
                                            <FormControl
                                                type="text"                                               
                                                placeholder="Nome do Grupo"     
                                                value={this.state.group.nome}
                                                onChange={(e) => this.setNome(e.target.value)}
                                                disabled={this.props.disabled}
                                                
                                            />
                                        </FormGroup>
                                        
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                
                                                    <ControlLabel>Descrição</ControlLabel>
                                                    <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder="Descreva seu grupo"
                                                    value={this.state.group.descricao}
                                                    onChange={(e) => this.setDescricao(e.target.value)}
                                                    disabled={this.props.disabled}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                            <Row>
                                                <FormGroup controlId="formControlSelectVinculo" className="col-md-12">
                                                    <ControlLabel>Categoria</ControlLabel>
                                                    <FormControl
                                                        componentClass="select"
                                                        placeholder="categoria"
                                                        disabled={this.props.disabled}
                                                        value={this.state.categoria}
                                                        onChange={(e) => this.setCategory(e.target.value)}
                                                        >
                                                        
                                                        <option value="">-- Selecione --</option>
                                                        <option value="1">Outros</option>
                                                        <option value="2">Informática</option>
                                                        <option value="3">Lazer</option>
                                                        <option value="4">Eletrônica</option>
                                                        <option value="5">Linguagens</option>
                                                        <option value="6">Desenvolvimento de sistemas</option>
                                                        <option value="7">Gestão de pessoas</option>
                                                        <option value="8">Empreendendorismo</option>

                                                        {/*
                                                        <option value="">-- Selecione --</option>
                                                        {this.state.category.map((categoria) => {
                                                            return <option
                                                                value={categoria.id}
                                                                key={categoria.id}
                                                            >{categoria.nome}</option>
                                                            })}
                                                            
                                                        */}
                                                    </FormControl>
                                                </FormGroup>
                                            </Row>                                   
                                            
                                    
                                    <FormGroup style={{display: this.props.privacy}} disabled={this.props.disabled}>
                                    <ControlLabel>Privacidade</ControlLabel><br/>
                                    
                                    <FormControl componentClass="radio"
                                        value={this.state.group.tipoPrivacidade}
                                        onChange={(e) => this.setPrivacidade(e.target.value)}
                                        
                                            >
                                        <Radio name="radioGroup" inline value="aberto">
                                            Aberto
                                        </Radio>
                                        <Radio name="radioGroup" inline value="publico">
                                            Público
                                        </Radio>
                                        <Radio name="radioGroup" inline value="privado">
                                            Privado
                                        </Radio>
                                    </FormControl>
                                    </FormGroup>
                                    
                                    <FormGroup controlId="formControlsConvidados" className="col-md-12" style={{display: this.props.invite}}>
                                        <ControlLabel>Convidados</ControlLabel><br/>
                                        
                                        <div className="chip" style={{width: '200px'}}
                                        chip={this.state.chip}
                                        docked={false}
                                        onRequestChange={(chip) => this.setState({chip})}
                                        >
                                        <img src={avatar} alt="Person" width="96" height="96"/>
                                            
                                            John Doe
             
                                        <span class="closebtn" style={{float: 'right'}} onClick={this.fechaChip}>&times;</span>
                                        </div>
                                        
                                        <div className="chip" style={{width: '200px'}}
                                        chip={this.state.chip}
                                        docked={false}
                                        onRequestChange={(chip) => this.setState({chip})}
                                        >
                                        <img src={avatar} alt="Person" width="96" height="96"/>
                                            
                                            John Doe
             
                                        <span class="closebtn" style={{float: 'right'}} onClick={this.fechaChip}>&times;</span>
                                        </div>
                                        </FormGroup> 
                                    {erroGrupo}
                                    <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                            
                                            onClick={(e) => {
                                                this.createGroup()
                                            }}
                                            style={{display: this.state.botao}}
                                        >   
                                            {this.state.nomeBotao}
                                        </Button>
                                        {/*
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                       
                                            onClick={(e) => {
                                                
                                                this.setState({page2: false})
                                                this.props.voltar();
                                            }}
                                        >
                                            Voltar
                                        </Button>
                                        */}
                                        <div className="clearfix"></div>
                                </form>
                                }
                                        
                            />       
                            
                            
                            
        );
    }
}

                                            