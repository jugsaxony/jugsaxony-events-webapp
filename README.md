# JUG Saxony Events WebApp
Progressive Web App auf Basis von Ionic 3 für den JUG Saxony Veranstaltungskalender und die JUG Saxony Job-Wall.

https://app.jugsaxony.org/

## LIZENZ

Apache License, Version 2.0 (https://www.apache.org/licenses/LICENSE-2.0)

## FAQ

**Q**: Warum bekomme ich eine merkwürdige Meldung, wenn ich mich mit einer Gmail-Email-Adresse zu einer Veranstaltung anmelde?

**A**: Die genaue Meldung lautet:
> Vielen Dank für Deine Anmeldung. Leider konnten wir Dir keine Bestätigung per E-Mail zusenden. Dein Emailprovider verfolgt eine aggressive Anti-Spam-Policy und reagiert nicht auf Email-Anfragen. Er wird deshalb von uns nicht bedient.

Wir haben uns entschieden, keine Bestätigungsemails an Gmail-Adressen zu verschicken. Gmail klassifiziert viele gleichartige Emails an verschiedene Adressaten automatisch als Bulk-Email. An diese Art von Email werden seitens Google besondere Anforderungen gestellt, beispielsweise muss ein Unsubscribe-Mechanismus enthalten sein.

Des Weiteren wird eine Email, die jemand das erste Mal von @jugsaxony.org erhält, nach unserer Beobachtung sehr wahrscheinlich im Spam-Ordner zugestellt. Gmail erwartet hier vermutlich von seinen Nutzern, dass diese die Antispam-KI trainieren. Jedoch werden solche Bestätigungsemails von den meisten Nutzern im Spam-Ordner belassen oder sogar gleich darin gelöscht. Damit bekommt die KI das Signal, dass es sich tatsächlich um Spam gehandelt hat. Wiederholt sich dieser Vorgang für mehrere Nutzer in kurzer Zeit, wird jeglicher Email-Verkehr von unserem Server für alle Gmail- und Google G-Suite-Nutzer als Spam klassifiziert. Das letzte Mal, als dies passierte, wusste der G-Suite-Admin des betroffenen Empfängers zu unserem Erstaunen nicht einmal, ob und wie man eine Email-Domain whitelisten kann.

Der Mitigationsmechanismus bei Gmail selbst läuft über das Formular "Bulk Sender Contact Form", was nicht nur inhaltlich unpassend ist, sondern auch eine Dead-Letter-Box zu sein scheint. In den Google-Product-Foren wird gelegentlich behauptet, dass ein Whitelisting bei Gmail gar nicht möglich ist. Die Antispam-KI bei Gmail sortiert Emails auch dann als Spam ein, wenn SMTP-over-TLS, SPF, DKIM und DMARC korrekt aufgesetzt sind. Die KI lässt sich wirkungsvoll verwirren, wenn man Emails sowohl via IPv4 als auch via des brandneuen IPv6 einliefert. Mit den Google Postmaster Tools will ich erst gar nicht anfangen. Alle anderen mir bekannten großen Email-Provider bieten ein Delisting-Verfahren an, wo man am Ende mit echten Menschen kommuniziert.

Wir als Verein haben uns daher entschlossen, dass unsere Zeit besser darin investiert ist, für euch interessante Veranstaltungen zu organisieren, als uns mit selbstlernenden Antispam-Systemen herumzuplagen.

---

**Q**: Bin ich mit einer Gmail-Adresse auch wirklich angemeldet?

**A**: Ja. Wenn du dich über die JUG-Saxony-App anmeldest, kannst du dich über die App im Zweifel sogar wieder abmelden.

---

**Q**: Ich möchte auch weiterhin meine Gmail-Adresse zum Anmelden benutzen. Kann für mich eine Ausnahme bei den Bestätigungsemails gemacht werden?

**A**: Nein. Wir arbeiten ehrenamtlich. Aufwand und Nutzen steht hier in keinem Verhältnis.

