import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { EncryptionService } from '../../ports/encryption.service.port';

@Injectable()
export class CryptoAES256GCMEncryptionService implements EncryptionService {
  async encrypt(plain: string, key: string): Promise<string> {
    const keyBuffer = Buffer.from(key, 'hex');

    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);

    let encrypted = cipher.update(plain, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Get the auth tag
    const authTag = cipher.getAuthTag();

    // Combine everything into a single buffer: iv + authTag + encrypted
    const combined = Buffer.concat([iv, authTag, encrypted]);

    return await new Promise((resolve) => {
      resolve(combined.toString('hex'));
    });
  }

  async decrypt(cipher: string, key: string): Promise<string> {
    const keyBuffer = Buffer.from(key, 'hex');

    const combined = Buffer.from(cipher, 'hex');

    // Extract the pieces
    const iv = combined.subarray(0, 12);
    const authTag = combined.subarray(12, 28);
    const encrypted = combined.subarray(28);

    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return await new Promise((resolve) => {
      resolve(decrypted.toString('utf8'));
    });
  }
}
