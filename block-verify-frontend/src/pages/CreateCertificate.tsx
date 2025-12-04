import { useState } from 'react';
import { api } from '../lib/api';

function CreateCertificate() {
  const [formData, setFormData] = useState({
    studentName: '',
    institution: '',
    issueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.addCertificate(formData);
      
      if (response.success && response.data) {
        setResult(response.data);
        alert('Certificate created successfully!');
        // Reset form
        setFormData({ studentName: '', institution: '', issueDate: '' });
      } else {
        setError(response.message || 'Failed to create certificate');
      }
    } catch (err) {
      setError('Failed to create certificate. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (result?.certificate?.certificateHash) {
      api.downloadCertificate(result.certificate.certificateHash);
    }
  };

  return (
    <div className="create-certificate-page min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Create Certificate</h1>
        
        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium mb-2">Student Name</label>
            <input
              id="studentName"
              type="text"
              className="w-full px-4 py-2 rounded-md bg-background/70 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
              required
            />
          </div>

          <div>
            <label htmlFor="institution" className="block text-sm font-medium mb-2">Institution</label>
            <input
              id="institution"
              type="text"
              className="w-full px-4 py-2 rounded-md bg-background/70 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
              required
            />
          </div>

          <div>
            <label htmlFor="issueDate" className="block text-sm font-medium mb-2">Issue Date</label>
            <input
              id="issueDate"
              type="date"
              className="w-full px-4 py-2 rounded-md bg-background/70 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.issueDate}
              onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating Certificate...' : 'Create Certificate'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">❌ {error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-card rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-green-500">✅ Certificate Created Successfully!</h2>
            
            <div className="space-y-2">
              <p><strong>Student:</strong> {result.certificate.studentName}</p>
              <p><strong>Institution:</strong> {result.certificate.institution}</p>
              <p><strong>Hash:</strong> <code className="text-sm bg-muted p-1 rounded">{result.certificate.certificateHash}</code></p>
              <p><strong>Verification URL:</strong> <a href={result.verificationURL} className="text-primary hover:underline">{result.verificationURL}</a></p>
            </div>

            {result.qrCode && (
              <div className="flex justify-center">
                <img src={result.qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:opacity-90"
              >
                📄 Download Certificate PDF
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(result.certificate.certificateHash)}
                className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-md font-semibold hover:opacity-90"
              >
                📋 Copy Hash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCertificate;