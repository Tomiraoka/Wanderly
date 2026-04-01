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
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="56">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="56">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="56">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" width="56">
        </div>
      </p>
    </td>
  </tr>
</table>

## 🌍 About the Project
Wanderly is a full-stack travel web application designed to help users discover tours, search for flights, and plan their trips.  
The project demonstrates modern web development practices including authentication, API integration, and responsive UI design.

## 🧩 Pages
- Home – landing page with featured destinations and search  
- Tours – catalog with filtering  
- Tour Details – full info, reviews, booking  
- Flights – flight search system  
- Blogs – travel articles  
- Profile / Favorites – user dashboard  
- Admin Panel – manage tours and blogs  
- Auth – login and registration  

## ⭐ Features
- Dynamic tour and flight search  
- Integration with Aviationstack API for real-time flight data  
- Email notifications via EmailJS  
- Authentication and role-based access (Admin / User)  
- Reviews and comments system  
- Admin CRUD for tours and blogs  
- Responsive modern UI  

## ⚙️ Technologies
- React  
- JavaScript (ES6+)  
- CSS  
- Node.js / Express  
- MongoDB  
- EmailJS  
- Aviationstack API  

## 🔌 External Services
- Aviationstack API – provides live flight data (routes, airlines, schedules)  
- EmailJS – sends booking confirmations and notifications from the frontend  

## ⚙️ Environment Variables

Client (.env)
```

VITE_API_URL=your_backend_url
VITE_EMAILJS_PUBLIC_KEY=your_key

```

Server (.env)
```

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
AVIATIONSTACK_API_KEY=your_api_key

```

## 🚀 Installation

Clone repository
```

git clone [https://github.com/your-username/wanderly.git](https://github.com/your-username/wanderly.git)
cd wanderly

```

Install dependencies

Client
```

cd client
npm install

```

Server
```

cd server
npm install

```

Run project

Backend
```

npm run dev

```

Frontend
```

npm run dev

```

## 🌐 Deployment
- Frontend: Vercel  
- Backend: Render  

## 💡 Notes
This project was developed as a coursework assignment for web development.
