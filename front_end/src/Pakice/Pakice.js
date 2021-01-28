import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import Shitjet from '../Components/Shitjet';

class Pakice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      name: '',
      buyPrice: '',
      sellPrice: '',
    };
  }

  componentDidMount() {
    // fetch data from our data base
    axios.get('/api/datas')
      .then((res) => {
        const filtered = res.data.data.filter((sale) => sale.category === 'small');
        this.setState({ data: filtered });
      });
  }

  render() {
    return (
      <div>
        <h3 id="shitjetShumice">{this.props.t('small')}</h3>
        <Shitjet data={this.state.data} />
      </div>
    );
  }
}

export default withTranslation()(Pakice);
