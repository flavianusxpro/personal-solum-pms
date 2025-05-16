'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import React, { useCallback, useMemo } from 'react';
import { getColumns } from './columns';
import { useModal } from '../../modal-views/use-modal';
import { useAtom } from 'jotai';
import { currencyAtom, removeCurrencyAtom } from '@/store/currency';
import toast from 'react-hot-toast';

export default function CurrencyTable({}: {}) {
  const { openModal } = useModal();
  const [, removeCurrency] = useAtom(removeCurrencyAtom);
  const [currencyData] = useAtom(currencyAtom);

  const onDeleteItem = useCallback(
    (id: string) => {
      removeCurrency(id);
      toast.success('Currency deleted successfully');
    },
    [removeCurrency]
  );

  const columns = React.useMemo(
    () =>
      getColumns({
        data: currencyData.data ?? [],
        onDeleteItem,
        openModal,
      }),
    [currencyData.data, onDeleteItem, openModal]
  );

  const renderMain = useMemo(() => {
    return (
      <div>
        <ControlledTable
          showLoadingText={true}
          data={currencyData.data ?? []}
          // @ts-ignore
          columns={columns}
          className={
            'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
          }
        />
      </div>
    );
  }, [columns, currencyData]);

  return renderMain;
}
