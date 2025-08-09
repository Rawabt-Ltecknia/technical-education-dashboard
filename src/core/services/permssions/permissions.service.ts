import {AppPermission} from "@/core/services/permssions/permssions-enum";
import pako from 'pako';


export class PermissionsService {
    decodeUniqueId(uniqueId: string) {
        const bytes = this.base64ToUint8Array(uniqueId);

        let decompressed;
        // 1) حاول zlib (pako.inflate) — يعالج بيانات zlib wrapper
        try {
            decompressed = pako.inflate(bytes);
        } catch (e1: any) {
            // 2) حاول raw deflate (pako.inflateRaw) — يستخدم إذا كانت البيانات Deflate "خام"
            try {
                decompressed = pako.inflateRaw(bytes);
            } catch (e2: any) {
                // 3) حاول gzip (pako.ungzip) — فقط لو كانت gzipped
                try {
                    decompressed = pako.ungzip(bytes);
                } catch (e3: any) {
                    // لو فشل كل شيء، اطرح خطأ واضح مع رسائل الأخطاء للمساعدة في الـ debugging
                    throw new Error('Decompression failed. errors: '
                        + `inflate:${e1.message}; inflateRaw:${e2.message}; ungzip:${e3.message}`);
                }
            }
        }

        return this.bytesToBits(decompressed);
    }

    hasPermission(bits: boolean[], permission: AppPermission): boolean {
        return bits[permission] || false;
    }

    normalizeBase64(b64: any) {
        b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0) b64 += '=';
        return b64;
    }

    base64ToUint8Array(base64: any) {
        base64 = this.normalizeBase64(base64);
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
    }

    /** Convert a byte-array => array of bits (LSB first per byte) */
    bytesToBits(uint8arr: any) {
        const bits = [];
        for (const b of uint8arr) {
            for (let i = 0; i < 8; i++) {
                bits.push((b & (1 << i)) !== 0);
            }
        }
        return bits;
    }
}

export const permissionsService = new PermissionsService();






