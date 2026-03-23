import React, { useState, useEffect, useCallback } from 'react';


const NetworkDataStream = () => {
  const [streamState, setStreamState] = useState({
    packets: [],
    isSyncing: true,
    syncError: null
  });

  const [syncTrigger, setSyncTrigger] = useState(0);

  const triggerManualSync = useCallback(() => {
    setSyncTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchNetworkPackets = async () => {
      setStreamState(prev => ({ ...prev, isSyncing: true, syncError: null }));

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`Anomalie de communication (Code ${response.status})`);
        }

        const rawData = await response.json();

        setStreamState({
          packets: rawData.slice(0, 5), 
          isSyncing: false,
          syncError: null
        });

      } catch (error) {
        if (error.name !== 'AbortError') {
          setStreamState({
            packets: [],
            isSyncing: false,
            syncError: error.message || 'Échec de synchronisation au nœud central'
          });
        }
      }
    };

    fetchNetworkPackets();

    return () => abortController.abort();
    
  }, [syncTrigger]); 


  return (
    <section className="stream-monitor" style={uiStyles.container}>
      
      <header style={uiStyles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#2c3e50' }}>
            Flux de Données Réparti
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#7f8c8d' }}>
              Source : Serveur Distant (JSONPlaceholder)
            </p>
          </div>
        </div>
        
        <button 
          onClick={triggerManualSync} 
          disabled={streamState.isSyncing}
          style={uiStyles.refreshBtn(streamState.isSyncing)}
        >
          {streamState.isSyncing ? 'Synchronisation...' : 'Actualiser le flux'}
        </button>
      </header>

      <div style={uiStyles.contentArea}>
        {streamState.isSyncing && streamState.packets.length === 0 ? (
          <div style={uiStyles.statusMessage}>Connexion au serveur en cours...</div>
        ) : streamState.syncError ? (
          <div style={{ ...uiStyles.statusMessage, color: '#e74c3c', backgroundColor: '#fdedf0' }}>
            <strong>Erreur Critique :</strong> {streamState.syncError}
          </div>
        ) : (
          <ul style={uiStyles.packetList}>
            {streamState.packets.map((packet) => (
              <li key={packet.id} style={uiStyles.packetItem}>
                <div style={uiStyles.packetId}>ID: {packet.id}</div>
                <div style={{ fontWeight: '600', color: '#34495e', textTransform: 'capitalize' }}>
                  {packet.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </section>
  );
};

const uiStyles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    maxWidth: '600px',
    margin: '20px auto',
    border: '1px solid #e1e8ed'
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: '15px 20px',
    borderBottom: '1px solid #e1e8ed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  refreshBtn: (isSyncing) => ({
    padding: '8px 15px',
    backgroundColor: isSyncing ? '#bdc3c7' : '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: isSyncing ? 'not-allowed' : 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  }),
  contentArea: {
    padding: '20px',
    backgroundColor: '#fdfdfe'
  },
  statusMessage: {
    textAlign: 'center',
    padding: '30px',
    color: '#7f8c8d',
    fontStyle: 'italic',
    borderRadius: '6px'
  },
  packetList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  packetItem: {
    padding: '12px 15px',
    backgroundColor: '#ffffff',
    border: '1px solid #ecf0f1',
    borderLeft: '4px solid #2ecc71',
    borderRadius: '4px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
  },
  packetId: {
    backgroundColor: '#ecf0f1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    color: '#7f8c8d',
    fontWeight: 'bold',
    minWidth: '40px',
    textAlign: 'center'
  }
};

export default NetworkDataStream;