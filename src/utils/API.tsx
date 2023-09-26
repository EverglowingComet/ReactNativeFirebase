import database from '@react-native-firebase/database';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

export const generateId = (path: string) => {
  return database().ref(path).push().key;
};

export const generateStorageId = (
  path: string,
  success: (url: string) => void,
) => {
  storage()
    .ref(path)
    .getDownloadURL()
    .then(url => {
      success(url);
    });
};

export const listenDbQuery = (
  path: string,
  id: string,
  value: any,
  onChange: (dict: any) => void,
) => {
  database()
    .ref(path)
    .orderByChild(id)
    .equalTo(value)
    .on('value', snapshot => {
      const data = snapshot.val();
      onChange(data);
    });
};

export const listenDb = (path: string, onChange: (dict: any) => void) => {
  database()
    .ref(path)
    .on('value', snapshot => {
      const data = snapshot.val();
      onChange(data);
    });
};

export const readDb = (
  path: string,
  onChange: (dict: any) => void,
  onFailure?: (error: any) => void,
) => {
  return database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      onChange(data);
    })
    .catch(error => {
      console.log('Reading Db Error', error);
      if (onFailure) {
        onFailure(error);
      }
    });
};

export const writeDb = (
  path: string,
  data: any | null,
  onFinished?: (error?: any) => void,
) => {
  return database()
    .ref(path)
    .set(data)
    .then(() => {
      if (onFinished) {
        onFinished(undefined);
      }
    })
    .catch(error => {
      console.log('Reading Db Error', error);
      if (onFinished) {
        onFinished(error);
      }
    });
};

export const invokeHttpsApi = (
  functionName: string,
  params: any,
  success: (dict: any) => void,
  failure: (error: any) => void,
) => {
  let query = functions().httpsCallable(functionName);
  query(params)
    .then(result => {
      const data = result.data;
      success(data);
    })
    .catch(error => {
      console.log('Request error', error);
      failure(error);
    });
};

export const serverTimestamp = () => {
  return database.ServerValue.TIMESTAMP;
};
