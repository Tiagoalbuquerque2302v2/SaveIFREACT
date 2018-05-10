import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';

import TopicService from './TopicService';

import NewTopic from './NewTopic';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

export default class TopicCard extends Component {

    constructor(props){

        super(props);

        this.state = {           
            topic:{},
            lista: {},
            idGrupoAtual: this.props.idGrupo,
        }
        
        this.topicService = new TopicService();
        
    }
    
    render() {
        //console.log(this.state.topico);
        return (

                    <NewTopic
                        idGrupo = {this.state.idGrupoAtual}
                        inserir ={(topic)=>{ 
                                    this.topicService.inserirEmGrupo(topic,this.state.idGrupoAtual, 
                                    (topico)=>{
                                        alert("Topico criado com sucesso!");                         
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                        
                }}
                topic={this.state.topic} 
                    />
        );
    }
    
}
