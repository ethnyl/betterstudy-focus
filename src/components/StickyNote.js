import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NoteTextarea = styled.textarea`
  flex: 1;
  padding: 0.5rem;
  font-family: monospace;
  resize: none;
  border: none;
  outline: none;
`;

const NotePreview = styled.div`
  flex: 1;
  padding: 0.5rem;
  overflow-y: auto;
`;

const ToggleButton = styled.button`
  padding: 0.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

function StickyNote() {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  return (
    <NoteContainer>
      <ToggleButton onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Preview' : 'Edit'}
      </ToggleButton>
      {isEditing ? (
        <NoteTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here (Markdown supported)"
        />
      ) : (
        <NotePreview>
          <ReactMarkdown>{content}</ReactMarkdown>
        </NotePreview>
      )}
    </NoteContainer>
  );
}

export default StickyNote;