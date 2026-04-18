import { TrafficLight } from '../types';

export function StatusPill({ status }: { status: TrafficLight }) {
  return <span className={`pill ${status}`}>{status.toUpperCase()}</span>;
}
