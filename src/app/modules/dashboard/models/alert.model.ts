
export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM';
export type Status = 'active' | 'monitoring' | 'resolved';

export interface AlertItem {
  id: number;
  title: string;
  location: string;
  timeAgo: string;
  status: 'Active' | 'Monitoring' | 'Resolved';
  severityColor: string; // e.g., '#ef4444' for Red, '#f97316' for Orange
}
export interface AlertData {
  id: string;
  title: string;
  // severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
  severity: Severity;
  status: Status;
  location: string;
  timestamp: string;
  threshold: string;
  sopName: string;
  sopId: string;
  assignedTo: string;
  triggeredBy: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  status: Status;
  location: string;
  timestamp: string;
  threshold: string;
  sopName: string;
  sopId: string;
  assignedTo: string;
  triggeredBy: string;
}