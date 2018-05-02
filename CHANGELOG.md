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
