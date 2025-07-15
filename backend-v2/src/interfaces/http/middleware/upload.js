import multer from 'multer';

const storage = multer.memoryStorage();

// Validasi file yang diperbolehkan
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // terima file
  } else {
    cb(new Error('Only .jpg and .png files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

export default upload;
