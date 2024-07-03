import React, { useState } from 'react';
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
  background-color: ${props => props.theme.widgetBackground};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  color: ${props => props.theme.textColor};
  display: flex;
  flex-direction: column;
`;

const WidgetHeader = styled.div`
  padding: 0.5rem 1rem;
  cursor: move;
  background-color: ${props => props.theme.widgetHeaderBackground || props.theme.widgetBackground};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const WidgetContent = styled.div`
  padding: 1rem;
  flex: 1;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.textColor};
`;

function WidgetContainer({ widgets, removeWidget, setBackground }) {
  const [widgetSizes, setWidgetSizes] = useState({});

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

  const onResize = (widgetId, size) => {
    setWidgetSizes(prev => ({
      ...prev,
      [widgetId]: size
    }));
  };

  return (
    <Container>
      {widgets.map((widget) => (
        <Draggable key={widget.id} bounds="parent" handle=".widget-header">
          <Resizable
            width={widgetSizes[widget.id]?.width || 300}
            height={widgetSizes[widget.id]?.height || 200}
            onResize={(e, { size }) => onResize(widget.id, size)}
            minConstraints={[200, 100]}
            maxConstraints={[800, 600]}
          >
            <Widget style={{ width: widgetSizes[widget.id]?.width || 300, height: widgetSizes[widget.id]?.height || 200 }}>
              <WidgetHeader className="widget-header">
                {widget.type}
                <CloseButton onClick={() => removeWidget(widget.id)}>×</CloseButton>
              </WidgetHeader>
              <WidgetContent>
                {renderWidget(widget)}
              </WidgetContent>
            </Widget>
          </Resizable>
        </Draggable>
      ))}
    </Container>
  );
}

export default WidgetContainer;