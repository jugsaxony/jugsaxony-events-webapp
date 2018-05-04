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
