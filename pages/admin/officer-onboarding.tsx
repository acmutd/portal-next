import React, { useState } from 'react';

interface Officer {
  first_name: string;
  last_name: string;
  org_unit_path: string;
  groups: string[];
  send_to_email: string;
}

const OfficerOnboardingPage = () => {
  const [officers, setOfficers] = useState<Officer[]>([{
    first_name: '',
    last_name: '',
    org_unit_path: '',
    groups: [],
    send_to_email: ''
  } as Officer]);
  const [onboardingResults, setOnboardingResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newOfficers = [...officers];
    const { name, value } = event.target;
    if (name in newOfficers[index]) {
      (newOfficers[index] as any)[name] = value;
    }
    setOfficers(newOfficers);
  };

  const handleGroupChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newOfficers = [...officers] as Officer[];
    newOfficers[index].groups = (event.target.value).split(',').map((group: string) => group.trim());
    setOfficers(newOfficers);
  };


  const addOfficerForm = () => {
    setOfficers([...officers, { first_name: '', last_name: '', org_unit_path: '', groups: [], send_to_email: '' }]);
  };

  const removeOfficerForm = (index: number) => {
    const newOfficers = [...officers];
    newOfficers.splice(index, 1);
    setOfficers(newOfficers);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setOnboardingResults([]);

    try {
      const response = await fetch('/api/admin/onboard-officer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ officers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to onboard officers');
      } else {
        const resultData = await response.json();
        setOnboardingResults(resultData.results);
      }
    } catch (e: any) {
      console.error('Frontend error:', e);
      setError('Error onboarding officers: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Officer Onboarding</h1>
      <form onSubmit={handleSubmit}>
        {officers.map((officer, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Officer {index + 1}</h3>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor={`first_name-${index}`} style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
              <input
                type="text"
                id={`first_name-${index}`}
                name="first_name"
                value={officer.first_name}
                onChange={(event) => handleInputChange(index, event)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor={`last_name-${index}`} style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
              <input
                type="text"
                id={`last_name-${index}`}
                name="last_name"
                value={officer.last_name}
                onChange={(event) => handleInputChange(index, event)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor={`org_unit_path-${index}`} style={{ display: 'block', marginBottom: '5px' }}>Org Unit Path:</label>
              <input
                type="text"
                id={`org_unit_path-${index}`}
                name="org_unit_path"
                value={officer.org_unit_path}
                onChange={(event) => handleInputChange(index, event)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
             <div style={{ marginBottom: '10px' }}>
              <label htmlFor={`groups-${index}`} style={{ display: 'block', marginBottom: '5px' }}>Groups (comma-separated):</label>
              <input
                type="text"
                id={`groups-${index}`}
                name="groups"
                value={officer.groups.join(', ')} // Display groups as comma-separated string
                onChange={(event) => handleGroupChange(index, event)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor={`send_to_email-${index}`} style={{ display: 'block', marginBottom: '5px' }}>Personal Email:</label>
              <input
                type="email"
                id={`send_to_email-${index}`}
                name="send_to_email"
                value={officer.send_to_email}
                onChange={(event) => handleInputChange(index, event)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
            {officers.length > 1 && (
              <button type="button" onClick={() => removeOfficerForm(index)}>Remove Officer</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addOfficerForm}>Add Officer</button>
        <button type="submit" disabled={loading}>
          {loading ? 'Onboarding Officers...' : 'Onboard Officers'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {onboardingResults.length > 0 && (
        <div>
          <h2>Onboarding Results</h2>
          {onboardingResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '3px' }}>
              <p><strong>Email:</strong> {result.email}</p>
              <p><strong>Status:</strong> {result.status}</p>
              {result.error && <p style={{ color: 'red' }}><strong>Error:</strong> {result.error}</p>}
              {result.data && result.status === 'success' && (
                <pre>{JSON.stringify(result.data, null, 2)}</pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfficerOnboardingPage;
