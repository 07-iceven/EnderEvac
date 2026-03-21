# **App Name**: MineDown Automata

## Core Features:

- Server Status & Countdown Display: A dashboard component to display the simulated online status of the Minecraft server, current player count, and a countdown timer indicating the duration without online players based on configured settings.
- Automated Shutdown Configuration: Users can define and save the specific time threshold (e.g., 24 hours, 7 days) of inactivity after which the server is 'scheduled' to shut down. This configuration will persist.
- GitHub Integration Settings: User interface for inputting simulated GitHub repository details (e.g., repository URL, access token placeholder) where server files 'would be' open-sourced upon shutdown. These settings will be stored.
- Announcement Channel Configuration: Allows users to input placeholder URLs or identifiers for their QQ group and official website, along with predefined announcement messages that 'would be' posted upon a simulated shutdown.
- Simulated Action Log: Displays a chronological log of simulated actions (e.g., 'Server monitored: no players detected for 1 hour', 'Announcement message generated', 'Server shutdown initiated') without executing them in real-time.
- Settings Persistence: All user-configured settings for shutdown thresholds, GitHub integration, and announcement channels are saved and loaded across sessions, leveraging a cloud database.
- Custom Theme Color Selection: Users can select a custom primary accent color to personalize the application's interface.
- Dark/Light Mode Toggle: Allows users to switch between a dark theme and a light theme for improved readability and user preference.

## Style Guidelines:

- Default Dark Theme: A sophisticated, digital-inspired dark theme. The background will be a deep, subtly tinted dark blue-grey (#16191C).
- Default Light Theme: A clean, modern light theme with a soft off-white background (#F5F5F5) and dark grey text (#333333).
- Primary Accent Color (Customizable): Users can select a primary accent color that will be applied to interactive elements, call-to-actions, and active states, overriding the default blue/cyan for a personalized experience. This accent color will adapt for contrast in both dark and light themes.
- Body and headline font: 'Inter' (sans-serif) for its modern, objective, and highly legible characteristics, suitable for conveying technical information and UI labels with clarity on a digital interface.
- Utilize a set of minimalistic, stroke-based vector icons. Icons should clearly represent concepts like server status (online/offline), clock for countdowns, GitHub logo for integration, megaphone for announcements, and settings gears for configuration.
- A clean, responsive dashboard layout employing a card-based structure to clearly segment different functional areas (e.g., 'Server Status', 'Settings', 'Log'). Whitespace will be used generously to ensure readability and reduce cognitive load.
- Subtle and functional animations to provide visual feedback, such as smooth transitions for updating server status displays, small hover effects on interactive elements, loading indicators for simulated processes, and seamless theme switching.