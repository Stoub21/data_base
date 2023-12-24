from app import db
from sqlalchemy import Sequence

class Joueur(db.Model):
    __tablename__ = 'joueur'
    id_joueur = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)
    prenom = db.Column(db.String(255), nullable=False)
    naissance = db.Column(db.Date, nullable=False)
    taille = db.Column(db.Integer, nullable=False)
    nationalite = db.Column(db.String(50), nullable=False)

class Sponsor(db.Model):
    __tablename__ = 'sponsor'
    id_sponsor = db.Column(db.Integer,Sequence('sponsor_id_seq'), primary_key=True)
    nom = db.Column(db.String(255), nullable=False)
    ville = db.Column(db.String(255), nullable=False)

class Club(db.Model):
    __tablename__ = 'club'
    id_club = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)
    championnat = db.Column(db.String(255), nullable=False)
    ville = db.Column(db.String(255), nullable=False)

class EquipeNationale(db.Model):
    __tablename__ = 'equipe_nationale'
    id_pays = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)

class Championnat(db.Model):
    __tablename__ = 'championnat'
    id_championnat = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)

class CompetitionClub(db.Model):
    __tablename__ = 'competition_club'
    id_competition_club = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)

class Match(db.Model):
    __tablename__ = 'match'
    id_match = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    type_match = db.Column(db.String(255), nullable=False)
    lieu = db.Column(db.String(255), nullable=False)

class CompetitionNationale(db.Model):
    __tablename__ = 'competition_nationale'
    id_competition_pays = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)

class MembreClub(db.Model):
    __tablename__ = 'membre_club'
    id_joueur = db.Column(db.Integer, primary_key=True)
    id_club = db.Column(db.Integer, primary_key=True)
    maillot = db.Column(db.String(50), nullable=False)
    entree = db.Column(db.Date, nullable=False)
    sortie = db.Column(db.Date, nullable=True)

class MembreNationale(db.Model):
    __tablename__ = 'membre_nationale'
    id_joueur = db.Column(db.Integer, primary_key=True)
    id_pays = db.Column(db.Integer, primary_key=True)
    maillot = db.Column(db.String(50), nullable=False)
    entree = db.Column(db.Date, nullable=False)
    sortie = db.Column(db.Date, nullable=True)

class FinancementClub(db.Model):
    __tablename__ = 'financement_club'
    id_club = db.Column(db.Integer, primary_key=True)
    id_sponsor = db.Column(db.Integer, primary_key=True)
    montant = db.Column(db.Integer, nullable=True)

class FinancementPays(db.Model):
    __tablename__ = 'financement_pays'
    id_pays = db.Column(db.Integer, primary_key=True)
    id_sponsor = db.Column(db.Integer, primary_key=True)
    montant = db.Column(db.Integer, nullable=False)

class JoueNationale(db.Model):
    __tablename__ = 'joue_nationale'
    id_match = db.Column(db.Integer, primary_key=True)
    id_pays1 = db.Column(db.Integer, primary_key=True)
    id_pays2 = db.Column(db.Integer, primary_key=True)
    id_competition = db.Column(db.Integer, nullable=False)
    vainqueur = db.Column(db.Integer, nullable=True)

class JoueClub(db.Model):
    __tablename__ = 'joue_club'
    id_match = db.Column(db.Integer, primary_key=True)
    id_club1 = db.Column(db.Integer, primary_key=True)
    id_club2 = db.Column(db.Integer, primary_key=True)
    id_competition_club = db.Column(db.Integer, nullable=True)
    id_championnat = db.Column(db.Integer, nullable=True)
    saison = db.Column(db.String(10), nullable=True)
    vainqueur = db.Column(db.Integer, nullable=True)

class Statistique(db.Model):
    __tablename__ = 'statistique'
    id_match = db.Column(db.Integer, primary_key=True)
    id_joueur = db.Column(db.Integer, primary_key=True)
    trois_points = db.Column(db.Integer, nullable=True)
    deux_points = db.Column(db.Integer, nullable=True)
    lancer_franc = db.Column(db.Integer, nullable=True)
    taux_de_reussite = db.Column(db.DECIMAL(5, 2), nullable=True)
    passe_decisive = db.Column(db.Integer, nullable=True)
    rebond = db.Column(db.Integer, nullable=True)
    faute = db.Column(db.Integer, nullable=True)
    block = db.Column(db.Integer, nullable=True)
    temps_de_jeux = db.Column(db.Interval, nullable=True)