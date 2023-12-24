import datetime
from datetime import datetime
import random
from flask import render_template, request, jsonify
from app import app, db
from app.models import Club, CompetitionClub, CompetitionNationale, Championnat, EquipeNationale, FinancementClub, FinancementPays, JoueClub, JoueNationale, Joueur, Match, MembreClub, MembreNationale, Sponsor, Statistique
from sqlalchemy import func,desc, and_,text
import csv

def create_schema_and_data():
    with app.app_context():
        db.create_all()
        liste_table=[Sponsor, Joueur, EquipeNationale, Club, CompetitionClub, CompetitionNationale, Championnat, Match, FinancementClub, FinancementPays, JoueClub, JoueNationale, MembreClub, MembreNationale, Statistique]
        for table in liste_table:
            Count_data_table=db.session.query(table).count()
            if Count_data_table == 0:

                if table == Sponsor:
                    with open('Basket/initialisation_data/Sponsor.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            sponsor = table(id_sponsor=row[0], nom=row[1], ville=row[2])
                            db.session.add(sponsor)

                if table == Joueur:
                    with open('Basket/initialisation_data/Joueur.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            joueur = table(id_joueur=row[0], nom=row[1], prenom=row[2], naissance=row[3], taille=row[4], nationalite=row[5])
                            db.session.add(joueur)

                if table == EquipeNationale:
                    with open('Basket/initialisation_data/Equipe_Nationale.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            row = [value if value != '' else None for value in row]
                            equipe_nationale = table(id_pays=row[0], nom=row[1])
                            db.session.add(equipe_nationale)
                            
                if table == Club:
                    with open('Basket/initialisation_data/Club.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            club = table(id_club=row[0], nom=row[1],championnat=row[2], ville=row[3])
                            db.session.add(club)

                if table == CompetitionClub:
                    with open('Basket/initialisation_data/Competition_Club.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            competition_club = table(id_competition_club=row[0], nom=row[1])
                            db.session.add(competition_club)

                if table == CompetitionNationale:
                    with open('Basket/initialisation_data/Competition_Nationale.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            competition_nationale = table(id_competition_pays=row[0], nom=row[1])
                            db.session.add(competition_nationale)
                    
                if table == Championnat:
                    with open('Basket/initialisation_data/Championnat.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            championnat = table(id_championnat=row[0], nom=row[1])
                            db.session.add(championnat)
                    
                if table == Match:
                    with open('Basket/initialisation_data/Match.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            match = table(id_match=row[0], date=row[1],type_match=row[2], lieu=row[3])
                            db.session.add(match)
                    
                if table == FinancementClub:
                    with open('Basket/initialisation_data/Financement_Club.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            financement_club = table(id_club=row[0], id_sponsor=row[1],montant=row[2])
                            db.session.add(financement_club)

                if table == FinancementPays:
                    with open('Basket/initialisation_data/Financement_Pays.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            financement_pays = table(id_pays=row[0], id_sponsor=row[1],montant=row[2])
                            db.session.add(financement_pays)
                        
                if table == JoueClub:
                    with open('Basket/initialisation_data/Joue_Club.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            joue_club = table(id_match=row[0], id_club1=row[1],id_club2=row[2],id_competition_club=row[3],id_championnat=row[4],saison=row[5],vainqueur=row[6])
                            db.session.add(joue_club)

                if table == JoueNationale:
                    with open('Basket/initialisation_data/Joue_Nationale.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            joue_nationale = table(id_match=row[0], id_pays1=row[1],id_pays2=row[2],id_competition=row[3],vainqueur=row[4])
                            db.session.add(joue_nationale)

                if table == MembreClub:
                    with open('Basket/initialisation_data/Membre_Club.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            membre_club = table(id_joueur=row[0], id_club=row[1],maillot=row[2],entree=row[3],sortie=row[4])
                            db.session.add(membre_club)
                
                if table == MembreNationale:
                    with open('Basket/initialisation_data/Membre_Nationale.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            membre_nationale = table(id_joueur=row[0], id_pays=row[1],maillot=row[2],entree=row[3],sortie=row[4])
                            db.session.add(membre_nationale)
                
                if table == Statistique:
                    with open('Basket/initialisation_data/Statistique.csv', 'r', encoding='utf-8') as csvfile:
                        csv_reader = csv.reader(csvfile)
                        for row in csv_reader:
                            row = [value if value != '' else None for value in row]
                            statistique = table(id_match=row[0], id_joueur=row[1],trois_points=row[2],deux_points=row[3],lancer_franc=row[4],taux_de_reussite=row[5],passe_decisive=row[6],rebond=row[7],faute=row[8],block=row[9],temps_de_jeux=row[10])
                            db.session.add(statistique)
        
        if db.engine.dialect.name == 'postgresql':
            with db.engine.connect() as connection:
                connection.execute(text("SELECT setval('sponsor_id_seq', (SELECT MAX(id_sponsor) FROM sponsor));"))
                connection.execute(text("SELECT setval('joueur_id_joueur_seq', (SELECT MAX(id_joueur) FROM joueur));"))
                connection.execute(text("SELECT setval('equipe_nationale_id_pays_seq', (SELECT MAX(id_pays) FROM equipe_nationale));"))
                connection.execute(text("SELECT setval('club_id_club_seq', (SELECT MAX(id_club) FROM club));"))
                connection.execute(text("SELECT setval('competition_club_id_competition_club_seq', (SELECT MAX(id_competition_club) FROM competition_club));"))
                connection.execute(text("SELECT setval('competition_nationale_id_competition_pays_seq', (SELECT MAX(id_competition_pays) FROM competition_nationale));"))
                connection.execute(text("SELECT setval('championnat_id_championnat_seq', (SELECT MAX(id_championnat) FROM championnat));"))
                connection.execute(text("SELECT setval('match_id_match_seq', (SELECT MAX(id_match) FROM match));"))
        db.session.commit()
           

            

def contains_number(s):
    # Iterate through each character in the string
    for char in s:
        if char.isdigit():
            return True
    return False


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/pays')
def pays():
    equipeNationales = EquipeNationale.query.all()
    return render_template('pays.html',equipeNationales = equipeNationales)

@app.route('/club')
def club():
    clubs = Club.query.all()
    return render_template('club.html', clubs = clubs)

@app.route('/sponsor')
def sponsor():
    sponsors = Sponsor.query.all()
    return render_template('sponsor.html',sponsors = sponsors)

@app.route('/administration')
def administration():
    return render_template('administration.html')

@app.route('/competition')
def competition():
    return render_template('administration/competition.html')

@app.route('/championnat')
def championnat():
    return render_template('administration/championnat.html')

@app.route('/sponsorAdmin')
def sponsorAdmin():
    return render_template('administration/sponsorAdmin.html')

@app.route('/joueur')
def joueur():
    return render_template('administration/joueur.html')

@app.route('/match')
def match():
    return render_template('administration/match.html')

@app.route('/get_select', methods=['POST'])
def get_tallest_team():
    # Create a subquery to calculate the average height per club
    subquery = (
        db.session.query(
            MembreClub.id_club,
            func.avg(Joueur.taille).label('moyenne_taille')
        )
        .join(Joueur, MembreClub.id_joueur == Joueur.id_joueur)
        .group_by(MembreClub.id_club)
        .subquery()
    )

    # Use the subquery to get the team with the tallest players on average
    result = (
        db.session.query(Club.nom.label('nom_equipe'), subquery.c.moyenne_taille)
        .join(subquery, Club.id_club == subquery.c.id_club)
        .order_by(subquery.c.moyenne_taille.desc())
        .first()
    )

    if result:
        # If there is a result, return it as JSON
        return jsonify({'nom_equipe': result.nom_equipe, 'moyenne_taille': result.moyenne_taille})
    else:
        # If no result is found, return an appropriate response
        return jsonify({'error': 'No data found'}), 404


@app.route('/get_results', methods=['POST'])
def get_results():
    selected_option = request.form.get('selectedOption')

    if selected_option == "Plus grand joueur":
        # Logique pour récupérer le joueur le plus grand parmi tous les clubs
        # Utilisez SQLAlchemy pour exécuter la requête
        # Remplacez cette partie avec votre propre logique

        # Exemple générique :
        result = db.session.query(
            Club.nom.label('club_nom'),
            Joueur.nom.label('joueur_nom'),
            Joueur.taille.label('taille_joueur')
        ).join(MembreClub, Club.id_club == MembreClub.id_club
        ).join(Joueur, MembreClub.id_joueur == Joueur.id_joueur
        ).group_by(Club.nom, Joueur.nom, Joueur.taille
        ).order_by(desc('taille_joueur')).first()

        # Convertir le résultat en dictionnaire
        result_dict = {'club_nom': result.club_nom, 'joueur_nom': result.joueur_nom, 'taille_joueur': result.taille_joueur}

        return jsonify({'result': result_dict})

    if selected_option == "% 3 points":
        # Logique pour récupérer le joueur qui a marqué le plus de 3 points par club
        # Utilisez SQLAlchemy pour exécuter la requête
        # Remplacez cette partie avec votre propre logique

        # Exemple générique :
        subquery = db.session.query(
            Statistique.id_joueur,
            Club.nom.label('club_nom'),
            func.sum(Statistique.trois_points).label('total_points')
        ).join(MembreClub, Statistique.id_joueur == MembreClub.id_joueur
        ).join(Club, MembreClub.id_club == Club.id_club
        ).group_by(Statistique.id_joueur, Club.nom
        ).subquery()

        # Requête principale pour obtenir le joueur avec le plus grand total de points à trois points par club
        result = db.session.query(
            subquery.c.club_nom,
            Joueur.nom.label('joueur_nom'),
            func.max(subquery.c.total_points).label('max_points')
        ).join(subquery, and_(
            subquery.c.id_joueur == Joueur.id_joueur,
            subquery.c.club_nom == Joueur.nom  # Assurez-vous que vous faites la jointure sur le bon champ
        )).group_by(subquery.c.club_nom, Joueur.nom
        ).order_by(desc('max_points')).all()

        # Convertir le résultat en dictionnaire
        result_list = []
        for row in result:
            result_dict = {'club_nom': row.club_nom, 'joueur_nom': row.joueur_nom, 'max_points': row.max_points}
            result_list.append(result_dict)

        return jsonify({'result': result_list})

    if selected_option == "Plus grands joueurs en moyenne":
        subquery = (
            db.session.query(
                MembreClub.id_club,
                func.avg(Joueur.taille).label('average_height')
            )
            .join(Joueur, MembreClub.id_joueur == Joueur.id_joueur)
            .group_by(MembreClub.id_club)
            .subquery()
        )

        result = (
            db.session.query(
                Club.nom.label('club_nom'),
                subquery.c.average_height
            )
            .join(subquery, Club.id_club == subquery.c.id_club)
            .order_by(subquery.c.average_height.desc())
            .first()
        )

        # Convert the result to a dictionary
        result_dict = {'club_nom': result.club_nom, 'moyenne_taille': result.average_height}
        return jsonify({'result': result_dict})


    if selected_option == "Vainqueur plus de 3 EuroLeague":
# Subquery to count the number of EuroLeague titles for each club
        euroleague_titles_subquery = (
            db.session.query(
                JoueClub.id_club1.label('club_id'),
                func.count().label('num_titles')
            )
            .join(Match, JoueClub.id_match == Match.id_match)
            .join(CompetitionClub, JoueClub.id_competition_club == CompetitionClub.id_competition_club)
            .filter(CompetitionClub.nom == 'EuroLeague')
            .filter(JoueClub.vainqueur == JoueClub.id_club1)
            .group_by(JoueClub.id_club1)
            .subquery()
        )

        # Main query to retrieve clubs with more than 3 EuroLeague titles
        result = (
            db.session.query(Club, euroleague_titles_subquery.c.num_titles)
            .join(euroleague_titles_subquery, Club.id_club == euroleague_titles_subquery.c.club_id)
            .filter(euroleague_titles_subquery.c.num_titles > 3)
            .all()
        )

        # Convertir le résultat en liste de dictionnaires
        result_list = [{'club_nom': club.nom, 'nombre_titre': num_titles} for club, num_titles in result]

        return jsonify({'result': result_list})
    # Si l'option est "Sélectionner un critère" ou toute autre option non prise en charge
    return jsonify({'result': None})


@app.route('/get_results_club', methods=['POST'])
def get_results_club():
    selected_option = request.form.get('selectedOption')
    selected_club = request.form.get('selectedClubId') 

    # Requête pour obtenir le joueur avec la plus grande moyenne de passes décisives pour le club sélectionné
    result = db.session.query(
        Joueur.nom.label('joueur_nom'),
        func.avg(Statistique.passe_decisive).label('moyenne_passe_decisive')
    ).join(MembreClub, Joueur.id_joueur == MembreClub.id_joueur
    ).join(Statistique, Joueur.id_joueur == Statistique.id_joueur
    ).filter(MembreClub.id_club == selected_club
    ).group_by(Joueur.nom
    ).order_by(desc('moyenne_passe_decisive')).first()

    # Check if the result is not None
    if result is not None:
        # Convert the result to a dictionary
        result_dict = {'joueur_nom': result.joueur_nom, 'moyenne_passe_decisive': result.moyenne_passe_decisive}
        return jsonify({'result': result_dict})
    else:
        return jsonify({'result': None})

@app.route('/get_results_pays', methods=['POST'])
def get_results_pays():
    selected_option = request.form.get('selectedOption')
    selected_pays = request.form.get('selectedPaysId') 
# Query to get the top 10 scorers for the selected country
    subquery = db.session.query(
        MembreNationale.id_joueur,
        func.sum(Statistique.trois_points + Statistique.deux_points + Statistique.lancer_franc).label('total_points')
    ).join(Statistique, MembreNationale.id_joueur == Statistique.id_joueur
    ).filter(MembreNationale.id_pays == selected_pays
    ).group_by(MembreNationale.id_joueur
    ).subquery()

    # Query to get the top 10 scorers for the selected country
    result = db.session.query(
        Joueur.nom.label('joueur_nom'),
        subquery.c.total_points
    ).join(subquery, Joueur.id_joueur == subquery.c.id_joueur
    ).order_by(desc(subquery.c.total_points)).limit(10).all()
    # Check if the result is not None
    if result is not None:
        # Convert the result to a dictionary
        result_list = [
        {'joueur_nom': row.joueur_nom, 'total_points': row.total_points}
        for row in result ]
        return jsonify({'result': result_list})
    else:
        return jsonify({'result': None})

@app.route('/get_results_sponsor', methods=['POST'])
def get_results_sponsor():
    selected_option = request.form.get('selectedOption')
    print(selected_option)
    selected_sponsor = request.form.get('selectedSponsorId') 

    if selected_option == "Pays sponsorisé":
    # Subquery to count the number of EuroLeague titles for each club
        result = (
        db.session.query(
            FinancementPays.id_pays,
            EquipeNationale.nom.label('pays_nom'),
            FinancementPays.montant.label('montant_sponsor')
        )
        .join(Sponsor, FinancementPays.id_sponsor == Sponsor.id_sponsor)
        .join(EquipeNationale, FinancementPays.id_pays == EquipeNationale.id_pays)
        .filter(Sponsor.id_sponsor == selected_sponsor)
        .order_by(desc(FinancementPays.montant))
        .all()
        )

        # Convert the result to a list of dictionaries
        result_list = [
            {'pays_id': row.id_pays, 'pays_nom': row.pays_nom, 'montant_sponsor': row.montant_sponsor}
            for row in result
        ]
        return jsonify({'result': result_list})

    if selected_option == "Club sponsorisé":
        result = (
            db.session.query(
                FinancementClub.id_club,
                Club.nom.label('club_nom'),
                FinancementClub.montant.label('montant_sponsor')
            )
            .join(Sponsor, FinancementClub.id_sponsor == Sponsor.id_sponsor)
            .join(Club, FinancementClub.id_club == Club.id_club)
            .filter(Sponsor.id_sponsor == selected_sponsor)
            .order_by(desc(FinancementClub.montant))
            .all()
        )

        # Convert the result to a list of dictionaries
        result_list = [
            {'club_id': row.id_club, 'club_nom': row.club_nom, 'montant_sponsor': row.montant_sponsor}
            for row in result
        ]

        # Return the result as JSON
        return jsonify({'result': result_list})

    if selected_option == "Vainqueur de la FIBA":
# Sous-requête pour compter le nombre de victoires de la FIBA pour chaque sponsor
        fibavictories_subquery = (
            db.session.query(
                FinancementPays.id_sponsor.label('sponsor_id'),
                func.count().label('num_victories')
            )
            .join(JoueNationale, FinancementPays.id_pays == JoueNationale.vainqueur)
            .filter(JoueNationale.id_competition == '1')  # Assurez-vous que 'FIBA' est le bon identifiant de compétition
            .group_by(FinancementPays.id_sponsor)
            .subquery()
        )

        # Requête principale pour obtenir le sponsor avec le plus grand nombre de victoires de la FIBA
        result = (
            db.session.query(Sponsor, func.coalesce(fibavictories_subquery.c.num_victories, 0).label('num_victories'))
            .outerjoin(fibavictories_subquery, Sponsor.id_sponsor == fibavictories_subquery.c.sponsor_id)
            .order_by(desc('num_victories'))
            .first()
        )

        result_dict = {'sponsor_nom': result.Sponsor.nom, 'nombre_victoires_fiba': result.num_victories}
        return jsonify({'result': result_dict})


    if selected_option == "Top 10 des sponsors":
        top_sponsors = (
            db.session.query(
                Sponsor.nom,
                func.sum(FinancementClub.montant + FinancementPays.montant).label('total_montant')
            )
            .join(FinancementClub, Sponsor.id_sponsor == FinancementClub.id_sponsor)
            .join(FinancementPays, Sponsor.id_sponsor == FinancementPays.id_sponsor)
            .group_by(Sponsor.id_sponsor)
            .order_by(text('total_montant DESC'))
            .limit(10)
            .all()
        )

        # Convertir les résultats en un dictionnaire si nécessaire
        result_list = [{'sponsor_nom': sponsor.nom, 'total_montant': sponsor.total_montant} for sponsor in top_sponsors]
        return jsonify({'result': result_list})

    return jsonify({'result': None})


@app.route('/get_competition', methods=['POST'])
def get_competition():
    selected_option = request.form.get('teamType')
    if selected_option == 'pays':
        competitions = CompetitionNationale.query.all()
        competition_data = [{'id': competition.id_competition_pays ,'nom': competition.nom} for competition in competitions]

    elif selected_option == 'club':
        competitions = CompetitionClub.query.all()
        competition_data = [{'id': competition.id_competition_club ,'nom': competition.nom} for competition in competitions]

    return jsonify({'competitions': competition_data})

@app.route('/update_competition', methods=['POST'])
def update_competition():
    data = request.json
    selected_id = data.get('id')
    nouveau_nom = data.get('contenu')
    teamType = data.get('teamType')

    try:
        competition = (CompetitionNationale.query.get(selected_id) 
            if teamType == 'pays' 
            else CompetitionClub.query.get(selected_id))

        if not nouveau_nom.strip():
            return jsonify({'message': 2})
        if competition:
            # Vérifiez si le nom est différent avant de mettre à jour
            if competition.nom != nouveau_nom:
                competition.nom = nouveau_nom
                db.session.commit()
                return jsonify({'message': 0})
            else:
                return jsonify({'message': 1})
        else:
            return jsonify({'message': 2})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()   

@app.route('/delete_competition', methods=['POST'])
def delete_competition():
    data = request.json
    selected_id = data.get('id')
    teamType = data.get('teamType')

    try:
        competition = (CompetitionNationale.query.get(selected_id) 
            if teamType == 'pays' 
            else CompetitionClub.query.get(selected_id))

        if competition:
            # Vérifier si la compétition est utilisée avant de la supprimer
            is_used = isCompetitionUsed(selected_id, teamType)
            
            if not is_used:
                # Supprimer la compétition
                db.session.delete(competition)
                db.session.commit()
                return jsonify({'message': 1})  # Suppression réussie
            else:
                return jsonify({'message': 2})  # La compétition est utilisée, ne peut pas être supprimée
        else:
            return jsonify({'message': 0})  # La compétition n'existe pas
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()


def isCompetitionUsed(competition_id, teamType):
    # Si teamType est 'pays', vérifier s'il y a des matches associés à cette compétition nationale
    if teamType == 'pays':
        return JoueNationale.query.filter(
            (JoueNationale.id_competition == competition_id) 
        ).count() > 0

    # Si teamType est 'club', vérifier s'il y a des matches ou des relations de club associés à cette compétition de club
    elif teamType == 'club':
        return (
            JoueClub.query.filter_by(id_competition_club=competition_id).count() > 0 
        )

    # Si le type d'équipe n'est ni 'pays' ni 'club', retourner False par défaut
    return False


@app.route('/create_competition', methods=['POST'])
def create_competition():
    data = request.json
    new_nom = data.get('nom')  # Ajustez cela en fonction de vos données d'entrée
    teamType = data.get('teamType')

    try:
        # Récupérer l'identifiant maximal existant
        max_id = (
            db.session.query(func.max(CompetitionClub.id_competition_club))
            if teamType == 'club'
            else db.session.query(func.max(CompetitionNationale.id_competition_pays))
        ).scalar()

        # Incrémenter l'identifiant maximal
        new_id = max_id + 1 if max_id is not None else 1

        # Créer une nouvelle instance de compétition
        new_competition = (
            CompetitionNationale(id_competition_pays=new_id, nom=new_nom)
            if teamType == 'pays'
            else CompetitionClub(id_competition_club=new_id, nom=new_nom)
        )

        # Ajouter et valider la nouvelle compétition
        db.session.add(new_competition)
        db.session.commit()

        return jsonify({'message': 'Competition créée avec succès !'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()


@app.route('/get_sponsors', methods=['POST'])
def get_sponsors():
    try:
        # Exemple de récupération de tous les sponsors
        sponsors = Sponsor.query.all()

        # Formattez les sponsors pour les envoyer en tant que réponse JSON
        sponsor_list = [{'id': sponsor.id_sponsor, 'nom': sponsor.nom} for sponsor in sponsors]

        return jsonify({'sponsors': sponsor_list})
    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/delete_sponsor', methods=['POST'])
def delete_sponsor():
    data = request.json
    selected_id = data.get('id')

    try:
        # Recherchez le sponsor par ID
        sponsor = Sponsor.query.get(selected_id)
        if sponsor:
            # Comptez le nombre de financements associés au sponsor dans FinancementClub
            club_financement_count = FinancementClub.query.filter_by(id_sponsor=selected_id).count()
            # Comptez le nombre de financements associés au sponsor dans FinancementPays
            pays_financement_count = FinancementPays.query.filter_by(id_sponsor=selected_id).count()
            print(club_financement_count)
            print(pays_financement_count)

            if club_financement_count > 0 or pays_financement_count > 0:
                # Le sponsor sponsorise un club ou un pays, donc ne peut pas être supprimé
                return jsonify({'message': 2})  # Message indiquant que le sponsor est actif et ne peut pas être supprimé
            # Aucun financement associé, le sponsor peut être supprimé
            db.session.delete(sponsor)
            db.session.commit()
            return jsonify({'message': 1})  # Succès
        else:
            return jsonify({'message': 0})  # Aucun sponsor trouvé
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()


@app.route('/create_sponsor', methods=['POST'])
def create_sponsor():
    data = request.json
    new_nom = data.get('nom')
    new_ville = data.get('ville')  # Ajoutez la logique pour récupérer d'autres données si nécessaire

    try:
        # Obtenir le prochain identifiant en utilisant la fonction max
        max_id = db.session.query(func.max(Sponsor.id_sponsor)).scalar()

        # Incrémenter l'identifiant maximal
        new_id = max_id + 1 if max_id is not None else 1

        # Créer une nouvelle instance de sponsor avec le nom, la ville et le nouvel identifiant
        new_sponsor = Sponsor(id_sponsor=new_id, nom=new_nom, ville=new_ville)

        # Ajouter et valider le nouveau sponsor
        db.session.add(new_sponsor)
        db.session.commit()

        return jsonify({'message': 'Sponsor créé avec succès'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()

@app.route('/update_sponsor', methods=['POST'])
def update_sponsor():
    data = request.json
    selected_id = data.get('id')
    nouveau_nom = data.get('contenu')  # Modifier cela en fonction de la structure exacte de votre modèle de données

    try:
        sponsor = Sponsor.query.get(selected_id)

        if sponsor:
            # Vérifier si le nom est différent avant de mettre à jour
            if sponsor.nom != nouveau_nom:
                sponsor.nom = nouveau_nom
                db.session.commit()
                return jsonify({'message': 0})  # Succès
            else:
                return jsonify({'message': 1})  # Nom identique
        else:
            return jsonify({'message': 2})  # Aucun sponsor trouvé
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()


@app.route('/get_pays', methods=['GET'])
def get_pays():
    pays = EquipeNationale.query.all()
    pays_list = [pays.nom for pays in pays]

    return jsonify({'countries': pays_list})

@app.route('/ajouter_joueur', methods=['POST'])
def ajouter_joueur():
    data = request.json

    nom = data.get('nom')
    prenom = data.get('prenom')
    date_naissance = data.get('dateNaissance')
    taille = int(data.get('taille'))
    pays = data.get('pays')

    try:
        max_id = db.session.query(func.max(Joueur.id_joueur)).scalar()
        new_id = max_id + 1 if max_id is not None else 1
        nouveau_joueur = Joueur(id_joueur=new_id, nom=nom, prenom=prenom, naissance=date_naissance, taille=taille, nationalite=pays)
        db.session.add(nouveau_joueur)
        db.session.commit()

        return jsonify({'message': 0})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})
    finally:
        db.session.close()

@app.route('/get_teams', methods=['POST'])
def get_teams():
    selected_option = request.form.get('teamType')

    if selected_option == 'pays':
        teams = EquipeNationale.query.all()
        team_data = [{'id': team.id_pays, 'nom': team.nom} for team in teams]
    elif selected_option == 'club':
        teams = Club.query.all()
        team_data = [{'id': team.id_club, 'nom': team.nom} for team in teams]
    else:
        return jsonify({'error': 'Invalid teamType'}), 400

    return jsonify({'teams': team_data})

@app.route('/ajouter_match', methods=['POST'])
def ajouter_match():
    try:
        # Récupérer les données du formulaire
        team_type = request.form.get('teamType')
        lieu = request.form.get('lieu')
        date_match = request.form.get('dateMatch')
        match_type = request.form.get('matchType')
        team1 = request.form.get('team1')
        team2 = request.form.get('team2')
        vainqueur = random.choice([team1, team2])
        saison = datetime.strptime(date_match, '%Y-%m-%d').year
        id_comp = request.form.get('competitionId')


        # Valider que toutes les données nécessaires sont présentes
        if not team_type or not lieu or not date_match or not match_type or not team1 or not team2 or not id_comp:
            return jsonify({'error': 'Veuillez remplir tous les champs du formulaire.'}), 400

        # Obtenir le maximum actuel de id_match
        max_id_match = db.session.query(func.max(Match.id_match)).scalar()
        new_id_match = max_id_match + 1 if max_id_match is not None else 1


        # Créer une nouvelle instance de Match
        nouveau_match = Match(
            id_match=new_id_match,
            date=date_match,
            type_match=match_type,
            lieu=lieu
            # Ajoutez d'autres champs si nécessaire
        )
        db.session.add(nouveau_match)
        db.session.commit()
        # Si team_type est "pays", créer un objet JoueNationale et l'associer avec le match
        if team_type == "pays":
            joue_nationale = JoueNationale(
                id_match=new_id_match,
                id_pays1=team1,  # Assurez-vous que c'est le bon champ pour l'équipe nationale
                id_pays2=team2,
                id_competition=id_comp,  # Remplacez par l'ID de la compétition appropriée
                vainqueur=vainqueur
                # Ajoutez d'autres champs si nécessaire
            )
            db.session.add(joue_nationale)

        # Si team_type est "club", créer un objet JoueClub et l'associer avec le match
        elif team_type == "club":
            joue_club = JoueClub(
                id_match=new_id_match,
                id_club1=team1,  # Assurez-vous que c'est le bon champ pour le club
                id_club2=team2,
                id_competition_club=id_comp,  # Remplacez par l'ID de la compétition club appropriée
                id_championnat=None,
                saison=saison,  # Remplacez par la saison appropriée
                vainqueur=vainqueur
                # Ajoutez d'autres champs si nécessaire
            )
            db.session.add(joue_club)

        # Ajouter le match à la session
        

        # Committer les changements à la base de données
        db.session.commit()

        return jsonify({'success': 0})
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({'error': str(e)}), 500
    finally:
        db.session.close()  # Close the session to avoid potential issues
