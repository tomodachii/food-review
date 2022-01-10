import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export async function fileUpload(file) {
  if (!file || !file.name) {
    return;
  }
  let storageRef = ref(storage, `files/${file.name}`);
  let uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (err) => {
        reject();
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
