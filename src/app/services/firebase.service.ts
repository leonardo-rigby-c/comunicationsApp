import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Plant } from '../components/models/plant';
import { Departament } from '../components/models/departament';
import { Role } from '../components/models/role';
import { Publication } from '../components/models/publication';
import { User } from '../components/models/user.model';
import { Icons } from '../components/models/icons';



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
  firebaseList: AngularFireList<any>;
  roleList: AngularFireList<any>;
  plantList: AngularFireList<any>;
  departmentList: AngularFireList<any>;
  selectRole: Role = new Role();
  selectDepartament: Departament = new Departament();
  selectPlant: Plant = new Plant();
  selectPublication: Publication = new Publication();
  selectUser: User = new User();
  selectIcons: Icons = new Icons();

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public afStorage: AngularFireStorage, private firebase: AngularFireDatabase) { }




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
  // getUser(userKey) {
  //   return this.db.collection('users').doc(userKey).snapshotChanges();
  // }
  // update users
  updateUser(user, userKey) {
    // value.nameToSearch = value.name.toLowerCase();
    const value = {authorized: true};
    return this.db.collection('users').doc(userKey).set(user);
  }
  // delete users
  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }
    // all users
  getUsers() {
    return this.db.collection('/users').snapshotChanges();
  }
  //get plants
  getPlantss(){
    return this.plantList = this.firebase.list('plant');
  }
  //get departments
  getDepartments(){
    return this.departmentList = this.firebase.list('departament');
  }
  //get Roles
  getRoless(){
    return this.roleList = this.firebase.list('role');
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

  /* create plant
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
 */




  // get Plants
  getPlants() {
    return this.firebaseList = this.firebase.list('plant');
  }

  createPlant(plant: Plant) {
    this.firebaseList.push({
      name: plant.name,
      number: plant.number
    });
  }
  updatePlant(plant: Plant) {
    this.firebaseList.update(plant.$key, {
      name: plant.name,
      number: plant.number
    })
  }
  deletePlant($key: string) {
    this.firebaseList.remove($key);
  }
  // get all Departament
  getDepartaments() {
    return this.firebaseList = this.firebase.list('departament');

  }
  createDepartament(dep: Departament) {
    this.firebaseList.push({
      name: dep.name
    }

    )
  }
  updateDepartament(dep: Departament) {
    this.firebaseList.update(dep.$key, {
      name: dep.name
    });
  }
  deleteDepartament($key: string) {
    this.firebaseList.remove($key);
  }

  //Create Role
  getRoles() {
    return this.firebaseList = this.firebase.list('role');
  }
  createRole(role: Role) {
    this.firebaseList.push({
      name: role.name
    });
  }
  updateRole(role: Role) {
    this.firebaseList.update(role.$key, {
      name: role.name
    })
  }
  deleteRole($key: string) {
    this.firebaseList.remove($key);
  }
  // create Publication
  getPublication(){
    return this.firebaseList = this.firebase.list('publication');
  }
  createPublication(publication: Publication){
    this.firebaseList.push({
      name: publication.name,
      icono: publication.icono
    });
  }
  updatePublication(publication:Publication){
    this.firebaseList.update(publication.$key,{
      name: publication.name,
      icono: publication.icono
    })
  }
  deletePublication($key:string){
    this.firebaseList.remove($key);
  }

  getAllIcons(){
    return this.firebaseList = this.firebase.list('icons');
  }
  createIcons(icons: Icons){
    this.firebaseList.push({
      name: icons.name,
      class: icons.class
    })
  }
  updateIcons(icons: Icons){
    this.firebaseList.update(icons.$key,{
      name: icons.name,
      class: icons.class
    })
  }
  deleteIcons($key:string){
    this.firebaseList.remove($key);
  }
}
