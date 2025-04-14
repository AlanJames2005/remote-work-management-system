import React, { useState } from 'react';

const FileSharing = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setFiles([
          ...files,
          {
            id: Date.now(),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type,
            uploadDate: new Date().toLocaleDateString(),
            uploadedBy: 'Current User'
          }
        ]);
        setUploading(false);
      }, 1000);
    }
  };

  const handleDeleteFile = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">File Sharing</h2>
      
      {/* Upload Section */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Upload Document
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX, XLS, XLSX (MAX. 10MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
        {uploading && (
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Uploading...
          </div>
        )}
      </div>

      {/* Files List */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">File Name</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Upload Date</th>
              <th className="px-6 py-3">Uploaded By</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {file.name}
                </td>
                <td className="px-6 py-4">{file.size}</td>
                <td className="px-6 py-4">{file.type}</td>
                <td className="px-6 py-4">{file.uploadDate}</td>
                <td className="px-6 py-4">{file.uploadedBy}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr className="bg-white dark:bg-gray-800">
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No files uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileSharing; 