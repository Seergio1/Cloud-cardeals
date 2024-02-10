import React from 'react'
import Stat from './assets/img/stat.svg'
import Service from './assets/img/service.svg'


import Ajout from './assets/img/ajout.svg'
import Liste from './assets/img/liste.svg'
import Annonce from './assets/img/annonce.svg'
import Demande from './assets/img/demande.svg'


import Juridique from './assets/img/juridique.svg'
import It from './assets/img/it.svg'
import Marketing from './assets/img/marketing.svg'
import Rh from './assets/img/humain.svg'
import Logo from './assets/img/Logo.svg'

import Deconnexion from './assets/img/deconnexion.svg'
import Entretien from './assets/img/entretien.png'

import Sante from './assets/img/sante.svg'
import Finance from './assets/img/finance.svg'
import Foncier from './assets/img/foncier.png'
import Transaction from './assets/img/transaction.png'
import Localisation from './assets/img/carte.png'

import User from './assets/img/user.png'
import Ellipse from './assets/img/ellipse.png'


// icon nav bar pour template
// import IconHome from './icon/Home.svg'
// import IconSetting from './icon/Settings.svg'
// import IconPlanning from './icon/Calendar.svg'
// import IconStat from './icon/Part.svg'
// import IconNote from './icon/Note.svg'


function Icon({ pathIcon }) {
  if ("stat" === pathIcon) {
    return Stat
  } else if ("ajout" === pathIcon) {
    return Ajout
  } else if ("liste" === pathIcon) {
    return Liste
  } else if ("annonce" === pathIcon) {
    return Annonce
  } else if ("demande" === pathIcon) {
    return Demande
  } else if ("juridique" === pathIcon) {
    return Juridique
  } else if ("it" === pathIcon) {
    return It
  } else if ("marketing" === pathIcon) {
    return Marketing
  } else if ("service" === pathIcon) {
    return Service
  } else if ("humain" === pathIcon) {
    return Rh
  } else if ("logo" === pathIcon) {
    return Logo
  } else if ("deconnexion" === pathIcon) {
    return Deconnexion
  } else if ("entretien" === pathIcon) {
    return Entretien
  }
  else if ("sante" === pathIcon) {
    return Sante
  } else if ("finance" === pathIcon) {
    return Finance
  } else if ("foncier" === pathIcon) {
    return Foncier
  } else if ("transaction" === pathIcon) {
    return Transaction
  } else if ("carte" === pathIcon) {
    return Localisation
  } else if ("user" === pathIcon) {
    return User;
  } else if ("ellipse" === pathIcon) {
    return Ellipse;
  }
  // icon pour nav bar pour le template
  else if ("icon_nav_home" === pathIcon) {
    // return IconHome;
  } else if ("icon_nav_stat" === pathIcon) {
    // return IconStat;
  } else if ("icon_nav_setting" === pathIcon) {
    // return IconSetting;
  } else if ("icon_nav_planning" === pathIcon) {
    // return IconPlanning;
  }
  else if ("icon_nav_note" === pathIcon) {
    // return IconNote;
  }
}

export default Icon