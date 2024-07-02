import React, { useState } from 'react';
import styled from 'styled-components';

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  flex-grow: 1;
`;

const Column = styled.div`
  min-width: 200px;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
`;

const ControlPanel = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  margin-bottom: 10px;
`;

function Kanban() {
  const [columns, setColumns] = useState([
    { id: 1, title: 'To Do', cards: [] },
    { id: 2, title: 'In Progress', cards: [] },
    { id: 3, title: 'Done', cards: [] },
  ]);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showControls, setShowControls] = useState(false);

  const addCard = (columnId) => {
    const newCardText = prompt('Enter card text:');
    if (newCardText) {
      setColumns(columns.map(column => 
        column.id === columnId 
          ? { ...column, cards: [...column.cards, { id: Date.now(), text: newCardText }] }
          : column
      ));
    }
  };

  const addColumn = () => {
    if (newColumnTitle) {
      setColumns([...columns, { id: Date.now(), title: newColumnTitle, cards: [] }]);
      setNewColumnTitle('');
    }
  };

  const removeColumn = (columnId) => {
    setColumns(columns.filter(column => column.id !== columnId));
  };

  const moveColumn = (columnId, direction) => {
    const index = columns.findIndex(column => column.id === columnId);
    if ((direction === 'left' && index > 0) || (direction === 'right' && index < columns.length - 1)) {
      const newColumns = [...columns];
      const temp = newColumns[index];
      newColumns[index] = newColumns[index + (direction === 'left' ? -1 : 1)];
      newColumns[index + (direction === 'left' ? -1 : 1)] = temp;
      setColumns(newColumns);
    }
  };

  return (
    <KanbanContainer>
      <Button onClick={() => setShowControls(!showControls)}>
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </Button>
      {showControls && (
        <ControlPanel>
          <Input 
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="New column title"
          />
          <Button onClick={addColumn}>Add Column</Button>
        </ControlPanel>
      )}
      <ColumnsContainer>
        {columns.map((column, index) => (
          <Column key={column.id}>
            <ColumnTitle>
              {column.title}
              {showControls && (
                <>
                  <Button onClick={() => removeColumn(column.id)}>×</Button>
                  <Button onClick={() => moveColumn(column.id, 'left')} disabled={index === 0}>←</Button>
                  <Button onClick={() => moveColumn(column.id, 'right')} disabled={index === columns.length - 1}>→</Button>
                </>
              )}
            </ColumnTitle>
            {column.cards.map(card => (
              <Card key={card.id}>{card.text}</Card>
            ))}
            <Button onClick={() => addCard(column.id)}>Add Card</Button>
          </Column>
        ))}
      </ColumnsContainer>
    </KanbanContainer>
  );
}

export default Kanban;