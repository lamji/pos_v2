import { useState, useMemo, useEffect } from 'react';

type Searchable = {
  name?: string;
  barcode?: string;
};

export const usePaginateData = <T extends Searchable>(data: T[], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset to first page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Step 1: Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // Filter
    let filtered = data;
    if (query) {
      filtered = data.filter((item) => {
        const name = item.name?.toLowerCase() ?? '';
        const barcode = item.barcode?.toLowerCase() ?? '';
        return name.includes(query) || barcode.includes(query);
      });
    }

    // Sort A-Z by name
    return [...filtered].sort((a, b) => {
      const nameA = a.name?.toLowerCase() ?? '';
      const nameB = b.name?.toLowerCase() ?? '';
      return nameA.localeCompare(nameB);
    });
  }, [data, searchQuery]);

  // Step 2: Total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedData.length / itemsPerPage);
  }, [filteredAndSortedData.length, itemsPerPage]);

  // Step 3: Paginated data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(start, start + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  // Pagination controls
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return {
    paginatedData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    filteredData: filteredAndSortedData,
  };
};
