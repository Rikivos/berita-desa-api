import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

class S3Service {
  constructor() {
    // Pastikan AWS SDK dikonfigurasi dengan kredensial dan region yang benar
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'ap-southeast-1',  // Pastikan region sudah benar
      endpoint: new AWS.Endpoint('https://s3.ap-southeast-1.amazonaws.com'),
    });
  }

  // Method untuk meng-upload gambar
  async uploadImage(file) {
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    // Pastikan file memiliki nama original yang valid
    const fileName = `uploads/${Date.now()}_${file.originalname || 'default.png'}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,  // Nama file di S3
      Body: file.buffer,  // File yang di-upload
      ContentType: file.mimetype,  // MIME type file
      ACL: 'public-read',  // Agar file bisa diakses publik
    };

    try {
      // Upload ke S3 menggunakan SDK AWS
      const data = await this.s3.upload(params).promise();
      return data.Location;  // Mengembalikan URL gambar yang sudah di-upload
    } catch (error) {
      // Tangani error dengan pesan yang lebih spesifik
      console.error("Error uploading image to S3:", error.message);
      throw new Error("Error uploading image to S3: " + error.message);
    }
  }
}

export default S3Service;
