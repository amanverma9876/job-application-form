// src/App.js
import React from 'react';
import JobApplicationForm from './JobApplicationForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Application Form</h1>
      </header>
      <main>
        <JobApplicationForm />
      </main>
    </div>
  );
}

export default App;
