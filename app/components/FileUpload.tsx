'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiCheck, FiLoader } from 'react-icons/fi';

interface FileUploadProps {
  onFilesSelected: (files: FileList, category: string) => void;
  onUploadComplete?: (urls: string[], category: string) => void;
  category: string;
  label: string;
  accept?: string;
}

export default function FileUpload({
  onFilesSelected,
  onUploadComplete,
  category,
  label,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    onFilesSelected(e.target.files, category);

    // Upload to Cloudinary
    setUploading(true);
    const urls: string[] = [];

    for (const file of newFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) urls.push(data.url);
      } catch (error) {
        console.error('Upload failed for:', file.name);
      }
    }

    setUploadedUrls((prev) => [...prev, ...urls]);
    setUploading(false);

    if (onUploadComplete) {
      onUploadComplete(urls, category);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setUploadedUrls(uploadedUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 cursor-pointer transition"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="text-center">
          {uploading ? (
            <>
              <FiLoader className="mx-auto text-3xl text-primary-500 mb-2 animate-spin" />
              <p className="text-primary-600">Uploading...</p>
            </>
          ) : (
            <>
              <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">PDF, DOC, JPG up to 10MB</p>
            </>
          )}
        </div>
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Selected Files:</label>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-3"
            >
              <div className="flex items-center space-x-2">
                {uploadedUrls[index] ? (
                  <FiCheck className="text-green-600" />
                ) : (
                  <FiLoader className="text-primary-500 animate-spin" />
                )}
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                {uploadedUrls[index] && (
                  <span className="text-xs text-green-600">✓ Uploaded</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}