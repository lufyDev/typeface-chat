# TypeFace Chat Application

A modern chat interface built with React and Redux, featuring a clean and responsive design. This application demonstrates frontend development skills with a focus on user experience and maintainable code structure.

## Features

### Core Functionality
- Create and manage multiple chat conversations
- Real-time message sending and receiving simulation
- Delete chat conversations
- Message status indicators (sent/delivered)

### User Interface
- Clean and modern design
- Responsive layout that works on all screen sizes
- Collapsible sidebar for better space utilization
- Message timestamps
- Typing indicators
- Empty state displays

### User Experience
- Keyboard shortcuts for quick navigation
  - `Alt + N`: Focus new chat input
  - `Alt + 1-9`: Switch between chats
- Auto-scroll to latest messages
- Focus management
- Visual feedback for message status

## Technology Stack

- **React** - Frontend framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Icons** - UI icons
- **Moment.js** - Time formatting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd typeface-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatArea.jsx    # Main chat display area
│   ├── ChatHeader.jsx  # Chat header with info
│   ├── Message.jsx     # Message component
│   └── Sidebar.jsx     # Chat list sidebar
├── store/              # Redux store
│   ├── index.js        # Store configuration
│   └── slices/         # Redux slices
│       └── chatSlice.js # Chat state management
├── hooks/              # Custom React hooks
│   └── useKeyboardShortcuts.js
├── App.jsx             # Root component
└── main.jsx           # Entry point
```

## Features in Detail

### Chat Management
- Create new chats with custom names
- Switch between multiple chat conversations
- Delete unwanted chats
- Persistent chat selection

### Message Features
- Send and receive messages
- Message status indicators (sent/delivered)
- Timestamp display
- Auto-scroll to new messages
- Typing indicators

### UI/UX Features
- Collapsible sidebar for better space utilization
- Responsive design that adapts to screen size
- Keyboard shortcuts for efficient navigation
- Clear empty states and loading indicators
- Modern and clean interface

## Development Notes

### State Management
The application uses Redux Toolkit for state management with a single slice handling all chat-related state:
- Chat list
- Active chat selection
- Messages for each chat
- Message status

### Component Architecture
- Components are modular and reusable
- Clear separation of concerns
- Consistent styling with Tailwind CSS
- Proper prop typing and validation

### Future Improvements
- Message search functionality
- Message editing and deletion
- File attachments
- User avatars and online status
- Chat groups/channels support
- Message reactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
