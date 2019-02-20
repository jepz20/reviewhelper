import React, { Fragment } from 'react';

import FeedBack, { FeedBackDescription, FeedBackTitle } from './Feedback';
import { useGlobalSingleKeyShortcut } from '../hooks';

const nextElement = () =>
  document.activeElement && document.activeElement.nextSibling.focus();

const previousElement = () =>
  document.activeElement && document.activeElement.previousSibling.focus();

const ProjectDetail = ({ projectName, search }) => {
  if (!projectName) return null;
  useGlobalSingleKeyShortcut('j', nextElement);
  useGlobalSingleKeyShortcut('k', previousElement);
  const projectDetail = require(`../projects/${projectName}.json`);
  const filteredProjects = projectDetail.filter(
    ({ title, description }) =>
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Fragment>
      {filteredProjects.map(project => (
        <FeedBack key={project.title} project={project}>
          <FeedBackTitle>{project.title}</FeedBackTitle>
          <FeedBackDescription>{project.description}</FeedBackDescription>
        </FeedBack>
      ))}
    </Fragment>
  );
};

export default ProjectDetail;
