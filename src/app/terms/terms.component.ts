import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit, OnDestroy {
  expandedSection = signal<string | null>(null);
  activeSection = signal<string>('');

  sections = signal([
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      content: `By accessing and using the Smart Seating Allocation Engine, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.

These terms constitute a legally binding agreement between you and Smart Seating Engine. We reserve the right to modify these terms at any time, and your continued use of the service following any changes constitutes acceptance of those changes.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'license',
      title: '2. License and Usage',
      icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
      content: `Smart Seating Engine grants you a personal, non-exclusive, non-transferable license to use this application for educational and academic purposes.

You may not:
- Reverse engineer or attempt to extract the source code
- Modify, adapt, or create derivative works
- Use the service for commercial purposes without explicit permission
- Remove any proprietary notices from the materials

This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any of its terms.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'data',
      title: '3. Data Collection and Usage',
      icon: 'M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4',
      content: `We collect and process the following types of data:

Classroom Data:
- Seating arrangements and configurations
- Student ID assignments
- Room layout preferences

Usage Data:
- Application performance metrics
- Feature utilization statistics
- Error logs and crash reports

All data is stored locally on your device and is not transmitted to external servers unless explicitly required for functionality. We do not sell or rent your personal information to third parties.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'user-responsibilities',
      title: '4. User Responsibilities',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      content: `As a user of the Smart Seating Engine, you agree to:

- Provide accurate and up-to-date information
- Use the service in compliance with all applicable laws and regulations
- Respect the privacy and rights of other users
- Report any bugs or security vulnerabilities responsibly
- Not attempt to compromise the security or integrity of the system

You are solely responsible for any activity that occurs under your account.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'intellectual',
      title: '5. Intellectual Property',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      content: `All content, features, and functionality of the Smart Seating Engine, including but not limited to text, graphics, logos, and software, are the exclusive property of Smart Seating Engine and are protected by international copyright, trademark, and other intellectual property laws.

The Smart Seating Engine name, logo, and related product names are trademarks of Smart Seating Engine. You may not use these trademarks without our prior written consent.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'limitation',
      title: '6. Limitation of Liability',
      icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
      content: `To the fullest extent permitted by law, Smart Seating Engine shall not be liable for:

- Indirect, incidental, special, consequential, or punitive damages
- Loss of data, profits, revenue, or business opportunities
- Any damages resulting from unauthorized access to or use of our servers
- Any errors, mistakes, or inaccuracies in content

Our total liability shall not exceed the amount you paid, if any, for access to the service during the twelve (12) months preceding the claim.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'termination',
      title: '7. Termination',
      icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      content: `We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without prior notice, for conduct that we believe:

- Violates these Terms of Service
- Is harmful to other users, us, or third parties
- Impairs the ability of others to effectively use the service

Upon termination, your right to use the service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'changes',
      title: '8. Changes to Terms',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      content: `We reserve the right to modify these terms at any time. When we make changes, we will:

- Notify users via email or in-app notification
- Update the "Last Updated" date at the top of this document
- Provide a summary of significant changes

Your continued use of the service after such modifications constitutes your acceptance of the new terms. If you do not agree to the modified terms, you must discontinue your use of the service.`,
      lastUpdated: 'January 2025'
    },
    {
      id: 'contact',
      title: '9. Contact Information',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      content: `If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:

Email: legal@smartseating.engine
Project Repository: github.com/smartseating
Department: Computer Science Department

We typically respond to all inquiries within 2-3 business days. For urgent matters, please include "URGENT" in your subject line.`,
      lastUpdated: 'January 2025'
    }
  ]);

  toggleSection(sectionId: string) {
    if (this.expandedSection() === sectionId) {
      this.expandedSection.set(null);
    } else {
      this.expandedSection.set(sectionId);
      this.activeSection.set(sectionId);
    }
  }

  isExpanded(sectionId: string): boolean {
    return this.expandedSection() === sectionId;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(sectionId);
    }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.updateScrollProgress);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.updateScrollProgress);
  }

  updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }
}
