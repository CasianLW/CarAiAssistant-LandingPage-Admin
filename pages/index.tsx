import Image from "next/image";
import { Inter } from "next/font/google";
import { FC, useEffect, useRef } from "react";
import QRCode from "easyqrcodejs";
import ContactFormComponent from "@/components/ContactForm.component";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const appStoreRef = useRef<HTMLDivElement>(null);
  const googleStoreRef = useRef<HTMLDivElement>(null);

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
      <div id="home" className="w-full h-fit  grid md:grid-cols-2 gap-2 ">
        <div className="w-full h-full bg-gradient-to-tr from-app-black-200 to-app-blue-200 rounded-[42px] px-10 py-7 flex flex-col">
          <div className="flex justify-between">
            <p>CarAiAssist</p> <div className="md:hidden">MENU</div>
          </div>
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
            <button className="px-4 py-2 border rounded-full font-semibold hover:bg-white hover:text-app-blue-200 w-fit">
              DOWNLOAD THE APP
            </button>
            <div className="flex ml md:w-1/2">
              <Image
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
            <p className="text-app-blue-200 font-semibold">Support</p>
            <p className="text-app-blue-200 font-semibold">Features</p>
            <p className="text-app-blue-200 font-semibold">Download</p>
          </div>
          <div className="min-h-[400px] lg:min-h-[600px]">
            <Image
              width={1000}
              className="max-w-[400px] md:max-w-[350px] lg:max-w-[500px] xl:max-w-[600px] lg:-bottom-36 md:-bottom-12 md:right-0 mt-auto  absolute "
              alt="CarAiAssist app mockup"
              src={require("../assets/landingpage/mockup_app.png")}
            />
          </div>
        </div>
      </div>
      <div
        id="download"
        className="w-full min-h-[250px] rounded-[42px] bg-app-black-200 mt-2 relative  "
      >
        <h2 className="text-center mt-10 text-3xl leading-9 lg:text-[52px] font-semibold lg:leading-[72px]">
          Scannez pour télécharger
        </h2>
        <div className="grid">
          <Image
            className="mx-auto max-w-[300px] mt-10 stack-item"
            alt="Phone mockup for qr codes"
            src={require("../assets/landingpage/iphone_empty_mockup.png")}
          />
          <div className=" stack-item mx-auto  my-auto pt-20">
            <div ref={appStoreRef}></div>
            <div className="mt-6" ref={googleStoreRef}></div>
          </div>
        </div>
      </div>
      <div id="features">
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
          id="contact"
          className=" grid md:grid-cols-3 gap-2 mt-10 md:mt-20 lg:mt-32"
        >
          {/* <div className="bg-app-black-300 rounded-[42px] p-10 grid md:grid-cols-2"> */}
          {/* <div className="bg-gradient-to-br from-app-black-300 to-app-blue-200 rounded-[42px] p-10 grid md:grid-cols-2"> */}
          <div className="bg-app-blue-500 rounded-[42px]  md:flex md:col-span-2 items-center order-2 md:order-1">
            <h3 className="text-app-black-200 text-2xl leading-9  font-semibold mb-4 md:ml-4  lg:text-[48px] lg:w-6/12  lg:leading-[72px] mt-4 md:w-full w-8/12 mx-auto text-center ">
              Trouvons voiture a votre pied !
            </h3>
            <Image
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
              <div>
                <p className="font-semibold text-app-blue-400">Menu</p>
                <p>Download</p>
                <p>Features</p>
                <p>Support</p>
              </div>

              <div className="justify-self-end md:!justify-self-center">
                <p className="font-semibold text-app-blue-400">Réseaux</p>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Linkedin</p>
              </div>
              <div className="md:justify-self-end">
                <p className="font-semibold text-app-blue-400">Company</p>
                <p>Mentions Légales</p>
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
