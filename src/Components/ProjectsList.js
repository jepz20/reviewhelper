import React from 'react';
import styled from 'styled-components';
import { useGlobalCtrlShortcut } from '../hooks';
const Ul = styled.ul`
  padding: 0;
  margin: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
  @media screen and (min-width: 720px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Li = styled.li`
  border: 2px solid teal;
  height: 80px;
  border-radius: 8px;
  font-size: 20px;
  padding: 16px;
  list-style: none;
  cursor: pointer;
  position: relative;
  background: ${props => (props.active ? 'teal' : '#141414')};
  @media screen and (min-width: 720px) {
    height: 40px;
  }
`;

const ShortCutIndicator = styled.span`
  color: grey;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const Project = ({ project, index, onChangeProject, ...props }) => {
  useGlobalCtrlShortcut(index, () => onChangeProject(project));
  return (
    <Li onClick={() => onChangeProject(project)} {...props}>
      {project}
      <ShortCutIndicator>(ctrl + {index})</ShortCutIndicator>
    </Li>
  );
};

const ProjectList = ({ projects, onChangeProject, currentProject }) => {
  return (
    <Ul>
      {projects.map((project, i) => (
        <Project
          project={project}
          key={project}
          active={project === currentProject}
          index={i + 1}
          style={{}}
          onChangeProject={() => onChangeProject(project)}
        />
      ))}
    </Ul>
  );
};

export default ProjectList;
