export abstract class EncryptionService {
  abstract encrypt(plain: string, key: string): Promise<string>;
  abstract decrypt(cipher: string, key: string): Promise<string>;
}
