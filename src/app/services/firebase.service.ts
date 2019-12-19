import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Plant } from '../components/models/plant';
import { Departament } from '../components/models/departament';
import { Role } from '../components/models/role';


// news data
// title,
// description,
// admin,
// like,
// picture,
// creation date,
// finish date

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private basePath = '/news';
  file: File;
  url = '';
  roleList: AngularFireList<any>;
  selectRole: Role = new Role();

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public afStorage: AngularFireStorage,private firebase: AngularFireDatabase) { }

  


  //method to upload file at firebase storage
  public uploadFile(evento): any {
    this.file = evento.target.files[0];;
    const filePath = `${this.basePath}/${this.file.name}`;    //path at which image will be stored in the firebase storage
    const snap = this.afStorage.upload(filePath, this.file);    //upload task
    return snap;
  }

  //method to retrieve download url
  //   private getUrl(snap: firebase.storage.UploadTaskSnapshot) {
  //   const url = await snap.ref.getDownloadURL();
  //   this.url = url;  //store the URL
  //   return this.url;
  //   console.log(this.url);
  // }

  // get news images
  getPicture() {
    return this.db.collection('/news').valueChanges()
  }
  // get news info
  getNew(newsKey) {
    return this.db.collection('notification').doc(newsKey).snapshotChanges();
  }
  // update news
  updateNew(newsKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('notification').doc(newsKey).set(value);
  }
  // delete news
  deleteNew(newsKey) {
    return this.db.collection('notification').doc(newsKey).delete();
  }
  // all news
  getNews() {
    return this.db.collection('notification').snapshotChanges();
  }
  // async function getDataNews(){
  //   const data = await this.db.collection('news').snapshotChanges();
  // }
  //search by admin
  searchNews(searchValue) {
    return this.db.collection('notification', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }
  // seacrh by date
  searchNewsByAge(value) {
    return this.db.collection('notification', ref => ref.orderBy('date').startAt(value)).snapshotChanges();
  }
  //create news
  createNews(value, imgRef, extradata) {
    return this.db.collection('notification').add({
      title: value.title,
      description: value.description,
      image: imgRef,
      startDate: extradata.creationDate,
      endDate: value.finishDate,
      like: extradata.likes,
      notlike: extradata.notlikes,
      idplant: 1,
      iddepartament: 1,
      idpublication: 1

    });
  }


  // get urls users images
  getAvatars() {
    return this.db.collection('/avatar').valueChanges()
  }
  // get user info
  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }
  // update users
  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }
  // delete users
  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }
    // all users
  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }
  //searcg by name
  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }
  // seacrh by age
  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }
  //create users
  createUser(value, avatar) {
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }

  // create plant
  createPlant(plant: Plant) {
    return this.db.collection('plant').add({
      name: plant.name,
      number: plant.number
    
    });
  }
  // get plant
  getPlant(newsKey) {
    return this.db.collection('plant').doc(newsKey).snapshotChanges();
  }
  // update plant
  updatePlant(newsKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('plant').doc(newsKey).set(value);
  }
  // delete plant
  deletePlant(newsKey) {
    return this.db.collection('plant').doc(newsKey).delete();
  }
  // all plant
  getPlants() {
    return this.db.collection('plant').snapshotChanges();
  }




  // create departament
  createDepartament(departament: Departament) {
    return this.db.collection('departament').add({
      name: departament.name,
    
    });
  }
  // get departament
  getDepartament(newsKey) {
    return this.db.collection('departament').doc(newsKey).snapshotChanges();
  }
  // update departament
  updateDepartament(newsKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('departament').doc(newsKey).set(value);
  }
  // delete departament
  deleteDepartament(newsKey) {
    return this.db.collection('departament').doc(newsKey).delete();
  }
  // all departament
  getDepartaments() {
    return this.db.collection('departament').snapshotChanges();
  }

  //Create Role
  getRoles(){
    return this.roleList = this.firebase.list('plant');
  }
  createRole(role: Role) {
    this.roleList.push({
      name: role.name
    });
    }
    updateRole(role: Role){
      this.roleList.update(role.$key,{
        name: role.name
      })
    }
    deleteRole($key: string){
      this.roleList.remove($key);
    }
  


}
