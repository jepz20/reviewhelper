import React from 'react';
import styled from 'styled-components';
import { withPopticonManager } from './Popticon';

const Card = styled.div`
  padding: 16px;
  border: 2px teal solid;
  margin: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  text-transform: capitalize;
  margin-top: -33px;
  margin-bottom: 0;
  width: fit-content;
  background-color: #141414;
  padding: 0 5px;
  align-self: flex-start;
  color: teal;
`;

const copyFeedBackToCB = (description, onSuccess) => {
  navigator.clipboard
    .writeText(description)
    .then(() => onSuccess())
    .catch((e) => console.error('Unable to write to clipboard. :-(', e));
};

export const FeedBackTitle = ({ children, ...props }) => {
  return <CardTitle>{children}</CardTitle>;
};

export const FeedBackDescription = ({ children, ...props }) => {
  const paragraphs = children.split('\n');
  return (
    <div>
      {paragraphs.map((p, i) => (
        <p key={p + i}>{p}</p>
      ))}
    </div>
  );
};

const FeedBack = ({ children, project, ...props }) => {
  const onSuccess = () => {
    console.log(props.popticonManager);
    props.popticonManager.popticoner();
    console.log('YEY');
  };
  return (
    <Card
      tabIndex="0"
      {...props}
      onDoubleClick={() => copyFeedBackToCB(project.description, onSuccess)}
      onKeyPress={ev =>
        ev.key === 'Enter' && copyFeedBackToCB(project.description, onSuccess)
      }
    >
      {children}
    </Card>
  );
};

const FeedBackWithPopticon = withPopticonManager(FeedBack);
export default FeedBackWithPopticon;
