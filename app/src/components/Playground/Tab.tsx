import { FC } from 'react';
import { Session } from './TabBar';

export interface TabProps {
  session: Session
}

export const Tab: FC<TabProps> = () => {
  return (
    <div>tab</div>
  );
};
