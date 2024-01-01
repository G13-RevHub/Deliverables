# RevHub
Repository per i deliverables e l'applicazione creati dal membri del Gruppo 13

## Deliverables
Il progetto si propone di creare un'applicazione che permette di creare e
condividere recensioni su ogni tipo di contenuto.

Gli utenti possono creare un loro account tramite credenziali UniTn o Google,
grazie al quale avranno la possibilità di scrivere tali recensioni. La
creazione di un account non è obbligatoria per l'uso dell'applicazione, ma è
richiesta nel caso in cui si desideri avere un profilo, prerequisito essenziale
per creare le proprie recensioni ed interagire con quelle di altri utenti
tramite likes, dislikes e commenti.

## Applicazione
L'applicazione sviluppata contiene le seguenti funzionalità:
 - usare proprie credenziali di Ateneo o Google per registrarsi
 - fare il login con le credenziali scelte
 - visionare recensioni di altri/e, come utente autenticato e non autenticato
 - creare recensioni se si è autenticati
 - fare una ricerca, per trovare utenti/recensioni/tag
 - fare logout
 - mettere like e dislike se autenticati

Non sono invece state implementate le seguenti funzionalità:
 - tutta la parte di amministrazione e segnalazione delle recensioni
 - tutta la parte riguardante la creazione e lettura dei commenti delle recensioni

Data l'impossibilità nel concreto di usufruire dei sistemi di login tramite
credenziali UniTn e/o Google, sono state create pagine ed api che permettessero
la creazione di credenziali "fittizie" da poter usare poi nella registrazione di
un account. Inoltre è stata creata un'api che permetta di ottenere tutti i
record di una certa categoria salvati nel database. Ciò è stato fatto per soli
motivi di testing e debugging (specie considerando che solo un membro del gruppo
aveva libero accesso alla pagina web di Atlas e alla relativo elenco di
strutture e record memorizzati).  Data la loro natura, queste pagine e api non
sono state documentate, poiché in un'ipotetica versione finale ed ufficiale del
progetto esse non esisterebbero.

## Getting Started
Per prima cosa bisogna scaricare il repository con il seguente comando:
```bash
$ git clone https://github.com/G13-RevHub/RevHub.git --depth=1
```

Bisogna poi spostarsi nella cartella che contiene il progetto, con il comando:
```bash
$ cd ./RevHub/rev_hub
```

Per scaricare tutti i packages necessari all'esecuzione dell'applicazione si deve
eseguire il seguente comando:
```bash
$ npm install
```

Successivamente, per utilizzare l'applicazione, la si può avviare in modalità developement, con i
seguenti comandi:
```bash
$ npm run dev
# oppure, se si dispone di sufficiente RAM,
$ npm run dev --turbo
```

Oppure si può creare una build e lanciare quest'ultima, ottenendo una versione
più veloce ma che richiede un rebuild per essere modificata, tramite i comandi:
```bash
$ npm run build
$ npm run start
```

Quindi aprire il seguente indirizzo [http://localhost:3000](http://localhost:3000) nel browser.
