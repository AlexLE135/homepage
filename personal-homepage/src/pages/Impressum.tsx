import React from 'react';
import { motion } from 'framer-motion';

const Impressum: React.FC = () => {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">Alexander Schneider</p>
              <p>Alex Le Digital Solutions</p>
              <p>Musterstraße 123</p>
              <p>12345 Berlin</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Kontakt
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Telefon:</strong> +49 123 456789</p>
              <p><strong>E-Mail:</strong> kontakt@alexle135.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Umsatzsteuer-ID
            </h2>
            <p className="text-gray-700">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE123456789
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Steuernummer
            </h2>
            <p className="text-gray-700">123/456/78901</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">Alexander Schneider</p>
              <p>Musterstraße 123</p>
              <p>12345 Berlin</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Haftungshinweis
            </h2>
            <p className="text-gray-700 mb-4">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
              Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Streitbeilegung
            </h2>
            <p className="text-gray-700 mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="text-gray-700">
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, 
              an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
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

export default Impressum;