addCard: (request, response) => {
    //on récupère l'id de la carte à ajouter
    const cardId = request.params.id;
    //on utilise la méthode find des tableaux pour vérifier si cette carte est déjà stockée
    //ATTENTION : cardId est de type string, il faut enser à le convertir
    const found = request.session.deck.find(card => card.id === parseInt(cardId, 10));
    //si un élément est trouvé, found contiendra cet élément, sinon found vaudra undefined
    //on utilise cette variable pour déterminer s'il faut ajouter la carte
    if (found) {
        //found contient une carte d'id cardId, on redirige vers la page d'accueil
        response.redirect('/');
    } else {
        //found vaut undefined, la carte n'a pas encore été ajoutée
        //on vérifie si le nombre de carte n'est pas déjà de 5
        if (request.session.deck.length < 5) {
            //on a encore de la place, on récupère la carte en BDD
            dataMapper.getCard(cardId, (error, card) => {
                //si le DM répond avec une erreur, on répond au navigateur avec un status 500
                if (error) {
                    response.status(500).send(error);
                } else {
                    //pas d'erreur mais si on a passé un id de carte qui n'existe pas en BDD, le DM va placer la valeur undefined dans card
                    //on le vérifie
                    if (card) { //équivalent à if (card !== undefined)
                        //le paramètre card contient bien des infos, on peut ajouter la carte en session
                        request.session.deck.push(card);

                        //pour vérifier les cartes stockées en session
                        //console.log(request.session.deck);

                        //on redirige vers l'accueil
                        response.redirect('/');
                    } else {
                        //pas d'erreur SQL mais on n'a réciupéré aucun enregistrement, on le signale au navigateur
                        response.status(404).send(`Card with id ${cardId} not found`);
                    }
                }

            });
        } else {
            response.redirect('/');
        }
    }
}