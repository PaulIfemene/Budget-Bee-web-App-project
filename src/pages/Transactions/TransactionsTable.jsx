import React, { useContext, useState } from 'react';
import { Table, Select, Radio } from 'antd';
import searchImg from '../../assets/search.svg';
import './TransactionsTable.css';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import { useTransaction } from '../../useContext/TransactionsProvider.jsx';

const TransactionsTable = () => {
  const { transactions, fetchTransaction, addTransaction } = useTransaction();
  const { Option } = Select;
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');

  const columns = [
    {
      title: 'Details',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  let filteredTransactions = transactions.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === 'amount') {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const exportToCSV = () => {
    //fields are column
    var csv = unparse({
      fields: ['name', 'amount', 'type', 'tag', 'date', 'time'],
      data: transactions,
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCSV = (event) => {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          console.log(results);
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            console.log(newTransaction);
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success('All transaction added');
      fetchTransaction();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className='transactions'>
      <div className='transaction-search-filter'>
        <div className='input-flex'>
          <img src={searchImg} width='16' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by name'
          />
        </div>
        <Select
          className='select-input'
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder='Filter'
          allowClear
        >
          <Option value=''> All </Option>
          <Option value='income'>Income</Option>
          <Option value='expense'>Expense</Option>
        </Select>
      </div>
      <div className='table-radio'>
        <h2>My Transactions</h2>
        <Radio.Group
          className='input-radio'
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value='' className='input-radio-span'>
            {' '}
            No Sort
          </Radio.Button>
          <Radio.Button value='date' className='input-radio-span'>
            By Date{' '}
          </Radio.Button>
          <Radio.Button value='amount' className='input-radio-span'>
            By Amount
          </Radio.Button>
        </Radio.Group>
        <div className='csv-btn'>
          <button
            className='btn'
            style={{ margin: '1rem 0.5rem' }}
            onClick={exportToCSV}
          >
            Export to CSV
          </button>
          <label
            htmlFor='file-csv'
            className='btn btn-blue'
            style={{ margin: '1rem 0.5rem' }}
          >
            Import from CSV
          </label>
          <input
            id='file-csv'
            type='file'
            accept='.csv'
            required
            onChange={importFromCSV}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <Table dataSource={sortedTransactions} columns={columns} />
    </div>
  );
};

export default TransactionsTable;
