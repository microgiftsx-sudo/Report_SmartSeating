import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent {
  private router = inject(Router);

  activeTab = signal<string>('overview');
  scrollProgress = signal<number>(0);

  privacyData = signal({
    overview: {
      title: 'Your Privacy, Our Priority',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      description: 'At Smart Seating Engine, we believe in complete transparency when it comes to your data. This privacy policy outlines how we collect, use, and protect your information.',
      keyPoints: [
        { label: 'Data Collection', value: 'Minimal', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { label: 'Data Storage', value: 'Local Only', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
        { label: 'Third Party Sharing', value: 'None', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
      ]
    },
    collection: {
      title: 'Data We Collect',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      sections: [
        {
          title: 'Classroom Configuration Data',
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
          description: 'We store seating arrangements, room dimensions, and seat configurations to provide the allocation functionality.',
          dataTypes: ['Room dimensions (rows × columns)', 'Seat status (occupied/empty)', 'Student ID assignments', 'Allocation timestamps']
        },
        {
          title: 'Application Analytics',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
          description: 'Anonymous usage statistics help us improve performance and user experience.',
          dataTypes: ['Feature usage frequency', 'Performance metrics', 'Error logs', 'Session duration']
        }
      ]
    },
    usage: {
      title: 'How We Use Your Data',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      purposes: [
        {
          title: 'Core Functionality',
          icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
          description: 'Process seating allocations and maintain classroom state during your session.',
          color: '#6366f1'
        },
        {
          title: 'Performance Optimization',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
          description: 'Analyze usage patterns to improve algorithm efficiency and reduce processing time.',
          color: '#8b5cf6'
        },
        {
          title: 'Error Prevention',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
          description: 'Identify and fix bugs through anonymous error reporting and crash logs.',
          color: '#ec4899'
        },
        {
          title: 'User Experience Enhancement',
          icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          description: 'Understand how users interact with features to design more intuitive interfaces.',
          color: '#06b6d4'
        }
      ]
    },
    security: {
      title: 'Security Measures',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      measures: [
        {
          level: 'Local Storage',
          title: 'Data Never Leaves Your Device',
          icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
          description: 'All classroom data is stored locally in your browser. No server transmission occurs unless you explicitly choose to export/share.',
          status: 'implemented'
        },
        {
          level: 'Encryption',
          title: 'In-Transit Encryption',
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          description: 'Any data transmission uses HTTPS/TLS 1.3 encryption protocols for secure transfer.',
          status: 'implemented'
        },
        {
          level: 'Access Control',
          title: 'No Account Required',
          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
          description: 'The application functions without user accounts, eliminating password-related risks.',
          status: 'implemented'
        },
        {
          level: 'Code Review',
          title: 'Open Source Transparency',
          icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
          description: 'Our source code is available for public review, ensuring community-driven security auditing.',
          status: 'planned'
        }
      ]
    },
    rights: {
      title: 'Your Rights',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      rights: [
        {
          title: 'Right to Access',
          icon: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z',
          description: 'View all data stored locally in your browser through developer tools or export feature.',
          action: 'View Data'
        },
        {
          title: 'Right to Delete',
          icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
          description: 'Clear all local data with a single click. Browser cache clearing also removes all data.',
          action: 'Clear Data'
        },
        {
          title: 'Right to Export',
          icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
          description: 'Download your seating configurations and settings in JSON format for backup or transfer.',
          action: 'Export Data'
        },
        {
          title: 'Right to Opt-Out',
          icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
          description: 'Stop using the application at any time. Your data will remain on your device until cleared.',
          action: 'Stop Using'
        }
      ]
    }
  });

  switchTab(tab: string) {
    this.activeTab.set(tab);
  }

  isActive(tab: string): boolean {
    return this.activeTab() === tab;
  }

  navigateToTerms() {
    this.router.navigate(['/terms']);
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    this.scrollProgress.set(progress);
  }
}
