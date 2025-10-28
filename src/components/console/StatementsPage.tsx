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
import { Search, Filter, Download, Plus, FileText, Calendar, Building2, DollarSign } from 'lucide-react';

export default function StatementsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get all statements with course and organization data
  const allStatements = React.useMemo(() => {
    return mockState.data.statements
      .map((statement) => {
        const course = mockState.data.courses.find((c) => c.id === statement.course.id);

        return {
          ...statement,
          courseName: statement.course.name,
          courseRegion: course?.region,
        };
      })
      .sort((a, b) => b.month.localeCompare(a.month)); // Sort by month descending
  }, []);

  // Filter statements by search query
  const filteredStatements = React.useMemo(() => {
    if (!searchQuery.trim()) return allStatements;

    const query = searchQuery.toLowerCase();
    return allStatements.filter(
      (s) =>
        s.id.toLowerCase().includes(query) ||
        s.courseName.toLowerCase().includes(query) ||
        s.month.includes(query) ||
        s.status.toLowerCase().includes(query)
    );
  }, [allStatements, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'sent':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'disputed':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'draft':
        return 'bg-slate-800/50 text-slate-300 border-slate-700';
      default:
        return 'bg-slate-800/50 text-slate-300 border-slate-700';
    }
  };

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const sentCount = allStatements.filter((s) => s.status === 'sent').length;
  const verifiedCount = allStatements.filter((s) => s.status === 'verified').length;
  const paidCount = allStatements.filter((s) => s.status === 'paid').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Statements</h1>
          <p className="text-slate-400 mt-1">Monthly billing statements from golf courses</p>
        </div>

        <Button
          onClick={() => {
            // TODO: Implement create statement flow
            console.log('Create statement clicked');
          }}
          className="bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Statement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Statements</p>
                <p className="text-2xl font-bold text-slate-100">{allStatements.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending Review</p>
                <p className="text-2xl font-bold text-amber-600">{sentCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Verified</p>
                <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Paid</p>
                <p className="text-2xl font-bold text-blue-600">{paidCount}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
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
                placeholder="Search by statement ID, course, month, or status..."
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

      {/* Statements Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">
            All Statements ({filteredStatements.length}
            {searchQuery && ` of ${allStatements.length}`})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStatements.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-100">
                {searchQuery ? 'No statements found' : 'No statements yet'}
              </h3>
              <p className="text-slate-600 mt-2">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Statements will appear here when courses submit monthly billing'}
              </p>
              {!searchQuery && (
                <Button onClick={() => console.log('Create statement clicked')} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Statement
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Statement ID</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Lines</TableHead>
                    <TableHead>Total Players</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStatements.map((statement) => (
                    <TableRow key={statement.id} className="hover:bg-slate-700/50 border-slate-700">
                      <TableCell className="font-mono text-xs text-slate-600">
                        {statement.id}
                      </TableCell>
                      <TableCell className="font-medium">{formatMonth(statement.month)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{statement.courseName}</div>
                          {statement.courseRegion && (
                            <div className="text-xs text-slate-400">{statement.courseRegion}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{statement.lines.length}</TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold text-slate-300">
                          {statement.totals.players}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(statement.status)}>
                          {statement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            // TODO (Demo Scope): View action intentionally omitted for investor walkthrough.
                            // Demo surfaces existing statements only; production should open a detail view.
                          >
                            View
                          </Button>
                          {statement.status === 'sent' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                              // TODO (Demo Scope): Verification workflow deferred; demo only surfaces data.
                              // Production should connect to a verify mutation once flow is in scope.
                            >
                              Verify
                            </Button>
                          )}
                        </div>
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
