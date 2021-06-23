import { firebase } from "./config";

export const writeFirestore = (movie, uid) => {
  const time = firebase.firestore.Timestamp.fromMillis(new Date());
  const createdAt = time.seconds;
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("lists")
      .doc(movie.id)
      .set({
        attributes: {
          posterImage: {
            original: movie.attributes.posterImage.original,
          },
          titles: {
            ja_jp: movie.attributes.titles.ja_jp,
          },
          averageRating: movie.attributes.averageRating,
        },
        id: movie.id,
        createdAt,
      });
  } catch (error) {
    console.log(error);
  }
};

export const removeFirestore = (id, uid) => {
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("lists")
      .doc(id)
      .delete();
  } catch (error) {
    console.log(error);
  }
};

export const editFireStore = (uid, data) => {
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("profile")
      .doc("detail")
      .set({
        name: data.name,
        location: data.location,
        genre: data.genre,
        recommend: data.recommend,
        image: data.image,
      });
  } catch (error) {
    console.log(error);
  }
};
