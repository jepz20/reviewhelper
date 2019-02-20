import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import projects from '../projects/projects.json';
import ProjectsList from './ProjectsList';
import ProjectDetail from './ProjectDetail';
import Search from './Search';
import { useGlobalSingleKeyShortcut } from '../hooks';

const Main = styled.div`
  display: flex;
  flex-direction: column;

  body {
    background-color: #141414;
    color: #c5c8c6;
  }
`;

const Projects = () => {
  const [projectName, changeProjectName] = useState(projects[0]);
  const [search, changeSearch] = useState('');
  const searchRef = useRef(null);
  const onChangeSearch = ev => {
    changeSearch(ev.currentTarget.value);
  };
  const onChangeProject = project => {
    changeProjectName(project);
    searchRef.current.focus();
  };
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  useGlobalSingleKeyShortcut('s', () => {
    changeSearch('');
    searchRef.current.focus();
  });
  return (
    <Main>
      <ProjectsList
        projects={projects}
        onChangeProject={onChangeProject}
        currentProject={projectName}
      />
      <Search ref={searchRef} value={search} onChange={onChangeSearch} />
      <ProjectDetail projectName={projectName} search={search} />
    </Main>
  );
};

export default Projects;
