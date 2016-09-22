export default function getExtensionFromFilename(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
