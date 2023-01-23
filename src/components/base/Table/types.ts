import { Cell, Column, Filters, SortingRule } from 'react-table';

export type TableColumn<T extends Record<string, unknown>> = Column<T> & {
  className?: string;
  collapse?: boolean;
  filterable?: boolean;
  hidden?: boolean;
  sortable?: boolean;
};

export type TableCell<T extends Record<string, unknown>> = Cell<T> & {
  column: TableColumn<T>;
};

export type ServerSide = {
  filter?: boolean;
  pagination?: boolean;
  sort?: boolean;
};

export type TableProps<T extends Record<string, unknown>> = {
  className?: string;
  columns: TableColumn<T>[];
  currentPage?: number;
  data: T[];
  fetchData?: (
    page: number,
    pageSize: number,
    params?: SortingRule<T>[],
    filters?: Filters<T>,
  ) => void;
  loading?: boolean;
  pageSize?: number;
  pagination?: boolean;
  rowClassName?: (index: number) => string;
  serverSide?: ServerSide;
  totalPages?: number;
};
