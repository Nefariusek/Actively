import React from 'react';
import { Container } from 'semantic-ui-react';
import QuestbookMenu from './QuestbookMenu';
import QuestbookList from './QuestbookList';

const QuestbookContent = () => {
  return (
    <Container>
      <QuestbookMenu />
      <QuestbookList />
    </Container>
  );
};

export default QuestbookContent;
