# Mobile Programming - React Native Lab 5
## Project: Profiles Directory App (Networking & APIs)

This project is a real-world React Native application that communicates with a local Express.js server, built as part of the CMP437 Application Development On Android Devices 2025-2026 lab coursework.

The app demonstrates advanced networking concepts including fetching data with **Axios**, handling asynchronous operations, implementing **pagination** with FlatList, managing navigation with parameters, and robust **error handling** (network errors, timeouts, empty states).

**Key Features:**
* **API Integration:** Connects to a local REST API using Axios.
* **Pagination:** Implements "Infinite Scroll" to load more profiles as the user scrolls.
* **Navigation:** Stack navigation to pass Profile ID from list to detail screen.
* **Pull-to-Refresh:** Refreshes the list and resets pagination.
* **Error Handling:** Global interceptors for network errors and user-friendly retry mechanisms.
* **Environment Variables:** Uses `.env` to manage API base URLs securely.

---

### Student Information
**Name:** Göktuğ Varan
**Student ID:** 210408029

---

### Prerequisites
* Node.js and npm installed.
* Expo Go app installed on your physical device.
* **Important:** Your computer and phone must be connected to the **same Wi-Fi network**.

---

### How to Run

This project requires a backend server to be running locally. Follow these steps in order:

#### 1. Start the Backend Server
1.  Navigate to the `ProfilesServer` folder.
2.  Install server dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
    *The server will run on port 3000.*

#### 2. Configure the React Native App
1.  Find your computer's local IP address (e.g., `192.168.1.XX`).
2.  Navigate to the `ProfilesApp` folder.
3.  Create a `.env` file in the root directory (if not exists) and add your IP:
    ```env
    EXPO_PUBLIC_API_BASE_URL=http://YOUR_IP_ADDRESS:3000
    ```

#### 3. Run the Application
1.  Install app dependencies:
    ```bash
    npm install
    ```
2.  Start Expo:
    ```bash
    npx expo start --clear
    ```
3.  Scan the QR code with your phone.

---

### Troubleshooting
* **Network Error:** Ensure both devices are on the same Wi-Fi and the IP address in `.env` is correct. Do not use `localhost`.
* **Duplicate Key Error:** This is handled by preventing fetch requests while refreshing is active.