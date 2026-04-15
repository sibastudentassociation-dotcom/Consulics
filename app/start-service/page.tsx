'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import FileUpload from '@/app/components/FileUpload';
import toast, { Toaster } from 'react-hot-toast';

interface ServiceFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  comments?: string;
}

const documentCategories = {
  tax: [
    'Last Years Tax Returns',
    'Current Years W2',
    '2nd or 3rd W2 or Other Income',
    'Upload Driving License',
    'Personal Expenses Details',
    'Any Other Document',
  ],
  trucking: [
    'Upload Driving License',
    'Utility Bill (Gas, Electric, Truck Insurance)',
    'SSC Certificate (if registered)',
    'SS4 Issued by IRS',
    'County Tax Documents',
    'Other',
  ],
};

const services = [
  { id: 'tax', label: 'File My Taxes', icon: '📋' },
  { id: 'trucking', label: 'Start Trucking Company', icon: '🚛' },
  { id: 'ifta', label: 'File IFTA', icon: '🛣️' },
  { id: 'irp', label: 'Register IRP', icon: '📋' },
];

function StartServicePageContent() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('type') || 'tax';
  const [activeService, setActiveService] = useState(selectedService);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [uploadedUrls, setUploadedUrls] = useState<Record<string, string[]>>({});
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ServiceFormData>();
  const [step, setStep] = useState(1);

  const selectedDocs = documentCategories[activeService as keyof typeof documentCategories] || [];

 const onSubmit = async (data: ServiceFormData) => {
  if (step === 1) {
    setStep(2);
    return;
  }

  try {
    const response = await fetch('/api/service-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        serviceType: activeService,
        uploadedFiles: uploadedUrls,
      }),
    });

    if (!response.ok) throw new Error('Failed to submit');

    toast.success("Service request submitted! We'll contact you within 24 hours.");
    setStep(1);
    setUploadedFiles({});
    setUploadedUrls({});
  } catch (error) {
    toast.error('Failed to submit. Please try again.');
  }
};

  const handleFileSelect = (files: FileList, category: string) => {
    setUploadedFiles({
      ...uploadedFiles,
      [category]: Array.from(files),
    });
  };

  const handleUploadComplete = (urls: string[], category: string) => {
  setUploadedUrls((prev) => ({
    ...prev,
    [category]: [...(prev[category] || []), ...urls],
  }));
};

  const getTotalFiles = () => {
    return Object.values(uploadedFiles).reduce((total, files) => total + files.length, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Get Started</h1>
          <p className="text-xl text-gray-100">Choose your service and complete the form</p>
        </div>
      </section>

      {/* Service Selection */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setActiveService(service.id);
                  setStep(1);
                  setUploadedFiles({});
                }}
                className={`p-6 rounded-lg font-semibold transition border-2 ${
                  activeService === service.id
                    ? 'border-accent-500 bg-accent-50 text-accent-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                {service.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
              {step === 1 ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Step 1: Your Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-700 text-white py-3 rounded font-semibold hover:bg-primary-800 transition"
                  >
                    Next: Upload Documents
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Step 2: Upload Documents</h2>
                  <p className="text-gray-600 mb-6">
                    Please upload the following documents for {services.find(s => s.id === activeService)?.label}
                  </p>

                  <div className="space-y-8 mb-8">
                    {selectedDocs.map((docType) => (
                      <div key={docType}>
                        <FileUpload
                         category={docType}
                          label={docType}
                          onFilesSelected={handleFileSelect}
                          onUploadComplete={handleUploadComplete}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                    <p className="text-sm text-blue-700">
                      <strong>Documents uploaded: {getTotalFiles()}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                    <textarea
                      {...register('comments')}
                      rows={4}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Any additional information you'd like to share..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-primary-700 text-primary-700 py-3 rounded font-semibold hover:bg-primary-50 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-accent-500 text-white py-3 rounded font-semibold hover:bg-accent-600 transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-4 mt-8">
              <div className={`h-2 w-12 rounded ${step === 1 ? 'bg-primary-700' : 'bg-gray-300'}`}></div>
              <div className={`h-2 w-12 rounded ${step === 2 ? 'bg-primary-700' : 'bg-gray-300'}`}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function StartServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <StartServicePageContent />
    </Suspense>
  );
}
