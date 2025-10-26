import React from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface EmptyStateProps {
  icon: React.ReactNode;
  heading: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, heading, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="pt-12 pb-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center text-slate-400">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
            <p className="text-slate-600 mt-2 max-w-md mx-auto">{description}</p>
          </div>
          {action && (
            <div className="pt-2">
              <Button onClick={action.onClick}>{action.label}</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
