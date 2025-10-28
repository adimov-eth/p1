import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsoleSidebar from './ConsoleSidebar';
import DashboardPage from './DashboardPage';
import CreateBookingPage from './CreateBookingPage';
import ManageBookingsPage from './ManageBookingsPage';
import MemberProfilesPage from './MemberProfilesPage';
import StatementsPage from './StatementsPage';
import AnalyticsPage from './AnalyticsPage';

export default function ConsoleRouter() {
  return (
    <BrowserRouter basename="/console">
      <div className="flex h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <ConsoleSidebar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create-booking" element={<CreateBookingPage />} />
            <Route path="/bookings" element={<ManageBookingsPage />} />
            <Route path="/members" element={<MemberProfilesPage />} />
            <Route path="/statements" element={<StatementsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
