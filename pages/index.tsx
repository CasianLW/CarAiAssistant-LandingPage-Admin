import Image from "next/image";
import { Inter } from "next/font/google";
import { FC, useEffect, useRef, useState } from "react";
import QRCode from "easyqrcodejs";
import ContactFormComponent from "@/components/ContactForm.component";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const appStoreRef = useRef<HTMLDivElement>(null);
  const googleStoreRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLegalModal = () => setIsLegalModalOpen(!isLegalModalOpen);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    setIsMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // QR code for the App Store
    if (appStoreRef.current) {
      new QRCode(appStoreRef.current, {
        text: process.env.NEXT_PUBLIC_APP_STORE_URL,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        logo: "/apple_logo.png",
        logoWidth: 40,
        logoHeight: 40,
        logoBackgroundTransparent: true,
      });
    }

    // QR code for the Google Play Store
    if (googleStoreRef.current) {
      new QRCode(googleStoreRef.current, {
        text: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        logo: "/google_logo.png",
        logoWidth: 40,
        logoHeight: 40,
        logoBackgroundTransparent: true,
      });
    }

    // Cleanup function
    return () => {
      if (appStoreRef.current) {
        // Clean up the QR code for App Store
        // You need a method to clear it, or simply remove the canvas
        appStoreRef.current.innerHTML = "";
      }
      if (googleStoreRef.current) {
        // Clean up the QR code for Google Play Store
        googleStoreRef.current.innerHTML = "";
      }
    };
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between   ${inter.className} bg-white`}
      // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-white`}
    >
      <div
        ref={homeRef}
        id="home"
        className="w-full h-fit  grid md:grid-cols-2 gap-2 "
      >
        <div className="w-full h-full bg-gradient-to-tr from-app-black-200 to-app-blue-200 rounded-[42px] px-10 py-7 flex flex-col">
          {/* <div className="flex justify-between">
            <p>CarAiAssist</p> <div className="md:hidden">MENU</div>
          </div> */}
          <nav className="w-full mb-10 flex justify-between items-center">
            <p>CarAiAssist</p>
            <div className="md:hidden" onClick={toggleMenu}>
              <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
              <button
                className="p-2 font-semibold text-app-blue-200"
                onClick={() => scrollToRef(downloadRef)}
              >
                Download
              </button>
              <button
                className="p-2 font-semibold text-app-blue-200"
                onClick={() => scrollToRef(featuresRef)}
              >
                Features
              </button>
              <button
                className="p-4 font-semibold text-app-blue-200"
                onClick={() => scrollToRef(contactRef)}
              >
                Contact
              </button>
            </div>
          </nav>
          <div className="my-auto w-11/12 gap-6 flex flex-col">
            <h1 className="text-3xl leading-9 lg:text-[68px] font-semibold lg:leading-[72px]">
              Vous recherchez une nouvelle voiture ?
            </h1>
            <p className="text-[13px] md:text-base">
              CarAiAssistant vous accompagne dans vos recherche, en vous
              proposant des modèles correspondant a votre imagination en
              quelques clicks et tout cela de manière totalement sincère et
              impartiale.
            </p>
            <button
              onClick={() => scrollToRef(downloadRef)}
              className="px-2 py-2 border rounded-full font-semibold hover:bg-white hover:text-app-blue-200 w-fit flex justify-between gap-2 items-center"
            >
              <p className="pl-2">DOWNLOAD THE APP </p>{" "}
              <Image
                width={32}
                src={require("../assets/landingpage/download-btn.svg")}
                alt={"Download icon"}
              />
            </button>
            <div className="flex ml md:w-1/2">
              <Image
                placeholder="blur"
                width={100}
                src={require("../assets/landingpage/reviews_app.png")}
                alt={"CarAiAssist reviews image"}
              />
              <p className=" leading-4 text-xs">
                Plus de 10 000 utilisateurs accompagnées
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full min-h-[320px] bg-app-blue-500 rounded-[42px] px-10 py-7 overflow-clip relative">
          <div className="flex-row-reverse max-w-[360px] justify-between ml-auto hidden md:flex">
            <button
              onClick={() => scrollToRef(contactRef)}
              className="text-app-blue-200 font-semibold"
            >
              Support
            </button>
            <button
              onClick={() => scrollToRef(featuresRef)}
              className="text-app-blue-200 font-semibold"
            >
              Features
            </button>
            <button
              onClick={() => scrollToRef(downloadRef)}
              className="text-app-blue-200 font-semibold"
            >
              Download
            </button>
          </div>
          <div className="min-h-[400px] lg:min-h-[600px]">
            <Image
              placeholder="blur"
              priority
              width={1000}
              className="max-w-[400px] md:max-w-[350px] lg:max-w-[500px] xl:max-w-[600px] lg:-bottom-36 md:-bottom-12 md:right-0 mt-auto  absolute "
              alt="CarAiAssist app mockup"
              src={require("../assets/landingpage/mockup_app.png")}
            />
          </div>
        </div>
      </div>
      <div
        ref={downloadRef}
        id="download"
        className="w-full min-h-[250px] rounded-[42px] bg-app-black-200 mt-2 relative  "
      >
        <h2 className="text-center mt-10 text-3xl leading-9 lg:text-[52px] font-semibold lg:leading-[72px]">
          Scannez pour télécharger
        </h2>
        <div className="grid">
          <Image
            placeholder="blur"
            className="mx-auto max-w-[300px] mt-10 stack-item"
            alt="Phone mockup for qr codes"
            src={require("../assets/landingpage/iphone_empty_mockup.png")}
          />
          <div className=" stack-item mx-auto  my-auto pt-20">
            <Link
              href={
                process.env.NEXT_PUBLIC_APP_STORE_URL ||
                "https://apps.apple.com/fr/app/doctolib-trouvez-un-m%C3%A9decin/id925339063"
              }
              target="_blank"
            >
              <div ref={appStoreRef}></div>
            </Link>
            <Link
              href={
                process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ||
                "https://apps.apple.com/fr/app/doctolib-trouvez-un-m%C3%A9decin/id925339063"
              }
              target="_blank"
            >
              <div className="mt-6" ref={googleStoreRef}></div>
            </Link>
          </div>
        </div>
      </div>
      <div ref={featuresRef} id="features">
        <h2 className="text-center text-app-black-200 mt-20 text-3xl leading-9 lg:text-[52px] font-semibold lg:leading-[72px]">
          À découvrir sur notre app
        </h2>
        <p className="text-app-blue-300 text-center md:w-7/12 mx-auto">
          Testez notre app sans compte pour rechercher ou bien créez vous un
          compte pour sauvegarder vos recherches et profiter pleinement de notre
          app.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 md:mt-20 items-start gap-2">
          <Feature
            image="unknown-icon.svg"
            title="Recherche inconnue"
            paragraph="Pour les personnes n’ayant aucune idée de ce qu’ils cherchent"
          />
          <Feature
            image="category-icon.svg"
            title="Recherche par catégorie "
            paragraph="Pour les personnes ayant en tête le type de véhicule souhaité "
          />
          <Feature
            image="car-icon.svg"
            title="Recherche par voiture"
            paragraph="Pour les personnes ayant leur modèle mais voulant plus d’informations "
          />
          <Feature
            image="report-icon.svg"
            title="Rapports par modéle"
            paragraph="Des rapport montrant tout ce dont on devrait savoir sur le véhicule, checklist, etc"
          />
        </div>
        <div
          ref={contactRef}
          id="contact"
          className=" grid md:grid-cols-3 gap-2 mt-10 md:mt-20 lg:mt-32"
        >
          {/* <div className="bg-app-black-300 rounded-[42px] p-10 grid md:grid-cols-2"> */}
          {/* <div className="bg-gradient-to-br from-app-black-300 to-app-blue-200 rounded-[42px] p-10 grid md:grid-cols-2"> */}
          <div className="bg-app-blue-500 rounded-[42px]  md:flex md:col-span-2 items-center order-2 md:order-1">
            <h3 className="text-app-black-200 text-2xl leading-9  font-semibold mb-4 md:ml-4  lg:text-[48px] lg:w-6/12  lg:leading-[72px] mt-4 md:w-full w-8/12 mx-auto text-center ">
              Trouvons voiture à votre pied !
            </h3>
            <Image
              placeholder="blur"
              width={600}
              className="max-w-[300px] ml-auto"
              src={require("../assets/landingpage/half_car.png")}
              alt="half car support illustration"
            />
          </div>
          <div className="bg-app-black-200 rounded-[42px] p-5 order-1 md:order-2">
            <h3 className="text-2xl leading-9  font-semibold mb-4">
              Des questions? Contactez-nous!
            </h3>
            <ContactFormComponent />
          </div>
        </div>

        <div className="bg-app-blue-100 rounded-[42px] mt-2 ">
          <div className="grid py-10 px-4">
            <h3 className="font-semibold text-center  text-lg md:text-start mb-4">
              CarAiAssistant
            </h3>
            <div className="grid gap-y-4 grid-cols-2 md:grid-cols-3 md:w-8/12 lg:w-4/12 ">
              <div className="flex flex-col items-start">
                <p className="font-semibold text-app-blue-400">Menu</p>
                <button onClick={() => scrollToRef(homeRef)}>Accueil</button>
                <button onClick={() => scrollToRef(downloadRef)}>
                  Download
                </button>
                <button onClick={() => scrollToRef(featuresRef)}>
                  Features
                </button>
                <button onClick={() => scrollToRef(contactRef)}>Support</button>
              </div>

              <div className="justify-self-end md:!justify-self-center">
                <p className="font-semibold text-app-blue-400">Réseaux</p>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Linkedin</p>
              </div>
              <div className="md:justify-self-end">
                <p className="font-semibold text-app-blue-400">Company</p>
                <button onClick={toggleLegalModal}>Mentions Légales</button>
                <button onClick={() => scrollToRef(contactRef)}>Support</button>
                {isLegalModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                    <div className=" bg-white p-5 rounded-lg max-w-lg w-full overflow-y-scroll h-[80vh]">
                      <h2 className="text-xl font-semibold">
                        Mentions Légales
                      </h2>
                      <p className="mt-2 text-app-black-200">
                        <ul>
                          <li className="text-app-black-200 font-semibold">
                            Mentions Légales
                          </li>
                        </ul>
                        <div>
                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Éditeur du site :
                          </h4>
                          <p>
                            CaraiAssistant - Contact via formulaire <br />{" "}
                            Responsable de publication : Casian CIORBA
                          </p>
                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Hébergement :
                          </h4>
                          <p>
                            Site hébergé par Netlify, 2325 3rd Street, Suite
                            296, San Francisco, California 94107, USA.
                          </p>
                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Propriété intellectuelle :
                          </h4>
                          <p>
                            L’ensemble de ce site relève de la législation
                            française et internationale sur le droit d’auteur et
                            la propriété intellectuelle. Tous les droits de
                            reproduction sont réservés, y compris pour les
                            documents téléchargeables et les représentations
                            iconographiques et photographiques.
                          </p>

                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Conditions d’utilisation :
                          </h4>
                          <p>
                            L’utilisation de ce site est réservée à un usage
                            strictement personnel. Tout usage à des fins
                            commerciales ou publicitaires est strictement
                            interdit.
                          </p>

                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Collecte des données :
                          </h4>
                          <p>
                            Les informations collectées par le biais du
                            formulaire de contact sont utilisées exclusivement
                            pour répondre aux requêtes des utilisateurs et ne
                            sont jamais partagées avec des tiers sans
                            consentement explicite. CaraiAssistant s’engage à
                            protéger ces données et à respecter la
                            confidentialité selon les règlements en vigueur.
                          </p>

                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Liens externes :
                          </h4>
                          <p>
                            Ce site peut contenir des liens vers d’autres sites.
                            CaraiAssistant n’exerce aucun contrôle sur ces sites
                            et décline toute responsabilité quant à leur contenu
                            et utilisation.
                          </p>

                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Modifications des mentions légales :
                          </h4>
                          <p>
                            CaraiAssistant se réserve le droit de modifier ces
                            mentions légales à tout moment. Les utilisateurs
                            sont invités à les consulter régulièrement.
                          </p>

                          <h4 className="text-app-blue-100 font-semibold mt-4">
                            Droit applicable :
                          </h4>
                          <p>Le présent site est soumis au droit français.</p>
                        </div>
                      </p>
                      <button
                        onClick={toggleLegalModal}
                        className="fixed top-0 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-center">
            © CarAIAssist – made by
            <a
              href="https://casian.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="underline"
                style={{
                  color: "white",
                  // color: "transparent",
                  // backgroundClip: "text",
                  // backgroundImage: "linear-gradient(45deg, #a8c5de, #c79dde)",
                }}
              >
                {` `}casian.fr
              </span>
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

type FeatureProps = {
  image: string;
  title: string;
  paragraph: string;
};

const Feature: FC<FeatureProps> = ({ image, title, paragraph }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Image
        className="bg-app-blue-200 p-2 w-20 rounded-3xl"
        alt="image du feature"
        src={require(`../assets/landingpage/${image}`)}
      />
      <h3 className="text-app-blue-200 text-center font-semibold ">{title}</h3>
      <p className=" text-center w-2/3 mx-auto text-xs md:text-[13px] text-app-blue-300">
        {paragraph}
      </p>
    </div>
  );
};
