export type FileResponse = {
  success: number;
  file: {
    url: string;
  };
};

export const Uploader = {
  uploadByFile: async (file: File): Promise<FileResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload/file", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("uploadByFile", data);
    const url = data.url;

    return {
      success: 1,
      file: {
        url,
      },
    };
  },

  uploadByUrl: async (remoteUrl: string): Promise<FileResponse> => {
    const response = await fetch("/api/upload/url", {
      method: "POST",
      body: JSON.stringify({ url: remoteUrl }),
    });
    const data = await response.json();
    console.log("uploadByUrl", data);
    const url = data.url;

    return {
      success: 1,
      file: {
        url,
      },
    };
  },
};
