'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiDollarSign, FiDownload, FiCreditCard } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

interface Invoice {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function ClientPortal() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsLoggedIn(true);

    // Load mock user data
    setUserProfile({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
    });

    // Load mock invoices
    setInvoices([
      {
        id: '1',
        description: 'Tax Filing Service - 2024',
        amount: 450,
        dueDate: '2024-04-15',
        status: 'paid',
        date: '2024-03-15',
      },
      {
        id: '2',
        description: 'IFTA Registration',
        amount: 320,
        dueDate: '2024-05-20',
        status: 'pending',
        date: '2024-04-20',
      },
      {
        id: '3',
        description: 'IRP Registration',
        amount: 280,
        dueDate: '2024-06-01',
        status: 'overdue',
        date: '2024-05-01',
      },
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handlePayment = async (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (!invoice) return;

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setInvoices(
        invoices.map((inv) =>
          inv.id === invoiceId ? { ...inv, status: 'paid' } : inv
        )
      );
      
      setShowPaymentModal(false);
      toast.success(`Payment of $${invoice.amount} processed successfully!`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const statusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
  };

  const totalDue = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold">{userProfile?.firstName} {userProfile?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{userProfile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{userProfile?.phone}</p>
                </div>
              </div>
              <button className="w-full mt-6 bg-primary-700 text-white py-2 rounded hover:bg-primary-800 transition">
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="text-2xl font-bold text-green-600">$450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Due</span>
                  <span className="text-2xl font-bold text-red-600">${totalDue}</span>
                </div>
                <div className="border-t pt-4">
                  <span className="text-gray-600">Total Invoices</span>
                  <p className="text-2xl font-bold">{invoices.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Invoices */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Your Invoices</h2>

              {invoices.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No invoices yet</p>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{invoice.description}</h3>
                          <p className="text-sm text-gray-500">Issued: {invoice.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                            statusColors[invoice.status]
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="text-2xl font-bold text-primary-700">${invoice.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="font-semibold">{invoice.dueDate}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition">
                          <FiDownload size={16} /> Download
                        </button>
                        <button
                          onClick={() => {
                            setSelectedInvoiceId(invoice.id);
                            setShowPaymentModal(true);
                          }}
                          disabled={invoice.status === 'paid'}
                          className={`flex items-center gap-2 flex-1 px-4 py-2 rounded font-semibold transition ${
                            invoice.status === 'paid'
                              ? 'bg-green-200 text-green-700 cursor-not-allowed'
                              : 'bg-primary-700 text-white hover:bg-primary-800'
                          }`}
                        >
                          <FiCreditCard size={16} /> {invoice.status === 'paid' ? 'Paid' : 'Pay Now'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoiceId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
            {invoices.find((inv) => inv.id === selectedInvoiceId) && (
              <>
                <div className="bg-gray-50 p-4 rounded mb-4">
                  <p className="text-sm text-gray-600 mb-1">
                    {invoices.find((inv) => inv.id === selectedInvoiceId)?.description}
                  </p>
                  <p className="text-3xl font-bold text-primary-700">
                    ${invoices.find((inv) => inv.id === selectedInvoiceId)?.amount}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePayment(selectedInvoiceId)}
                    className="flex-1 bg-primary-700 text-white px-4 py-2 rounded hover:bg-primary-800 transition font-semibold"
                  >
                    Pay Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
