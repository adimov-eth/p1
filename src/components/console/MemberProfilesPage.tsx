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
import { Search, Filter, Download, Plus, Users, Mail, Phone, Building2 } from 'lucide-react';
import { getUserStatusColor, getUserRoleColor, getUserRoleLabel } from '@/lib/badges';

export default function MemberProfilesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get all users with their organization names
  const allMembers = React.useMemo(() => {
    return mockState.data.users
      .map((user) => {
        const org = mockState.data.organizations.find((o) => o.id === user.orgId);
        const bookingsCount = mockState.data.bookings.filter(
          (b) => b.players.some((p) => p.userId === user.id)
        ).length;

        return {
          ...user,
          orgName: org?.name || 'Unknown Org',
          orgStatus: org?.status || 'prospect',
          bookingsCount,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter members by search query
  const filteredMembers = React.useMemo(() => {
    if (!searchQuery.trim()) return allMembers;

    const query = searchQuery.toLowerCase();
    return allMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.email?.toLowerCase().includes(query) ||
        m.phone?.toLowerCase().includes(query) ||
        m.orgName.toLowerCase().includes(query) ||
        m.id.toLowerCase().includes(query)
    );
  }, [allMembers, searchQuery]);


  const activeCount = allMembers.filter((m) => m.status === 'active').length;
  const orgAdminCount = allMembers.filter((m) => m.role === 'org_admin').length;
  const memberCount = allMembers.filter((m) => m.role === 'designated').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Member Profiles</h1>
          <p className="text-slate-400 mt-1">Manage all members across organizations</p>
        </div>

        <Button
          onClick={() => {
            // TODO: Implement add member flow
            console.log('Add member clicked');
          }}
          className="bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Members</p>
                <p className="text-2xl font-bold text-slate-100">{allMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Org Admins</p>
                <p className="text-2xl font-bold text-purple-600">{orgAdminCount}</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Designated</p>
                <p className="text-2xl font-bold text-blue-600">{memberCount}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
                placeholder="Search by name, email, phone, organization, or member ID..."
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

      {/* Members Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">
            All Members ({filteredMembers.length}
            {searchQuery && ` of ${allMembers.length}`})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-100">
                {searchQuery ? 'No members found' : 'No members yet'}
              </h3>
              <p className="text-slate-600 mt-2">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Add your first member to get started'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => console.log('Add member clicked')}
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-slate-700/50 border-slate-700">
                      <TableCell className="font-mono text-xs text-slate-600">
                        {member.id}
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getUserRoleColor(member.role)}>
                          {getUserRoleLabel(member.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.orgName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {member.email && (
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Mail className="h-3 w-3" />
                              {member.email}
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Phone className="h-3 w-3" />
                              {member.phone}
                            </div>
                          )}
                          {!member.email && !member.phone && (
                            <span className="text-xs text-slate-400">No contact info</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-300">{member.bookingsCount}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getUserStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          // TODO (Demo Scope): Profile modal out of scope for investor walkthrough.
                          // Leave button visible to suggest the eventual navigation pattern.
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
