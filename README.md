# 🌱 Kampung KB Abyakta

**Kampung KB Abyakta** adalah platform blog berbasis web yang menyediakan informasi, edukasi, dan berita terkini mengenai program *Kampung Keluarga Berencana (KB)* di Indonesia, khususnya wilayah Tanjung Pinang.

---

## 🚀 Fitur Utama

- Manajemen artikel blog (buat, edit, hapus)
- Pengelompokan berdasarkan kategori
- Sistem komentar antar pengguna
- Autentikasi dan otorisasi pengguna

---

## 🗂️ Struktur Folder (Clean Architecture)

Proyek backend ini mengikuti pendekatan **Clean Architecture** dengan struktur direktori sebagai berikut:

```
backend-v2/
├── api
   ├── index.js
├── src/
│   ├── config/        
│   ├── controllers/    
│   ├── usecases/       
│   ├── repositories/   
│   ├── middlewares/    
│   ├── routes/                    
├── .env                
├── .env.example
```

---

## 🧰 Teknologi yang Digunakan

- **Express.js** – Web framework untuk Node.js
- **MongoDB Atlas** – Database NoSQL berbasis cloud
- **Mongoose** – ODM (Object Data Modeling) untuk MongoDB
- **Redis** – Caching untuk optimasi performa
- **JWT (JSON Web Token)** – Untuk autentikasi dan otorisasi pengguna
- **AWS S3** – Untuk penyimpanan gambar (upload post/image)
- **Vercel** – Deployment backend API

---

## 🛠️ Instalasi Backend

Ikuti langkah-langkah berikut untuk menjalankan backend secara lokal:

1. **Clone repository**
   ```bash
   git clone https://github.com/Rikivos/berita-desa-api.git
   ```

2. **Masuk ke direktori proyek**
   ```bash
   cd backend-v2
   ```

3. **Install dependensi**
   ```bash
   yarn install
   ```

4. **Jalankan server lokal**
   ```bash
   yarn start
   # atau
   npm start
   ```

5. **Akses aplikasi**
   ```bash
   http://localhost:3000
   ```

---

## 💻 Frontend

Proyek frontend tersedia di repositori berikut:

🔗 [https://github.com/annafikk/KB-Abyakta](https://github.com/annafikk/KB-Abyakta)

---

## 📡 API Endpoint

Endpoint tersedia di:

```
https://berita-desa-api2.vercel.app/
```

Contoh:
- `/api/posts` — Mendapatkan daftar semua postingan
- `/api/categories` — Mendapatkan semua kategori
- `/api/post/:postId/comments` — Komentar yang terkait dengan postingan
- `/api/users` — Data pengguna

(Dokumentasi lengkap API akan segera ditambahkan.)

---

## 🗃️ Struktur Tabel Database (MongoDB)

### 🔐 `users`
| Field      | Tipe Data |
|------------|-----------|
| _id        | ObjectId  |
| name       | String    |
| email      | String    |
| password   | String    |
| createdAt  | Date      |
| updatedAt  | Date      |

### 📝 `posts`
| Field      | Tipe Data |
|------------|-----------|
| _id        | ObjectId  |
| title      | String    |
| slug       | String    |
| image      | String    |
| content    | String    |
| user       | ObjectId  |
| status     | String    |
| createdAt  | Date      |
| updatedAt  | Date      |

### 🗂️ `categories`
| Field      | Tipe Data |
|------------|-----------|
| _id        | ObjectId  |
| name       | String    |
| slug       | String    |
| user       | ObjectId  |
| createdAt  | Date      |
| updatedAt  | Date      |

### 💬 `comments`
| Field      | Tipe Data |
|------------|-----------|
| _id        | ObjectId  |
| post       | ObjectId  |
| user       | ObjectId  |
| content    | String    |
| parent     | ObjectId  |
| createdAt  | Date      |
| updatedAt  | Date      |

---

## 🚀 Deployment

Backend sudah dideploy secara publik di:

🔗 [https://berita-desa-api2.vercel.app/](https://berita-desa-api2.vercel.app/)

---

## 👨‍💻 Kontributor

Proyek ini dibangun oleh:

- [@Rikivos](https://github.com/Rikivos)
- [@annafikk](https://github.com/annafikk)

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **MIT** – bebas digunakan dan dimodifikasi sesuai kebutuhan.
---