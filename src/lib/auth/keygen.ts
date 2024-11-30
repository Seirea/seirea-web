const pemEncodedKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKb3cylU/ZHrAG7+OI8d/ja9rAWycnkmPf9XDio1xEsbVaMLeNn7Znck1mb3h2VKino5mP9yulKgX/VWnQ67R1OfAESZEa8xq3papy5h6D63he9nnhDmeAXVh8Ls/W9KLBzni3oOHKAbKAueT/E+/pyRx1Iyl5kbG7wYopfuEUAZAgMBAAECgYBlRbwVOtbe1eKacBpQPIoAHAWmIvmqIBcEtIID+j7Iq5jC32d7GDCrXa2qIMOAHblmr17sumLnUR1DCzkSQWfeBnkBTBIQr0kL3qpT3VsPIdOTtjqETdq2TpqJwvrT+KT62868nS9bI9UG8fEY+q90ftxU6AuXqXS5tw5TuSoHbQJBAMSULt09U+hKDI5GmG6P9Kx0r1DXpx4cz/qxZwhJqXm7HxCeiNT+0neZoaJOPipO7nen8Y5mj9nPkPa0KD1pu58CQQDZb8oYKKO96Md9x/pcK7OLpu8S6ny20DnLTGP8N7ezcSST+8IZ+pFErglJYlBzxXjhDTYlsS0vG7SpfRKj9mlHAkBEwHLXi+BxyJw1knkzigOP4UuDobjgLkGLM0qOunych5Zo0JmYrPrdO40tX+IcF/kNPl6caEB9dDwGHKJKQFWPAkEA1vR58Po0LelzVjidnAMkA5prXOLtmfkuOXnymoQmmkHvLFDGKdKZTDFVQvPrnxgIkUvzTL3kcl7McoYQKIHQvwJAZlcPXFfo3BfMRITnIlo1E3CWprW62TT8+zwaBLk+9Wo/VznkKYM6BTBiic0V17DiHXwD9ZZb1tN3QE+jLVyztA==";

const RAW_SECRET_KEY = "avP/Uv1WBE01Ki7UynbNDn5OtbBkLZdHfiWDQgb3O9eTpoRdzZoxnSCMDkEE74lS2r+aQnFVIq3wbNYMj/f02Ku6ZP2wt8LQFq+6LTi9au4=";

function _stringToArrayBuffer(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }

    return buf;
}

function _arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
}

function importKey() {
    const binaryDerString = atob(pemEncodedKey);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = _stringToArrayBuffer(binaryDerString);

    return crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",
        },
        true,
        ["sign"],
    );
}

const key = await importKey()

function getTimeFormatted(): string {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        minute: "2-digit",
        hour: "2-digit",
        timeZone: "UTC"
    };

    const parts = (new Intl.DateTimeFormat('en-US', options)).formatToParts(now);
    const mapped = new Map(parts.map((obj) => [obj.type, obj.value]));

    // console.log(mapped)
    return `${mapped.get("year")}-${mapped.get("month")}-${mapped.get("day")} ${mapped.get("hour")}:${mapped.get("minute")} ${mapped.get("dayPeriod")}`;
}

export async function generateKey(): Promise<String> {
    const encoder = new TextEncoder();

    const buf = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(RAW_SECRET_KEY + getTimeFormatted()))
    return _arrayBufferToBase64(buf)
}