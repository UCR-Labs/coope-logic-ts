import * as CryptoJS from "crypto-js";

export function encrypt(text: string, secretKey: string): string {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decrypt(ciphertext: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}