import React from 'react';
import { mockState } from '@/mocks/state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Users, TrendingUp, Clock, MapPin, Star, ArrowUp } from 'lucide-react';

export default function AnalyticsPage() {
  // Calculate analytics from mock data
  const analytics = React.useMemo(() => {
    const bookings = mockState.data.bookings;
    const users = mockState.data.users;
    const orgs = mockState.data.organizations;

    // Booking metrics
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
    const completedBookings = bookings.filter((b) => b.status === 'completed').length;
    const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
    const confirmationRate = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;

    // Player metrics
    const totalPlayers = bookings.reduce((sum, b) => sum + b.players.length, 0);
    const avgPlayersPerBooking = totalBookings > 0 ? totalPlayers / totalBookings : 0;

    // Course popularity
    const courseBookings = new Map<string, number>();
    bookings.forEach((b) => {
      const count = courseBookings.get(b.courseName || b.courseId) || 0;
      courseBookings.set(b.courseName || b.courseId, count + 1);
    });
    const topCourse = Array.from(courseBookings.entries()).sort((a, b) => b[1] - a[1])[0];

    // Member activity
    const activeMembers = users.filter((u) => u.status === 'active').length;
    const totalMembers = users.length;
    const membershipRate = totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0;

    // Organization metrics
    const activeOrgs = orgs.filter((o) => o.status === 'active').length;

    return {
      totalBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      confirmationRate,
      totalPlayers,
      avgPlayersPerBooking,
      topCourse: topCourse ? { name: topCourse[0], count: topCourse[1] } : null,
      activeMembers,
      totalMembers,
      membershipRate,
      activeOrgs,
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Analytics</h1>
        <p className="text-slate-400 mt-1">Performance metrics and insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Bookings</p>
                <p className="text-3xl font-bold text-slate-100">{analytics.totalBookings}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">All time</span>
                </div>
              </div>
              <Calendar className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Rate */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Confirmation Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {analytics.confirmationRate.toFixed(0)}%
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Excellent</span>
                </div>
              </div>
              <Star className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Active Members */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Members</p>
                <p className="text-3xl font-bold text-purple-600">{analytics.activeMembers}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-slate-400">
                    {analytics.membershipRate.toFixed(0)}% of total
                  </span>
                </div>
              </div>
              <Users className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Players */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Players/Booking</p>
                <p className="text-3xl font-bold text-amber-600">
                  {analytics.avgPlayersPerBooking.toFixed(1)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-slate-400">
                    {analytics.totalPlayers} total players
                  </span>
                </div>
              </div>
              <Users className="h-10 w-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Booking Status Breakdown */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-slate-300">Confirmed</span>
                </div>
                <span className="text-sm font-semibold text-slate-100">
                  {analytics.confirmedBookings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-slate-300">Completed</span>
                </div>
                <span className="text-sm font-semibold text-slate-100">
                  {analytics.completedBookings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-slate-300">Cancelled</span>
                </div>
                <span className="text-sm font-semibold text-slate-100">
                  {analytics.cancelledBookings}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Course */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Most Popular Course</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topCourse ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-100">{analytics.topCourse.name}</p>
                    <p className="text-sm text-slate-400">
                      {analytics.topCourse.count} booking{analytics.topCourse.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(analytics.topCourse.count / analytics.totalBookings) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {((analytics.topCourse.count / analytics.totalBookings) * 100).toFixed(0)}% of all
                  bookings
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No bookings yet</p>
            )}
          </CardContent>
        </Card>

        {/* Organization Health */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Organization Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Active Organizations</span>
                  <span className="text-2xl font-bold text-green-600">{analytics.activeOrgs}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-full transition-all" />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <p className="text-xs text-slate-400">Average quota utilization</p>
                <p className="text-sm font-semibold text-slate-100 mt-1">
                  {((analytics.totalPlayers / (144 * analytics.activeOrgs)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SLA Metrics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Service Level Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg border border-green-800/50">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Avg Response Time</p>
                    <p className="text-xs text-slate-400">Last 30 days</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-green-500">12 min</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg border border-blue-800/50">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Fulfillment Rate</p>
                    <p className="text-xs text-slate-400">Last 30 days</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-blue-500">98%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-900/30 rounded-lg border border-amber-800/50">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Satisfaction Score</p>
                    <p className="text-xs text-slate-400">Member feedback</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-amber-500">4.8/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Pending Requests</p>
                <p className="text-2xl font-bold text-slate-100">1</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Today's Bookings</p>
                <p className="text-2xl font-bold text-slate-100">0</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">This Week</p>
                <p className="text-2xl font-bold text-slate-100">
                  {
                    analytics.confirmedBookings +
                    analytics.completedBookings
                  }
                </p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">This Month</p>
                <p className="text-2xl font-bold text-slate-100">{analytics.totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
