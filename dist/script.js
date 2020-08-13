let db = firebase.firestore();
let booksRef = db.collection('books');
Vue.component('whatever', {
  
})

Vue.component('book', {
  props: ["collection"],
  data () {
    return {
      msg: ""
    }
  },
  template: `
    <div class="book">
      <p>{{ collection.name }}</p>
      <p>{{ collection.Genre }}</p>
    </div>
  `
});

let app = new Vue({
  el: "#app",
  data: {
    book: [],
    newbook: "",
    Genre: "",
    OriginalPrice: false,
    details: ['You can specify complete information regarding the book along with the information about the book name and genre.',
'If the book is not present in the Firebase Database, the look for the updated books in the Excel sheet.',
'You only add book name and genre.',
'State-of-the-art technology helps you save data and retrieve it in a short time.',
],
    
  },
  methods: {
    createbook() {
      booksRef.add({
        name: this.newbook,
        Genre: this.Genre
      });
      this.reset();
      this.readbooks();
    },
    createBookAlternate() {
      let id = booksRef.doc().id
      booksRef.doc(id).set({
        id: id,
        name: this.newbook,
        Genre: this.Genre
      });
      this.reset();
      this.readbooks();
    },
    reset() {
      this.newbook = ""
      this.Genre = ""
    },
    //Just need to know that codes underneath are how we read data from the database and we will talk more about reading data next week.
    readbooks() {
      booksRef.get().then(snapshot => {
        var books = [];
        snapshot.forEach(doc => {
          books.push(doc.data());
        });
        this.books = books;
      })
    }
  },
  mounted() {
    this.readbooks()
  }
});