import React from 'react'

/**
 * Impressum-Komponente für DSGVO-konforme rechtliche Angaben
 * Enthält alle gesetzlich vorgeschriebenen Informationen gemäß § 5 TMG
 */
const Impressum: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Angaben gemäß § 5 TMG</h2>

              <p className="mb-4">
                <strong>Alex Le</strong><br />
                Digital Solutions<br />
                Georg-Schumann-Str. 148<br />
                01459 Leipzig
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Kontakt</h2>

              <p className="mb-4">
                E-Mail: <a href="mailto:kontakt@alexle135.de" className="text-blue-600 hover:text-blue-800">kontakt@alexle135.de</a>
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Haftungsausschluss</h2>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Haftung für Inhalte</h3>
              <p className="mb-4">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Haftung für Links</h3>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Urheberrecht</h2>
              <p className="mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Datenschutz</h2>
              <p className="mb-4">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
              </p>

              <p className="mb-4">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </p>

              <p className="text-sm text-gray-600 mt-8">
                Quelle: <a href="https://www.e-recht24.de" className="text-blue-600 hover:text-blue-800">https://www.e-recht24.de</a>
              </p>
            </div>

            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Hinweis:</strong> Dieses Impressum wurde mit größter Sorgfalt erstellt. Bei Fragen oder Anmerkungen wenden Sie sich bitte an <a href="mailto:kontakt@alexle135.de" className="text-blue-600 hover:text-blue-800">kontakt@alexle135.de</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Impressum