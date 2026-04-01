<table>
  <tr>
    <td width="35%">
      <img src="Wanderly.png" alt="Wanderly" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
    </td>
    <td style="padding-left: 30px;">
      <h1 style="color: #3ba4ff; margin-top: 0;">Wanderly</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        Wanderly is a modern tourist web catalog and booking platform. It allows users to explore curated tours, search for flights, and seamlessly book their next adventure in a beautifully designed, responsive interface.
      </p>
      <p style="font-size: 16px;">
        <strong style="color: #3ba4ff;">Live :</strong><br>
        <a href="https://wanderly-delta.vercel.app/" target="_blank" style="color: #2b8ed9; font-weight: bold; text-decoration: none; font-size: 18px;">
          https://wanderly-delta.vercel.app/
        </a>
      </p>
      <p style="font-size: 16px;">
        <strong style="color: #3ba4ff;">Built with:</strong><br>
        <div style="margin-top: 10px;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" title="React" width="56" height="56" style="margin-right: 15px; vertical-align: middle;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" title="Node.js" width="56" height="56" style="margin-right: 15px; vertical-align: middle;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" title="CSS3" width="56" height="56" style="margin-right: 15px; vertical-align: middle;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" title="MongoDB" width="56" height="56" style="vertical-align: middle;">
        </div>
      </p>
    </td>
  </tr>
</table>

# 🌍 About the Project
Wanderly is a comprehensive travel booking web application designed to help users discover and organize their perfect trips. 
The project was created to practice full-stack modern web development, featuring robust backend API integration, role-based access control, and seamless third-party services like automated email notifications.

# 🧩 Pages
- **Home** – Landing page featuring top destinations, advantages, and search functionality.
- **Tours** – A complete catalog of available tours with filtering options.
- **Tour Details** – In-depth itinerary, pricing, user reviews, and an interactive booking form.
- **Flights** – Flight search engine and ticketing system.
- **Blogs** – Travel guides, articles, and tips.
- **Profile / Favorites** – User dashboard for managing personal data and saved tours.
- **Admin Panel** – Dedicated pages (Add/Edit Tour, Add/Edit Blog) for content management.
- **Auth (Login / Register)** – Secure authentication pages for user accounts.

# ⭐ Features
- Explore and search for tours and flights dynamically.
- Interactive booking system with real-time email confirmations (via EmailJS).
- User authentication and role-based authorization (Admin / User).
- Read and leave comments/reviews on specific tours.
- Admin controls: Create, update, and delete tours and blog posts.
- Modern UI with responsive glassmorphism design.

# ⚙️ Technologies
- **React** – Frontend user interface and routing.
- **JavaScript (ES6+)** – Application logic.
- **CSS** – Custom styling, animations, and responsive layout.
- **Node.js / Express** – RESTful backend API.
- **MongoDB** – NoSQL database for storing users, tours, blogs, and reviews.
- **EmailJS** – Automated transactional emails for bookings and tickets.

# ✈️ External Services Integration

## Aviationstack API (Flight Data)

![Image](https://aviationstack.com/images/logos/aviationstack_main_logo.svg)

![Image](https://media.licdn.com/dms/image/v2/D5622AQGreukgmsmdZw/feedshare-shrink_800/feedshare-shrink_800/0/1714808012803?e=2147483647\&t=xnb-V9XCc-ryhngrUgQUaRiX4Zzyb24qkDfN9zfNzTY\&v=beta)

![Image](https://cms-assets.tutsplus.com/cdn-cgi/image/width%3D850/uploads/users/321/posts/36709/image-upload/front.PNG)

![Image](https://cms-assets.tutsplus.com/cdn-cgi/image/width%3D800/uploads/users/321/posts/36709/image-upload/sample%20json.png)

Wanderly integrates the **Aviationstack API** to provide real-time flight information.

### 🔹 Capabilities:

* Live flight search by route
* Airline and airport data
* Departure and arrival tracking

### 🔹 Example request:

```js
http://api.aviationstack.com/v1/flights?access_key=YOUR_API_KEY
```

---

## 📧 EmailJS (Client-side Email Service)

![Image](https://www.emailjs.com/logo.png)

![Image](https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-01/emailjs-select-service.png?sfvrsn=50cdf613_3)

![Image](https://blog.openreplay.com/images/sending-emails-from-react-with-emailjs/images/image08.png)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frcxd2g2jq1e63ak7m0ww.jpg)

The project uses **EmailJS** to send emails directly from the frontend without a backend mail server.

### 🔹 Use cases:

* Booking confirmations
* Ticket notifications
* Contact form messages

### 🔹 Example usage:

```js
emailjs.send(serviceID, templateID, params, publicKey)
```

---

## 🔐 Environment Variables

```env
# Client
VITE_API_URL=your_backend_url
VITE_EMAILJS_PUBLIC_KEY=your_key

# Server
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
AVIATIONSTACK_API_KEY=your_api_key
