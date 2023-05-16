export const getImageFormat = (imageName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const format = imageName.split(".").pop()?.toLowerCase();
      if (!format) {
        reject(new Error(`Failed to extract image format from "${imageName}"`));
      } else {
        resolve(format);
      }
    } catch (error) {
      reject(error);
    }
  });
};
