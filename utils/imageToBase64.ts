export async function imageFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function base64ToImageFile(base64: string, filename: string): File {
  if (!base64.startsWith("data:image")) {
    throw new Error("Invalid base64 string");
  }
  var arr = base64.split(',');
  var mime = arr[0].match(/:(.*?);/)![1];
  var bstr = atob(arr[arr.length - 1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

// limit image size to 10MB
export function checkImageSize(file: File): boolean {
  return file.size <= 8 * 1024 * 1024;
}