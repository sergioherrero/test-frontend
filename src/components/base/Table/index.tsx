import classNames from 'classnames';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  usePagination,
  useSortBy,
  HeaderGroup,
  Row,
  SortingRule,
  useFilters,
  Filters,
  HeaderProps,
  ColumnInstance,
} from 'react-table';

import Button from 'components/base/Button';
import Input from 'components/base/Input';
import Tooltip from 'components/base/Tooltip';

import { i18n } from 'i18n';

import './index.scss';

import { TableCell, TableColumn, TableProps } from './types';

const defaultColumnFilter = <T extends Record<string, unknown>>({
  column: { filterValue, setFilter, id },
}: HeaderProps<T>) => (
  <Input
    className="filter-input"
    name={id}
    onChange={(value: string) => {
      setFilter(value || undefined); // Set undefined to remove the filter entirely
    }}
    placeholder={`${i18n.t('common.search')}`}
    size="xs"
    value={filterValue || ''}
  />
);

const Table = <T extends Record<string, unknown>>({
  className,
  columns,
  currentPage: currentPageProps,
  data,
  fetchData,
  loading,
  pageSize: pageSizeProps = 10,
  pagination = true,
  rowClassName,
  serverSide = {
    filter: false,
    pagination: false,
    sort: false,
  },
  totalPages,
}: TableProps<T>): ReactElement => {
  const [currentFilters, setCurrentFilters] = useState<Filters<T>>();
  const [currentPage, setCurrentPage] = useState(currentPageProps || 0);
  const [size, setSize] = useState(pageSizeProps || 10);
  const [sort, setSort] = useState<SortingRule<T>[]>([]);
  const { t } = useTranslation();
  const defaultColumn = useMemo(
    () => ({
      Filter: defaultColumnFilter,
    }),
    [],
  );
  const {
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
    getTableProps,
    gotoPage,
    headerGroups,
    page,
    pageCount,
    prepareRow,
    // setPageSize,
    state: { pageIndex, pageSize, sortBy, filters },
  } = useTable<T>(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: currentPage,
        pageSize: pageSizeProps || 10,
        hiddenColumns: columns
          .filter((col) => col.hidden)
          .map(({ accessor }) => accessor as string),
      },
      manualFilters: !!serverSide?.filter,
      manualPagination: !!serverSide?.pagination,
      manualSortBy: !!serverSide?.sort,
      pageCount: serverSide?.pagination ? totalPages || 0 : data.length / (pageSizeProps || 10),
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    if (
      (serverSide?.filter || serverSide?.pagination || serverSide?.sort) &&
      fetchData &&
      (pageIndex !== currentPage ||
        size !== pageSize ||
        JSON.stringify(sortBy) !== JSON.stringify(sort) ||
        JSON.stringify(filters) !== JSON.stringify(currentFilters))
    ) {
      fetchData(pageIndex, pageSize, sortBy, filters);
      setCurrentPage(pageIndex);
      setSize(pageSize);
      setSort(sortBy);
      setCurrentFilters(filters);
    }
  }, [fetchData, pageIndex, pageSize, sortBy, filters, serverSide]);

  useEffect(() => {
    if ((currentPageProps || currentPageProps === 0) && currentPage !== currentPageProps) {
      gotoPage(currentPageProps);
    }
  }, [currentPageProps]);

  return (
    <div className={classNames('custom-table', className)} data-testid="custom-table">
      {/* {loading && <Loader />} */}
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<T>) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || 1}>
                {headerGroup.headers.map((column: TableColumn<T> & ColumnInstance<T>) => (
                  <th
                    {...column.getHeaderProps({
                      className: classNames(column.className, {
                        'hidden': column.hidden,
                        'collapse-text': column.collapse,
                      }),
                    })}
                    key={column.id}
                  >
                    {column.sortable ? (
                      <div
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...column.getSortByToggleProps()}
                        className="sort-header"
                        data-testid="sort-header"
                      >
                        {column.render('Header')}
                      </div>
                    ) : (
                      <div>{column.render('Header')}</div>
                    )}
                    <div>{column.filterable ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading || page?.length > 0 ? (
              page.map((row: Row<T>, index: number) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    className={classNames(
                      'table-row',
                      row.getRowProps().className,
                      rowClassName?.(index),
                      {
                        'no-items': loading,
                      },
                    )}
                  >
                    {row.cells.map((cell: TableCell<T>) => {
                      const { render: rndr } = cell;
                      const rowView = rndr('Cell');
                      return (
                        <td
                          {...cell.getCellProps([
                            {
                              className: classNames(cell.column.className, {
                                'hidden': cell.column.hidden,
                                'collapse-text': cell.column.collapse,
                              }),
                            },
                          ])}
                          key={cell.column.id}
                          width={cell.column.width}
                        >
                          {cell.column.collapse ? (
                            <Tooltip label={data[index][cell.column.id] as string} placement="top">
                              <div className="tooltip-children">{rowView}</div>
                            </Tooltip>
                          ) : (
                            rowView
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr className="no-items">
                <td colSpan={columns?.length}>{t('common.noItems')}</td>
              </tr>
            )}
          </tbody>
          {pagination && (data?.length > 10 || (!!totalPages && totalPages > 1)) && (
            <tfoot>
              <tr>
                <td colSpan={columns.length}>
                  <div className="pagination" data-testid="pagination">
                    <Button
                      className="first-button"
                      disabled={!canPreviousPage}
                      onClick={() => gotoPage(0)}
                      testid="first-button"
                    >
                      {'<<'}
                    </Button>
                    <Button
                      className="prev-button"
                      disabled={!canPreviousPage}
                      onClick={() => gotoPage(pageIndex - 1)}
                      testid="prev-button"
                    >
                      {'<'}
                    </Button>
                    <div>
                      {t('common.page')}{' '}
                      <strong>
                        {pageIndex + 1} {t('common.of')} {pageCount || 1}
                      </strong>
                    </div>
                    <Button
                      className="next-button"
                      disabled={!canNextPage}
                      onClick={() => gotoPage(pageIndex + 1)}
                      testid="next-button"
                    >
                      {'>'}
                    </Button>
                    <Button
                      className="last-button"
                      disabled={!canNextPage}
                      onClick={() => gotoPage(pageCount - 1)}
                      testid="last-button"
                    >
                      {'>>'}
                    </Button>
                    {/* {(pageCount > 1 || page?.length > 5) && (
                      <Select<number>
                        getLabel={(e) => `${e}`}
                        getValue={(e) => e}
                        name="pagination"
                        onChange={(e) => {
                          setPageSize(Number(e));
                        }}
                        openUp
                        options={[10, 20, 50]}
                        placeholder={t('common.pageSize')}
                        value={pageSize}
                      />
                    )} */}
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
