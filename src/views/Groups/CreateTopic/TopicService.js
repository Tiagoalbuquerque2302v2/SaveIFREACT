
import servicoLogin from "../../../login/ServicoLogin";

export default class TopicService {
        
    inserirEmGrupo(item, idGrupo, sucesso, erro) {
        console.log(item);
       
        fetch(`api/topicos/${idGrupo}`, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }

        });            
        
    }
    
    listarTopicosGrupo(id, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/grupos/${id}/topicos`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }
    
    

}