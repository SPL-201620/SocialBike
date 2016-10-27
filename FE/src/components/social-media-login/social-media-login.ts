import { Component } from '@angular/core';
import {IUser} from '../../shared/interfaces';
import {TabsPage} from '../../pages/tabs/tabs';
import { AboutPage } from '../../pages/about/about';
import {RegisterPage} from '../../pages/register/register';

import { User } from '../../shared/classes';

import {UserService} from '../../services/user.service';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { Storage } from '@ionic/storage';

import { NavController, AlertController } from 'ionic-angular';

//Credenciales para login por medio de redes sociales
var myFirebaseSocialAuthConfig = {
  provider: null,
  method: null
}

/*
  Generated class for the SocialMediaLogin component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
/*
  Desarrollo: 10-2016
  Componente de la solucion SocialBike con la autenticacion por medio de redes sociales. Este componente es opcional en la generacion de la aplicacion
  Permite el login en las redes sociales de Google, Facebook y Twitter
*/


@Component({
  selector: 'social-media-login',
  templateUrl: 'social-media-login.html'
})



// Clase que permite el login en redes sociales. 
// Primero consulta en la red social el login de usuario y si es exitoso procede a crear un registro en la base de datos de SocialBike
export class SocialMediaLogin {

  text: string;
  private logUser:any; //guarda el usario logeado en las redes sociales usando firebase
  private user: User; //Clase que tiene los datos del usuario a ser guardado

  
  constructor(public navCtrl: NavController, private userService : UserService, public alertCtrl: AlertController, public storage: Storage) {
    console.log('SocialMediaLogin Component ');
    this.text = 'Or Sign-in using SocialMedia';
  }
  
  loginFirebaseAuthGoogle(provider:String) : void {
       
        
       //Switch que inicializa las variables de credenciales dependiendo de la red social a usar
        console.log("Social Media Provider " + provider);
        switch (provider) {
          case "Google":
            myFirebaseSocialAuthConfig.provider = AuthProviders.Google;
            myFirebaseSocialAuthConfig.method = AuthMethods.Popup;
            break;
          case "Facebook":
            myFirebaseSocialAuthConfig.provider = AuthProviders.Facebook;
            myFirebaseSocialAuthConfig.method = AuthMethods.Popup;
            break;
          case "Twitter":
            myFirebaseSocialAuthConfig.provider = AuthProviders.Twitter;
            myFirebaseSocialAuthConfig.method = AuthMethods.Redirect;
            break;
        }
        // Llama los servicios de usuario para hacer el login via firebase
        this.userService.loginFirebaseAuthGoogle(myFirebaseSocialAuthConfig).then((res:any) => {
          if (res) {
              this.logUser = res;
              // Si el usuario despues de logearse ya existe en la aplicacion entonces continual al home page
              this.userService.getUserByFirebaseId(res.uid).subscribe((user:IUser) => {
                    console.log("Logged User " + user.firebaseId);
                    this.user = user;
                    this.storage.set("userId", this.logUser.uid);
                    this.userService.getUserByFirebaseId(this.logUser.uid).subscribe((user:IUser) => {
                          this.storage.set("userDBId", user.id);
                          this.navCtrl.push(TabsPage);
                    });
            }, (error: any) => {
                console.log("ERROR " + error.status);
                // Si el usario no existe en la base de datos lo crea primero y luego de esto lo dirige a la pagina de actualizacion de datos para
                // que complete la informacion
                if (error.status === 400) { //No existente en BD
                    console.log("INSERTING USER:" + JSON.stringify(this.logUser));
                    this.user = new User(-1, this.logUser.uid, (this.logUser.auth.email === null? 'undefined@undef.com': this.logUser.auth.email ), null, 
                                                                (this.logUser.auth.displayName === null? "UNDEFINED": this.logUser.auth.displayName), 
                                                                null, null, null);
                    console.log("INSERTING USER JSON:" + JSON.stringify(this.user));
                    this.userService.saveUser(this.user).subscribe((status: boolean) => {
                    console.log("Usuario Guardado " + this.user.firebaseId);
                    if (status) {
                        //Setea las variables del usuario actual en sesion
                          this.storage.set("userId", this.logUser.uid);
                          this.userService.getUserByFirebaseId(this.logUser.uid).subscribe((user:IUser) => {
                          this.storage.set("userDBId", user.id);
                          this.navCtrl.push(TabsPage); //Mete la pagina Home en la pila para cuando se de back en about regrese a la pagina homepage
                          this.navCtrl.push(AboutPage); // Como es nuevo pide que actualice los datos
                          this.showAlert("Success!", "Please add some additional information of you to improve your experience in SocialBike.");
                      });
                    } else { //Si no se pudo crear usuario en la base de datos
                      console.log("There is a problem saving the user. status " + JSON.stringify(status));
                    }
                  }, (error: any) => { 
                        console.log("There is a problem saving the user." + JSON.stringify(error));
                  }
                  );
                } else {
                  console.log("ERROR Social Media Auth: " + provider + JSON.stringify(error)); // Si hubo error en autenticacion con firebase y la red social
                }
            }
        );
        }
      });
       
  }
  
  //Muestra la alerta de exito en el login 
  showAlert(title: string, subTitle: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
  }
}
