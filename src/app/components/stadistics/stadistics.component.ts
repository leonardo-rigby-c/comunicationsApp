import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
// import { ExportToCsv } from 'export-to-csv';
//  import * as CSV from 'csv-string';
import { ExportToCSV } from "@molteni/export-csv";
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.scss']
})
export class StadisticsComponent implements OnInit {

  public formaNoticia: FormGroup;
 
  @ViewChild('preview',{static:false} ) preview: ElementRef<any>;
  public imagenFile: File = undefined;

  private noticiaIndex:number;

  constructor(
    public firebaseService: FirebaseService,
     public afStorage: AngularFireStorage,
      public auth: AuthService,
      private httpService : HttpClient
      ) { }

  publications = new Array();
  reactions: any;
  change: any;
  january: any;
  february: any;
  march: any;
  april: any;
  may: any;
  june: any;
  july: any;
  august: any;
  september: any;
  october: any;
  november: any;
  december: any;
  ob: any;
  likes: any;
  allLikes: any;
  dislikes: any;
  view: any[] = [550, 450];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Reacciones';
  showYAxisLabel = true;
  yAxisLabel = 'Personas';

  colorScheme = {
    domain: ['#A10A28', '#AAAAAA']
  };

  single = new Array<{
    name: '',
    value: 0
  }>();
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Likes' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Dislikes' }
  ];

  ngOnInit() {
    this.cargarNoticiaForm();


    this.ob = ""
    this.january = 0;
    this.february = 0;
    this.march = 0;
    this.april = 0;
    this.may = 0;
    this.june = 0;
    this.july = 0;
    this.august = 0;
    this.september = 0;
    this.october = 0;
    this.november = 0;
    this.december = 0;
    this.change = "Stadistics";
    this.reactions = "all";
    this.firebaseService.getNews().subscribe((result) => {
      this.publications = new Array();

      result.forEach((Data: any) => {
        // console.log(Data.payload.doc.data());
        var aux = Data.payload.doc.data();
        if (aux.encuesta) {

          //   console.log(aux);
          aux.single = [
            {
              "name": "Si",
              "value": aux.like.length
            },
            {
              "name": "No",
              "value": aux.dislike.length
            },

          ];
          //   console.log(this.single);
        }
        aux.dislike.forEach((data: any) => {
          data.like = false;
        });
        aux.like.forEach((data: any) => {
          data.like = true;
        });
        aux.allLikes = aux.dislike.concat(aux.like);
        aux.allLikes.sort();
        this.publications.push(aux)
      });
      var arraux = this.publications.sort((unaMascota, otraMascota) => unaMascota.title.localeCompare(otraMascota.title));
      this.publications = arraux;
      //  this.getCharts();
      // news

      // console.log(this.publications);
      // setTimeout(this.getCharts, 80000);


    })
    if (screen.width < 1024) {
      this.view = [350, 350];
    } else if (screen.width < 1280) {
      this.view = [550, 450];
    } else {
      this.view = [550, 450];

    }
  }

  


  public crearUrlImg(id: string): string{

    return `https://res.cloudinary.com/dlor7n05z/image/upload/v1607017792/noticias/${id}`
  }


  exportCSV(data) {
    //  const arr = this.CSV.parse(data);
    //  console.log(data);
    var exporter = new ExportToCSV();
    exporter.exportColumnsToCSV(this.publications, "Conteo De Interacciones", ["allLikes"]);
    // const options = {
    //   filename: 'Conteo De Interacciones',
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalSeparator: '.',
    //   showLabels: true,
    //   showTitle: true,
    //   title: 'Likes ',
    //   useTextFile: false,
    //   useBom: true,
    //   useKeysAsHeaders: true,
    // };
    // const csvExporter = new ExportToCsv(options);
    // csvExporter.generateCsv(data);
  }

  getCharts() {
    setTimeout(function () {
      this.publications.forEach(element => {
        var likes = element.allLikes;
        var arrayLikes = new Array();
        var arrayDisLikes = new Array();
        likes.forEach(fechas => {

          if (fechas.like = false) {
            var op = fechas.date.slice(5, -13);
            switch (op) {
              case '01': arrayDisLikes.push('january'); break;
              case '02': arrayDisLikes.push('february'); break;
              case '03': arrayDisLikes.push('march'); break;
              case '04': arrayDisLikes.push('april'); break;
              case '05': arrayDisLikes.push('may'); break;
              case '06': arrayDisLikes.push('june'); break;
              case '07': arrayDisLikes.push('july'); break;
              case '08': arrayDisLikes.push('august'); break;
              case '09': arrayDisLikes.push('september'); break;
              case '10': arrayDisLikes.push('october'); break;
              case '11': arrayDisLikes.push('november'); break;
              case '12': arrayDisLikes.push('december'); break;

            }

          } else if (fechas.like = true) {
            var op = fechas.date.slice(5, -13);
            switch (op) {
              case '01': arrayLikes.push('january'); break;
              case '02': arrayLikes.push('february'); break;
              case '03': arrayLikes.push('march'); break;
              case '04': arrayLikes.push('april'); break;
              case '05': arrayLikes.push('may'); break;
              case '06': arrayLikes.push('june'); break;
              case '07': arrayLikes.push('july'); break;
              case '08': arrayLikes.push('august'); break;
              case '09': arrayLikes.push('september'); break;
              case '10': arrayLikes.push('october'); break;
              case '11': arrayLikes.push('november'); break;
              case '12': arrayLikes.push('december'); break;

            }
          }
        });
        // aqui se supone acabo la publicacion
        //       var repetidos = {};

        // arrayLikes.forEach(function(numero){
        //   repetidos[numero] = (repetidos[numero] || 0) + 1;
        // });
        // console.log(repetidos)
        // var repetidos1 = {};

        // arrayDisLikes.forEach(function(numero){
        //   repetidos1[numero] = (repetidos1[numero] || 0) + 1;
        // });
        // console.log(repetidos1)
      });
      console.log(
        this.january,
        this.february,
        this.march,
        this.april,
        this.may,
        this.june,
        this.july,
        this.august,
        this.september,
        this.october,
        this.november,
        this.december)
      // switch()
    }, 500);
  }






  changeTable() {
    if (this.change == 'Stadistics') {
      this.change = 'Table';
    } else if (this.change == 'Table') {
      this.change = 'Stadistics';

    }
  }
  filterOption(op) {
    switch (op) {

      case 'all': this.reactions = "all";

        break;
      case 'like': this.reactions = "like";

        break;
      case 'dislike': this.reactions = "dislike";

        break;
    }

  }
  delete(key, name) {
    Swal.fire({
      title: 'Seguro quieres eliminar la publicacin con el titulo',
      text: name + "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, Cancelar!',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.deleteNew(key);
        Swal.fire(
          'Eliminaste la publicación!',
          'publicación eliminda permanentente',
          'success'
        )
      }
    })
    // this.firebaseService.deleteNew(key);
    // console.log("se supone que elimino");
  }


  public editarNoticia( index : number){
    console.log('las noticias', this.publications);
    //console.log('Se presiono la noticia', this.publications[index] );

    this.noticiaIndex = index;


    this.formaNoticia.reset({
      titulo: this.publications[index].title,
      categoria: this.publications[index].categoria,
      encuesta :  this.publications[index].encuesta,
      descripcion: this.publications[index].description,
      endDate: this.publications[index].endDate,
      cambioImagen: false
    });

    if(! this.publications[index].encuesta ){
      this.preview.nativeElement.src = this.crearUrlImg( this.publications[index].urlimg );
    }


  }



  public verForm(){
    console.log(this.formaNoticia);
  }


  public async actualizarNoticia(){

    let noticiaEditada ={
    ...this.publications[this.noticiaIndex]  
    };


    if( this.formaNoticia.controls.cambioImagen.value ){

    noticiaEditada.urlimg = ( await this.subirImagen() ).public_id.split('/')[1];

    }

    noticiaEditada.title = this.formaNoticia.value.titulo;
    noticiaEditada.categoria = this.formaNoticia.value.categoria;
    noticiaEditada.encuesta = this.formaNoticia.value.encuesta;
    noticiaEditada.description = this.formaNoticia.value.descripcion;
    noticiaEditada.endDate = this.formaNoticia.value.endDate;


    this.firebaseService.updateNew( noticiaEditada.key, noticiaEditada)
    .then( () =>{

      this.mostrarModal({
        icon:'success',
        title:'Se actualizo la noticia correctamente'
      })

      console.log('Supuestamente se actualizo la noticia');

      const tiempo = setTimeout( ()=>{

        $('#cerrar').click()
  
        clearTimeout( tiempo );
  
      }, 2500);

    })
    .catch( err =>{

      this.mostrarModal({
        icon:'error',
        title:'Error al actualizar la noticia'
      })

      console.log('Error al actualizar la noticia',err);
    })
    


  }

  private mostrarModal( opciones: any){

    Swal.fire({
     ...opciones,
     showConfirmButton: false,
     timer: 2000
   });

}

  private cargarNoticiaForm (){

    this.formaNoticia = new FormGroup({

      titulo: new FormControl(null, Validators.required ),

      categoria: new FormControl(null, Validators.required ),

      encuesta : new FormControl(false, Validators.required ),

      descripcion: new FormControl(null, Validators.required),

      endDate: new FormControl(null, Validators.required),

      cambioImagen: new FormControl( false )


    });


  };

  private subirImagen(){

    const form = new FormData();
    form.append('upload_preset','sanminaNews' )
    form.append('file', this.imagenFile);

    //https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/resources/image
    return this.httpService.post<any>(`https://api.cloudinary.com/v1_1/dlor7n05z/upload`, form ).toPromise();
  
  }

  update(data) {

    console.log('Solo se le dio');
    this.ob = "";
    //  console.log("se supone que actualizo",data);

    this.ob = data;
    $("#title").val(this.ob.title);
    // $("#video").val(this.ob.video);
    if (this.ob.urlimg == "") {
      $("#urlimg").val("");
    } else {
      $("#urlimg").val("https://drive.google.com/file/d/" + this.ob.urlimg + "/view?usp=sharing");
    }
    $("#encuesta").val(this.ob.encuesta);   
    $("#categoria").val(this.ob.categoria);   
    $("#description").val(this.ob.description);
    $("#endDate").val(this.ob.endDate);
  }

  public cargarImagen(event){


    if( event.target.files.length > 0 ){
      const reader = new FileReader();

      reader.readAsDataURL( event.target.files[0] );
  
      reader.onload =( eventR : any)=>{
        
        this.imagenFile = event.target.files[0];
  
        this.preview.nativeElement.src = eventR.target.result;

        this.formaNoticia.controls.cambioImagen.setValue(true);
        this.formaNoticia.markAsDirty();
  
      }

    }else{

      console.log('Cancelo');
    }

    

}

  //Actualizar la noticia
  updateAll(data) {
      this.ob.title = $("#title").val(),
      this.ob.categoria = $("#categoria").val(),
      this.ob.urlimg = $("#urlimg").val().slice(32, -17),
      this.ob.encuesta = $('select[name=encuesta]').val(),
      this.ob.description = $("#description").val(),
      this.ob.endDate = $("#endDate").val()
      
      this.firebaseService.updateNew(this.ob.key, this.ob);


    const tiempo = setTimeout( ()=>{

      $('#cerrar').click()

      clearTimeout( tiempo );

    }, 5000);

  
    // console.log("se supone que actualizocon datos",this.ob);

  }
  getReacciones(likes, dislikes, allLikes) {
    this.likes = likes;
    this.dislikes = dislikes;
    this.allLikes = allLikes;

  }
}
