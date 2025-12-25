# Smart Seating Docu Viewer

An interactive documentation and presentation platform for a Smart Seating Allocation Engine built with C++ data structures and algorithms. This Angular application provides a modern, visually engaging way to explore algorithmic concepts through interactive slides, code visualization, and real-time demonstrations.

![Project Status](https://img.shields.io/badge/status-active-success)
![Angular](https://img.shields.io/badge/Angular-21.0.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Project Overview

This application serves as comprehensive documentation for a classroom seating allocation system implemented in C++. It demonstrates the practical application of fundamental data structures (2D arrays) and algorithms (linear search) through an interactive, web-based presentation interface.

### Core Features

- **Interactive Presentation Mode**: Navigate through 11 professionally designed slides with keyboard controls
- **Real-time Code Visualization**: Syntax-highlighted C++ code with detailed function analysis
- **Algorithm Visualization**: Step-by-step seating allocation demonstration
- **Flowchart Rendering**: Dynamic Mermaid.js diagrams showing algorithm logic
- **Export Capabilities**: Generate professional PowerPoint presentations (.pptx)
- **Bilingual Interface**: Arabic and English content support
- **Responsive Design**: Modern UI built with Tailwind CSS

## Technical Architecture

### Frontend Stack

- **Framework**: Angular 21.0.0
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3.4 with PostCSS
- **Build Tool**: Vite 6.2
- **Diagram Generation**: Mermaid.js
- **Code Highlighting**: Prism.js
- **Presentation Export**: PptxGenJS

### Key Components

#### AppComponent
Main application component containing:
- Presentation state management (slides, navigation, animations)
- Seating grid visualization with reactive signals
- Flowchart and code rendering logic
- PowerPoint export functionality

## C++ Engine Documentation

### Data Structure
The underlying engine uses a **2D array matrix** to represent classroom seating:
```cpp
const int ROWS = 5;
const int COLS = 6;
string classroom[ROWS][COLS];
```

### Core Functions

1. **`initClassroom()`** - O(R × C)
   - Initializes all seats to "EMPTY" state
   - Uses nested loops for matrix traversal

2. **`isSeatAvailable(int row, int col)`** - O(1)
   - Boundary validation and availability check
   - Constant time lookup operation

3. **`assignSeat(string studentID)`** - O(R × C)
   - Linear search for first available seat
   - Updates matrix with student ID

4. **`displayMap()`** - O(R × C)
   - Renders visual representation of seating
   - Formatted table output

5. **`main()`** - Entry Point
   - Orchestrates the seating allocation workflow
   - Demonstrates sequential seat assignment

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 21.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd smart-seating-docu-viewer

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
npm run dev

# Navigate to http://localhost:4200/
```

### Build for Production

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

## Usage Guide

### Presentation Mode

1. Click "Start Presentation" button to enter full-screen mode
2. Use **Arrow Keys** or **Spacebar** to navigate slides
3. **ESC** to exit presentation mode
4. Some slides feature step-through animations (press multiple times)

### Exporting to PowerPoint

Click the "Export PowerPoint" button to download a professionally formatted `.pptx` file containing all presentation slides with formatted code and diagrams.

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide/step |
| `←` | Previous slide/step |
| `ESC` | Exit presentation |

## Project Team

This project was developed by a collaborative team:

- **Ali Adnan Muhammad** - Project Manager | Developer | Designer | Presenter
- **Saad Safaa Al-Din** - QA Tester | Developer
- **Mutasim Ahmed** - Developer | Presenter
- **Abdullah Muhammad** - Developer
- **Muhammad Abdullah** - Developer
- **Walid Jassim** - Developer

## Future Enhancements

Planned improvements to both the documentation viewer and C++ engine:

1. **Data Persistence**
   - File I/O integration (CSV/SQLite)
   - Permanent record storage between sessions

2. **Algorithm Optimization**
   - Hash Map implementation for O(1) lookups
   - Support for large-scale auditoriums

3. **GUI Integration**
   - Qt/wxWidgets interface development
   - Interactive click-based seating management

4. **Enhanced Documentation**
   - Video tutorials
   - Interactive coding challenges
   - Performance benchmarking tools

## Resources & Learning Materials

- **Logic Design**: draw.io
- **Visual Design**: Canva
- **Development Environment**: VS Code
- **Documentation**: GeeksforGeeks, cplusplus.com
- **Icons**: Heroicons
- **Core Language**: C++ (GCC)

## Algorithm Complexity Analysis

| Function | Time Complexity | Space Complexity |
|----------|----------------|------------------|
| `initClassroom()` | O(R × C) | O(1) |
| `isSeatAvailable()` | O(1) | O(1) |
| `assignSeat()` | O(R × C) | O(1) |
| `displayMap()` | O(R × C) | O(1) |
| `main()` | O(n × R × C) | O(R × C) |

Where:
- R = Number of rows
- C = Number of columns
- n = Number of students

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Angular team for the excellent framework
- Mermaid.js for diagram rendering capabilities
- Tailwind CSS for the utility-first styling approach
- The open-source community for invaluable learning resources

---

**Project Completed**: December 2025
**Version**: 1.0.0
