# GIFy.me
Piccola web application che combina 4 immagini in una GIF animata scaricabile.

## -> [Sito dimostrativo](meraviglia.pw) <-

### Librerie e tool
- [jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload) - Upload, anteprima e verifica delle immagini
- [AnimGif](https://github.com/lunakid/AnimGif) - Creazione della GIF
- [Bulma](http://bulma.io/) - Framework CSS

### Funzionamento
##### Step 1
L'utente può scegliere fino a 4 immagini a suo piacimento. Può decidere di selezionare un qualsiasi numero inferiore a 4 e per poi raggiungere la cifra aggiungendole successivamente, utile se le immagini sono in cartelle diverse.   
Nel caso selezioni più di 4 immagini, oppure superi il limite successivamente, la pagina mostra un errore.   

##### Step 2
All'utente vengono presentati i controlli:
- Quanti loops dovrebbe fare la GIF, compresa un'opzione per renderli infiniti.
- Il delay tra un frame e l'altro.
- Il tasto di creazione della GIF, che si trasforma in quello di download successivamente.

##### Step 3
Viene visualizzato un caricamento e al termine viene proposta un'anteprima della GIF, scaricabile tramite l'apposito bottone.

### Considerazioni
 - Per semplicità sono ammesse solo JPG e PNG e non c'è limite settato (tranne per il php.ini) alla dimensione di upload.
 - Alcuni visualizzatori di immagini ignorano il numero di loop della GIF, come il Finder di OS X.
 - Non viene creata automaticamente la GIF per permettere all'utente di aggiustare i parametri e tiene in considerazioni eventuali altri sviluppi discussi sotto.
 - Mi sono posto la questione su quale sarebbe l'utente target e di quanti controlli necessiterebbe. In questo caso ho interpretato il "4 immagini in sequenza" della mail come una scelta di non permettere di ri-arrangiare le immagini ma un semplice caricamento diretto in sequenza e quindi ho volutamente lasciato l'interfaccia semplice e pulita.
 - Ci sono alcuni limitazioni arbitrarie impostate da me, come il fatto che il numero massimo di loops sia 99 e il delay tra i frame non possa superare i 5s.
 - L'upload delle immagini avviene in una cartella unica, identificata da un UUID (che è "unico") che viene generato al momento dell'upload. Questo permette più utenti di usare l'applicazione contemporaneamente senza il rischio di conflitti.
 - Le immagini vengono rinominate al momento dell'upload usando una timestamp, per preservarne l'ordine scelto dall'utente.
 - L'applicazione gira solo se è nella root del sito.
 
### Possibili sviluppi
L'applicazione è volutamente lasciata "semplice" per design, permettendo alcune opzioni basilari. Si potrebbe, ad esempio, impostare il delay singolarmente per ogni frame, ma la domanda da porsi è quanti utenti effettivamente lo vorrebbero usare e come questo cambierebbe l'interfaccia se si permettesse di aggiungere più di 4 immagini.
Un'altra possibilità sarebbe quella di ri-ordinare/rimuovere/ri-aggiungere le immagini. In questo caso l'upload non sarebbe più automatico all'aggiunta e servirebbero alcuni controlli extra, che l'uploader comunque supporterebbe.