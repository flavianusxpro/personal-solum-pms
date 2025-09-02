# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Clinic Management Frontend - A Next.js 14 healthcare application for managing appointments, patients, doctors, and clinic operations. Built with TypeScript and modern React patterns, this application serves healthcare professionals and patients with a focus on reliability, security, and user experience.

## Core Commands

### Development
```bash
# Install dependencies (using bun)
bun install

# Start development server with Turbo
bun run dev

# Build the application
bun run build

# Start production server
bun run start
```

### Code Quality
```bash
# Run linter
bun run lint

# Format code with Prettier
bun run format

# Clean cache and build artifacts
bun run cache:clean
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with RizzUI components
- **State Management**: 
  - Jotai for global state
  - React Query (TanStack Query) for server state
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form with Zod validation
- **Date/Time**: Day.js with timezone support
- **Payments**: Stripe integration
- **File Upload**: AWS S3 via custom hooks

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Protected admin routes
│   ├── (other-pages)/     # Public pages (coming-soon, maintenance)
│   ├── auth/              # Authentication pages
│   ├── api/auth/          # NextAuth API routes
│   └── shared/            # Shared components across routes
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Authentication hooks
│   ├── useDoctor.ts       # Doctor management
│   ├── usePatient.ts      # Patient management
│   └── useAppointment.ts  # Appointment handling
├── service/               # API service layer
├── store/                 # Global state management (Jotai)
├── config/                # Configuration files
├── validators/            # Zod validation schemas
└── types/                 # TypeScript type definitions
```

### Key Architectural Patterns

1. **API Layer Architecture**:
   - Services in `src/service/` handle all API calls
   - Custom hooks in `src/hooks/` wrap React Query mutations/queries
   - Type-safe API responses defined in `src/types/ApiResponse.ts`

2. **Authentication Flow**:
   - NextAuth.js configuration in `src/app/api/auth/`
   - Role-based access control (admin, doctor, patient)
   - Protected routes using middleware

3. **State Management Strategy**:
   - Server state: React Query with proper cache invalidation
   - Global UI state: Jotai atoms
   - Form state: React Hook Form with controlled inputs
   - Local state: useState for component-specific needs

4. **Data Validation**:
   - All forms use Zod schemas from `src/validators/`
   - API payloads validated before submission
   - Type-safe form handling with React Hook Form

5. **Component Organization**:
   - Feature-based organization in `src/app/shared/`
   - Reusable UI components with RizzUI integration
   - Modal and drawer patterns for complex interactions

## Critical Business Logic

### Appointment System
- Timezone-aware scheduling using Day.js
- Multiple appointment types and statuses
- Doctor availability checking
- Clinic operating hours validation
- Rescheduling and cancellation workflows

### Multi-Clinic Support
- Each clinic has unique configurations
- Separate doctor schedules per clinic
- Clinic-specific pricing and services
- Branch management capabilities

### Payment Processing
- Stripe integration for payments
- Invoice generation and management
- Support for different pricing tiers
- Refund and cancellation handling

### User Roles & Permissions
- **Admin**: Full system access, user management
- **Doctor**: Patient management, schedule control
- **Patient**: Appointment booking, profile management

## Environment Configuration

Required environment variables:
```
# API Configuration
NEXT_PUBLIC_API_URL=           # Main API endpoint
NEXT_PUBLIC_BOOKING_API_URL=   # Booking service endpoint

# Authentication
NEXTAUTH_SECRET=               # NextAuth secret key
NEXTAUTH_URL=                  # Application URL

# Third-party Services
NEXT_PUBLIC_STRIPE_KEY=        # Stripe publishable key
NEXT_PUBLIC_GOOGLE_MAP_API_KEY= # Google Maps API

# Clinic Configuration
NEXT_PUBLIC_CLINIC_NAME=       # Default clinic name
NEXT_PUBLIC_X_IDENTITY_ID=     # Identity service ID
NEXT_PUBLIC_X_SECRET_KEY=      # Secret key for services
```

## Development Guidelines

### Code Standards
- Use TypeScript strict mode - avoid `any` type
- Implement proper error boundaries and error handling
- Follow existing patterns for consistency
- Use React Query for all API calls
- Validate all forms with Zod schemas

### Performance Considerations
- Implement proper memoization with useCallback/useMemo
- Use dynamic imports for code splitting
- Optimize bundle size with tree shaking
- Cache API responses appropriately
- Handle loading states gracefully

### Security Requirements
- Never expose API keys in client code
- Sanitize all user inputs
- Implement proper CSRF protection
- Handle PII data carefully
- Follow HIPAA compliance guidelines for healthcare data

### Testing Strategy
- Verify all forms work correctly
- Test timezone conversions thoroughly
- Validate role-based access control
- Check payment flow integration
- Ensure proper error handling

## Common Workflows

### Adding a New Feature
1. Create feature components in `src/app/shared/[feature]/`
2. Add API service functions in `src/service/`
3. Create custom hooks in `src/hooks/`
4. Define Zod schemas in `src/validators/`
5. Add TypeScript types in `src/types/`

### Modifying API Integration
1. Update service functions in `src/service/`
2. Modify TypeScript interfaces in `src/types/`
3. Update React Query hooks in `src/hooks/`
4. Adjust Zod validation schemas if needed

### Working with Forms
1. Define Zod schema for validation
2. Use React Hook Form with zodResolver
3. Implement proper error display
4. Handle loading/success/error states
5. Clear form on successful submission

## Important Notes

- **Healthcare Compliance**: This is a healthcare application - data accuracy and security are paramount
- **Timezone Handling**: All appointments use Day.js for proper timezone conversion
- **Role-Based Access**: Always check user permissions before rendering sensitive components
- **API Integration**: Use the service layer pattern - don't call APIs directly from components
- **Error Handling**: Implement comprehensive error handling with user-friendly messages
- **State Management**: Use React Query for server state, Jotai only for global UI state