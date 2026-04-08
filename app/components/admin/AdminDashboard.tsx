'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FiUsers, FiBriefcase, FiMessageSquare, FiTrendingUp, FiCalendar } from 'react-icons/fi';

interface DashboardStats {
  totalServices: number;
  totalProjects: number;
  totalLeads: number;
  newLeads: number;
  pendingAppointments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    totalProjects: 0,
    totalLeads: 0,
    newLeads: 0,
    pendingAppointments: 0,
  });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [servicesRes, projectsRes, leadsRes, appointmentsRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/projects'),
        fetch('/api/admin/leads'),
        fetch('/api/admin/appointments'),
      ]);

      const services = await servicesRes.json();
      const projects = await projectsRes.json();
      const leads = await leadsRes.json();
      const appointments = await appointmentsRes.json();

      const newLeads = leads.inquiries.filter((lead: any) => lead.status === 'new').length;
      const pendingAppointments = appointments.appointments.filter((appointment: any) => appointment.status === 'pending').length;

      setAppointments(appointments.appointments);
      setInquiries(leads.inquiries);
      setStats({
        totalServices: services.services.length,
        totalProjects: projects.projects.length,
        totalLeads: leads.inquiries.length,
        newLeads,
        pendingAppointments,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const exportCsv = (filename: string, rows: Record<string, any>[]) => {
    const headers = rows.length ? Object.keys(rows[0]) : [];
    const csvContent = [headers.join(','), ...rows.map((row) => headers.map((header) => `"${String(row[header] ?? '')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAppointments = () => {
    exportCsv('appointments.csv', appointments);
  };

  const exportLeads = () => {
    exportCsv('leads.csv', inquiries);
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your services, projects, and leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage your service offerings</p>
              <Button className="w-full">Manage Services</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Showcase your completed work</p>
              <Button variant="secondary" className="w-full">Manage Projects</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Review and respond to inquiries</p>
              <Button variant="growth" className="w-full">View Leads</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
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
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={async () => {
                            await fetch('/api/admin/appointments', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', Authorization: 'Bearer admin-token' },
                              body: JSON.stringify({ id: appointment.id, status: 'confirmed' }),
                            });
                            fetchStats();
                          }}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            await fetch('/api/admin/appointments', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', Authorization: 'Bearer admin-token' },
                              body: JSON.stringify({ id: appointment.id, status: 'rescheduled' }),
                            });
                            fetchStats();
                          }}
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No upcoming appointment requests yet.</p>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" className="w-full sm:w-auto" onClick={exportAppointments}>
                  Export Appointments
                </Button>
                <Button variant="ghost" className="w-full sm:w-auto" onClick={fetchStats}>
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
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
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(`mailto:${lead.email}?subject=Response to your inquiry`, '_blank')}
                        >
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            await fetch('/api/admin/leads', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', Authorization: 'Bearer admin-token' },
                              body: JSON.stringify({ id: lead.id, status: 'responded' }),
                            });
                            fetchStats();
                          }}
                        >
                          Mark Responded
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No new inquiries at the moment.</p>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" className="w-full sm:w-auto" onClick={exportLeads}>
                  Export Leads
                </Button>
                <Button variant="ghost" className="w-full sm:w-auto" onClick={fetchStats}>
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}