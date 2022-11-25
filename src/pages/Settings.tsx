import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const SettingsTitle = styled.div`
  color: black;
`;

const VersionContainer = styled.div`
  color: black;
`;

export interface IVersionData {
  version: string;
}

export const Settings: FC = () => {
  const [version, setVersion] = useState<IVersionData | null>(null);

  useEffect(() => {
    const getVersion = async () => {
      const data = await fetch('version.json');
      const jsonData = await data.json();
      setVersion(jsonData);
    };

    getVersion();
  }, []);

  return (
    <>
      <SettingsTitle>Settings</SettingsTitle>
      <VersionContainer>Version: {version?.version}</VersionContainer>
    </>
  );
};
