/**
 * Uploads the given image data to Google Firebase Storage and returns a promise
 * representing the URL of the uploaded image
 *
 * @param image: image data to upload
 * @param previous: url of previous image to delete (optional)
 * @param type {string} the type of image. Ex profile , event. Used for filename
 * @param id {id} the id of who owns image. Used for filename
 * @returns {Promise<R>}
 */
import { ImageOrVideo } from 'react-native-image-crop-picker';

// TODO: Finish this once Firebase is added

export const saveImage = (
  image: ImageOrVideo, // image data to upload
  type: string,
  id: string,
  previous?: string, // url of previous image to delete (optional)
) => {
  // const { path } = image;
  // const filename = `${type}/${id}`;
  // const storageReference = storage().ref(filename);
  //
  // if (previous && !defaultImages.includes(previous)) {
  //   storage()
  //     .ref(storage().refFromURL(previous).fullPath)
  //     .delete()
  //     .then(() => {
  //       console.log('Successfully deleted image!');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  //
  // return new Promise((resolve, reject) => {
  //   storageReference
  //     .putFile(path)
  //     .then((uploadData) => {
  //       storageReference.getDownloadURL().then((imageURL) => {
  //         resolve(imageURL);
  //       });
  //     })
  //     .catch((err: Error) => reject(err));
  // });
};
