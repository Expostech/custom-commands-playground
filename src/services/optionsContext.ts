import React from 'react';

export interface IOptionsContext {
  serverId: string
}

export const OptionsContext = React.createContext<IOptionsContext>({ serverId: getServerId() });

export function getServerId() {
  const matches = window.location.pathname.match(/sdtdserver\/(\d+)\/playground/);
  const serverId = matches ? matches[1] : null;
  if (!serverId) {
    throw new Error('Could not find server id');
  }
  return serverId;
}
