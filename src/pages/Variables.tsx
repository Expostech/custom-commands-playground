import { Button, Table } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';

import { HTTP, IVariable } from '../services/http';
import { OptionsContext } from '../services/optionsContext';

const columns = [
  {
    title: 'Created',
    dataIndex: 'createdAt',
  },
  {
    title: 'Updated',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
];

export const Variables: FC = () => {
  const options = useContext(OptionsContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState<
    Array<string | number>
  >([]);
  const [variables, setVariables] = useState<Array<IVariable>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onSelectChange = (newSelectedRowKeys: Array<string | number>) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const loadVariables = async () => {
    setLoading(true);
    const http = new HTTP(options);
    const vars = await http.getVariables();
    setVariables(
      vars.map((v) => {
        return {
          ...v,
          key: v.id,
          createdAt: new Date(v.createdAt).toLocaleString(),
          updatedAt: new Date(v.updatedAt).toLocaleString(),
        };
      })
    );
    setLoading(false);
  };

  const deleteVariables = async (ids: Array<string|number>) => {
    const http = new HTTP(options);
    await Promise.all(ids.map((id) => {
      return http.deleteVariable(id.toString());
    }));
    loadVariables();
    setSelectedRowKeys([]);
  };

  useEffect(() => {
    loadVariables();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button loading={loading} onClick={loadVariables} type="primary">
          Reload
        </Button>
        {selectedRowKeys.length > 0 &&
          <><span style={{ margin: 8 }}>
            {`Selected ${selectedRowKeys.length} items`}
          </span><Button danger loading={loading} onClick={() => deleteVariables(selectedRowKeys)} type="primary">
              Delete
          </Button></>
        }
      </div>
      <Table
        columns={columns}
        dataSource={variables}
        rowSelection={rowSelection}
      />
    </div>
  );
};
