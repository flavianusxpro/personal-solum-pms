import { useState } from 'react';
import { Text } from 'rizzui';
import { StatusCell, StatusSelect } from './columns';

interface StatusColumnCellProps {
  row: any; 
}

function StatusColumnCell({ row }: StatusColumnCellProps) {
  const [statusValue, setStatusValue] = useState<number | null>(null);
  
  return (
    <div className='flex flex-col gap-2'>
      <StatusSelect 
        id={row.id} 
        selectItem={row.status} 
        statusValue={statusValue} 
      />
      
      {row.date && (
        <StatusCell
          id={row.id}
          status={row.status}
          date={row.date}
          setStatusValue={setStatusValue}
        />
      )}
      
      {row.is_reschedule && (
        <Text className="text-xs font-medium text-gray-400">
          (Rescheduled)
        </Text>
      )}
    </div>
  );
}

export default StatusColumnCell;