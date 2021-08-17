import { FC, MouseEvent as ReactMouseEvent } from 'react';
import styled from 'styled-components';
import { Play, Stop } from '../icons';

const Container = styled.button<{ active: boolean; isLoading: boolean }>`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  width: 50px;
  height: 50px;
  transform: translateX(-28%);
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  padding: 10px;
  z-index: 10;
  cursor: pointer;
`;

interface IProps {
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  isLoading?: boolean;
}

export const ExecuteButton: FC<IProps> = ({ active = false, onClick, isLoading = false }) => {
  return (
    <Container
      active={active}
      isLoading={isLoading}
      onClick={(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void => (typeof onClick === 'function' ? onClick(e) : null)}
    >
      {isLoading ? <Stop pointer /> : <Play pointer />}
    </Container >
  );
};
