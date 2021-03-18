import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);



  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Junior',
      url: 'https://repo.com',
      techs: ['ReacJS', 'NodeJS']
    });

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>

      <ul data-testid="repository-list">

        {repositories.map(respositorie => (

          <li key={respositorie.id}>
            {respositorie.title}
            <button onClick={() => handleRemoveRepository(respositorie.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
