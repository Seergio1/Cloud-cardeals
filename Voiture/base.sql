create database rojo;
\c rojo;
create table categorie(
    id serial primary key,
    nom varchar(255)
);
create table marque(
    id serial primary key,
    nom varchar(255)
);

create table modele(
    id serial primary key,
    id_marque int,
    nom varchar(255),

    foreign key(id_marque) references marque(id)
);
create table employer(

    id serial primary key,
     firstname varchar(255),
    lastname varchar(255),
     email varchar(255),
     password varchar(255),
     role varchar(255)

);
create table voiture(
    id serial primary key,
    id_marque int,
    id_modele int,
    id_categorie int,
    id_employer int,
    etat int,
    prix double precision,
    matricule varchar(255),
    foreign key(id_categorie) references marque(id),
    foreign key(id_marque) references marque(id),
    foreign key(id_modele) references modele(id),
    foreign key(id_employer) references employer(id)
);

create table annonce(
    id serial primary key,
    id_employer int,
    id_voiture int,
    description varchar(255),
    etat_annonce varchar(255),
    status_voiture varchar(255),
    date date,
    foreign key(id_employer) references employer(id),
    foreign key(id_voiture) references voiture(id)

);

create table annonce_favoris(
    id serial primary key,
    id_employer int,
    id_annonce int,
    foreign key(id_employer) references employer(id),
    foreign key(id_annonce) references annonce(id)
);
create table moteur(
    id serial primary key,
    nom varchar(255) 
);
create table carburant(
    id serial primary key,
    nom varchar(255) 
);
create table boite_de_vitesse(
    id serial primary key,
    nom varchar(255)
);
create table caracteristique(
    id serial primary key,
    id_voiture int,
    id_moteur int,
    id_carburant int,
    id_boite_de_vitesse int,
    foreign key(id_voiture) references voiture(id),
    foreign key(id_moteur) references moteur(id),
    foreign key(id_carburant) references carburant(id),
     foreign key(id_boite_de_vitesse) references boite_de_vitesse(id)
);

create table commission(
    id serial primary key,
    id_annonce int, 
    montant double precision,
    foreign key(id_annonce) references annonce(id)
);
create table vente(
    id serial primary key,
    id_voiture int,
    id_vendeur int ,
    id_client int ,
    prix double precision,
    foreign key(id_voiture) references voiture(id),
    foreign key(id_vendeur) references employer(id),
    foreign key(id_client) references employer(id)
);