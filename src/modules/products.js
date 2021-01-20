import firebase from 'firebase';
import * as faker from 'faker';

export default {
  state: {
    admin: {
      products: {
        dialog: false,
        editMode: false,
        product: {
          id: null,
          name: '',
          price: '',
          file_id: '',
          url: ''
        }
      }
    }
  },
  actions: {
    pushFileToStorage({commit}, {fileToUpload, id}) {
      const storageRef = firebase.storage().ref();
      const fileId = faker.random.alphaNumeric(16);
      const uploadTask = storageRef.child(`/products/${fileId}`).put(fileToUpload);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // en progreso
          const snap = firebase.storage.UploadTaskSnapshot;
        },
        (error) => {
          console.log(error);
        },
        () => {
          storageRef.child(`/products/${fileId}`).getDownloadURL().then(url => {
            let product = firebase.firestore().collection('products').doc(id);
            return product.update({
              url: url,
              file_id: fileId
            });
          });
        }
      )
    },
    removeFile ({commit}, product) {
      return firebase.storage().ref().child(`products/${product.file_id}`).delete();
    },
    updateDeletedProduct ({commit}, id) {
      let product = firebase.firestore().collection(`products`).doc(id);
      if (product) {
        return product.update({
          url: '',
          file_id: ''
        });
      }
    }
  },
  mutations: {
    toggleProductsDialog: (state, data) => {
      state.admin.products.dialog = ! state.admin.products.dialog;
      state.admin.products.editMode = data.editMode;
      state.admin.products.product = data.product;
    },
  },
  getters: {
    productsDialog: (state) => {
      return state.admin.products.dialog;
    },
    productForEdit: (state) => {
      return state.admin.products.product;
    },
    productsDialogEditMode: (state) => {
      return state.admin.products.editMode;
    }
  }
};
