import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Flavio Basseto'
    });

    setProjects([...projects, response.data])
  };

  async function handleRemoveRepository(id) {
    const projectIndex = projects.findIndex(project => project.id === id);
    projects.splice(projectIndex, 1);
    await api.delete('projects/' + id);
  }

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, [projects]);

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>
          {project.title}

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
