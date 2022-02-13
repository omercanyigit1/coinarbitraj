import type { NextPage } from 'next';
import { Table, Divider, Typography } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const { Title } = Typography;

const columns = [
  {
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
    title: 'Name',
  },
  {
    dataIndex: 'age',
    title: 'Age',
  },
  {
    dataIndex: 'address',
    title: 'Address',
  },
];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    address: 'New York No. 1 Lake Park',
    age: 32,
    key: '1',
    name: 'John Brown',
  },
  {
    address: 'London No. 1 Lake Park',
    age: 42,
    key: '2',
    name: 'Jim Green',
  },
  {
    address: 'Sidney No. 1 Lake Park',
    age: 32,
    key: '3',
    name: 'Joe Black',
  },
  {
    address: 'Sidney No. 1 Lake Park',
    age: 99,
    key: '4',
    name: 'Disabled User',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const Home: NextPage = () => {

  const {t, i18n} = useTranslation();

  return (
    <div>
      <Title level={2}>{t('home:title')}</Title>

      <Divider />

      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

Home.defaultProps = {
  data: []
};

export default Home;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
      // Will be passed to the page component as props
    },
  };
}