# Food Delivery Application

A responsive food delivery application built using React and Tailwind CSS with full Functionality.

---

## Features

- **Login Page**:
  - A login form that accepts a username and password.
  - On successful login, stores the JWT token locally.
- **Menu Page**:
  - Displays all menu items in a grid layout.
  - Options to create, update, and delete menu items using Javascript format.
- **Cart Component**:
  - Allows users to add menu items to a cart with quantities using Javascript file.
- **Order Page**:
  - Displays cart items, calculates the total price, and allows the user to place an order.
  - Displays order history after placing an order.
- **Responsive Design**:
  - Optimized for both desktop and mobile views.
  - Styled using Tailwind CSS.

---

## Folder Structure

```plaintext

src/
├── assets/
│   ├── foodItems.js
│   ├── restrarantData.js
│   ├── food.mp4
│   ├── placeorder.mp4
├── components/
│   ├── About.js
│   ├── Contact.js
│   ├── Foodgrid.js
│   ├── Footer.js
│   ├── Navbar.js
│   ├── OrderHistory.js
│   ├── Restrarant.js
│   ├── RestrarantItem.js
├── pages/
│   ├── Cart.js
│   ├── Login.js
│   ├── Menu.js
│   ├── Order.js
├── App.js
├── index.js
```
---

## 🚀 Setup Instructions

### Frontend
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/food-delivery-app.git
   cd food-delivery-app

2. **Install dependencies:**
   ```bash
   npm install
3. **Start the development server:**
   ```bash
  npm start

---

**Assumptions:**
- Cart data is cleared after page reloads or revisits.
- Login functionality is implemented using local storage to manage JWT tokens.

**Challenges:**
- Responsive Design: Ensuring the UI adapts seamlessly across different screen sizes and devices.
- State Management: Efficiently managing application state using Local Storage for user session, cart, and menu items.
- Data Persistence: Handling cart data persistence on page reloads and ensuring it clears correctly.

**Limitations:**
- Authentication is limited to JWT token management using local storage.
- Real-time updates, such as order notifications, are not implemented.

**Technology Stack:**
- Frontend: React
- Styling: Tailwind CSS

---

**License**
This project is licensed under the MIT License.
