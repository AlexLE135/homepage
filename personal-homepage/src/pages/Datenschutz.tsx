import React from 'react';
import { motion } from 'framer-motion';

const Datenschutz: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container-custom max-w-4xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Datenschutz auf einen Blick</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-medium">Allgemeine Hinweise</h3>
              <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Datenschutz</h3>
              <p className="text-gray-700">Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

              <h3 className="text-lg font-medium text-gray-800">Verantwortliche Stelle</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Alexander Schneider</p>
                <p>Alex Le Digital Solutions</p>
                <p>Musterstraße 123</p>
                <p>12345 Berlin</p>
                <p>E-Mail: kontakt@alexle135.de</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Datenerfassung auf dieser Website</h2>
            
            <div className="space-y-6">              
              <div>
                <h3 className="text-lg font-medium text-gray-800">Kontaktformular</h3>
                <p className="text-gray-700 mb-2">Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
                <p className="text-gray-700"><strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800">Anfrage per E-Mail, Telefon oder Telefax</h3>
                <p className="text-gray-700 mb-2">Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.</p>
                <p className="text-gray-700"><strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800">Hosting</h3>
                <p className="text-gray-700 mb-2">Diese Website wird bei einem externen Dienstleister gehostet (Hoster).</p>
                <p className="text-gray-700"><strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Ihre Rechte</h2>
            <div className="space-y-4 text-gray-700">
              <p>Sie haben das Recht:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Unrichtige personenbezogene Daten berichtigen zu lassen (Art. 16 DSGVO)</li>
                <li>Ihre bei uns gespeicherten Daten löschen zu lassen (Art. 17 DSGVO)</li>
                <li>die Verarbeitung Ihrer Daten einschränken zu lassen (Art. 18 DSGVO)</li>
                <li>gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen (Art. 21 DSGVO)</li>
                <li>Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten (Art. 20 DSGVO)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies und Analytics</h2>
            <div className="space-y-4 text-gray-700">
              <p>Diese Website verwendet keine Cookies oder Analysetools.</p>
              <p>Bei Bedarf werden nur technisch notwendige Session-Cookies verwendet, die nach Verlassen der Website automatisch gelöscht werden.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Datensicherheit</h2>
            <div className="space-y-4 text-gray-700">
              <p>Wir treffen geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten vor zufälliger oder vorsätzlicher Manipulation, teilweisen oder vollständigen Verlust, Zerstörung oder vor dem unbefugten Zugriff Dritter zu schützen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Änderungen dieser Datenschutzerklärung</h2>
            <div className="space-y-4 text-gray-700">
              <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.</p>
              <p className="text-sm text-gray-500">Stand: 23. August 2024</p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              Quelle: <a href="https://www.e-recht24.de" className="hover:underline" target="_blank" rel="noopener noreferrer">e-recht24.de</a>
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Datenschutz;