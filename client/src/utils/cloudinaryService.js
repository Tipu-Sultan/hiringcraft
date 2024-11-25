// services/cloudinaryService.js
import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({ cloud_name: 'dxpmr6u40', secure: true });

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'hdY_rMh8U4OQj2SXASVzC5RAkfk');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};
