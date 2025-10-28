import React from 'react';
import { mockState } from '@/mocks/state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Download, Plus, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBookingStatusColor } from '@/lib/badges';

export default function ManageBookingsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get all bookings sorted by date (newest first)
  const allBookings = React.useMemo(() => {
    return mockState.data.bookings
      .map((booking) => {
        const org = mockState.data.organizations.find((o) => o.id === booking.orgId);
        const course = mockState.data.courses.find((c) => c.id === booking.courseId);
        const primaryPlayer = booking.players.find((p) => p.type === 'member');

        return {
          ...booking,
          orgName: org?.name || 'Unknown Org',
          courseName: course?.name || booking.courseName,
          courseRegion: course?.region,
          primaryPlayerName: primaryPlayer?.name || 'Unknown',
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // Filter bookings by search query
  const filteredBookings = React.useMemo(() => {
    if (!searchQuery.trim()) return allBookings;

    const query = searchQuery.toLowerCase();
    return allBookings.filter(
      (b) =>
        b.primaryPlayerName.toLowerCase().includes(query) ||
        b.orgName.toLowerCase().includes(query) ||
        (b.courseName?.toLowerCase() || '').includes(query) ||
        b.id.toLowerCase().includes(query)
    );
  }, [allBookings, searchQuery]);


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Manage Bookings</h1>
          <p className="text-slate-400 mt-1">View and manage all golf course reservations</p>
        </div>

        <Button
          onClick={() => navigate('/create-booking')}
          className="bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Booking
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Bookings</p>
                <p className="text-2xl font-bold text-slate-100">{allBookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">
                  {allBookings.filter((b) => b.status === 'confirmed').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {allBookings.filter((b) => b.status === 'completed').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">
                  {allBookings.filter((b) => b.status === 'cancelled').length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by member, organization, course, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">
            All Bookings ({filteredBookings.length}
            {searchQuery && ` of ${allBookings.length}`})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-100">
                {searchQuery ? 'No bookings found' : 'No bookings yet'}
              </h3>
              <p className="text-slate-400 mt-2">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Create your first booking to get started'}
              </p>
              {!searchQuery && (
                <Button onClick={() => navigate('/create-booking')} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Booking
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-slate-700/50 border-slate-700">
                      <TableCell className="font-mono text-xs text-slate-400">
                        {booking.id}
                      </TableCell>
                      <TableCell className="font-medium text-slate-100">{booking.primaryPlayerName}</TableCell>
                      <TableCell className="text-slate-300">{booking.orgName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-100">{booking.courseName}</div>
                          {booking.courseRegion && (
                            <div className="text-xs text-slate-400">{booking.courseRegion}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-slate-300">{booking.teeTime}</TableCell>
                      <TableCell className="text-slate-300">{booking.players.length}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getBookingStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          // TODO (Demo Scope): No detail view during investor walkthrough; button kept for layout parity.
                          // Wire up navigation when booking management flows are implemented.
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
