import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { TrashIcon } from '@radix-ui/react-icons'; // import trashcan icon

const orgUnits = ['/Development', '/Education', '/Research', '/HackUTD', '/Projects', '/Industry'];
const groups = [
  'acmindustry@acmutd.co',
  'community@acmutd.co',
  'development@acmutd.co',
  'education@acmutd.co',
  'finance-team@acmutd.co',
  'hackutd-experience@acmutd.co',
  'hackutd-finance@acmutd.co',
  'hackutd-logistics@acmutd.co',
  'hackutd-marketing@acmutd.co',
  'hackutd@acmutd.co',
  'hackutdindustry@acmutd.co',
  'media@acmutd.co',
  'outreach@acmutd.co',
  'projects@acmutd.co',
  'research@acmutd.co',
  'tip@acmutd.co',
  'sponsor@acmutd.co'
];

interface Officer {
  first_name: string;
  last_name: string;
  org_unit_path: string;
  groups: string[];
  send_to_email: string;
}

const OfficerOnboardingPage = () => {
  const { status } = useSession({ required: true });
  const [officers, setOfficers] = useState<Officer[]>([
    {
      first_name: '',
      last_name: '',
      org_unit_path: '',
      groups: [],
      send_to_email: ''
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleInputChange = (index: number, field: keyof Officer, value: any) => {
    const newOfficers = [...officers];
    newOfficers[index] = { ...newOfficers[index], [field]: value };
    setOfficers(newOfficers);
  };

  const handleRemoveOfficer = (index: number) => {
    // Only allow removal if there is more than one officer
    if (officers.length > 1) {
      const newOfficers = officers.filter((_, i) => i !== index);
      setOfficers(newOfficers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/admin/onboard-officer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officers }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResults(data.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Officer Onboarding</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {officers.map((officer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              {/* Trashcan button (only visible when more than one officer exists) */}
              {officers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOfficer(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={officer.first_name}
                    onChange={(e) => handleInputChange(index, 'first_name', e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={officer.last_name}
                    onChange={(e) => handleInputChange(index, 'last_name', e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Send To Email</label>
                  <input
                    type="text"
                    value={officer.send_to_email}
                    onChange={(e) => handleInputChange(index, 'send_to_email', e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Organization Unit</label>
                  <select
                    value={officer.org_unit_path}
                    onChange={(e) => handleInputChange(index, 'org_unit_path', e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2"
                    required
                  >
                    <option value="">Select Unit</option>
                    {orgUnits.map(unit => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Groups</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {groups.map(group => (
                      <label key={group} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={officer.groups.includes(group)}
                          onChange={(e) => {
                            const newGroups = e.target.checked
                              ? [...officer.groups, group]
                              : officer.groups.filter(g => g !== group);
                            handleInputChange(index, 'groups', newGroups);
                          }}
                          className="rounded border-gray-700 bg-gray-900/50"
                        />
                        <span className="text-sm">{group.split('@')[0]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() =>
                setOfficers([
                  ...officers,
                  { first_name: '', last_name: '', org_unit_path: '', groups: [], send_to_email: '' }
                ])
              }
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Add Another Officer
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Onboard Officers'}
            </button>
          </div>
        </form>

        {/* Results section */}
        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Results</h2>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.status === 'success' ? 'bg-green-900/50' : 'bg-red-900/50'
                }`}
              >
                <p className="font-medium">{result.email}</p>
                <p>{result.status === 'success' ? 'Successfully onboarded' : result.error}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerOnboardingPage;