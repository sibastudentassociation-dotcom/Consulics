'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FiUsers, FiBriefcase, FiMessageSquare, FiTrendingUp, FiCalendar, FiFileText } from 'react-icons/fi';

interface DashboardStats {
  totalServices: number;
  totalProjects: number;
  totalLeads: number;
  newLeads: number;
  pendingAppointments: number;
  totalServiceRequests: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    totalProjects: 0,
    totalLeads: 0,
    newLeads: 0,
    pendingAppointments: 0,
    totalServiceRequests: 0,
  });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    clientEmail: '',
    description: '',
    amount: '',
    dueDate: '',
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [servicesRes, projectsRes, leadsRes, appointmentsRes, serviceRequestsRes, invoicesRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/projects'),
        fetch('/api/admin/leads'),
        fetch('/api/admin/appointments'),
        fetch('/api/admin/service-requests'),
        fetch('/api/admin/invoices', { credentials: 'include' }),
      ]);

      const services = await servicesRes.json();
      const projects = await projectsRes.json();
      const leads = await leadsRes.json();
      const appointments = await appointmentsRes.json();
      const serviceRequestsData = await serviceRequestsRes.json();
      const invoicesData = await invoicesRes.json();

      const newLeads = leads.inquiries.filter((lead: any) => lead.status === 'new').length;
      const pendingAppointments = appointments.appointments.filter((a: any) => a.status === 'pending').length;

      setAppointments(appointments.appointments);
      setInquiries(leads.inquiries);
      setServiceRequests(serviceRequestsData.serviceRequests || []);
      setInvoices(invoicesData.invoices || []);
      setStats({
        totalServices: services.services.length,
        totalProjects: projects.projects.length,
        totalLeads: leads.inquiries.length,
        newLeads,
        pendingAppointments,
        totalServiceRequests: serviceRequestsData.serviceRequests?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const exportCsv = (filename: string, rows: Record<string, any>[]) => {
    const headers = rows.length ? Object.keys(rows[0]) : [];
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        headers.map((header) => `"${String(row[header] ?? '')}"`).join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async (url: string, index: number) => {
    try {
      const res = await fetch('/api/admin/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        const { downloadUrl } = await res.json();
        window.open(downloadUrl, '_blank');
      } else {
        alert('Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Something went wrong.');
    }
  };

  const serviceTypeLabel: Record<string, string> = {
    tax: 'File My Taxes',
    trucking: 'Start Trucking Company',
    ifta: 'File IFTA',
    irp: 'Register IRP',
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your services, projects, and leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <FiBriefcase className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-dark">{stats.totalServices}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-growth-100 rounded-lg">
                  <FiTrendingUp className="h-6 w-6 text-growth-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-dark">{stats.totalProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiMessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-dark">{stats.totalLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiUsers className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-2xl font-bold text-dark">{stats.newLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <FiCalendar className="h-6 w-6 text-accent-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
                  <p className="text-2xl font-bold text-dark">{stats.pendingAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiFileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Service Requests</p>
                  <p className="text-2xl font-bold text-dark">{stats.totalServiceRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>Services</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage your service offerings</p>
              <Button className="w-full">Manage Services</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Showcase your completed work</p>
              <Button variant="secondary" className="w-full">Manage Projects</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Leads</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Review and respond to inquiries</p>
              <Button variant="growth" className="w-full">View Leads</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Recent Appointments */}
          <Card>
            <CardHeader><CardTitle>Recent Appointments</CardTitle></CardHeader>
            <CardContent>
              {appointments.length ? (
                <div className="space-y-4">
                  {appointments.slice(0, 4).map((appointment) => (
                    <div key={appointment.id} className="rounded-2xl border border-gray-200 p-4 bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{appointment.firstName} {appointment.lastName}</p>
                          <p className="text-sm text-gray-600">{appointment.serviceType}</p>
                        </div>
                        <span className="text-sm text-gray-500">{appointment.status}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{appointment.appointmentDate} at {appointment.appointmentTime}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button variant="secondary" size="sm" onClick={async () => {
                          await fetch('/api/admin/appointments', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: appointment.id, status: 'confirmed' }),
                          });
                          fetchStats();
                        }}>Confirm</Button>
                        <Button variant="ghost" size="sm" onClick={async () => {
                          await fetch('/api/admin/appointments', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: appointment.id, status: 'rescheduled' }),
                          });
                          fetchStats();
                        }}>Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No upcoming appointment requests yet.</p>
              )}
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" onClick={() => exportCsv('appointments.csv', appointments)}>Export</Button>
                <Button variant="ghost" onClick={fetchStats}>Refresh</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader><CardTitle>Recent Inquiries</CardTitle></CardHeader>
            <CardContent>
              {inquiries.length ? (
                <div className="space-y-4">
                  {inquiries.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="rounded-2xl border border-gray-200 p-4 bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{lead.firstName} {lead.lastName}</p>
                          <p className="text-sm text-gray-600">{lead.service}</p>
                        </div>
                        <span className="text-sm text-gray-500">{lead.status}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{lead.message}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => window.open(`mailto:${lead.email}?subject=Response to your inquiry`, '_blank')}>Reply</Button>
                        <Button variant="ghost" size="sm" onClick={async () => {
                          await fetch('/api/admin/leads', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: lead.id, status: 'responded' }),
                          });
                          fetchStats();
                        }}>Mark Responded</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No new inquiries at the moment.</p>
              )}
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" onClick={() => exportCsv('leads.csv', inquiries)}>Export</Button>
                <Button variant="ghost" onClick={fetchStats}>Refresh</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Requests */}
        <div className="mt-6">
          <Card>
            <CardHeader><CardTitle>Service Requests with Documents</CardTitle></CardHeader>
            <CardContent>
              {serviceRequests.length ? (
                <div className="space-y-4">
                  {serviceRequests.map((req) => (
                    <div key={req.id} className="rounded-2xl border border-gray-200 p-4 bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{req.firstName} {req.lastName}</p>
                          <p className="text-sm text-gray-600">{req.email} • {req.phone}</p>
                          <p className="text-sm text-primary-600 font-medium mt-1">{serviceTypeLabel[req.serviceType] || req.serviceType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {req.status}
                          </span>
                          <button
                            onClick={() => setExpandedRequest(expandedRequest === req.id ? null : req.id)}
                            className="text-sm text-primary-600 hover:underline"
                          >
                            {expandedRequest === req.id ? 'Hide Files' : 'View Files'}
                          </button>
                        </div>
                      </div>

                      {req.comments && (
                        <p className="text-sm text-gray-500 mt-2">📝 {req.comments}</p>
                      )}

                      {expandedRequest === req.id && (
                        <div className="mt-4 border-t pt-4 space-y-3">
                          <p className="text-sm font-semibold text-gray-700">Uploaded Documents:</p>
                          {Object.entries(req.uploadedFiles || {}).length === 0 ? (
                            <p className="text-sm text-gray-500">No files uploaded</p>
                          ) : (
                            Object.entries(req.uploadedFiles || {}).map(([category, urls]) => (
                              <div key={category}>
                                <p className="text-xs font-medium text-gray-600 mb-1">{category}:</p>
                                <div className="space-y-1">
                                  {(urls as string[]).map((url, i) => (
                                    <button
                                      key={i}
                                      onClick={() => handleDownload(url, i)}
                                      className="flex items-center gap-2 text-sm text-primary-600 hover:underline"
                                    >
                                      <FiFileText size={14} />
                                      View Document {i + 1}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No service requests yet.</p>
              )}
              <div className="mt-6">
                <Button variant="ghost" onClick={fetchStats}>Refresh</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Section */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Invoices</CardTitle>
                <Button onClick={() => setShowInvoiceForm(!showInvoiceForm)}>
                  {showInvoiceForm ? 'Cancel' : '+ Create Invoice'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showInvoiceForm && (
                <div className="mb-6 p-5 border rounded-2xl space-y-4 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700">New Invoice</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Client Email</label>
                      <input
                        type="email"
                        placeholder="client@example.com"
                        value={invoiceForm.clientEmail}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, clientEmail: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Service Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Tax Filing Service"
                        value={invoiceForm.description}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Amount ($)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={invoiceForm.amount}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
                      <input
                        type="date"
                        value={invoiceForm.dueDate}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={() => setShowInvoiceForm(false)}>Cancel</Button>
                    <Button
                      onClick={async () => {
                        const res = await fetch('/api/admin/invoices', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: 'include',
                          body: JSON.stringify(invoiceForm),
                        });
                        if (res.ok) {
                          setShowInvoiceForm(false);
                          setInvoiceForm({ clientEmail: '', description: '', amount: '', dueDate: '' });
                          fetchStats();
                        }
                      }}
                    >
                      Save Invoice
                    </Button>
                  </div>
                </div>
              )}

              {invoices.length === 0 ? (
                <p className="text-sm text-gray-500">No invoices yet.</p>
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="rounded-2xl border border-gray-200 p-4 bg-white hover:shadow-sm transition">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{invoice.description}</p>
                          <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
                          <p className="text-xs text-gray-400 mt-1">Due: {invoice.dueDate || 'N/A'}</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <p className="text-lg font-bold text-gray-900">${invoice.amount}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            invoice.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}