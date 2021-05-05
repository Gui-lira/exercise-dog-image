import React from 'react';
import logo from './logo.svg';
import './App.css';
import Image from './image';

class App extends React.Component {
  constructor() {
    super();
    this.fecthDog = this.fecthDog.bind(this);
    this.conditional = this.conditional.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.toStorage = this.toStorage.bind(this);
    this.state = {
      dogs: '',
      loading: false,
      dog: {
        name: '',
        message:''
      },
      storedDogs: [],
    };
  }

  componentDidMount() {
    this.fecthDog();
  }

  handleButton() {
    const { dogs, dog } = this.state;
    this.setState((pastState) => ({
      dog: { ...pastState.dog,
        message: dogs },
    }));
    this.setState((pastState) => ({
      storedDogs: [...pastState.storedDogs, dog],
    }));
    this.toStorage();
  }

  handleName(event) {
    const { value } = event.target;
    this.setState((pastState) => ({
      dog: { ...pastState.dog,
        name: value },
    }));
  }

  toStorage() {
    const { storedDogs } = this.state;
    localStorage.setItem('dogArr', storedDogs);
  }

  conditional() {
    const { dogs, loading } = this.state;
    if (loading) return <h1>Loading...</h1>;
    return <Image src={ dogs } />;
  }

  async fecthDog() {
    this.setState(
      { loading: true },
      async () => {
        const { dogs } = this.state;
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
        { this.conditional() }
        <button type="button" onClick={ this.fecthDog }>Novo dog!</button>
        <input type="text" onChange={ this.handleName } />
        <button type="button" onClick={ this.handleButton }>Salvar</button>
      </div>
    );
  }
}

export default App;
