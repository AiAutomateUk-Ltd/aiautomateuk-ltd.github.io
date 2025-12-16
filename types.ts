
export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  DIGITAL_TWIN = 'DIGITAL_TWIN',
  PREDICTIVE_MAINTENANCE = 'PREDICTIVE_MAINTENANCE',
  IOT_MANAGEMENT = 'IOT_MANAGEMENT',
  CONFIGURATOR = 'CONFIGURATOR',
  RESOURCES = 'RESOURCES'
}

export interface DeviceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  battery: number;
  lastSeen: string;
}

export interface MaintenanceReport {
  timestamp: string;
  prediction: string;
  confidence: number;
  recommendations: string[];
}

export interface AutomationSolution {
  title: string;
  description: string;
  components: string[];
  estimatedROI: string;
}
