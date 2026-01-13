import {
  Component, signal, afterNextRender, inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import PptxGenJS from 'pptxgenjs';

declare const mermaid: any;
declare const Prism: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  private sanitizer = inject(DomSanitizer);

  // Student names for the report with roles
  studentNames = signal([
    { name: 'Ali Adnan Muhammad', role: 'Project Manager | Developer | Designer | Presenter' },
    { name: 'Saad Safaa Al-Din', role: 'QA Tester | Developer' },
    { name: 'Mutasim Ahmed', role: 'Developer | Presenter' },
    { name: 'Abdullah Muhammad', role: 'Developer' },
    { name: 'Muhammad Abdullah', role: 'Developer' },
    { name: 'Walid Jassim', role: 'Developer' }
  ]);

  currentDate = signal('December 2025');

  // Executive summary signal
  summary = signal(`This report presents a comprehensive Smart Seating Allocation Engine developed using core C++ data structures and algorithms. The system efficiently manages classroom seating through a 2D array structure, implementing automated seat assignment, availability checking, and visual mapping features. The modular design ensures scalability, maintainability, and serves as a practical demonstration of algorithmic problem-solving.`);

  // Alias for HTML template compatibility
  summaryText = this.summary;

  // Print function
  printReport() {
    window.print();
  }

  // ==================== PRESENTATION MODE ====================
  presentationMode = signal(false);
  currentSlide = signal(0);
  flowchartStep = signal(0);
  codeHighlightLine = signal(0);
  isAnimating = signal(false);

  // Seat Allocation Diagram Steps
  diagramStep = signal(0);
  maxDiagramSteps = 5;

  // Slide definitions
  slides = signal([
    { id: 'intro', title: 'مقدمة المشروع', type: 'intro' },
    { id: 'context', title: 'فكرة وهدف المشروع', type: 'context' },
    { id: 'solution', title: 'الحل المقترح', type: 'solution' },
    { id: 'flowchart', title: 'مخطط سير العمل', type: 'flowchart' },
    { id: 'main', title: 'الدالة الرئيسية main()', type: 'code', funcIndex: 0 },
    { id: 'init', title: 'دالة التهيئة initClassroom()', type: 'code', funcIndex: 1 },
    { id: 'available', title: 'فحص التوفر isSeatAvailable()', type: 'code', funcIndex: 2 },
    { id: 'assign', title: 'تخصيص المقعد assignSeat()', type: 'code', funcIndex: 3 },
    { id: 'display', title: 'عرض الخريطة displayMap()', type: 'code', funcIndex: 4 },
    { id: 'demo', title: 'التنفيذ المباشر', type: 'demo' },
    { id: 'future', title: 'التطوير المستقبلي', type: 'future' },
    { id: 'thanks', title: 'شكراً لكم', type: 'thanks' }
  ]);

  totalSlides = () => this.slides().length;

  startPresentation() {
    this.presentationMode.set(true);
    this.currentSlide.set(0);
    this.flowchartStep.set(0);
    this.codeHighlightLine.set(0);
    this.resetDiagramStep();
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  exitPresentation() {
    this.presentationMode.set(false);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.presentationMode()) return;

    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.prevSlide();
        break;
      case 'Escape':
        this.exitPresentation();
        break;
    }
  }

  nextSlide() {
    if (this.isAnimating()) return;
    const current = this.currentSlide();
    const slideType = this.slides()[current]?.type;

    // Special handling for flowchart - step through nodes first
    if (slideType === 'flowchart' && this.flowchartStep() < 8) {
      this.flowchartStep.update(v => v + 1);
      return;
    }

    // Special handling for solution slide - step through diagram
    if (slideType === 'solution' && this.diagramStep() < this.maxDiagramSteps) {
      this.diagramStep.update(v => v + 1);
      this.updateClassroomGrid(this.diagramStep());
      return;
    }

    if (current < this.totalSlides() - 1) {
      this.isAnimating.set(true);
      this.currentSlide.update(v => v + 1);
      // Reset all steps when entering a new slide
      this.flowchartStep.set(0);
      this.codeHighlightLine.set(0);
      this.resetDiagramStep();
      setTimeout(() => this.isAnimating.set(false), 500);
    }
  }

  prevSlide() {
    if (this.isAnimating()) return;
    const current = this.currentSlide();
    const slideType = this.slides()[current]?.type;

    // Special handling for solution slide - step back through diagram
    if (slideType === 'solution' && this.diagramStep() > 0) {
      this.diagramStep.update(v => v - 1);
      this.updateClassroomGrid(this.diagramStep());
      return;
    }

    if (current > 0) {
      this.isAnimating.set(true);
      this.currentSlide.update(v => v - 1);
      // Reset all steps when entering a new slide
      this.flowchartStep.set(0);
      this.resetDiagramStep();
      setTimeout(() => this.isAnimating.set(false), 500);
    }
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.totalSlides()) {
      this.currentSlide.set(index);
      // Reset all steps when jumping to a new slide
      this.flowchartStep.set(0);
      this.codeHighlightLine.set(0);
      this.resetDiagramStep();
    }
  }

  getCurrentSlideData() {
    return this.slides()[this.currentSlide()];
  }

  getProgressPercent() {
    return ((this.currentSlide() + 1) / this.totalSlides()) * 100;
  }

  // Diagram Step Navigation
  nextDiagramStep() {
    if (this.diagramStep() < this.maxDiagramSteps) {
      this.diagramStep.update(v => v + 1);
    }
  }

  prevDiagramStep() {
    if (this.diagramStep() > 0) {
      this.diagramStep.update(v => v - 1);
    }
  }

  resetDiagramStep() {
    this.diagramStep.set(0);
    // Also reset the classroom grid to empty
    this.updateClassroomGrid(0);
  }

  // Classroom grid data for visualization
  classroomGrid = signal([
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY']
  ]);

  // Student input queue
  studentQueue = signal(['S_001', 'S_002', 'S_003']);
  currentStudent = signal('');

  // Update classroom grid based on diagram step
  updateClassroomGrid(step: number) {
    const grid = this.classroomGrid();
    const students = this.studentQueue();

    // Reset grid
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 6; j++) {
        grid[i][j] = 'EMPTY';
      }
    }

    // Apply students based on step
    if (step >= 3) {
      grid[0][0] = students[0]; // First seat taken
    }
    if (step >= 4) {
      grid[0][1] = students[1]; // Second seat taken
    }
    if (step >= 5) {
      grid[0][2] = students[2]; // Third seat taken
      this.currentStudent.set(students[2]);
    } else if (step >= 4) {
      this.currentStudent.set(students[1]);
    } else if (step >= 3) {
      this.currentStudent.set(students[0]);
    } else {
      this.currentStudent.set('');
    }

    this.classroomGrid.set([...grid]);
  }

  // Function Analysis Data - REORDERED: main() first, then helper functions
  functionAnalysis = signal([
    {
      name: 'int main()',
      desc: '',
      complexity: 'O(1) + O(R*C) per call',
      returnType: 'int',
      code: `<span class="text-purple-400">int</span> <span class="text-blue-400">main</span>() {

    <span class="text-blue-400">initClassroom</span>();  <span class="text-white/40">// Initialize empty seats</span>

    <span class="text-white/40">// Assign seats to students</span>
    <span class="text-blue-400">assignSeat</span>(<span class="text-green-400">"S_001"</span>);
    <span class="text-blue-400">assignSeat</span>(<span class="text-green-400">"S_002"</span>);
    <span class="text-blue-400">assignSeat</span>(<span class="text-green-400">"S_003"</span>);

    <span class="text-blue-400">displayMap</span>();     <span class="text-white/40">// Show final layout</span>

    <span class="text-rose-400">return</span> <span class="text-amber-400">0</span>;
}`,
      output: `Allocated S_001
Allocated S_002
Allocated S_003
--- CURRENT CLASS LAYOUT ---`
    },
    {
      name: 'void initClassroom()',
      desc: '',
      complexity: 'O(R * C) where R=rows, C=columns',
      returnType: 'void',
      code: `<span class="text-purple-400">void</span> <span class="text-blue-400">initClassroom</span>() {

    <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> i = <span class="text-amber-400">0</span>; i < ROWS; i++) {
        <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> j = <span class="text-amber-400">0</span>; j < COLS; j++) {
            classroom<span class="text-cyan-400">[</span>i<span class="text-cyan-400">][</span>j<span class="text-cyan-400">]</span> = <span class="text-green-400">"EMPTY"</span>;
        }
    }
}`,
      output: `Classroom initialized with 30 empty seats.`
    },
    {
      name: 'bool isSeatAvailable(int row, int col)',
      desc: '',
      complexity: 'O(1) - Constant time lookup',
      returnType: 'bool',
      code: `<span class="text-purple-400">bool</span> <span class="text-blue-400">isSeatAvailable</span>(<span class="text-purple-400">int</span> row, <span class="text-purple-400">int</span> col) {

    <span class="text-white/40">// Validate bounds</span>
    <span class="text-purple-400">if</span> (row <span class="text-cyan-400">&lt;</span> <span class="text-amber-400">0</span> <span class="text-cyan-400">||</span> row <span class="text-cyan-400">>=</span> ROWS <span class="text-cyan-400">||</span> col <span class="text-cyan-400">&lt;</span> <span class="text-amber-400">0</span> <span class="text-cyan-400">||</span> col <span class="text-cyan-400">>=</span> COLS) {
        <span class="text-rose-400">return</span> <span class="text-purple-400">false</span>;
    }

    <span class="text-white/40">// Check if seat is empty</span>
    <span class="text-rose-400">return</span> classroom<span class="text-cyan-400">[</span>row<span class="text-cyan-400">][</span>col<span class="text-cyan-400">]</span> <span class="text-cyan-400">==</span> <span class="text-green-400">"EMPTY"</span>;
}`,
      output: `Seat [0,0] is available: true
Seat [0,0] is available: false (after assignment)`
    },
    {
      name: 'bool assignSeat(string studentID)',
      desc: '',
      complexity: 'O(R * C) - Linear scan',
      returnType: 'bool',
      code: `<span class="text-purple-400">bool</span> <span class="text-blue-400">assignSeat</span>(<span class="text-purple-400">string</span> studentID) {

    <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> i = <span class="text-amber-400">0</span>; i < ROWS; i++) {
        <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> j = <span class="text-amber-400">0</span>; j < COLS; j++) {
            <span class="text-purple-400">if</span> (<span class="text-blue-400">isSeatAvailable</span>(i, j)) {
                classroom<span class="text-cyan-400">[</span>i<span class="text-cyan-400">][</span>j<span class="text-cyan-400">]</span> = studentID;
                cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"Allocated "</span> <span class="text-cyan-400">&lt;&lt;</span> studentID <span class="text-cyan-400">&lt;&lt;</span> endl;
                <span class="text-rose-400">return</span> <span class="text-purple-400">true</span>;
            }
        }
    }

    cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"Error: Class is full!"</span> <span class="text-cyan-400">&lt;&lt;</span> endl;
    <span class="text-rose-400">return</span> <span class="text-purple-400">false</span>;
}`,
      output: `Allocated S_001
Allocated S_002`
    },
    {
      name: 'void displayMap()',
      desc: '',
      complexity: 'O(R * C) - Full matrix traversal',
      returnType: 'void',
      code: `<span class="text-purple-400">void</span> <span class="text-blue-400">displayMap</span>() {

    cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"--- CURRENT CLASS LAYOUT ---"</span> <span class="text-cyan-400">&lt;&lt;</span> endl;

    <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> i = <span class="text-amber-400">0</span>; i < ROWS; i++) {
        <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> j = <span class="text-amber-400">0</span>; j < COLS; j++) {
            cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"| "</span> <span class="text-cyan-400">&lt;&lt;</span> setw(<span class="text-amber-400">10</span>) <span class="text-cyan-400">&lt;&lt;</span> classroom<span class="text-cyan-400">[</span>i<span class="text-cyan-400">][</span>j<span class="text-cyan-400">]</span> <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">" "</span>;
        }
        cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"|"</span> <span class="text-cyan-400">&lt;&lt;</span> endl;
    }
}`,
      output: `--- CURRENT CLASS LAYOUT ---
| S_001      | S_002      | EMPTY      |
| EMPTY      | EMPTY      | EMPTY      |`
    }
  ]);

  // Sample Output Data
  sampleOutput = signal(`--- SMART SEATING ENGINE v1.0 ---
Initializing classroom with 30 seats...
Allocated S_001 to seat [0,0]
Allocated S_002 to seat [0,1]
Allocated S_003 to seat [0,2]
--- CURRENT CLASS LAYOUT ---
| S_001      | S_002      | S_003      |
| EMPTY      | EMPTY      | EMPTY      |`);

  // Complete Source Code (updated with isSeatAvailable function)
  fullSourceCode = signal(`<span class="text-purple-400">#include</span> <span class="text-green-400">&lt;iostream&gt;</span>
<span class="text-purple-400">#include</span> <span class="text-green-400">&lt;iomanip&gt;</span>
<span class="text-purple-400">#include</span> <span class="text-green-400">&lt;string&gt;</span>
<span class="text-purple-400">using</span> <span class="text-purple-400">namespace</span> std;

<span class="text-white/40">// Global Constants</span>
<span class="text-purple-400">const</span> <span class="text-purple-400">int</span> ROWS = <span class="text-amber-400">5</span>;
<span class="text-purple-400">const</span> <span class="text-purple-400">int</span> COLS = <span class="text-amber-400">6</span>;

<span class="text-white/40">// 2D Array (Matrix) for classroom</span>
<span class="text-purple-400">string</span> classroom<span class="text-cyan-400">[</span>ROWS<span class="text-cyan-400">]</span><span class="text-cyan-400">[</span>COLS<span class="text-cyan-400">]</span>;

<span class="text-white/40">// Function: Initialize Classroom</span>
<span class="text-purple-400">void</span> <span class="text-blue-400">initClassroom</span>() {
    <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> i = <span class="text-amber-400">0</span>; i < ROWS; i++) {
        <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> j = <span class="text-amber-400">0</span>; j < COLS; j++) {
            classroom<span class="text-cyan-400">[</span>i<span class="text-cyan-400">][</span>j<span class="text-cyan-400">]</span> = <span class="text-green-400">"EMPTY"</span>;
        }
    }
}

<span class="text-white/40">// Function: Check Seat Availability</span>
<span class="text-purple-400">bool</span> <span class="text-blue-400">isSeatAvailable</span>(<span class="text-purple-400">int</span> row, <span class="text-purple-400">int</span> col) {
    <span class="text-purple-400">if</span> (row <span class="text-cyan-400">&lt;</span> <span class="text-amber-400">0</span> <span class="text-cyan-400">||</span> row <span class="text-cyan-400">>=</span> ROWS <span class="text-cyan-400">||</span> col <span class="text-cyan-400">&lt;</span> <span class="text-amber-400">0</span> <span class="text-cyan-400">||</span> col <span class="text-cyan-400">>=</span> COLS) {
        <span class="text-rose-400">return</span> <span class="text-purple-400">false</span>;
    }
    <span class="text-rose-400">return</span> classroom<span class="text-cyan-400">[</span>row<span class="text-cyan-400">][</span>col<span class="text-cyan-400">]</span> <span class="text-cyan-400">==</span> <span class="text-green-400">"EMPTY"</span>;
}

<span class="text-white/40">// Function: Display Classroom Map</span>
<span class="text-purple-400">void</span> <span class="text-blue-400">displayMap</span>() {
    cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"--- CURRENT CLASS LAYOUT ---"</span> <span class="text-cyan-400">&lt;&lt;</span> endl;
    <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> i = <span class="text-amber-400">0</span>; i < ROWS; i++) {
        <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> j = <span class="text-amber-400">0</span>; j < COLS; j++) {
            cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"| "</span> <span class="text-cyan-400">&lt;&lt;</span> setw(<span class="text-amber-400">10</span>) <span class="text-cyan-400">&lt;&lt;</span> classroom<span class="text-cyan-400">[</span>i<span class="text-cyan-400">][</span>j<span class="text-cyan-400">]</span> <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">" "</span>;
        }
        cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"|"</span> <span class="text-cyan-400">&lt;&lt;</span> endl;
    }
}

<span class="text-white/40">// Function: Assign Seat</span>
<span class="text-purple-400">bool</span> <span class="text-blue-400">assignSeat</span>(<span class="text-purple-400">string</span> studentID) {
    <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> i = <span class="text-amber-400">0</span>; i < ROWS; i++) {
        <span class="text-purple-400">for</span> (<span class="text-purple-400">int</span> j = <span class="text-amber-400">0</span>; j < COLS; j++) {
            <span class="text-purple-400">if</span> (<span class="text-blue-400">isSeatAvailable</span>(i, j)) {
                classroom<span class="text-cyan-400">[</span>i<span class="text-cyan-400">][</span>j<span class="text-cyan-400">]</span> = studentID;
                cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"Allocated "</span> <span class="text-cyan-400">&lt;&lt;</span> studentID <span class="text-cyan-400">&lt;&lt;</span> endl;
                <span class="text-rose-400">return</span> <span class="text-purple-400">true</span>;
            }
        }
    }
    cout <span class="text-cyan-400">&lt;&lt;</span> <span class="text-green-400">"Error: Class is full!"</span> <span class="text-cyan-400">&lt;&lt;</span> endl;
    <span class="text-rose-400">return</span> <span class="text-purple-400">false</span>;
}

<span class="text-white/40">// Main Execution</span>
<span class="text-purple-400">int</span> <span class="text-blue-400">main</span>() {
    <span class="text-blue-400">initClassroom</span>();

    <span class="text-blue-400">assignSeat</span>(<span class="text-green-400">"S_001"</span>);
    <span class="text-blue-400">assignSeat</span>(<span class="text-green-400">"S_002"</span>);
    <span class="text-blue-400">assignSeat</span>(<span class="text-green-400">"S_003"</span>);

    <span class="text-blue-400">displayMap</span>();
    <span class="text-rose-400">return</span> <span class="text-amber-400">0</span>;
}
`);

  // Full Execution Output
  fullOutput = signal(`Allocated S_001
Allocated S_002
Allocated S_003
--- CURRENT CLASS LAYOUT ---
| S_001      | S_002      | S_003      | EMPTY      | EMPTY      | EMPTY      | 
| EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | 
| EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | 
| EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | 
| EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | EMPTY      | 
----------------------------`);

  // Future Scope Data
  futureScope = signal([
    {
      title: 'Data Persistence',
      icon: 'M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4',
      desc: 'Integration with File I/O (CSV) or SQLite to permanently store student records and seating arrangements between sessions, replacing the current volatile RAM storage.'
    },
    {
      title: 'Algorithmic Optimization',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      desc: 'Implementing a Hash Map (std::unordered_map) for student lookups to reduce the search complexity from O(R*C) to O(1) for large-scale auditoriums.'
    },
    {
      title: 'GUI Integration',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      desc: 'Developing a graphical interface using Qt or wxWidgets to provide an interactive, click-based seating management experience for end users.'
    }
  ]);

  // Resources Data
  resources = signal([
    { name: 'Logic Flowchart', tool: 'draw.io', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { name: 'Report Design', tool: 'Canva', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Development IDE', tool: 'VS Code', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Learning Resources', tool: 'GeeksforGeeks & cplusplus.com', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Icon Library', tool: 'Heroicons', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Core Language', tool: 'C++ (GCC)', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
  ]);

  // Mermaid Flowchart Definition 
  mermaidDefinition = signal(`
    %%{
      init: {
        'theme': 'base',
        'themeVariables': {
          'primaryColor': '#ffffff',
          'primaryTextColor': '#334155',
          'primaryBorderColor': '#cbd5e1',
          'lineColor': '#818cf8',
          'fontFamily': 'Inter',
          'fontSize': '16px'
        },
        'flowchart': { 
            'curve': 'basis',
            'padding': 15,
            'nodeSpacing': 40,
            'rankSpacing': 40,
            'useMaxWidth': true
        }
      }
    }%%
    flowchart TD
      A([Start]):::start --> B[/Input Student ID/]:::proc
      B --> C[Loop i: 0 to ROWS]:::proc
      C --> D[Loop j: 0 to COLS]:::proc
      D --> E{Is Slot Empty?}:::decision
      E -- Yes --> F[Assign Seat]:::proc
      F --> G[/Return True/]:::proc
      E -- No --> D
      D -- End Row --> C
      C -- End Table --> H([Class Full]):::endnode
      H --> I([End]):::endnode
      G --> I

      classDef start fill:#d1fae5,stroke:#059669,stroke-width:2px;
      classDef proc fill:#eff6ff,stroke:#3b82f6,stroke-width:2px;
      classDef decision fill:#ffedd5,stroke:#ea580c,stroke-width:2px,rx:5,ry:5;
      classDef endnode fill:#fee2e2,stroke:#dc2626,stroke-width:2px;
  `);

  mermaidSvg = signal<SafeHtml>('');

  async ngAfterViewInit() {
    setTimeout(() => this.renderDiagrams(), 300);
  }

  async renderDiagrams() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
    if (typeof mermaid !== 'undefined') {
      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
        });
        const { svg } = await mermaid.render('mermaid-svg', this.mermaidDefinition());
        this.mermaidSvg.set(this.sanitizer.bypassSecurityTrustHtml(svg));
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }
  }

  // ==================== POWERPOINT EXPORT ====================
  exportToPowerPoint() {
    const pptx = new PptxGenJS();

    // Slide 1: Introduction
    const slide1 = pptx.addSlide();
    slide1.background = { color: '0F172A' };
    slide1.addText('Smart Seating Allocation Engine', {
      x: 0.5, y: 1.5, w: 9, h: 1,
      fontSize: 44, bold: true, color: 'FFFFFF', fontFace: 'Arial',
      align: 'center', valign: 'middle'
    });
    slide1.addText('C++ Data Structures & Algorithms', {
      x: 0.5, y: 2.5, w: 9, h: 0.5,
      fontSize: 20, color: 'A5B4FC', fontFace: 'Arial',
      align: 'center', valign: 'middle'
    });
    // Add team members
    this.studentNames().forEach((member, i) => {
      const y = 3.5 + Math.floor(i / 2) * 0.8;
      const x = (i % 2) * 5 + 0.5;
      slide1.addText(`${i + 1}. ${member.name}`, {
        x, y, w: 4, h: 0.4,
        fontSize: 14, color: 'E0E7FF', fontFace: 'Arial'
      });
    });

    // Slide 2: Project Context
    const slide2 = pptx.addSlide();
    slide2.background = { color: '0F172A' };
    slide2.addText('حول المشروع', {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Arial',
      align: 'center'
    });

    // Add three cards
    const contexts = [
      { title: 'فكرة المشروع', color: '6366F1', text: 'تطوير محرك برمجي بلغة C++...' },
      { title: 'الهدف الرئيسي', color: '22C55E', text: 'استبدال التوزيع التقليدي...' },
      { title: 'نطاق العمل', color: 'A855F7', text: 'حل شامل للقاعات الدراسية...' }
    ];

    contexts.forEach((ctx, i) => {
      slide2.addShape(pptx.ShapeType.rect, {
        x: 0.5 + i * 3.2, y: 1.5, w: 3, h: 3,
        fill: { color: ctx.color + '40' },
        line: { color: ctx.color, width: 2 }
      });
      slide2.addText(ctx.title, {
        x: 0.5 + i * 3.2 + 0.1, y: 1.6, w: 2.8, h: 0.5,
        fontSize: 18, bold: true, color: ctx.color, fontFace: 'Arial'
      });
      slide2.addText(ctx.text, {
        x: 0.5 + i * 3.2 + 0.1, y: 2.2, w: 2.8, h: 2,
        fontSize: 12, color: 'E0E7FF', fontFace: 'Arial'
      });
    });

    // Slide 3: Solution (Interactive)
    const slide3 = pptx.addSlide();
    slide3.background = { color: '0F172A' };
    slide3.addText('الحل المقترح', {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Arial',
      align: 'center'
    });

    // Add step indicators and process steps
    const steps = [
      { num: 1, title: 'Initialize', desc: 'Create 2D array matrix\nFill all seats with "EMPTY"' },
      { num: 2, title: 'Input', desc: 'Receive student ID\nS_001' },
      { num: 3, title: 'Search', desc: 'Scan matrix for empty seat\nFound position: [0,0]' },
      { num: 4, title: 'Assign', desc: 'Reserve seat for student\nUpdate: classroom[0][0]' },
      { num: 5, title: 'Display', desc: 'Render visual map\nShow updated layout' }
    ];

    steps.forEach((step, i) => {
      const yPos = 1.5 + i * 1.2;
      slide3.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: yPos, w: 0.3, h: 1,
        fill: { color: '06B6D4' }
      });
      slide3.addText(`${step.num}`, {
        x: 0.5, y: yPos + 0.3, w: 0.3, h: 0.4,
        fontSize: 24, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      slide3.addText(step.title, {
        x: 1, y: yPos, w: 3, h: 0.4,
        fontSize: 18, bold: true, color: 'FFFFFF', fontFace: 'Arial'
      });
      slide3.addText(step.desc, {
        x: 1, y: yPos + 0.5, w: 3, h: 0.7,
        fontSize: 12, color: 'E0E7FF', fontFace: 'Arial'
      });
    });

    // Slide 4-8: Code Functions
    this.functionAnalysis().forEach((func, index) => {
      const slide = pptx.addSlide();
      slide.background = { color: '1E1E1E' };

      // Title
      slide.addText(func.name, {
        x: 0.5, y: 0.3, w: 9, h: 0.5,
        fontSize: 32, bold: true, color: 'A78BFA', fontFace: 'Consolas'
      });

      // Description
      slide.addText(func.desc, {
        x: 0.5, y: 0.9, w: 9, h: 1,
        fontSize: 12, color: 'D1D5DB', fontFace: 'Arial'
      });

      // Code block background
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.4, y: 2, w: 9.2, h: 3,
        fill: { color: '0D1117' },
        line: { color: '30363D', width: 2 }
      });

      // Code (strip HTML for PowerPoint)
      const plainCode = func.code
        .replace(/<span class="[^"]*">/g, '')
        .replace(/<\/span>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'");

      slide.addText(plainCode, {
        x: 0.5, y: 2.1, w: 9, h: 2.8,
        fontSize: 10, color: 'FF7B72', fontFace: 'Consolas',
        valign: 'top'
      });

      // Output
      slide.addText('Output:', {
        x: 0.5, y: 5.2, w: 9, h: 0.3,
        fontSize: 14, bold: true, color: 'FBBF24', fontFace: 'Arial'
      });
      slide.addText(func.output, {
        x: 0.5, y: 5.6, w: 9, h: 1,
        fontSize: 11, color: '34D399', fontFace: 'Consolas'
      });
    });

    // Slide 9: Demo/Full Output
    const slide9 = pptx.addSlide();
    slide9.background = { color: '0F172A' };
    slide9.addText('التنفيذ المباشر', {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Arial',
      align: 'center'
    });
    slide9.addText(this.fullOutput(), {
      x: 0.5, y: 1.3, w: 9, h: 5,
      fontSize: 11, color: '34D399', fontFace: 'Consolas'
    });

    // Slide 10: Future Scope
    const slide10 = pptx.addSlide();
    slide10.background = { color: '0F172A' };
    slide10.addText('التطوير المستقبلي', {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Arial',
      align: 'center'
    });

    this.futureScope().forEach((item, i) => {
      const y = 1.5 + i * 1.3;
      slide10.addShape(pptx.ShapeType.rect, {
        x: 0.5, y, w: 0.5, h: 1,
        fill: { color: '6366F1' }
      });
      slide10.addText(item.title, {
        x: 1.2, y: y + 0.1, w: 7.8, h: 0.5,
        fontSize: 18, bold: true, color: 'FFFFFF', fontFace: 'Arial'
      });
      slide10.addText(item.desc, {
        x: 1.2, y: y + 0.7, w: 7.8, h: 0.6,
        fontSize: 12, color: 'E0E7FF', fontFace: 'Arial'
      });
    });

    // Slide 11: Thank You
    const slide11 = pptx.addSlide();
    slide11.background = { color: '0F172A' };
    slide11.addText('شكراً لاستماعكم', {
      x: 0.5, y: 2.5, w: 9, h: 1,
      fontSize: 48, bold: true, color: 'FFFFFF', fontFace: 'Arial',
      align: 'center', valign: 'middle'
    });
    slide11.addText('هل لديكم أي أسئلة؟', {
      x: 0.5, y: 3.5, w: 9, h: 0.6,
      fontSize: 24, color: 'E0E7FF', fontFace: 'Arial',
      align: 'center'
    });

    // Add animations to all slides
    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { color: '0F172A' }
    });

    // Save the presentation
    pptx.writeFile({ fileName: 'Smart_Seating_Engine.pptx' });
  }
}
