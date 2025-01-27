import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <Router>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<UserForm />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;