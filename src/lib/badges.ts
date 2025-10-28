/**
 * Shared badge color utilities for consistent theming across the app.
 * All badges use dark backgrounds with bright text for visibility on dark surfaces.
 */

import type { BookingStatus, Role, User, Statement } from '@/types/domain';

/**
 * Get badge classes for booking status
 */
export function getBookingStatusColor(status: BookingStatus): string {
  switch (status) {
    case 'pending':
      return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
    case 'confirmed':
      return 'bg-green-900/30 text-green-400 border-green-800/50';
    case 'completed':
      return 'bg-blue-900/30 text-blue-400 border-blue-800/50';
    case 'cancelled':
      return 'bg-red-900/30 text-red-400 border-red-800/50';
    default:
      return 'bg-slate-800/50 text-slate-300 border-slate-700';
  }
}

/**
 * Get badge classes for user status
 */
export function getUserStatusColor(status: User['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-900/30 text-green-400 border-green-800/50';
    case 'inactive':
      return 'bg-slate-800/50 text-slate-300 border-slate-700';
    default:
      return 'bg-slate-800/50 text-slate-300 border-slate-700';
  }
}

/**
 * Get badge classes for statement status
 */
export function getStatementStatusColor(status: Statement['status']): string {
  switch (status) {
    case 'verified':
      return 'bg-green-900/30 text-green-400 border-green-800/50';
    case 'paid':
      return 'bg-blue-900/30 text-blue-400 border-blue-800/50';
    case 'sent':
      return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
    case 'disputed':
      return 'bg-red-900/30 text-red-400 border-red-800/50';
    case 'draft':
      return 'bg-slate-800/50 text-slate-300 border-slate-700';
    default:
      return 'bg-slate-800/50 text-slate-300 border-slate-700';
  }
}

/**
 * Get badge classes for user role
 */
export function getUserRoleColor(role: Role): string {
  switch (role) {
    case 'org_admin':
      return 'bg-purple-900/30 text-purple-400 border-purple-800/50';
    case 'designated':
      return 'bg-blue-900/30 text-blue-400 border-blue-800/50';
    case 'concierge':
      return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
    case 'partner':
      return 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50';
    default:
      return 'bg-slate-800/50 text-slate-300 border-slate-700';
  }
}

/**
 * Get display label for user role
 */
export function getUserRoleLabel(role: Role): string {
  switch (role) {
    case 'org_admin':
      return 'Admin';
    case 'designated':
      return 'Member';
    case 'concierge':
      return 'Concierge';
    case 'partner':
      return 'Partner';
    default:
      return role;
  }
}
