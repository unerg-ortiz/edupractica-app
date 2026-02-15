# Content Transfer Feature - Professor Deactivation Flow

## Overview
This feature allows professors to transfer their educational materials to colleagues when deactivating their accounts, ensuring content continuity and preventing loss of valuable educational resources.

## User Story
**As a Professor**, I want to transfer my topics/materials to another colleague when deactivating my account, and the recipient must accept the transfer so that the material is not lost.

## Acceptance Criteria
1. **Two-step process**:
   - Step 1: Select materials to transfer
   - Step 2: Search and select recipient (by email/name)
   
2. **Recipient notification**: The recipient receives a responsive notification and can accept/reject the transfer

3. **Archive fallback**: If deactivating without transferring, materials are temporarily archived for admin access

## File Structure

```
app/[lang]/professor/content-transfer/
├── initiate/
│   └── page.tsx              # Two-step transfer initiation flow
├── request/
│   └── [requestId]/
│       └── page.tsx          # Request details and acceptance screen
└── success/
    └── page.tsx              # Success confirmation screen

components/professor/
└── ArchiveNotificationModal.tsx  # Modal for archive warning

messages/
└── es.json                   # Spanish translations
```

## Screens

### 1. Transfer Initiation (`/professor/content-transfer/initiate`)
**Purpose**: Allows professors to select materials and choose a recipient

**Features**:
- **Step 1**: Material selection with checkboxes
  - Displays materials by category (Department, Evaluations)
  - Shows file count and descriptions
  - Multi-select functionality
  - Preview of Step 2
  
- **Step 2**: Recipient search and selection
  - Search by name or email
  - Displays recipient profiles with avatars
  - Single selection mode
  - "Select" button for each recipient

**Navigation**:
- Back button returns to previous step or exits
- "Save Draft" button to save progress
- "Next Step" button (disabled until selection made)

### 2. Transfer Request Details (`/professor/content-transfer/request/[requestId]`)
**Purpose**: Displays transfer request details to the recipient

**Features**:
- Sender profile card with avatar and online status
- "Sent Request" badge
- Transfer package details:
  - Package title and description
  - File size and count
  - List of included topics
- Accept/Reject action buttons

**Design Elements**:
- Gradient backgrounds for premium feel
- Online indicator (green dot) on sender avatar
- Expandable topics list with checkmarks
- Prominent "Accept Transfer" button
- Subtle "Reject" button

### 3. Success Confirmation (`/professor/content-transfer/success`)
**Purpose**: Confirms successful transfer request submission

**Features**:
- Animated success icon with pulsing effect
- Success message
- "What's next?" information card
- Navigation options:
  - Go to Dashboard
  - View Transfer History

### 4. Archive Notification Modal (`ArchiveNotificationModal`)
**Purpose**: Warns professors about archiving when deactivating without transfer

**Features**:
- Warning icon and message
- Material count display
- Archive information card explaining the process
- Action buttons:
  - "Transfer Materials Now" (primary)
  - "Continue with Archive" (secondary)
- Warning note about educational continuity

**When to show**:
- Triggered when professor attempts to deactivate account
- Only shows if they have materials and haven't initiated transfer

## Translations (Spanish)

All UI text is in Spanish as per requirements. Key translation keys:

```
ContentTransfer.requestDetails.*  - Request details screen
ContentTransfer.initiate.*        - Transfer initiation flow
ContentTransfer.success.*         - Success confirmation
ContentTransfer.archive.*         - Archive warning modal
```

## Design System

### Colors
- **Primary**: Blue (#3B82F6) - Action buttons, active states
- **Success**: Emerald (#10B981) - Success states, online indicators
- **Warning**: Amber (#F59E0B) - Archive warnings
- **Background**: Dark blue (#0B1120) - Main background
- **Cards**: Darker blue (#0f1629, #151b2d) - Card backgrounds

### Typography
- **Headings**: Bold, white
- **Body**: Regular, slate-300/400
- **Labels**: Uppercase, tracking-wider, small, blue-400

### Components
- **Buttons**: Rounded-2xl, shadow effects, active:scale-[0.98]
- **Cards**: Rounded-3xl, gradient borders, shadow-xl
- **Inputs**: Rounded-2xl, focus ring blue-500/50
- **Avatars**: Rounded-full, gradient backgrounds

### Animations
- Fade-in and slide-in transitions
- Pulsing effects for notifications
- Scale animations on button press
- Smooth hover transitions

## Integration Points

### Backend API Endpoints (to be implemented)
```typescript
// Initiate transfer
POST /api/professor/content-transfer/initiate
Body: {
  materialIds: string[],
  recipientId: string
}

// Get transfer request details
GET /api/professor/content-transfer/request/:requestId

// Accept transfer
POST /api/professor/content-transfer/request/:requestId/accept

// Reject transfer
POST /api/professor/content-transfer/request/:requestId/reject

// Archive materials
POST /api/professor/deactivate/archive
```

### State Management
Consider using Zustand or React Context for:
- Selected materials state
- Transfer request status
- Notification state

### Notifications
Implement real-time notifications using:
- WebSockets or Server-Sent Events
- Push notifications for mobile
- Email notifications as backup

## Future Enhancements

1. **Transfer History**: View past transfers (sent/received)
2. **Bulk Operations**: Transfer multiple packages at once
3. **Partial Acceptance**: Allow recipients to accept only some materials
4. **Comments**: Add messages to transfer requests
5. **Expiration**: Auto-reject after X days
6. **Admin Dashboard**: View all archived materials
7. **Material Preview**: Preview materials before accepting

## Testing Checklist

- [ ] Step navigation works correctly
- [ ] Material selection/deselection works
- [ ] Recipient search filters correctly
- [ ] Accept/Reject buttons trigger correct actions
- [ ] Archive modal appears when appropriate
- [ ] Success screen displays after submission
- [ ] All translations display correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Loading states handled properly
- [ ] Error states handled gracefully

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where needed
- Color contrast meets WCAG AA standards

## Notes

- Code is in English as per project requirements
- UI text is in Spanish
- No modifications made to `edupractica-api` directory
- Follows MVVM pattern (to be implemented with hooks)
- Uses Next.js 15+ App Router
- Tailwind CSS v4 for styling
