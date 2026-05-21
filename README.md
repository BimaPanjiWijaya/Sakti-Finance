<div align="center">

# 💰 Sakti Finance

### *Smart Financial Tracking with AI-Powered Insights*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

> Kelola keuangan pribadi Anda dengan cerdas — catat transaksi, analisis pengeluaran, dan dapatkan rekomendasi finansial dari AI secara real-time.

</div>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📊 **Dashboard** | Ringkasan keuangan real-time dengan summary pemasukan & pengeluaran |
| 💳 **Transaction Tracking** | CRUD transaksi lengkap dengan kategori income & expense |
| 🤖 **AI Financial Insights** | Analisis keuangan & rekomendasi personal dari Google Gemini AI |
| 📍 **Location Awareness** | Tag lokasi otomatis pada setiap transaksi via Geolocation API |
| 🔐 **Google OAuth** | Login cepat menggunakan akun Google |
| 👤 **Profile Management** | Kelola profil dan data gaji untuk analisis yang lebih akurat |

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS + Framer Motion
- Redux Toolkit
- React Router v7
- Axios

**Backend**
- Node.js + Express.js 5
- Sequelize ORM + PostgreSQL
- JSON Web Token (JWT)
- Bcrypt
- Google Gemini AI SDK

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js >= 18
- PostgreSQL (running di localhost)
- API Keys: Gemini AI, Geocode, Google OAuth Client ID

---

### 1. Clone Repository

```bash
git clone https://github.com/BimaPanjiWijaya/Sakti-Finance.git
cd Sakti-Finance
```

### 2. Setup Server

```bash
cd server
npm install
```

Buat file `.env` di folder `server/`:

```env
SECRET_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GEOCODE_API_KEY=your_geocode_api_key
GOOGLE_CLIENT_ID=your_google_client_id
```

Sesuaikan koneksi database di `server/config/config.json`:

```json
{
  "development": {
    "username": "postgres",
    "password": "your_password",
    "database": "sakti",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

Jalankan migration & seeder:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Jalankan server (port **3001**):

```bash
npm run dev
```

---

### 3. Setup Client

```bash
cd ../client
npm install
npm run dev
```

Buka browser di **`http://localhost:5173`**

---

## 📁 Struktur Proyek

```
Sakti-Finance/
├── client/                  # React + Vite Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Halaman utama (Dashboard, Transaction, Insight, dll)
│   │   ├── redux/           # State management (Redux Toolkit)
│   │   └── services/        # API calls & geolocation
│   └── public/
│
└── server/                  # Node.js + Express Backend
    ├── controllers/         # Business logic
    ├── models/              # Sequelize models
    ├── routes/              # API routes
    ├── middlewares/         # Auth & error handler
    ├── migrations/          # Database migrations
    └── seeders/             # Data awal
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/register` | Registrasi user baru |
| POST | `/login` | Login dengan email & password |
| POST | `/google-login` | Login dengan Google OAuth |

### Transactions
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/transactions` | Ambil semua transaksi |
| POST | `/transactions` | Tambah transaksi baru |
| PUT | `/transactions/:id` | Update transaksi |
| DELETE | `/transactions/:id` | Hapus transaksi |

### Insights (AI)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/insights` | Generate insight baru dari Gemini AI |
| GET | `/insights` | Ambil riwayat insight |

---

## 🤖 Cara Kerja AI Insight

1. User memilih periode analisis (default: bulan berjalan)
2. Server mengumpulkan data transaksi, gaji, dan lokasi user
3. Data dikirim ke **Google Gemini AI** sebagai prompt terstruktur
4. Gemini mengembalikan:
   - 📝 **Summary** — ringkasan kondisi keuangan
   - 🏷️ **Status** — Excellent / Good / Fair / Poor
   - 📈 **Spending Score** — skor 0–100
   - 💡 **Recommendation** — saran personal

---

## 👤 Author

**Bima Panji Wijaya**

[![GitHub](https://img.shields.io/badge/GitHub-BimaPanjiWijaya-181717?style=flat-square&logo=github)](https://github.com/BimaPanjiWijaya)

---

<div align="center">

Made with ❤️ for smarter financial management

</div>
