import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SystemAccountDirectory = () => {
  const [directoryState, setDirectoryState] = useState({
    profiles: [],
    isRetrieving: true,
    networkFault: null
  });

  useEffect(() => {
    const requestController = new AbortController();

    const fetchProfiles = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
          signal: requestController.signal
        });

        setDirectoryState({
          profiles: response.data,
          isRetrieving: false,
          networkFault: null
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          setDirectoryState({
            profiles: [],
            isRetrieving: false,
            networkFault: error.message || 'Échec de la liaison avec le serveur distant'
          });
        }
      }
    };

    fetchProfiles();

    return () => {
      requestController.abort();
    };
  }, []);

  if (directoryState.isRetrieving) {
    return (
      <div style={theme.alertWrapper}>
        <span>Initialisation de la liaison de données...</span>
      </div>
    );
  }

  if (directoryState.networkFault) {
    return (
      <div style={{ ...theme.alertWrapper, backgroundColor: '#fdedf0', color: '#c0392b' }}>
        <span>Anomalie détectée : {directoryState.networkFault}</span>
      </div>
    );
  }

  return (
    <section style={theme.mainContainer}>
      <header style={theme.headerSection}>
        <h2 style={theme.titleText}>Répertoire Central des Identités</h2>
        <span style={theme.badge}>Protocole Axios Actif</span>
      </header>

      <div style={theme.tableWrapper}>
        <table style={theme.dataTable}>
          <thead>
            <tr>
              <th style={theme.tableHead}>ID Système</th>
              <th style={theme.tableHead}>Nom d'Accès</th>
              <th style={theme.tableHead}>Adresse de Routage</th>
            </tr>
          </thead>
          <tbody>
            {directoryState.profiles.map((profile) => (
              <tr key={profile.id} style={theme.tableRow}>
                <td style={theme.tableCell}><strong>{profile.id}</strong></td>
                <td style={{ ...theme.tableCell, color: '#2980b9', fontWeight: 'bold' }}>{profile.name}</td>
                <td style={theme.tableCell}>{profile.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const theme = {
  mainContainer: {
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    maxWidth: '800px',
    margin: '20px auto',
    border: '1px solid #e1e8ed'
  },
  headerSection: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderBottom: '2px solid #3498db',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#2c3e50'
  },
  badge: {
    backgroundColor: '#e8f4f8',
    color: '#2980b9',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  alertWrapper: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    color: '#7f8c8d',
    fontStyle: 'italic',
    maxWidth: '800px',
    margin: '20px auto'
  },
  tableWrapper: {
    overflowX: 'auto',
    padding: '20px'
  },
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  tableHead: {
    padding: '12px',
    backgroundColor: '#ecf0f1',
    color: '#34495e',
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  },
  tableRow: {
    borderBottom: '1px solid #ecf0f1'
  },
  tableCell: {
    padding: '12px',
    color: '#555'
  }
};

export default SystemAccountDirectory;