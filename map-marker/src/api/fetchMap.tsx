import { collection, query, where, getDocs, WhereFilterOp, setDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

// type QueryPath = {
//   field: string, operator: WhereFilterOp, value: string
// } 
// query parameter
// async function fetchMap(queryPath: QueryPath[]){
export async function fetchMap(mapName: string) {
  const mapRef = collection(firestore, 'maps3');
  // let mapQuery;
  // queryPath.forEach(({ field, operator, value }) => {
  //   mapQuery = query(mapRef, where(field, operator, value));
  // });
  const mapQuery = query(mapRef, where('mapName', '==', mapName));
  const mapSnapshot = await getDocs(mapQuery);

  if (!mapSnapshot.empty) {
    const mapDoc = mapSnapshot.docs[0];
    const ref = collection(firestore, 'maps3', mapDoc.id, 'markers');

    return ref;
  } else {
    try {
      const newMapRef = doc(mapRef); // create a new document reference in the "maps" collection
      const newMapData = {
        mapName: mapName
      };
      await setDoc(newMapRef, newMapData);
      console.log(`${mapName} map does not exist. Map has been created.`);
    } catch (error) {
      // error toast could not fetch data
      console.error(`Error creating new ${mapName} map:`, error);
    }
    return null;
  }
}