interface DownloadResult {
  uri: string;
  status: number;
  headers: {
    [name: string]: string;
  };
  md5?: string;
}
// 2GB
const FREE_BYTE = 2 * 1024 * 1024 * 1024;
const documentDirectory = '';
const cacheDirectory = '';
const downloadAsync = (uri, path) => {
  return new Promise<DownloadResult>((resolve) => {
    resolve({
      uri,
      status: 1,
      headers: {
        path,
      },
    });
  });
};

const EncodingType = {
  Base64: 'base64',
};

const readAsStringAsync = (uri:string, config) => new Promise<any>((resolve, reject) => {});
const makeDirectoryAsync = (uri:string, config) => new Promise<any>((resolve, reject) => {});
const readDirectoryAsync = (uri:string) => new Promise<any>((resolve, reject) => {});
const getInfoAsync = (uri:string, config) => new Promise<any>((resolve, reject) => {});
const deleteAsync = (uri:string, config) => new Promise<any>((resolve, reject) => {});
const getFreeDiskStorageAsync = () => new Promise<any>((resolve, reject) => resolve(FREE_BYTE));
const copyAsync = (options: { from: string; to: string }) => new Promise<void>((resolve, reject) => {});

export {
  documentDirectory,
  cacheDirectory,
  downloadAsync,
  EncodingType,
  readAsStringAsync,
  makeDirectoryAsync,
  readDirectoryAsync,
  getInfoAsync,
  deleteAsync,
  getFreeDiskStorageAsync,
  copyAsync,
};
