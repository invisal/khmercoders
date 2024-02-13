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
      reader.onload = function (e) {
        resolve({
          success: 1,
          file: {
            url: e?.target?.result as string,
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
