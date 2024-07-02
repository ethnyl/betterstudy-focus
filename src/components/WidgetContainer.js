import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import VirtualEnvironment from './VirtualEnvironment';
import AudioControl from './AudioControl';
import Timer from './Timer';
import Planner from './Planner';
import StickyNote from './StickyNote';
import Kanban from './Kanban';
import Calendar from './Calendar';

const Container = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const Widget = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
`;

function WidgetContainer({ widgets, removeWidget, setBackground }) {
  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'environment':
        return <VirtualEnvironment setBackground={setBackground} />;
      case 'audio':
        return <AudioControl />;
      case 'timer':
        return <Timer />;
      case 'planner':
        return <Planner />;
      case 'stickynote':
        return <StickyNote />;
      case 'kanban':
        return <Kanban />;
      case 'calendar':
        return <Calendar />;
      default:
        return null;
    }
  };

  return (
    <Container>
      {widgets.map((widget) => (
        <Draggable key={widget.id} bounds="parent">
          <Resizable
            defaultSize={{ width: 300, height: 200 }}
            minConstraints={[200, 100]}
            maxConstraints={[800, 600]}
          >
            <Widget>
              <CloseButton onClick={() => removeWidget(widget.id)}>×</CloseButton>
              {renderWidget(widget)}
            </Widget>
          </Resizable>
        </Draggable>
      ))}
    </Container>
  );
}

export default WidgetContainer;