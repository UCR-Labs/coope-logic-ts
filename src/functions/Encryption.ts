import * as crypto from 'crypto';

export function encrypt(text: string, key: string): string {
  if (!key) {
    throw new Error('A key is required for encryption');
  }
  if (key.length !== 64) {
    throw new Error('Key must be 64 hexadecimal characters long');
  }
  
  const keyBuffer = Buffer.from(key, 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string, key: string): string {
  if (!key) {
    throw new Error('A key is required for decryption');
  }
  if (key.length !== 64) {
    throw new Error('Key must be 64 hexadecimal characters long');
  }
  
  const keyBuffer = Buffer.from(key, 'hex');
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
