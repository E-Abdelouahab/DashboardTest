# Training Management Platform
 
## Overview
This project is a comprehensive training and trainers management platform built with React and Next.js. The application provides an intuitive interface for managing companies, trainers, and training courses with advanced analytics and reporting features.

## Features
- **Company Management**: Track and manage client companies
- **Trainer Directory**: Maintain trainer profiles, skills, and availability
- **Training Catalog**: Organize and display training course offerings
- **Analytics Dashboard**: Visual reporting of key metrics with interactive charts
- **Responsive Design**: Fully functional across desktop and mobile devices

# Technology Stack
- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios
- **Mock Data**: Faker API
- **JSONPlaceholder**: MY JSON API
- **Random User API**: randomuser API
- **State Management**: React Hooks
- **Version Control**: GitHub

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── entreprises/     # Companies section
│   ├── formateurs/      # Trainers section
│   ├── formations/      # Training courses section
│   ├── globals.css      # Global styles
│   ├── layout.jsx       # Root layout
│   └── page.js          # Home page
├── components/          # Reusable UI components
│   ├── Dashboard/       # Analytics and reporting components
│   │   ├── AnalyticsDonutChart.jsx
│   │   ├── NegotiationDonutChart.jsx
│   │   ├── PeriodSelector.jsx
│   │   └── StatCard.jsx
│   ├── Sidebar.jsx      # Navigation sidebar
│   └── Topbar.jsx       # Application header
```

## Getting Started

### Prerequisites
- Node.js (version 16.x or higher recommended)
- npm (version 8.x or higher) or yarn (version 1.22.x or higher)
- Git for version control

### Installation
1. Clone the repository
   ```
   git clone https://github.com/E-Abdelouahab/DashboardTest.git
   cd DashboardTest
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Run the development server
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Approach

The application fetches data from various open-source APIs:
- JSONPlaceholder for structural data
- Random User API for trainer profiles
- Faker API for generating realistic sample data

This approach allows for rapid development and testing without requiring a dedicated backend during initial development phases.

## Future Enhancements
- User authentication and role-based access
- Calendar integration for scheduling
- Payment processing
- Advanced reporting and analytics
- Mobile application

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
