import "./idb.js";

var dbPromised = idb.open("football", 1, function(upgradeDb) {
  upgradeDb.createObjectStore('saved', {keyPath: 'id'});
});

export const saveForLater = (data) => {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("saved", "readwrite");
      var store = tx.objectStore("saved");
      let match = data.match;
      console.log(match);
      store.put(match, data.match[0]);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
      alert("Article berhasil disimpan");
    })
    .catch(cal=> {
    	console.log("Data Sudah ada");
      alert("Data sudah ada");
    })
}

const getAll = () => {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("saved", "readonly");
        var store = tx.objectStore("saved");
        return store.getAll();
      })
      .then(function(articles) {
        resolve(articles);
      });
  });
}

const getId = (id) => {
return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("saved", "readonly");
        var store = tx.objectStore("saved");
        let Id = parseInt(id);
        console.log(Id);
        return store.get(Id);
      })
      .then(function(articles) {
        resolve(articles);
      });
	})
}

export const deleteId = (id) => {
  return new Promise ((resolve, reject) => {
    dbPromised
    .then(db => {
      let tx = db.transaction("saved", "readwrite");
      let store = tx.objectStore("saved") ;
      let Id = parseInt(id);
      console.log(Id)
      return store.delete(Id);
    })
    .then(articles => {
      console.log("id ini dihapus");
      resolve(articles);
    })
  })
}

export {getAll, getId};