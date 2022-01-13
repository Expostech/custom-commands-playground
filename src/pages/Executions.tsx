import { Button, Space, Tag, Timeline } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Data } from '../components/Data';
import { HTTP, IExecution } from '../services/http';
import { OptionsContext } from '../services/optionsContext';

const { Item } = Timeline;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const TimeLineContainer = styled.div`
  width: 25%;
`;

const DataContainer = styled.div`
  height: 100vh;
  width: 75%;
`;

export const Executions: FC = () => {
  const options = useContext(OptionsContext);
  const [executions, setExecutions] = useState<Array<IExecution>>([]);
  const [selectedExecution, setSelectedExecution] = useState<IExecution>();
  const [loading, setLoading] = useState<boolean>(true);

  const loadExecutions = async () => {
    setLoading(true);

    const http = new HTTP(options);
    const execs = await http.getExecutions();
    setExecutions(
      execs.map((e) => {
        return {
          ...e,
          timestamp: new Date(e.timestamp).toLocaleString(),
        };
      })
    );
    setSelectedExecution(execs[0]);
    setLoading(false);
  };

  useEffect(() => {
    loadExecutions();
  }, []);

  const executionPanels = executions.map((execution) => {
    const color = execution.errors.length ? 'red' : 'green';
    return (
      <Item>
        <Tag
          color={color}
          onClick={() => setSelectedExecution(execution)}
          style={{ cursor: 'pointer' }}
        >
          {`${execution.timestamp} - ${execution.reason}`}
        </Tag>
      </Item>
    );
  });

  return (
    <Container>
      <TimeLineContainer>
        <Space direction="vertical">
          <Button loading={loading} onClick={loadExecutions} style={{ width: '100%', marginBottom: '5%' }} type="primary">
          Reload
          </Button>
          <Timeline>{executionPanels}</Timeline>
        </Space>
      </TimeLineContainer>
      <DataContainer>
        <Data data={selectedExecution} setData={setSelectedExecution}></Data>
      </DataContainer>
    </Container>
  );
};
