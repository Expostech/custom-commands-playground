import { FC, useState } from 'react';
import { SortableContainer, SortableElement, SortStart, SortEnd } from 'react-sortable-hoc';
import { Tab, TabProps } from './Tab';
import { Tabs } from './Tabs';
import styled from 'styled-components';

const StyledTabBar = styled.div`
  background: ${({ theme }) => theme.p};
`;

const AddTab = styled.div<{ sorting: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 40px;
  visibility: ${({ sorting }) => sorting ? 'hidden' : 'visible'};
`;

const SortableTabBar = SortableContainer(StyledTabBar);
const SortableTab = SortableElement<TabProps>(Tab);

// TODO: move this to separate file.
export interface Session {
  id: string;
}
interface TabBarProps {
  sessions: Session[]; // TODO: make this obj
  newSession: any; // TODO: func
}

export const TabBar: FC<TabBarProps> = ({ sessions, newSession }) => {
  const [sorting, setSorting] = useState(false);

  function onSortStart({ index }: SortStart) {
    // do stuff here with index
    setSorting(true);
  }
  function onSortEnd({ oldIndex, newIndex }: SortEnd) {
    // do stuf heere with old/new
    setSorting(false);
  }

  const getHelperDimensions = ({ node }: SortStart) => {
    const { width, height } = node.getBoundingClientRect();
    return { width, height };
  };

  return (
    <SortableTabBar
      axis="x"
      distance={10}
      getHelperDimensions={getHelperDimensions}
      lockAxis="x"
      onSortEnd={onSortEnd}
      onSortStart={onSortStart}
      transitionDuration={200}
    >
      <Tabs>
        {
          sessions.map((session, index) => (
            <SortableTab
              index={index}
              key={session.id}
              session={session}
            >
            </SortableTab>
          ))
        }
        <AddTab onClick={newSession} sorting={sorting}>New Tab</AddTab>
      </Tabs>
    </SortableTabBar>
  );
};
