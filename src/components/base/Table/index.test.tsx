import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { TableColumn } from './types';

import Table from '.';

type TestType = {
  id: number;
  name: string;
  text: string;
};

const columns: TableColumn<TestType>[] = [
  { accessor: 'id', Header: 'id' },
  { accessor: 'text', Header: 'text' },
  { accessor: 'name', Header: 'name' },
];

const columnsHiddenSortFilter: TableColumn<TestType>[] = [
  { accessor: 'id', Header: 'Id', hidden: true },
  { accessor: 'text', Header: 'text', sortable: true, filterable: true },
  {
    accessor: 'name',
    Header: 'name',
    sortable: true,
    filterable: true,
  },
];

const generateData = (total = 0): TestType[] => {
  const res: TestType[] = [];

  for (let i = 0; i < total; i++) {
    res.push({
      id: i + 1,
      text: `text ${i + 1}`,
      name: `name ${i + 1}`,
    });
  }

  return res;
};

const data: TestType[] = generateData(5);

const fetchData = jest.fn();

const setup = () => {
  const view = render(<Table<TestType> columns={[]} data={[]} />);
  const table = screen.getByTestId('custom-table');

  return {
    table,
    ...view,
  };
};

describe('Table component', () => {
  it('Table renders properly', () => {
    const { table } = setup();

    expect(table).toBeInTheDocument();
  });

  it('Render className', () => {
    const { table, rerender } = setup();

    rerender(<Table className="test" columns={[]} data={[]} />);
    expect(table).toHaveClass('test');
    expect(true).toBeTruthy();
  });

  it('Headers renders properly', () => {
    const { getAllByRole, getByText, queryByText, rerender } = setup();

    rerender(<Table<TestType> columns={columns} data={[]} />);

    expect(getAllByRole('columnheader')).toHaveLength(columns.length);
    columns.forEach(({ Header }) => {
      expect(getByText(`${Header}`)).toBeInTheDocument();
    });

    rerender(<Table<TestType> columns={columnsHiddenSortFilter} data={[]} />);

    const columnsNotHidden: TableColumn<TestType>[] = [];
    const columnsHidden: TableColumn<TestType>[] = [];
    columnsHiddenSortFilter.forEach((col) => {
      if (col.hidden) {
        columnsHidden.push(col);
      } else {
        columnsNotHidden.push(col);
      }
    });
    expect(getAllByRole('columnheader')).toHaveLength(columnsNotHidden.length);
    columnsNotHidden.forEach(({ Header }) => {
      expect(getByText(`${Header}`)).toBeInTheDocument();
    });
    columnsHidden.forEach(({ Header }) => {
      expect(queryByText(`${Header}`)).not.toBeInTheDocument();
    });
  });

  it('Data renders properly', () => {
    const { getAllByRole, getByText, rerender } = setup();

    rerender(<Table<TestType> columns={columns} data={data} />);

    expect(getAllByRole('row')).toHaveLength(data.length + 1);

    data.forEach(({ id, name, text }) => {
      expect(getByText(id)).toBeInTheDocument();
      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(text)).toBeInTheDocument();
    });
  });

  it('Pagination works', async () => {
    const { getByTestId, getByText, rerender } = setup();

    rerender(<Table<TestType> columns={columnsHiddenSortFilter} data={generateData(50)} />);

    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(getByText('common.page', { exact: false })).toBeInTheDocument();
    expect(getByText('1 common.of 5')).toBeInTheDocument();

    const last = getByText('>>');
    const next = getByText('>');
    const prev = getByText('<');
    const first = getByText('<<');
    expect(last).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    expect(prev).toBeInTheDocument();
    expect(first).toBeInTheDocument();

    userEvent.click(next);
    await waitFor(() => {
      expect(getByText('2 common.of 5')).toBeInTheDocument();
    });

    userEvent.click(last);
    await waitFor(() => {
      expect(getByText('5 common.of 5')).toBeInTheDocument();
    });

    userEvent.click(prev);
    await waitFor(() => {
      expect(getByText('4 common.of 5')).toBeInTheDocument();
    });

    userEvent.click(first);
    await waitFor(() => {
      expect(getByText('1 common.of 5')).toBeInTheDocument();
    });
  });

  it('Server side sort', () => {
    const { getAllByTestId, rerender } = setup();

    rerender(
      <Table<TestType>
        columns={columnsHiddenSortFilter}
        data={data}
        fetchData={fetchData}
        serverSide={{ sort: true }}
      />,
    );
    const sortDivs = getAllByTestId('sort-header');

    userEvent.click(sortDivs[0]);
    expect(fetchData).toHaveBeenCalled();
  });

  it('Server side filter', () => {
    const { getAllByRole, rerender } = setup();

    rerender(
      <Table<TestType>
        columns={columnsHiddenSortFilter}
        data={data}
        fetchData={fetchData}
        serverSide={{ filter: true }}
      />,
    );
    const filterInputs = getAllByRole('textbox');

    const filterableCols: TableColumn<TestType>[] = columnsHiddenSortFilter.filter(
      (col) => col.filterable,
    );

    expect(filterInputs).toHaveLength(filterableCols.length);

    userEvent.type(filterInputs[0], 'test');
    expect(fetchData).toHaveBeenCalled();
  });
});
