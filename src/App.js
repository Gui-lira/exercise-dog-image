import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.fecthDog = this.fecthDog.bind(this);
    this.state = {
      dogs: '',
      loading: false
    };
  }

  componentDidMount() {
    this.fecthDog();
  }

  async fecthDog() {
    this.setState(
      { loading: true },
      async () => {
        const fecthApi = await fetch('https://dog.ceo/api/breeds/image/random');
        const apiJson = await fecthApi.json();
        const src = await apiJson.message;
        if (!src.includes('terrier')) {
          this.setState({
            dogs: src,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      },
    );
  }

  render() {
    const { dogs, loading } = this.state;
    return (
      <div className="App">
        <h1>Sempre um novo doguinho</h1>
        {loading ? <h1>Loading</h1> : <img src={ dogs } alt="a dog" />}
        <button type="button" onClick={ this.fecthDog }>Novo dog!</button>
      </div>
    );
  }
}

export default App;
