import React from 'react';


import NetworkDataStream from './FetchData'; 
import SystemAccountDirectory from './AxiosData';

const ApiIntegrationDashboard = () => {
  return (
    <div className="sir-dashboard-root" style={dashboardTheme.wrapper}>
      
      <header style={dashboardTheme.topBar}>
        <div style={dashboardTheme.topBarContent}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#ecf0f1' }}>
              Supervision des Flux API
            </h1>
            <p style={{ margin: '5px 0 0 0', color: '#bdc3c7', fontSize: '0.9rem' }}>
              Laboratoire d'intégration — Systèmes d'Information Répartie (FST)
            </p>
          </div>
          <div style={dashboardTheme.statusIndicator}>
            <span style={dashboardTheme.pulseDot}></span>
            Réseau Global Actif
          </div>
        </div>
      </header>

      <main style={dashboardTheme.mainWorkspace}>
        <div style={dashboardTheme.gridContainer}>
          
          <section className="dashboard-widget">
            <div style={dashboardTheme.widgetHeader}>
              <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.1rem' }}>Flux de Paquets (Native Fetch)</h3>
            </div>
            <NetworkDataStream />
          </section>

          <section className="dashboard-widget">
            <div style={dashboardTheme.widgetHeader}>
              <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.1rem' }}>Annuaire Distant (Axios Client)</h3>
            </div>
            <SystemAccountDirectory />
          </section>

        </div>
      </main>

      <footer style={dashboardTheme.footer}>
        <p style={{ margin: 0 }}>
          Module de développement front-end avancé — Architecture orientée services
        </p>
      </footer>

    </div>
  );
};


const dashboardTheme = {
  wrapper: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  topBar: {
    backgroundColor: '#1e272e',
    padding: '20px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    borderBottom: '3px solid #0fb9b1'
  },
  topBarContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '8px 15px',
    borderRadius: '20px',
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: '0.85rem'
  },
  pulseDot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    backgroundColor: '#2ecc71',
    borderRadius: '50%',
    boxShadow: '0 0 8px #2ecc71'
  },
  mainWorkspace: {
    flex: 1,
    padding: '40px 25px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '30px',
    alignItems: 'start'
  },
  widgetHeader: {
    padding: '0 0 15px 10px',
    borderBottom: '2px solid #dcdde1',
    marginBottom: '15px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#dcdde1',
    color: '#7f8c8d',
    fontSize: '0.85rem'
  }
};

export default ApiIntegrationDashboard;