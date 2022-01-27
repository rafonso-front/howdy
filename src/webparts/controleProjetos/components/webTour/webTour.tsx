
import * as React from 'react';
import ReactJoyride, { STATUS } from 'react-joyride';
import {
    getToken,
    postWebTour,
} from '../../services';

var finished = false;
class webTour extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
          run: true,
          steps: [
            {
              title: 'Bem-vindo!',
              locale: { next: "Próximo",prev:"Voltar" },
              content: (
                  <div>
                    O <b>HOWDY</b> é o sistema que irá apoiar os gestores e as equipes de desenvolvimento a ter controle de todas as demandas que são solicitadas por outras áreas e por demandas internas da própria equipe. 
                  </div>
              ),
              placement: 'center',
              target: 'body',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Cadastrar demanda',
              content: (
                          <div>
                            <p>Para cadastrar uma demanda ao entrar no sistema é só clicar no botão “Adicionar Demanda” posicionado no menu lateral esquerdo.</p>
                            Assim que clicar no botão para adicionar demanda vai abrir a aba do lado direto um formulário para o cadastro, nesse passo é só preencher os campos obrigatórios e os necessários para a sua área e clicar no botão “Salvar”. 
                          </div>
              ),
              target: '.liAddDemanda .img-painel',
              placement: 'bottom ',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Lista',
              content: 'Após salvar a demanda a estória vai aparecer na home do sistema apresentando as informações mais importantes.',
              target: '.cards > div > div',
              placement: 'bottom ',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Editar Demanda',
              content: 'Quando precisar inserir dado ou alterar o conteúdo de uma demanda é só achar a demanda desejada e clicar no título da demanda.',
              placement: 'right',
              target: '.title-cursor',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Editar Demanda',
              content: (<div>
                  <p>
                  Ou entrar no Menu da demanda e clicar em “Editar”.
                  </p>
                  <p>
                  Após abrir a aba com a demanda desejada é só alterar os dados necessários e clicar no botão “Salvar”.
                  </p>
              </div>),
              placement: 'right',
              target: '.context-menu',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Favoritar',
              content: <p>A aplicação permite “favoritar” as demandas desejadas, assim as demandas favoritadas estão disponíveis em uma aba a parte para mais fácil acesso. Para favoritar uma demanda o usuário precisar clicar no ícone de estrela que fica no canto esquerdo da demanda.</p>,
              placement: 'right',
              target: '.fav.btn-action-card',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: ' Participantes e Responsável solicitante',
              content: (<p>É possível ver essas informações sem ter que abrir a demanda, colocamos essa informação à fácil acesso para o usuário. A demanda tem um ícone de usuários.</p>),
              placement: 'right',
              target: '.pessoasCard.btn-action-card',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Favoritos',
              content: <p>Para visualizar todas as demandas favoritas, o acesso é pelo botão "Meus Favoritos".</p>,
              placement: 'bottom',
              target: '.liFavoritos .img-painel',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'FUP',
              content: <p>O botão de FUP(Follow UP) gera um documento .eml com algumas informações sobre as demandas. Para gerar esse documento é necessário clicar o botão “FUP” no Menu que fica ao lado esquerdo.<p>Obs: O FUP é gerado de acordo com os filtros aplicados em tela.</p></p>,
              placement: 'bottom',
              target: '.liFup .img-painel',
            },
            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Times',
              content: <p>Nessa tela será possível adcionar e remover membros do Time e a criação de novos Times.</p>,
              placement: 'bottom',
              target: '.liTimes .img-painel',
            },


            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Projetos',
              content: <p>Nessa tela é feito o controle de que qual projeto pertence a qual Time da gestão do Gestor.</p>,
              placement: 'bottom',
              target: '.liProjetos .img-painel',
            },

            {
              locale: { next: "Próximo",back:"Voltar" },
              title: 'Configuração de campos',
              content: <p>Nessa tela será feita a parametrização dos campos que aparecerão para seus Times no formulário.</p>,
              placement: 'bottom',
              target: '.liFields .img-painel',
            },


            {
              locale: { last: "Finalizar",back:"Voltar" },
              title: 'Filtros',
              content: (
                <div>
                  <p>
                    Na parte de cima de toda a aplicação fica o filtro, através das opções selecionadas a tela carrega determinadas demandas.
                  </p>
                  <p>
                    Se a seleção de filtros não trouxer nada a aplicação apresenta a mensagem: A consulta não retornou itens.
                  </p>  
                  <p>A aplicação permite o usuário criar filtros, que seria opções selecionadas que ele sempre utiliza. Para criação de um filtro o usuário precisa selecionar as opções desejadas e clicar em “Salvar Como”</p>
                  <p>Após clicar no botão “Salvar Como” irá abrir um modal para preencher o nome e salvar o filtro.</p>

                  <p>Ao salvar o filtro o mesmo irá aparecer para seleção no filtro, e ao clicar nele já aplica automaticamente o filtro salvo.</p>
                </div>
              ),
              placement: 'bottom',
              target: '.filtros',
            },
          ],
        };
        }
    componentDidMount() {
    }
    handleClickStart = e => {
      e.preventDefault();
      this.setState({
        run: true
      });
    };

    handleJoyrideCallback = data => {
      const { status, type } = data;
      if(data.status == "finished" || data.status == "skipped"){
        if(finished == false){
          finished = true;
          getToken(this.props.siteUrl).then(token => {
            postWebTour(this.props.siteUrl, token,this.props.currentUser).then(data => {
    
            }) 
          }) 
        }
      }
    };
  
    render() {
    const { run, steps } = this.state;
    const { breakpoint } = this.props;
        return (
          <div id="teste">
            
            <ReactJoyride
              callback={this.handleJoyrideCallback}
              continuous
              run={run}
              scrollToFirstStep
              disableScrolling
              showProgress
              showSkipButton
              steps={steps}
              styles={{
                options: {
                  zIndex: 10000,
                }
              }}
          />
          </div>
        )}
}
export default webTour;