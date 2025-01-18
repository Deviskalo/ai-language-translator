export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          About AI Translator
        </h1>

        <div className="prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            AI Translator is a modern language translation tool that leverages
            advanced artificial intelligence to provide accurate translations
            across multiple languages.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Features
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Real-time text translation</li>
            <li>Document translation support</li>
            <li>Speech-to-text capabilities</li>
            <li>Text-to-speech output</li>
            <li>Multiple language support</li>
            <li>Translation history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
