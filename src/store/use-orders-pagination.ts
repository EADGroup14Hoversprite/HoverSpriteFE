import { create } from "zustand";

type OrderPaginationState = {
  pageSize: number;
  currentPage: number;
  maxPage: number;
  options: number[];
  canNextPage: boolean;
  canPrevPage: boolean;
};

type OrderPaginationAction = {
  setPageSize: (page: number) => void;
  setCurrentPage: (page: number) => void;
  setCanNextPage: (canNextPage: boolean) => void;
  setCanPrevPage: (canPrevPage: boolean) => void;
  setMaxPage: (maxPage: number) => void;
};

type OrderPaginationStore = OrderPaginationState & OrderPaginationAction;

export const useOrderPaginationStore = create<OrderPaginationStore>(
  (set): OrderPaginationStore => ({
    pageSize: 10,
    canNextPage: true,
    canPrevPage: true,
    currentPage: 0,
    maxPage: 0,
    options: [10, 20, 30, 40, 50],
    setMaxPage: (maxPage: number) => set({ maxPage: maxPage }),
    setCanNextPage: (canNextPage: boolean) =>
      set((state) => {
        if (state.currentPage === state.maxPage - 1) {
          return { ...state, canNextPage: false };
        }
        return { ...state, canNextPage: canNextPage };
      }),
    setCanPrevPage: (canPrevPage: boolean) => set({ canPrevPage: canPrevPage }),
    setPageSize: (pageSize: number) => set({ pageSize: pageSize }),
    setCurrentPage: (currentPage: number) => set({ currentPage: currentPage }),
  }),
);
