import React from "react";
import { NavbarComponent } from './NavbarComponent';


class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavbarComponent /><br /><br />
        <div class="jumbotron">
          <p class="lead">
            <b>Agro Interest</b> est un site pour rencontrer un agriculteur ou qui a un
            passe-temps à cultiver (jardinier) et aussi pour rencontrer un
            prêteur ou un donneur de matériel agricole.
          </p>
          <hr class="my-4"></hr>
          <p className="lead">
            <b>Vous êtes agriculteur ?</b><br></br> Vous voulez vous rencontrer et partager vos
            expériences pour qui veut cultiver dans votre ferme ? <br></br>ou <br></br><b>Avez-vous
            un passe-temps à cultiver ?</b><br></br> Si oui, voulez-vous rencontrer un
            agriculteur pour avoir une bonne expérience ? <br></br>ou <br></br><b>Avez-vous du
            matériel agricole ?</b><br></br> Si oui, voulez-vous donner ou prêter à d'autres
            ? <br></br>Si vous êtes l'un d'entre eux, veuillez vous inscrire et
            manifester votre intérêt.
          </p>
          <a href="/register"><button className="btn btn-secondary">Inscrire ici</button></a><br></br><br></br>

          <p className="lead"><b>Sinon, vous pouvez accéder à des pages d'article et d'expérience.</b></p>
        </div>
      </div>
    );
  }

  
}

export {HomeComponent};
