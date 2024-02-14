export type FileResponse = {
  success: number;
  file: {
    url: string;
  };
};

export const Uploader = {
  uploadByFile: async (file: File): Promise<FileResponse> => {
    // faking the upload process for now 😂
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = function () {
        const url = URL.createObjectURL(file);
        resolve({
          success: 1,
          file: {
            url,
          },
        });
      };
      reader.readAsDataURL(file);
    });
  },

  uploadByUrl: async (url: string): Promise<FileResponse> => {
    // faking the upload process for now 😂
    return new Promise(resolve => {
      resolve({
        success: 1,
        file: {
          url,
        },
      });
    });
  },
};
