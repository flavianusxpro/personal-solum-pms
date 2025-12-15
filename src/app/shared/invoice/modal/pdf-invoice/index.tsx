import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import { useReactToPrint } from 'react-to-print';
import dayjs from '@/config/dayjs';
import { currencyAtom } from '@/store/currency';
import { useAtom } from 'jotai';

interface PropTypes {
    data: any;
}

export interface PDFInvoiceRef {
    handlePrint: () => void;
    handleDownload: () => void;
}

const PDFInvoice = forwardRef<PDFInvoiceRef, PropTypes>((props, ref) => {
    const { data } = props
    const [currencyData] = useAtom(currencyAtom);
    const contentRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
    const { toPDF, targetRef } = usePDF({
        filename: `invoice-${data?.id || 'document'}.pdf`,
        page: { 
            margin: 20,
            format: 'A4',
            orientation: 'portrait'
        }
    });
    const reactToPrintFn = useReactToPrint({
        content: () => contentRef.current
    });

    const setRefs = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            contentRef.current = el;
            targetRef.current = el;
        }
    }, [targetRef]);

    useImperativeHandle(ref, () => ({
        handlePrint: () => {
            reactToPrintFn();
        },
        handleDownload: () => {
            toPDF();
        }
    }));

     if (!data) {
        return null;
    }

    return (
        <div 
            className="w-full mx-auto bg-white p-8"
            ref={setRefs}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-8">{data?.clinic?.name ?? '-'}</h1>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-bold mb-4">Invoice</h2>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between gap-8">
                            <span className="text-gray-600">Invoice No.</span>
                            <span className="font-medium">#INV-{data?.id ?? '.'}</span>
                        </div>
                        <div className="flex justify-between gap-8">
                            <span className="text-gray-600">Invoice Date</span>
                            <span className="font-medium">
                                {data?.date ? dayjs(data?.date).utc().format('DD MMM YYYY') : '-'}
                            </span>
                        </div>
                        <div className="flex justify-between gap-8">
                            <span className="text-gray-600">Due</span>
                            <span className="font-medium">
                                {data?.due_date ? dayjs(data?.due_date).utc().format('DD MMM YYYY') : '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* From and Bill To */}
            <div className="flex justify-between mb-8">
                <div>
                    <h3 className="text-sm font-semibold mb-2">From</h3>
                    <h4 className="text-lg font-bold mb-2">{data?.clinic?.name}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{data?.clinic?.email}</p>
                        <p>{data?.clinic?.mobile_number}</p>
                        <p className="mt-3">{data.clinic?.address}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-sm font-semibold mb-2">Bill To</h3>
                    <h4 className="text-lg font-bold mb-2">
                        {data?.patient?.first_name ?? '-'} {data?.patient?.middle_name} {data?.patient?.last_name}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{data?.patient?.email}</p>
                        <p>{data?.patient?.mobile_number}</p>
                        <p className="mt-3">
                            {data?.patient?.address_line_1}{data?.patient?.address_line_2 ? `, ${data?.patient?.address_line_2}` : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="mb-8">
                <div className="bg-black text-white">
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold">
                        <div className="col-span-5">PRODUCT & SERVICE</div>
                        <div className="col-span-2 text-center">QUANTITY</div>
                        <div className="col-span-2 text-center">PRICE</div>
                        <div className="col-span-3 text-right">TOTAL</div>
                    </div>
                </div>

                {data.items.map((item: any, index: number) => (
                    <div key={index} className="border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 px-4 py-4">
                            <div className="col-span-5">
                                <p className="font-semibold text-sm mb-1">{item?.code}</p>
                                <p className="text-xs text-gray-600">{item?.description}</p>
                            </div>
                            <div className="col-span-2 text-center text-sm">{item?.qty}</div>
                            <div className="col-span-2 text-center text-sm">{currencyData.active.symbol}{item?.amount}</div>
                            <div className="col-span-3 text-right text-sm font-semibold">{currencyData.active.symbol}{item?.total_amount}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notes and Total */}
            <div className="flex justify-between gap-8">
                <div className="flex-1">
                    <div className="mb-6">
                        <h3 className="text-sm font-bold mb-2">Notes</h3>
                        <p className="text-xs text-gray-600">{data?.note ?? '-'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold mb-2">Internal Notes</h3>
                        <p className="text-xs text-gray-600">{data?.internalNotes ?? '-'}</p>
                    </div>
                </div>

                <div className="w-64">
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">{currencyData.active.symbol}{data?.amount ?? 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax Fee</span>
                            <span className="font-medium">{currencyData.active.symbol}{data?.tax_fee ?? 0}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-300">
                            <span className="text-gray-600">Other Fee</span>
                            <span className="font-medium">{currencyData.active.symbol}{data?.other_fee ?? 0}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="font-bold text-base">Total</span>
                            <span className="font-bold text-base">{currencyData.active.symbol}{data?.total_amount ?? 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

PDFInvoice.displayName = 'PDFInvoice';

export default PDFInvoice;