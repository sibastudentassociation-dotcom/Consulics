'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiDownload, FiCreditCard } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';

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

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export default function ClientPortal() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', phone: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setIsLoggedIn(true);
        setUserProfile({
          firstName: data.user?.name?.split(' ')[0] || 'User',
          lastName: data.user?.name?.split(' ')[1] || '',
          email: data.user?.email || '',
          phone: data.user?.phone || '',
        });

        const invoicesRes = await fetch('/api/user/invoices');
if (invoicesRes.ok) {
  const invoicesData = await invoicesRes.json();
  setInvoices(invoicesData.invoices || []);
}

        // Fetch real appointments
        const apptResponse = await fetch('/api/user/appointments');
        if (apptResponse.ok) {
          const apptData = await apptResponse.json();
          setAppointments(apptData.appointments);
        }
      } catch (error) {
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    localStorage.removeItem('auth_token');
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handlePayment = async (invoiceId: string) => {
  const invoice = invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return;

  try {
    // Fake 1.5 sec delay — payment processing simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Firestore mein status update karo
    const res = await fetch('/api/user/invoices', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId }),
    });

    if (!res.ok) throw new Error('Payment failed');

    // UI update karo
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

  const handleDownloadInvoice = (invoice: any) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('INVOICE', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Description: ${invoice.description}`, 20, 50);
  doc.text(`Client: ${invoice.clientEmail || ''}`, 20, 60);
  doc.text(`Amount: $${invoice.amount}`, 20, 70);
  doc.text(`Due Date: ${invoice.dueDate}`, 20, 80);
  doc.text(`Status: ${invoice.status}`, 20, 90);
  doc.text(`Date Issued: ${invoice.createdAt?.split('T')[0] || ''}`, 20, 100);

  doc.save(`invoice-${invoice.id}.pdf`);
};
  const handleSaveProfile = async () => {
  setIsSaving(true);
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (!response.ok) throw new Error('Failed to update');
    setUserProfile((prev) => prev ? { ...prev, ...editForm } : prev);
    setShowEditModal(false);
    toast.success('Profile updated successfully!');
  } catch (error) {
    toast.error('Failed to update profile. Please try again.');
  } finally {
    setIsSaving(false);
  }
};

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-900">Loading...</p>
      </div>
    );
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{userProfile?.firstName} {userProfile?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{userProfile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{userProfile?.phone || 'Not provided'}</p>
                </div>
              </div>
             <button
  onClick={() => {
    setEditForm({
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      phone: userProfile?.phone || '',
    });
    setShowEditModal(true);
  }}
  className="w-full mt-6 bg-primary-700 text-white py-2 rounded hover:bg-primary-800 transition">
  Edit Profile
</button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="text-2xl font-bold text-green-600">
  ${invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)}
</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Due</span>
                  <span className="text-2xl font-bold text-red-600">${totalDue}</span>
                </div>
                <div className="border-t pt-4">
                  <span className="text-gray-600">Total Invoices</span>
                  <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                </div>
                <div className="border-t pt-4">
                  <span className="text-gray-600">Total Appointments</span>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Invoices + Appointments */}
          <div className="lg:col-span-2 space-y-8">

            {/* Invoices */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Invoices</h2>
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
                          <h3 className="font-semibold text-lg text-gray-900">{invoice.description}</h3>
                          <p className="text-sm text-gray-500">Issued: {invoice.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[invoice.status]}`}>
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
                          <p className="font-semibold text-gray-900">{invoice.dueDate}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
  onClick={() => handleDownloadInvoice(invoice)}
  className="flex items-center gap-2 flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition"
>
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

            {/* Appointments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Appointments</h2>
              {appointments.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No appointments yet</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{appt.serviceType}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                          appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          appt.status === 'rescheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-gray-600">📅 {appt.appointmentDate} at {appt.appointmentTime}</p>
                      <p className="text-gray-600">👤 {appt.firstName} {appt.lastName}</p>
                      {appt.notes && <p className="text-gray-500 text-sm mt-1">📝 {appt.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={editForm.firstName}
            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={editForm.lastName}
            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowEditModal(false)}
          className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="flex-1 bg-primary-700 text-white px-4 py-2 rounded hover:bg-primary-800 transition font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
)}

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoiceId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Make Payment</h2>
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
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
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