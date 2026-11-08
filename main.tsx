import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

class AppErrorBoundary extends React.Component<React.PropsWithChildren, { error: string | null }> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: Error) { return { error: error.message || 'Unexpected application error' }; }
  componentDidCatch(error: Error) { console.error('CafePilot render error:', error); }
  render() {
    if (this.state.error) return <main style={{fontFamily:'system-ui',maxWidth:680,margin:'12vh auto',padding:24,color:'#29221c'}}>
      <h1 style={{fontSize:28}}>CafePilot couldn’t load</h1>
      <p style={{lineHeight:1.6}}>The page hit a frontend error instead of showing a blank screen. Refresh once; if it continues, share this message with support:</p>
      <pre style={{whiteSpace:'pre-wrap',background:'#f4eee8',padding:16,borderRadius:10}}>{this.state.error}</pre>
      <button style={{padding:'10px 16px',background:'#30251d',color:'white',border:0,borderRadius:8}} onClick={() => location.reload()}>Reload page</button>
    </main>;
    return this.props.children;
  }
}

const root = document.getElementById('root');
if (!root) throw new Error('CafePilot root element is missing from index.html');
ReactDOM.createRoot(root).render(<React.StrictMode><AppErrorBoundary><BrowserRouter><App /></BrowserRouter></AppErrorBoundary></React.StrictMode>);
