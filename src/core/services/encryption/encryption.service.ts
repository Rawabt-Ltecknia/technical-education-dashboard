
export class EncryptionService  {
  static readonly key = "ENCRYPTION_MANAGER";
  private readonly ALGORITHM = 'AES-GCM';
  private readonly KEY_SIZE = 256;
  private readonly PBKDF2_ITERATIONS = 100000;
  private readonly SALT_LENGTH = 16;
  private readonly IV_LENGTH = 12;

  async encrypt(plainText: string, password: string): Promise<string> {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
      const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      const key = await this.deriveKey(password, salt);

      const encoded = new TextEncoder().encode(plainText);
      const encrypted = await crypto.subtle.encrypt(
        {name: this.ALGORITHM, iv},
        key,
        encoded
      );

      return this.packResult(salt, iv, new Uint8Array(encrypted));

    } catch (error: any) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  async decrypt(encryptedText: string, password: string): Promise<string> {
    try {
      const {salt, iv, data} = this.unpackData(encryptedText);
      const key = await this.deriveKey(password, salt);

      const decrypted = await crypto.subtle.decrypt(
        {name: this.ALGORITHM, iv},
        key,
        data
      );

      return new TextDecoder().decode(decrypted);

    } catch (error : any) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  private async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const keyMaterial = await this.importKey(password);
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: this.PBKDF2_ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      {name: this.ALGORITHM, length: this.KEY_SIZE},
      false,
      ['encrypt', 'decrypt']
    );
  }

  private async importKey(password: string): Promise<CryptoKey> {
    const encodedPassword = new TextEncoder().encode(password);
    return crypto.subtle.importKey(
      'raw',
      encodedPassword,
      'PBKDF2',
      false,
      ['deriveKey']
    );
  }

  private packResult(salt: Uint8Array, iv: Uint8Array, data: Uint8Array): string {
    return [
      this.arrayToBase64(salt),
      this.arrayToBase64(iv),
      this.arrayToBase64(data)
    ].join('::');
  }

  private unpackData(encrypted: string): { salt: Uint8Array, iv: Uint8Array, data: Uint8Array } {
    const parts = encrypted.split('::');
    if (parts.length !== 3) throw new Error('Invalid encrypted format');

    return {
      salt: this.base64ToArray(parts[0]),
      iv: this.base64ToArray(parts[1]),
      data: this.base64ToArray(parts[2])
    };
  }

  private arrayToBase64(arr: Uint8Array): string {
    return btoa(String.fromCharCode(...arr));
  }

  private base64ToArray(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}

export const encryptionService = new EncryptionService();
