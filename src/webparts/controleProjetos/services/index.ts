import axios from 'axios';

const urlToken = "/_api/contextinfo";
const urlGetControleDemandas = "/_api/Web/Lists/GetByTitle('ControleDemandas')/Items?$select=*,Horas,TamanhoDemanda,participantes/Title,participantes/Id,ResponsavelArea/Title,ResponsavelArea/FirstName,ResponsavelArea/LastName,ResponsavelTI/Title,ResponsavelTI/FirstName,ResponsavelTI/LastName,demandaRelacionada/ID,demandaRelacionada/Title,Title,Status/Title,Status/cor,Status/Id,Time/Id,Time/Id,Time/Title,Projeto/Title,Projeto/Id,TipoDemanda/Id,Fornecedor/Id,Empresa/Id,Empresa/Title&$expand=participantes,ResponsavelArea,ResponsavelTI,demandaRelacionada,Projeto,Status,Time,TipoDemanda,Fornecedor,Empresa&$top=15&$orderby=Id desc";


//Token autenticação SHAREPOINT
export function getToken(url) {
    return axios.post(url + urlToken)
        .then((response) => {

            return response.data.FormDigestValue;
        })
        .catch((error) => {
            console.log(error);
        })
}
export function getItembeforeDelete(id, url, listName) {
    let apiUrl = url + "/_api/Web/Lists/GetByTitle('" + listName + "')/Items(" + id + ")";
    return axios.get(apiUrl)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })
}
export function getTeamById(url, ID) {
    return axios.get(url + "_api/Web/Lists/GetByTitle('Times')/Items(" + ID + ")?$select=Id,Membros/Name,Membros/Id,Membros/Title&$expand=Membros")
        .then(response => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })
}
export function clearArray(array, valueReceive) {
    var filtered = array.filter(function (value, index, arr) {
        return value != valueReceive;
    });
    return filtered;
};
export function clearArraySubFiltro(array, valueReceive) {
    var filtered = array.filter(function (value, index, arr) {
        return value.Text != valueReceive;
    });
    return filtered;
};
export function getMyFavs(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((response) => {
            return axios.get(url + "_api/Web/Lists/GetByTitle('Favoritos')/Items?$filter=Title eq '" + response.data.Email + "'")
                .then(resultado => {
                    return resultado.data.value[0];
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}
export function getMyTeams(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((result) => {
            return axios.get(url + "_api/Web/Lists/GetByTitle('Times')/Items?$filter=MembrosId eq " + result.data.Id + " or GestorId eq " + result.data.Id + "&$orderby=Title")
                .then(response => {
                    //return response.data.value
                    let retornoConsulta = response.data.value;
                    let items = [];
                    if (retornoConsulta != null && retornoConsulta.length > 0) {
                        retornoConsulta.map((mapRetornoItem) => {
                            items.push({
                                Id: mapRetornoItem.Id,
                                Title: mapRetornoItem.Title,
                                key: mapRetornoItem.Id,
                                text: mapRetornoItem.Title
                            })
                        });
                        return items;
                    }
                    return null;
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}




export function getMyTeamsGestor(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((result) => {
            return axios.get(url + "_api/Web/Lists/GetByTitle('Times')/Items?$filter=GestorId eq " + result.data.Id + "&$orderby=Title")
                .then(response => {
                    //return response.data.value
                    let retornoConsulta = response.data.value;
                    let items = [];
                    if (retornoConsulta != null && retornoConsulta.length > 0) {
                        retornoConsulta.map((mapRetornoItem) => {
                            items.push({
                                Id: mapRetornoItem.Id,
                                Title: mapRetornoItem.Title,
                                key: mapRetornoItem.Id,
                                text: mapRetornoItem.Title
                            })
                        });
                        return items;
                    }
                    return null;
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}

export function timesQueSouGestor(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((result) => {
            return axios.get(url + "_api/Web/Lists/GetByTitle('Times')/Items?$filter=GestorId eq " + result.data.Id + "&$orderby=Title")
                .then(response => {
                    return response.data.value
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}
export function timesQueSouMembro(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((result) => {
            return axios.get(url + "_api/Web/Lists/GetByTitle('Times')/Items?$filter=MembrosId eq " + result.data.Id + "&$orderby=Title")
                .then(response => {
                    return response.data.value
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}


export function tourVisualizado(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((result) => {
            return axios.get(url + "_api/Web/Lists/GetByTitle('WebTour')/Items?$filter=Title eq '" + result.data.Email + "'&$orderby=Title")
                .then(response => {
                    return response.data.value
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}



export function timesMembrosByID(url, ID) {
    return axios.get(url + "_api/Web/Lists/GetByTitle('Times')/Items?$select=Membros/Title,Id,Title&$expand=Membros&$filter=MembrosId eq " + ID + "&$orderby=Title")
        .then(response => {
            return response.data.value
        })
        .catch((error) => {
            console.log(error);
        })

}




export function getProjetos(url, listInternalName, fieldOrder, selectedTeam) {
    let teamId = []
    selectedTeam.map(item => {
        teamId.push(item.Id)
    })

    let filterTeam = "(TimeId eq " + teamId.join(" or TimeId eq ") + ")"
    return axios.get(url + "_api/Web/Lists/GetByTitle('" + listInternalName + "')/Items?$select=*,Time/Title&$expand=Time&$filter=" + filterTeam + "&$orderby=" + fieldOrder + "")
        .then(response => {
            //return response.data.value
            let retornoConsulta = response.data.value;
            let items = [];
            if (retornoConsulta != null && retornoConsulta.length > 0) {
                items.push({
                    Id: null,
                    Title: "",
                    key: null,
                    text: "",


                })
                retornoConsulta.map((mapRetornoItem) => {
                    items.push({
                        Id: mapRetornoItem.Id,
                        Title: mapRetornoItem.Title,
                        key: mapRetornoItem.Id,
                        text: mapRetornoItem.Title,
                        TimeId: mapRetornoItem.TimeId,

                        TimeName: mapRetornoItem.Time.Title
                    })
                });
                return items;
            }
            return null;
        })
        .catch((error) => {
            console.log(error);
        })



}

export function getLookUp(url, listInternalName, fieldOrder, filtro) {
    return axios.get(url + "_api/Web/Lists/GetByTitle('" + listInternalName + "')/Items?$orderby=" + fieldOrder + "" + filtro)
        .then(response => {
            //return response.data.value
            let items = [];
            items.push({

                Id: null,
                Title: "",
                key: null,
                text: ""
            })
            let retornoConsulta = response.data.value;
            if (retornoConsulta != null && retornoConsulta.length > 0) {

                retornoConsulta.map((mapRetornoItem) => {
                    items.push({
                        Id: mapRetornoItem.Id,
                        Title: mapRetornoItem.Title,
                        key: mapRetornoItem.Id,
                        text: mapRetornoItem.Title
                    })
                });
                return items;
            }
            return null;
        })
        .catch((error) => {
            console.log(error);
        })
}

export function postDeleteDemanda(url, keyID) {
    return getToken(url).then(data => {
        let token = data;
        axios({
            method: 'post',
            url: url + "/_api/Web/Lists/GetByTitle('ControleDemandas')/Items" + '(' + keyID + ')/recycle()',
            headers: {
                'X-RequestDigest': token,
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE'
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return false;
            })
    });
}
export function delArquivos(url, id, filename) {
    return getToken(url).then(data => {
        let token = data;
        axios({
            method: 'delete',
            url: url + urlPostList + "(" + id + ")/AttachmentFiles/getByFileName('" + filename + "')",
            headers: {
                "Accept": "application/json; odata=verbose",
                'X-RequestDigest': token,
                'X-HTTP-Method': 'DELETE',
            }
        })
            .then((response) => {
            })
    })
}
export function atualizaComentarios(url, dados, id) {
    let comentariosList = "/_api/Web/Lists/GetByTitle('comentarios')/Items"
    let urlFinal: string;
    let header: any;
    let novo: any;
    return getToken(url).then(token => {
        if (id > 0) {
            urlFinal = url + comentariosList + "(" + id + ")";
            header = {
                'X-RequestDigest': token,
                'IF-MATCH': '*',
                'X-HTTP-Method': 'PATCH',
            }
        } else {
            urlFinal = url + comentariosList;
            novo = true;
            header = {
                'X-RequestDigest': token,
                'IF-MATCH': '*'
            }
        }
        axios({
            method: 'post',
            url: urlFinal,
            data: dados,
            headers: header
        })
            .then((response) => {

                return response
            })
            .catch((error) => {
                console.log(error)
            })
    })
}
export function getItemByfilter(filter, url, listName) {
    let apiUrl = url + "/_api/Web/Lists/GetByTitle('" + listName + "')/Items" + filter + "&$orderby=Created desc";
    return axios.get(apiUrl)
        .then((response) => {
            return response.data.value;
        })
        .catch((error) => {
            console.log(error);
        })

}

const fieldsFup = "Descritivo,ResponsavelTI/EMail,ResponsavelArea/Title,Title,DataFimEstimada,DataFimReal,ResponsavelTI/EMail,Title,ID,Status/Title"
const urlFupItems = "/_api/Web/Lists/GetByTitle('ControleDemandas')/Items?$select=" + fieldsFup + "&$expand=ResponsavelArea,Status/Title,ResponsavelTI&$top=5000&$orderby=DataFimEstimada desc"
export function getFupItems(url, filter) {

    return axios.get(url + urlFupItems + filter)
        .then((response) => {
            return response.data.value;
        })
        .catch((error) => {
            console.log(error);
        })
}
export function getCurrentUser(url) {
    return axios.get(url + "_api/web/currentUser")
        .then((response) => {
            ////console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })
}
//post tracking status
export function postProjeto(url, dados, itemID, token) {
    let urlPost = "/_api/Web/Lists/GetByTitle('Projeto')/Items"

    let urlFinal: string;
    let header: any;
    let novo: any;
    if (itemID > 0) {
        urlFinal = url + urlPost + "(" + itemID + ")";
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'PATCH',
        }
    }
    else {
        urlFinal = url + urlPost;
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
        }
    }
    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export function postFavs(url, demandas, itemID, token) {
    let urlFinal: string;
    let header: any;
    let favsList = "/_api/Web/Lists/GetByTitle('Favoritos')/Items"
    return axios.get(url + "_api/web/currentUser")
        .then((response) => {
            let dados = {
                DemandaId: demandas,
                Title: response.data.Email
            }
            if (itemID > 0) {
                urlFinal = url + favsList + "(" + itemID + ")";
                header = {
                    'X-RequestDigest': token,
                    'IF-MATCH': '*',
                    'X-HTTP-Method': 'PATCH',
                }
            }
            else {
                urlFinal = url + favsList;
                header = {
                    'X-RequestDigest': token,
                    'IF-MATCH': '*',
                }
            }
            return axios({
                method: 'post',
                url: urlFinal,
                data: dados,
                headers: header
            })
                .then((postresult) => {
                    return postresult
                })
                .catch((error) => {
                    return error
                })
        })
}
const urlTrackPost = "/_api/Web/Lists/GetByTitle('trackingStatus')/Items"
//post tracking status
export function postTracking(url, dados, id, anexos, token) {
    let urlFinal: string;
    let header: any;
    let novo: any;
    urlFinal = url + urlTrackPost;
    novo = true;
    header = {
        'X-RequestDigest': token,
        'IF-MATCH': '*'
    }
    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error

        })
}
export function meusFiltros(url, Email) {
    return axios.get(url + "_api/Web/Lists/GetByTitle('filtroPessoal')/Items?$filter=emailResponsavelFiltro eq '" + Email + "'")
        .then(response => {
            //return response.data.value
            let retornoConsulta = response.data.value;
            let items = [];
            items.push({
                Id: 0,
                Title: "Selecione Filtro",
                key: 0,
                text: "Selecione Filtro"
            })
            if (retornoConsulta != null && retornoConsulta.length > 0) {
                retornoConsulta.map((mapRetornoItem) => {
                    items.push({
                        Id: mapRetornoItem.Id,
                        Title: mapRetornoItem.Title,
                        key: mapRetornoItem.Id,
                        text: mapRetornoItem.Title
                    })
                });
                return items;
            }
            return items;
        })
        .catch((error) => {
            console.log(error);
        })
}



export function filtroById(url, Id) {
    return axios.get(url + "_api/Web/Lists/GetByTitle('filtroPessoal')/Items?$select=*,participantes/Title,participantes/Id,pessoas/Name,pessoas/Title,times/Title,times/Id,tipos/Title,tipos/Id,status/Title,status/Id&$expand=pessoas,participantes,status,tipos,times&$filter=Id eq " + Id + "")
        .then(response => {
            return response.data.value
        })
        .catch((error) => {
            console.log(error);
        })
}



//post tracking status
export function postFiltro(url, dados, itemID, anexos, token) {
    const urlFiltroPessoal = "/_api/Web/Lists/GetByTitle('filtroPessoal')/Items"
    let urlFinal: string;
    let header: any;
    let novo: any;
    urlFinal = url + urlFiltroPessoal;
    novo = true;
    header = {
        'X-RequestDigest': token,
        'IF-MATCH': '*'
    }

    if (itemID > 0) {
        urlFinal = url + urlFiltroPessoal + "(" + itemID + ")";
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'PATCH',
        }
    }
    else {
        urlFinal = url + urlFiltroPessoal;
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
        }
    }

    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            
            return error

        })
}










const urlTimePost = "/_api/Web/Lists/GetByTitle('Times')/Items"
export function postEquipe(url, dados, id, token) {
    let urlFinal: string;
    let header: any;
    if (id > 0) {
        urlFinal = url + urlTimePost + "(" + id + ")";
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'PATCH',
        }
    }
    else {
        urlFinal = url + urlTimePost;
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
        }

    }
    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export function getTrackHistoryByID(ID, url) {
    let apiUrl = url + "/_api/Web/Lists/GetByTitle('trackingStatus')/Items?$select=*,StatusAntigo/Title,Status/Title,Author/Title&$expand=StatusAntigo,Status,Author&$filter=Title eq '" + ID + "'";
    return axios.get(apiUrl)
        .then((response) => {

            return response.data.value;
        })
        .catch((error) => {
            console.log(error);
        })
}
export function gravaComentarios(url, dados) {
    let comentariosList = "/_api/Web/Lists/GetByTitle('comentarios')/Items"
    let urlFinal: string;
    let header: any;
    let novo: any;
    return getToken(url).then(data => {
        let token = data;
        urlFinal = url + comentariosList;
        novo = true;
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*'
        }
        axios({
            method: 'post',
            url: urlFinal,
            data: dados,
            headers: header
        })
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.log(error)
            })
    })
}
//POST demandas
const urlPostList = "/_api/Web/Lists/GetByTitle('ControleDemandas')/Items"
export function postAtividades(url, dados, id, anexos, token) {
    let urlFinal: string;
    let header: any;
    let novo: any;
    if (id > 0) {
        urlFinal = url + urlPostList + "(" + id + ")";
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'PATCH',
        }
    } else {
        urlFinal = url + urlPostList;
        novo = true;
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*'
        }
    }
    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            if (anexos) {
                if (novo) {
                    processArray(url, response.data.Id, anexos)
                } else {
                    processArray(url, id, anexos)
                }
            }
            return response
        })
        .catch((error) => {
            return error

        })
}
async function processArray(url, id, array) {
    for (const item of array) {
        await delayedLog(url, id, item.byteBuffer, item.nome);
    };
}
async function delayedLog(url, id, itembyteBuffer, itemnome) {
    await delay();
    postAnexos(url, id, itembyteBuffer, itemnome)
}
function delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
export function postAnexos(url, id, dados, filename) {
    let header: any;
    return getToken(url).then(data => {
        let token = data;
        axios({
            method: 'post',
            url: url + urlPostList + "(" + id + ")/AttachmentFiles/add(FileName='" + filename + "')",
            data: dados,
            headers: {
                "Accept": "application/json; odata=verbose",
                "content-type": "application/json; odata=verbose",
                'X-RequestDigest': token
            }
        })
            .then((response) => {
                //console.log(response)
            })
            .catch((error) => {
            })
    })
}


export function getInitials(userTitle) {
    return userTitle.substring(0, 1) + userTitle.split(" ")[userTitle.split(" ").length - 1].substring(0, 1)
}
export function getAtividades(url, filter, times, currentUserId) {
    let timesId = []
    times.map(time => {
        timesId.push(time.Id)
    })

    let filterTeam = "(TimeId eq " + timesId.join(" or TimeId eq ") + ")"

    if (filter.toLowerCase().indexOf("participantes/title eq") > -1) {
        if (filter.length > 0) {
            filter = "&$filter=(" + filter + ")"
        }
    }
    else {
        if (filter.length > 0) {
            filter = "&$filter=(" + filterTeam + ")" + " and (" + filter + ") "
        }
        else {
            filter = "&$filter=(" + filterTeam + ") "
        }
    }
    let urlFinal = url + urlGetControleDemandas + filter;
    return axios.get(urlFinal)
        .then((response2) => {
            let ControleDemandas = [];
            response2.data.value.map((atividadeEntrega) => {
                atividadeEntrega.Next = response2.data["odata.nextLink"]
                atividadeEntrega.Permissao = "Admin";
                ControleDemandas.push(atividadeEntrega)
            });
            return ControleDemandas;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getArquivos(url, id) {
    return axios.get(url + "/_api/Web/Lists/GetByTitle('ControleDemandas')/items(" + id + ")/AttachmentFiles")
        .then(response => {
            return response.data.value
        })
        .catch((error) => {
            console.log(error);
        })
}
export function getAtividadesPaginacao(fullUrl) {
    if (fullUrl != "" && fullUrl !== undefined) {
        return axios.get(fullUrl)
            .then((response2) => {
                let ControleDemandas = [];
                response2.data.value.map((atividadeEntrega) => {
                    atividadeEntrega.Next = response2.data["odata.nextLink"]
                    ControleDemandas.push(atividadeEntrega)
                });
                return ControleDemandas;

            })
    }
}
export function getAtividadeById(url, ID) {
    const atividadePorId = "/_api/Web/Lists/GetByTitle('ControleDemandas')/Items?$select=*,participantes/Title,participantes/Id,ResponsavelArea/Title,ResponsavelArea/FirstName,ResponsavelArea/LastName,ResponsavelTI/Title,ResponsavelTI/FirstName,ResponsavelTI/LastName,demandaRelacionada/ID,demandaRelacionada/Title,Title,Status/Title,Status/Id,Time/Id,Time/Id,Time/Title,Projeto/Title,Projeto/Id,TipoDemanda/Id,Fornecedor/Id,Empresa/Id,Empresa/Title&$expand=participantes,ResponsavelArea,ResponsavelTI,demandaRelacionada,Projeto,Status,Time,TipoDemanda,Fornecedor,Empresa&$filter=Id eq " + ID;
    let urlFinal = url + atividadePorId;
    return axios.get(urlFinal)
        .then((response2) => {
            return response2.data.value[0]
        })
        .catch((error) => {
            console.log(error);
        });
}



//post tracking status
export function postWebTour(url, token, currentUser) {

    
    const urlPostWebTour = "/_api/Web/Lists/GetByTitle('WebTour')/Items"
    let dados = {
        Title: currentUser.data.Email,
    }
    let urlFinal: string;
    let header: any;
    let novo: any;
    urlFinal = url + urlPostWebTour;
    novo = true;
    header = {
        'X-RequestDigest': token,
        'IF-MATCH': '*'
    }
    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })


}

export function postCamposPorTime(url, dados, id, token) {
    let postCamposPorTime = "/_api/Web/Lists/GetByTitle('CamposPadraoPorTime')/Items"

    let urlFinal: string;
    let header: any;
    let novo: any;
    if (id > 0) {
        urlFinal = url + postCamposPorTime + "(" + id + ")";
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'PATCH',
        }
    } else {
        urlFinal = url + postCamposPorTime;
        novo = true;
        header = {
            'X-RequestDigest': token,
            'IF-MATCH': '*'
        }
    }
    return axios({
        method: 'post',
        url: urlFinal,
        data: dados,
        headers: header
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error

        })
}
export function deleteFiltro(url, keyID) {
    return getToken(url).then(data => {
        let token = data;
        axios({
            method: 'post',
            url: url + "/_api/Web/Lists/GetByTitle('filtroPessoal')/Items" + '(' + keyID + ')/recycle()',
            headers: {
                'X-RequestDigest': token,
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE'
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return false;
            })
    });
}