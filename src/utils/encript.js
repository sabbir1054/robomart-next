import CryptoJS from "crypto-js";

export const encryptAndStoreData = (data) => {
  // Convert your data to a JSON string
  const dataString = JSON.stringify(data);

  // Choose a secret key for encryption
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with your actual secret key

  // Encrypt the data using AES encryption with the secret key
  const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();

  // Store the encrypted data in sessionStorage if it exists
  if (typeof window !== "undefined" && window.sessionStorage) {
    sessionStorage.setItem("encryptedData", encryptedData);
  } else {
    console.error("sessionStorage is not available");
  }
};

export const retrieveAndDecryptData = () => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    // Retrieve the encrypted data from sessionStorage
    const encryptedData = sessionStorage.getItem("encryptedData");

    // Choose the same secret key you used for encryption
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with your actual secret key

    try {
      // Decrypt the data using AES decryption with the secret key
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      // Parse the decrypted JSON string to get your product data
      const productData = JSON.parse(decryptedData);

      return productData;
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  } else {
    console.error("sessionStorage is not available");
    return null;
  }
};
