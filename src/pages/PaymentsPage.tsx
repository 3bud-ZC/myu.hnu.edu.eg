import React, { useState } from 'react';
import {
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  DollarSign
} from 'lucide-react';
import { DEMO_FEES, PAYMENT_SUMMARY } from '../data/payments';
import { FeeItem } from '../types/payments';

type PaymentTab = 'unpaid' | 'installments' | 'history' | 'all';

export const PaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('unpaid');
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckNotice, setRecheckNotice] = useState<string | null>(null);
  const [selectedFeeIds, setSelectedFeeIds] = useState<string[]>([]);

  // Split fees
  const unpaidFees = DEMO_FEES.filter((f) => f.status === 'Unpaid');
  const paidFees = DEMO_FEES.filter((f) => f.status === 'Paid');

  // Handle Recheck Payments interaction
  const handleRecheck = () => {
    setIsRechecking(true);
    setRecheckNotice(null);
    setTimeout(() => {
      setIsRechecking(false);
      setRecheckNotice('Payment records verified. All financial balances are up to date.');
      setTimeout(() => setRecheckNotice(null), 4000);
    }, 900);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedFeeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllUnpaid = () => {
    if (selectedFeeIds.length === unpaidFees.length) {
      setSelectedFeeIds([]);
    } else {
      setSelectedFeeIds(unpaidFees.map((f) => f.id));
    }
  };

  // Format currency
  const formatMoney = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      {/* 4 Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL FEES */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">TOTAL FEES</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                {formatMoney(PAYMENT_SUMMARY.totalFees)}
              </span>
              <span className="text-xs font-semibold text-gray-500">EGP</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">{PAYMENT_SUMMARY.feeCount} fee(s)</p>
          </div>
        </div>

        {/* DISCOUNT */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">DISCOUNT</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                {formatMoney(PAYMENT_SUMMARY.discount)}
              </span>
              <span className="text-xs font-semibold text-gray-500">EGP</span>
            </div>
          </div>
        </div>

        {/* TOTAL PAID */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">TOTAL PAID</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                {formatMoney(PAYMENT_SUMMARY.totalPaid)}
              </span>
              <span className="text-xs font-semibold text-gray-500">EGP</span>
            </div>
          </div>
        </div>

        {/* BALANCE DUE */}
        <div className="bg-[#fff7f7] rounded-2xl p-5 border border-red-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">BALANCE DUE</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-extrabold text-[#d32f2f] tracking-tight">
                {formatMoney(PAYMENT_SUMMARY.balanceDue)}
              </span>
              <span className="text-xs font-semibold text-gray-500">EGP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row & Recheck Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('unpaid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
              activeTab === 'unpaid'
                ? 'bg-[#1b3457] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <span>Unpaid Fees</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                activeTab === 'unpaid' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {unpaidFees.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('installments')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
              activeTab === 'installments'
                ? 'bg-[#1b3457] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            Installments
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
              activeTab === 'history'
                ? 'bg-[#1b3457] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <span>Payment History</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {paidFees.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-[#1b3457] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            All Fees
          </button>
        </div>

        {/* Recheck Payments Button */}
        <button
          onClick={handleRecheck}
          disabled={isRechecking}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs md:text-sm font-medium rounded-xl shadow-xs transition-colors disabled:opacity-75"
        >
          <RefreshCw className={`w-4 h-4 ${isRechecking ? 'animate-spin' : ''}`} />
          <span>{isRechecking ? 'Rechecking...' : 'Recheck Payments'}</span>
        </button>
      </div>

      {/* Temporary feedback banner after Recheck Payments */}
      {recheckNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{recheckNotice}</span>
        </div>
      )}

      {/* TAB CONTENT: UNPAID FEES */}
      {activeTab === 'unpaid' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[980px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedFeeIds.length === unpaidFees.length && unpaidFees.length > 0}
                      onChange={handleSelectAllUnpaid}
                      className="w-4 h-4 rounded text-[#204d80] border-gray-300 focus:ring-[#204d80]"
                    />
                  </th>
                  <th className="py-3 px-4">FEE TITLE</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3 text-center">YEAR</th>
                  <th className="py-3 px-3 text-center">TERM</th>
                  <th className="py-3 px-4 text-right">AMOUNT</th>
                  <th className="py-3 px-3 text-center">DISCOUNT</th>
                  <th className="py-3 px-4 text-right">NET AMOUNT</th>
                  <th className="py-3 px-3 text-center">PAID</th>
                  <th className="py-3 px-4 text-right">REMAINING</th>
                  <th className="py-3 px-3 text-center">DUE DATE</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {unpaidFees.map((fee) => {
                  const isSelected = selectedFeeIds.includes(fee.id);

                  return (
                    <tr
                      key={fee.id}
                      className={`hover:bg-gray-50/60 transition-colors ${
                        isSelected ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(fee.id)}
                          className="w-4 h-4 rounded text-[#204d80] border-gray-300 focus:ring-[#204d80]"
                        />
                      </td>

                      {/* Fee Title in Arabic */}
                      <td className="py-4 px-4 font-arabic font-semibold text-gray-900 leading-snug">
                        {fee.feeTitle}
                      </td>

                      {/* Category in Arabic */}
                      <td className="py-4 px-3 font-arabic text-gray-500">{fee.category}</td>

                      {/* Year */}
                      <td className="py-4 px-3 text-center font-mono text-gray-600">{fee.year}</td>

                      {/* Term */}
                      <td className="py-4 px-3 text-center font-semibold text-gray-600">{fee.term}</td>

                      {/* Amount */}
                      <td className="py-4 px-4 text-right font-mono font-semibold text-gray-900">
                        {formatMoney(fee.amount)}
                      </td>

                      {/* Discount */}
                      <td className="py-4 px-3 text-center text-gray-400">
                        {fee.discount > 0 ? formatMoney(fee.discount) : '–'}
                      </td>

                      {/* Net Amount */}
                      <td className="py-4 px-4 text-right font-mono font-semibold text-gray-900">
                        {formatMoney(fee.netAmount)}
                      </td>

                      {/* Paid */}
                      <td className="py-4 px-3 text-center text-gray-400">
                        {fee.paid > 0 ? formatMoney(fee.paid) : '–'}
                      </td>

                      {/* Remaining (Highlighted in Red matching screenshot) */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-[#d32f2f]">
                        {formatMoney(fee.remaining)}
                      </td>

                      {/* Due Date */}
                      <td className="py-4 px-3 text-center text-gray-400">{fee.dueDate}</td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PAYMENT HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[980px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-4">FEE TITLE</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3 text-center">YEAR</th>
                  <th className="py-3 px-3 text-center">TERM</th>
                  <th className="py-3 px-4 text-right">AMOUNT PAID</th>
                  <th className="py-3 px-3 text-center">PAYMENT DATE</th>
                  <th className="py-3 px-3 text-center">RECEIPT NO.</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {paidFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4 font-arabic font-semibold text-gray-900">
                      {fee.feeTitle}
                    </td>
                    <td className="py-4 px-3 font-arabic text-gray-500">{fee.category}</td>
                    <td className="py-4 px-3 text-center font-mono text-gray-600">{fee.year}</td>
                    <td className="py-4 px-3 text-center font-semibold text-gray-600">{fee.term}</td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-emerald-600">
                      {formatMoney(fee.paid)} EGP
                    </td>
                    <td className="py-4 px-3 text-center text-gray-600">{fee.paymentDate}</td>
                    <td className="py-4 px-3 text-center font-mono text-gray-500">{fee.receiptNumber}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INSTALLMENTS */}
      {activeTab === 'installments' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Academic Installment Schedule</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-arabic font-bold text-gray-900">قسط الفصل الدراسي الأول 2026 / 2027</p>
                <p className="text-xs text-gray-500 mt-0.5">Due Date: 01 Oct 2026</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-gray-900">27,500.00 EGP</p>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">Pending</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-arabic font-bold text-gray-900">قسط الفصل الدراسي الثاني 2026 / 2027</p>
                <p className="text-xs text-gray-500 mt-0.5">Due Date: 01 Feb 2027</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-gray-900">27,500.00 EGP</p>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ALL FEES */}
      {activeTab === 'all' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-4">FEE TITLE</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3 text-center">YEAR</th>
                  <th className="py-3 px-4 text-right">TOTAL AMOUNT</th>
                  <th className="py-3 px-4 text-right">PAID</th>
                  <th className="py-3 px-4 text-right">REMAINING</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {DEMO_FEES.map((fee) => (
                  <tr key={fee.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4 font-arabic font-semibold text-gray-900 leading-snug">
                      {fee.feeTitle}
                    </td>
                    <td className="py-4 px-3 font-arabic text-gray-500">{fee.category}</td>
                    <td className="py-4 px-3 text-center font-mono text-gray-600">{fee.year}</td>
                    <td className="py-4 px-4 text-right font-mono font-semibold text-gray-900">
                      {formatMoney(fee.amount)} EGP
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-semibold text-emerald-600">
                      {formatMoney(fee.paid)} EGP
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-[#d32f2f]">
                      {formatMoney(fee.remaining)} EGP
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                          fee.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
