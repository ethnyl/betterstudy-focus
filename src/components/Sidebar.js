import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaTree, FaMusic, FaClock, FaTasks, FaStickyNote, FaColumns, FaCalendarAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  background-color: #2c3e50;
  color: white;
  width: ${props => props.isOpen ? '200px' : '50px'};
  transition: width 0.3s ease;
`;

const ToggleButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const IconButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isOpen ? 'flex-start' : 'center'};

  span {
    margin-left: 10px;
    display: ${props => props.isOpen ? 'inline' : 'none'};
  }
`;

function Sidebar({ addWidget }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <SidebarContainer isOpen={isOpen}>
        <ToggleButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </ToggleButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('environment')}>
          <FaTree />
          <span>Environment</span>
        </IconButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('audio')}>
          <FaMusic />
          <span>Audio</span>
        </IconButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('timer')}>
          <FaClock />
          <span>Timer</span>
        </IconButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('planner')}>
          <FaTasks />
          <span>Planner</span>
        </IconButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('stickynote')}>
          <FaStickyNote />
          <span>Sticky Note</span>
        </IconButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('kanban')}>
          <FaColumns />
          <span>Kanban</span>
        </IconButton>
        <IconButton isOpen={isOpen} onClick={() => addWidget('calendar')}>
          <FaCalendarAlt />
          <span>Calendar</span>
        </IconButton>
      </SidebarContainer>
    );
  }
  
  export default Sidebar;