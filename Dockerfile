# 1. Gunakan image Node.js resmi
FROM node:20-alpine

# 2. Buat direktori kerja di dalam container
WORKDIR /app

# 3. Salin file konfigurasi dan dependency
COPY package.json yarn.lock ./

# 4. Install dependencies
RUN yarn install --frozen-lockfile

# 5. Salin semua file project ke dalam container
COPY . .

# 6. Build project NestJS
RUN yarn build

# 7. Jalankan aplikasi
CMD ["node", "dist/main"]

# 8. Buka port (optional untuk dokumentasi)
EXPOSE 3000
