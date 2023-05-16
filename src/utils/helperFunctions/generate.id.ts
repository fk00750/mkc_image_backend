const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ID_LENGTH = 10;
const ID_BYTES = new Uint8Array(ID_LENGTH);
import crypto from 'crypto'

export function generateImageId(): Promise<string> {
  return new Promise((resolve) => {
    crypto.getRandomValues(ID_BYTES);
    let id = "";
    for (let i = 0; i < ID_LENGTH; i++) {
      id += CHARACTERS.charAt(ID_BYTES[i] % CHARACTERS.length);
    }
    resolve(id);
  });
}
