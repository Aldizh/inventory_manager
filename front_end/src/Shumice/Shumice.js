import React, { Component } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import Shitjet from '../Components/Shitjet';

class Shumice extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentDidMount() {
    // fetch data from our data base
    axios.get('/api/datas')
      .then((res) => {
        const filtered = res.data.data.filter((sale) => sale.category === 'big');
        this.setState({ data: filtered });
      });
  }

  render() {
    return (
      <div>
        <h3 id="shitjetShumice">{this.props.t('big')}</h3>
        <Shitjet data={this.state.data} />
      </div>
    );
  }
}

export default withTranslation()(Shumice);
