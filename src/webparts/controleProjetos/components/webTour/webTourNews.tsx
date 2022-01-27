
import * as React from 'react';
import ReactJoyride, { STATUS } from 'react-joyride';
import {
  getToken,
  postWebTour,
} from '../../services';

var finished = false;
class webTourNews extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      run: true,
      steps: [
        {
          title: 'Bem-vindo ao Howdy!',
          locale: { next: "Próximo", prev: "Voltar" },
          content: (
            <div>
              Agora é possível escolher os campos que serão exibidos para seus times.
            </div>
          ),
          placement: 'center',
          target: '.liFields .img-painel',
        },
        {
          locale: { last: "Finalizar",back:"Voltar" },
          title: 'Configuração de campos',
          content: <p>Nessa tela será feita a parametrização dos campos que aparecerão para seus Times no formulário.</p>,
          placement: 'bottom',
          target: '.liFields .img-painel',
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
    if (data.status == "finished" || data.status == "skipped") {
      if (finished == false) {
        finished = true;
        getToken(this.props.siteUrl).then(token => {
          postWebTour(this.props.siteUrl, token, this.props.currentUser).then(data => {

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
    )
  }
}
export default webTourNews;