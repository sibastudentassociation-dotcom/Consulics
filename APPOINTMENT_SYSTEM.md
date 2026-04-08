# Appointment & Inquiry Forms Implementation Guide

## Overview
Complete appointment booking and customer inquiry system with admin management dashboard, automated emails, and real-time availability tracking.

---

## 1. NEW PAGES & ROUTES

### Appointment Booking System
- **Route**: `/appointment`
- **File**: `app/(pages)/appointment/page.tsx`
- **Features**:
  - Date picker (min: today)
  - Time slot selector (9 AM - 4 PM)
  - Service type dropdown (Tax, Trucking, Consultation)
  - Optional notes field
  - Real-time availability checking
  - Email confirmation & admin notification
  - Success page: `/appointment/success`

### Appointment Success Page
- **Route**: `/appointment/success`
- **File**: `app/(pages)/appointment/success/page.tsx`
- **Purpose**: Confirmation screen after successful booking

---

## 2. BACKEND SERVICES

### Appointment Service
**File**: `lib/services/appointments.ts`

#### Key Methods:
```typescript
AppointmentService.createAppointment(data)     // Book appointment
AppointmentService.getAppointments()           // Fetch all appointments
AppointmentService.getAppointmentsByDate(date) // Check availability
AppointmentService.updateAppointment(id, update) // Confirm, reschedule, cancel
```

#### Appointment Data Model:
```typescript
interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;        // 'tax' | 'trucking' | 'consultation'
  appointmentDate: string;    // YYYY-MM-DD format
  appointmentTime: string;    // HH:MM format
  notes?: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: Date;
}
```

---

## 3. API ENDPOINTS

### Public Booking Endpoints
**POST** `/api/appointments`
- Create new appointment booking
- Body: Appointment data
- Response: { message, appointment: { id, status, createdAt } }

**GET** `/api/appointments?date=YYYY-MM-DD`
- Fetch appointments for specific date
- Query param `date` (optional) filters by date
- Response: { appointments: Appointment[] }

---

### Admin Management Endpoints
**GET** `/api/admin/appointments`
- Fetch all appointments (admin only)
- Response: { appointments: Appointment[] }

**PUT** `/api/admin/appointments`
- Update appointment status, date, or time
- Body: { id, status?, appointmentDate?, appointmentTime? }
- Response: { message: 'Appointment updated successfully' }

---

## 4. VALIDATION SCHEMA

**File**: `lib/validation/schemas.ts`

```typescript
export const appointmentSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  appointmentDate: z.string().min(1),
  appointmentTime: z.string().min(1),
  serviceType: z.string().min(1),
  notes: z.string().max(500).optional(),
});
```

---

## 5. ADMIN DASHBOARD ENHANCEMENTS

**File**: `app/components/admin/AdminDashboard.tsx`

### New Dashboard Features:

#### Stats Card
- **Pending Appointments Counter** — Shows count of appointments awaiting confirmation
- Updates dynamically on refresh

#### Recent Appointments Section
- Lists up to 4 most recent appointment requests
- Shows: Name, Service Type, Date/Time, Status
- Admin Actions:
  - **Confirm** — Change status to 'confirmed'
  - **Reschedule** — Change status to 'rescheduled'
- Export appointments as CSV

#### Recent Inquiries Section
- Lists up to 4 most recent contact inquiries
- Shows: Name, Service, Message, Status
- Admin Actions:
  - **Reply** — Opens email client with pre-filled recipient
  - **Mark Responded** — Change status to 'responded'
- Export leads as CSV

#### CSV Export Functionality
- `exportAppointments()` — Download appointments list as CSV
- `exportLeads()` — Download inquiries list as CSV
- Includes all fields for spreadsheet analysis

---

## 6. USER INTERFACES

### Floating Appointment Button
**File**: `app/components/FloatingButton.tsx`

- **Location**: Bottom-right corner of screen
- **Action**: Links to `/appointment` page
- **Visibility**: Fixed, sticky overlay
- **Style**: Primary color, hover effects

### Home Page CTA
**File**: `app/components/HomeContent.tsx`

- Added "Book Appointment" button to hero section
- Alongside "Start a Service" and "View Tax Services" CTAs

### Contact Page Integration
**File**: `app/(pages)/contact/page.tsx`

- "Schedule a Consultation" card now links to `/appointment`
- Removed Calendly placeholder UI
- Direct booking flow

### Chatbot Appointment CTA
**File**: `app/components/Chatbot.tsx`

#### Enhancements:
- Detects keywords (appointment, schedule, book, consult, consultation)
- Shows "Book Appointment" button after relevant responses
- Added "Book Appointment" to quick questions
- Links to `/appointment` booking page

---

## 7. FIREBASE COLLECTIONS

### appointments Collection
```
appointments/
├── {appointmentId}
│   ├── firstName: string
│   ├── lastName: string
│   ├── email: string
│   ├── phone: string
│   ├── serviceType: string
│   ├── appointmentDate: string
│   ├── appointmentTime: string
│   ├── notes: string (optional)
│   ├── status: string
│   └── createdAt: timestamp
```

---

## 8. EMAIL NOTIFICATIONS

### Customer Confirmation Email
- **Trigger**: When appointment is booked
- **To**: Customer email address
- **Subject**: "Appointment Request Received — {serviceType}"
- **Content**: Booking details, confirmation pending message

### Admin Notification Email
- **Trigger**: When appointment is booked
- **To**: admin@consulics.com
- **Subject**: "New Appointment Request from {firstName} {lastName}"
- **Content**: Full appointment details, action items

---

## 9. TIME SLOTS

Available slots (hardcoded, can be customized):
```
09:00 AM
10:00 AM
11:00 AM
01:00 PM
02:00 PM
03:00 PM
04:00 PM
```

**Availability Logic**:
1. Max 1 appointment per time slot per day
2. Once a slot is booked, it's unavailable for that date
3. Booking page shows only available slots
4. Dates before today are disabled

---

## 10. MIDDLEWARE & AUTH

**File**: `middleware.ts`

Updated to allow admin dashboard access via session cookie:
- Admin pages check for `session` cookie
- API routes accept either `Authorization: Bearer` header OR session cookie
- Appointment API (`/api/appointments`) is public (no auth required)
- Admin API (`/api/admin/appointments`) requires authentication

---

## 11. QUICK START

### For Users:
1. Click "Book Appointment" floating button OR
2. Visit `/appointment` page directly
3. Fill out form with date, time, service type
4. Submit booking
5. Receive confirmation email
6. See success page at `/appointment/success`

### For Admins:
1. Log in to `/admin` dashboard
2. View pending appointments count in stats
3. See recent appointments in "Recent Appointments" section
4. Confirm, reschedule, or export appointments
5. Respond to inquiries from "Recent Inquiries" section

---

## 12. FUTURE ENHANCEMENTS

- [ ] Google Calendar integration
- [ ] SMS reminders (Twilio)
- [ ] Appointment cancellation by customer
- [ ] Recurring time slots
- [ ] Multiple admin user assignment
- [ ] Email reply from admin dashboard
- [ ] Appointment history per customer

---

## 13. ENVIRONMENT VARIABLES REQUIRED

```
EMAIL_USER=  # Gmail address for sending emails
EMAIL_PASS=  # Gmail app password
FIREBASE_ADMIN_SDK_KEY=  # Firebase admin credentials
```

---

## Testing Checklist

- [ ] Appointment form validation works
- [ ] Date picker blocks past dates
- [ ] Time slot availability updates dynamically
- [ ] Forms submit without errors
- [ ] Success page displays after booking
- [ ] Admin dashboard shows pending appointments count
- [ ] Admin can confirm/reschedule appointments
- [ ] Export CSV generates correctly
- [ ] Chatbot shows appointment CTA on relevant keywords
- [ ] Floating button navigation works on all pages
- [ ] Contact page "Book" button redirects to appointment form
