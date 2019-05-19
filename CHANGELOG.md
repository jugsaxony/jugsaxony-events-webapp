## 0.2.6-beta (2019-05-19)

### Features
* Unterstützung für Apple Maps, Here WeGo und Maps.Me

## 0.2.2-beta (2019-05-01)

### Features
* Job-Wall mit regelmäßig wechselnden Job-Angeboten unserer Fördermitglieder

### Bug-Fixes
* Bessere iPhone-X-Homescreen-Unterstützung
* Schönheitskorrekturen

## 0.1.5-beta (2018-07-01)

### Bug-Fixes
* Upgrade des Service-Workers sollte jetzt auch aus der App heraus funktionieren
* calShare/aCalender benutzt jetzt Local-Time, da die UTC-Links nicht korrekt verarbeitet werden
* die Swipe-Back-Geste auf iOS führt jetzt nicht mehr zu einer leeren Seite
* unsere Datenschutzerklärung ist jetzt auch in der App verfügbar

## 0.1.4-beta (2018-05-06)

### Bug-Fixes
* die "Wie könnt Ihr uns unterstützen"-Karte hat noch gefehlt
* das Force-Update im Service-Worker wurde wieder entfernt, da es nicht funktioniert

### Bekannte Probleme
* Möglichweise aktualisiert sich die App nicht mehr. Android-Nutzer können unter Chrome -> Einstellungen -> Datenschutz -> Browserdaten löschen (ganz am Ende der Liste) -> \[x] "Bilder und Dateien im Cache" den App-Cache zurücksetzen. Danach muss dann die App noch einmal via App-Switcher zwangsweise beendet werden.

## 0.1.3-beta (2018-05-03)

### Bug-Fixes
* wenn ein Update vorliegt, wird dies nun in der App angezeigt, mit Verweis auf dieses Changelog
* alle Veranstaltungen, für die man angemeldet ist, werden nun auch in der Listenansicht markiert
* wenn man in die App zurückkehrt, wird die Veranstaltungsliste automatisch aktualisiert
* Die App-Shell aktualisiert sich bei neuen Versionen auch im iOS Standalone Modus korrekt. Die neue Version wird aber prinzipbedingt erst beim zweiten Start aktiv.
* die ICalendar-Links funktionieren nun auch unter iOS korrekt
* die "Über uns"-Seite zertört nicht mehr den Navigation-Stack
* besseres Offline-Verhalten
* Update auf Angular 5.2.10

### Bekannte Probleme
* unter iOS landet man manchmal bei der Rücknavigation auf einer leeren Seite

## 0.1.2-beta (2018-04-15)

### Bug-Fixes
* auf iOS-Geräten werden Animationen jetzt angezeigt
* auf iOS-Geräten wird die Status-Bar jetzt korrekt angezeigt und eingefärbt
* die Anzeige der Frist, wann eine Veranstaltung stattfindet, war stellenweise fehlerhaft
* der An-/Abmelde-FAB wurde um einen Progress-Indicator ergänzt
* das Scolling-Problem im Slide-In-Menü wurde behoben

### Bekannte Probleme
* im iOS-Standalone-Modus (aka. Add-to-Homescreen) wird die App-Shell nicht aktualisiert, wenn eine neue Version vorliegt
* Im iOS-Standalone-Modus wird der Icalendar-Link nicht korrekt verarbeitet. Anstatt das Ereignis-Details-Sheet anzuzeigen, so wie im Safari, erscheint ein Dialog zum Abonnieren eines Kalendars.
* auf iOS-Geräten führt die Swipe-Back-Geste zu einer leeren Seite
