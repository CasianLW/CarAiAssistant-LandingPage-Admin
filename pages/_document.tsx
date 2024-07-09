import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = process.env.NEXT_PUBLIC_WEB_URL; // Ensure this variable is set in your .env files

  return (
    <Html lang="fr">
      <Head>
        {/* Title & Meta Description */}
        <title>
          CaraiAssistant - Trouvez la Voiture d'Occasion Parfaite en Quelques
          Clics
        </title>
        <meta
          name="description"
          content="Découvrez AutoMatch AI, votre assistant intelligent pour choisir une voiture d'occasion. Notre technologie basée sur l'IA analyse vos besoins pour vous proposer les modèles les plus compatibles en un instant. Commencez dès maintenant et trouvez votre match parfait !"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}`} />
        <meta
          property="og:title"
          content="CaraiAssistant - Trouvez la Voiture d'Occasion Parfaite en Quelques Clics"
        />
        <meta
          property="og:description"
          content="Découvrez AutoMatch AI, votre assistant intelligent pour choisir une voiture d'occasion. Notre technologie basée sur l'IA analyse vos besoins pour vous proposer les modèles les plus compatibles en un instant. Commencez dès maintenant et trouvez votre match parfait !"
        />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}`} />
        <meta
          property="twitter:title"
          content="CaraiAssistant - Trouvez la Voiture d'Occasion Parfaite en Quelques Clics"
        />
        <meta
          property="twitter:description"
          content="Découvrez AutoMatch AI, votre assistant intelligent pour choisir une voiture d'occasion. Notre technologie basée sur l'IA analyse vos besoins pour vous proposer les modèles les plus compatibles en un instant. Commencez dès maintenant et trouvez votre match parfait !"
        />
        <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />
      </Head>
      <body className="p-2">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
