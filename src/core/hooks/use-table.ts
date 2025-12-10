import { useState, useEffect, useMemo, useCallback } from 'react';
import isString from 'lodash/isString';

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>
) {
  const [data, setData] = useState(initialData);

  /*
   * Dummy loading state.
   */
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const handleRowSelect = useCallback((recordKey: string) => {
    setSelectedRowKeys((prev) => {
      if (prev.includes(recordKey)) {
        return prev.filter((key) => key !== recordKey);
      } else {
        return [...prev, recordKey];
      }
    });
  }, []);

  const handleSelectAll = useCallback(
    (record: any) => {
      setSelectedRowKeys((prev) => {
        if (prev.length === data.length) {
          return [];
        } else {
          return data.map((record) => record.id);
        }
      });
    },
    [data.length]
  );

  const handleSelectRow = useCallback((record: any) => {
    setSelectedRowKeys((prev: any) => {
      const isExist = prev.some((item: any) => item.id === record.id);
      if (isExist) {
        return prev.filter((item: any) => item.id !== record.id);
      } else {
        return [...prev, record];
      }
    });
  }, []);

  const handleSelectAllRow = useCallback(() => {
    setSelectedRowKeys((prev) => {
      if (prev.length === data.length) {
        return []; 
      } else {
        return [...data]; 
      }
    });
  }, [data]);

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });

  const sortData = useCallback(
    (data: T[], sortKey: string, sortDirection: string) => {
      return [...data].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    },
    []
  );

  const sortedData = useMemo(() => {
    if (!sortConfig.key) {
      return data;
    }
    return sortData(data, sortConfig.key, sortConfig.direction);
  }, [sortConfig, data, sortData]);

  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      let direction = 'asc';
      if (prev.key === key && prev.direction === 'asc') {
        direction = 'desc';
      }
      return { key, direction };
    });
  }, []);

  /*
   * Handle pagination
   */
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useCallback(
    (data: T[] = sortedData) => {
      const start = (currentPage - 1) * countPerPage;
      const end = start + countPerPage;

      if (data.length > start) return data.slice(start, end);
      return data;
    },
    [currentPage, countPerPage, sortedData]
  );

  const handlePaginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  /*
   * Handle delete
   */
  const handleDelete = useCallback((id: string | string[]) => {
    setData((prev) => {
      if (Array.isArray(id)) {
        return prev.filter((item) => !id.includes(item.id));
      } else {
        return prev.filter((item) => item.id !== id);
      }
    });
  }, []);

  /*
   * Handle Filters and searching
   */
  // ⚠️ PENTING: searchTerm hanya untuk UI state, TIDAK untuk filtering
  // Filtering search dilakukan di backend
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | any[]) => {
      if (!Array.isArray(filterValue) && !isString(filterValue)) {
        throw new Error(
          'filterValue data type should be string or array of any'
        );
      }

      if (Array.isArray(filterValue) && filterValue.length !== 2) {
        throw new Error('filterValue data must be an array of length 2');
      }

      setFilters((prev) => ({
        ...prev,
        [columnId]: filterValue,
      }));
    },
    []
  );

  // ✅ HANYA apply filter untuk non-search filters
  const applyFilters = useMemo(() => {
    return sortedData.filter((item) => {
      const isMatchingItem = Object.entries(filters).some(
        ([columnId, filterValue]) => {
          if (
            Array.isArray(filterValue) &&
            typeof filterValue[1] === 'object'
          ) {
            const itemValue = new Date(item[columnId]);
            return (
              // @ts-ignore
              itemValue >= filterValue[0] && itemValue <= filterValue[1]
            );
          }
          if (
            Array.isArray(filterValue) &&
            typeof filterValue[1] === 'string'
          ) {
            const itemPrice = Math.ceil(Number(item[columnId]));
            return (
              itemPrice >= Number(filterValue[0]) &&
              itemPrice <= Number(filterValue[1])
            );
          }
          if (isString(filterValue) && !Array.isArray(filterValue)) {
            const itemValue = item[columnId]?.toString().toLowerCase();
            if (itemValue !== filterValue.toString().toLowerCase()) {
              return false;
            }
            return true;
          }
        }
      );
      return isMatchingItem;
    });
  }, [sortedData, filters]);

  /*
   * Handle searching - HANYA untuk state UI, tidak filter data
   */
  const handleSearch = useCallback((searchValue: string) => {
    setSearchTerm(searchValue);
  }, []);

  /*
   * Reset search and filters
   */
  const handleReset = useCallback(() => {
    setData(initialData);
    setSearchTerm('');
    if (initialFilterState) {
      setFilters(initialFilterState);
    }
  }, [initialData, initialFilterState]);

  /*
   * Set isFiltered and final filtered data
   */
  const isFiltered = applyFilters.length > 0;

  const totalItems = useMemo(() => {
    if (isFiltered) {
      return applyFilters.length;
    }
    // ✅ TIDAK lagi hitung berdasarkan searchedData
    return sortedData.length;
  }, [isFiltered, applyFilters.length, sortedData.length]);

  // ✅ Data final: gunakan applyFilters jika ada filter, atau sortedData
  // TIDAK ada searchedData lagi karena search sudah dari backend
  const filteredData = useMemo(() => {
    return isFiltered ? applyFilters : sortedData;
  }, [isFiltered, applyFilters, sortedData]);

  const tableData = useMemo(() => {
    return paginatedData(filteredData);
  }, [paginatedData, filteredData]);

  /*
   * Go to first page when data is filtered
   * ✅ HAPUS dependency searchTerm karena search dari backend
   */
  useEffect(() => {
    handlePaginate(1);
  }, [isFiltered, handlePaginate]);

  useEffect(() => {
    if (!initialData) return;
    setData((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(initialData)) {
        return initialData;
      }
      return prev;
    });
  }, [initialData]);

  useEffect(() => {
    if (!initialFilterState) return;
    setFilters(initialFilterState);
  }, [initialFilterState]);

  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,
    handlePaginate,
    totalItems,
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    // searching (hanya untuk UI state)
    searchTerm,
    handleSearch,
    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
    handleSelectRow,
    handleSelectAllRow
  };
}