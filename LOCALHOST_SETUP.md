# 🚀 Running LocalHost - Step by Step

## Terminal Setup (3 Terminals Needed)

Open **3 separate PowerShell terminals** - each runs one service.

---

## ✅ Terminal 1: Backend (Port 5000)

```powershell
# Navigate to backend
cd d:\avani-enterprises\Avani-enterprises-backend-pure-bc

# Start backend
npm start
```

**You should see:**
```
Server running on port 5000
MongoDB connected
```

✅ Backend ready at: `http://localhost:5000`

---

## ✅ Terminal 2: Main Website (Port 5173)

```powershell
# Navigate to website
cd d:\avani-enterprises\avani-connect-glow-main

# Start website (uses Vite)
npm run dev
```

**You should see:**
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/   or similar
```

✅ Website ready at: `http://localhost:5173` (or 3000)

---

## ✅ Terminal 3: Admin Panel (Port 5174)

```powershell
# Navigate to admin
cd d:\avani-enterprises\Avani-enterprises-admin-frontend-main

# Start admin (uses Vite)
npm run dev
```

**You should see similar vite startup**

✅ Admin ready at: `http://localhost:5174` (or similar)

---

## 🌐 Now Open These URLs in Browser

### **1. Public Links Page** 🔗
```
http://localhost:5173/links
```
(or replace 5173 with your port from Terminal 2)

You'll see:
- Beautiful gradient background
- "Let's Connect" heading
- Empty page (no links yet)

### **2. Admin Panel** 🛠️
```
http://localhost:5174
```
(or check Terminal 3 output for actual port)

You'll see:
- Login screen (if not logged in)
- After login → Dashboard

---

## 📱 Create Your First Link

### **Step 1: Login to Admin**
```
URL: http://localhost:5174/login
Email: Your admin email
Password: Your admin password
```

### **Step 2: Navigate to Links**
- Left sidebar → Look for "LINKS" section
- Click "Link Management"
- URL should be: `http://localhost:5174/links`

### **Step 3: Add a Link**
1. Click "Add Link" button
2. Fill in:
   - **Title**: "Test Link"
   - **URL**: "https://google.com"
   - **Description**: "My first link"
   - **Color**: Pick any color
   - **Active**: Toggle ON
3. Click "Create"

### **Step 4: View on Public Page**
1. Go to: `http://localhost:5173/links` (or your port from Terminal 2)
2. **Refresh the page** (Ctrl + R)
3. You should see your link card!

### **Step 5: Click to Test Tracking**
1. Click your link on the `/links` page
2. It opens Google in new tab
3. Go to analytics to see the click recorded

---

## 📊 View Analytics

### **Step 1: Go to Analytics**
Admin → Left sidebar → "LINKS" section → "Link Analytics"

URL: `http://localhost:5174/link-analytics` (or your admin port)

### **Step 2: You'll see:**
- Total Clicks: Should show 1+ (from your test click)
- KPI Cards with stats
- Clicks by Link chart
- Recent clicks table

---

## 🎯 Quick URL Reference

| Page | URL | Purpose |
|------|-----|---------|
| **Public Links** | http://localhost:5173/links | See all public links |
| **Admin Dashboard** | http://localhost:5174 | Admin home |
| **Link Management** | http://localhost:5174/links | Create/edit links |
| **Link Analytics** | http://localhost:5174/link-analytics | View click data |
| **Backend API** | http://localhost:5000/api/links | API endpoint (test in Postman) |

---

## 🔧 If Something Doesn't Work

### Backend won't start?
```powershell
# Make sure MongoDB is running
# Or check .env for MONGO_URI

# Check if port 5000 is in use
Get-NetTcpConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

### Frontend won't start?
```powershell
# Clear cache and reinstall
rm node_modules
npm install
npm run dev
```

### Port already in use?
```powershell
# Find what's using the port
Get-Process -Id (Get-NetTcpConnection -LocalPort 5173).OwningProcess

# Kill it (replace [PID] with actual number)
Stop-Process -Id [PID] -Force

# Or kill all node processes
Stop-Process -Name node -Force
```

---

## 🧪 Test API Directly (Optional)

Open Postman or use curl:

### Get all links:
```
GET http://localhost:5000/api/links
```

### Create a link (with JWT token):
```
POST http://localhost:5000/api/links
Headers: Authorization: Bearer YOUR_JWT_TOKEN
Body:
{
  "title": "Test",
  "url": "https://google.com",
  "color": "#3b82f6",
  "isActive": true
}
```

---

## 📋 Troubleshooting Checklist

- [ ] Backend running on port 5000? `npm start` in Terminal 1
- [ ] Website running on port 5173? `npm run dev` in Terminal 2  
- [ ] Admin running on port 5174? `npm run dev` in Terminal 3
- [ ] Can you access `http://localhost:5173/links`? ✅
- [ ] Can you login to admin? `http://localhost:3001`
- [ ] Can you navigate to Link Management? (Left sidebar)
- [ ] Did you create at least one link? (Make it active!)
- [ ] Refresh `/links` page after creating link?
- [ ] See your link on the public page?
- [ ] Clicked the link to test tracking?
- [ ] Checked analytics page for click data?

---

## 💡 Pro Tips

1. **Keep Network Tab Open** - F12 → Network tab
   - See API calls in real-time
   - Verify click tracking request succeeds

2. **Check Browser Console** - F12 → Console
   - Errors will show here
   - Won't block page load but good to know about

3. **Refresh After Changes**
   - Create link → Refresh links page
   - Add/edit → Refresh page to see updates

4. **Test on Different Browsers**
   - Chrome works great ✅
   - Firefox works great ✅
   - Edge works great ✅

---

## 🎉 You're Ready!

Once all 3 services are running:

```
✅ Backend    → http://localhost:5000
✅ Website    → http://localhost:5173/links
✅ Admin      → http://localhost:5174/links
```

**Start with:**
1. Open `http://localhost:5173/links` (should be empty)
2. Open `http://localhost:5174/links` (create some links)
3. Refresh `http://localhost:5173/links` (see your links!)
4. Click a link
5. Check `http://localhost:5174/link-analytics` (see clicks!)

---

## 🎬 Visual Flow

```
┌─────────────────────┐
│   Terminal 1        │
│   npm start         │
│   Port 5000         │
│   Backend/API       │
└──────────┬──────────┘
           │
           ├──────────────────┐
           │                  │
    ┌──────▼──────┐    ┌──────▼──────┐
    │ Terminal 2  │    │ Terminal 3  │
    │ npm run dev │    │ npm run dev │
    │ Port 5173   │    │ Port 5174   │
    │ Website     │    │ Admin       │
    └──────┬──────┘    └──────┬──────┘
           │                  │
    ┌──────▼──────────────────▼──────┐
    │   http://localhost:5173/links   │
    │   http://localhost:3001/links   │
    │   http://localhost:3001/link-   │
    │            analytics            │
    └─────────────────────────────────┘
```

---

**Happy testing!** 🚀 Let me know if you hit any snags!
