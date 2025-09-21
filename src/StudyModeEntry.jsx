import React from 'react';
import { createRoot } from 'react-dom/client';
import StudyModeApp from './StudyModeApp';
import './StudyModeApp.css';

// Create a separate entry point for the Study Mode App
const container = document.getElementById('study-mode-root');
const root = createRoot(container);

root.render(<StudyModeApp />);
