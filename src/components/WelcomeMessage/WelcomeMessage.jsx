import { useNavigate } from "react-router-dom";

export function WelcomeMessage() {

  const navigate = useNavigate();

    const imageWelcomePage = "src/assets/images/pexels-kampus-8201191.jpg";
    
    return (
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:justify-between gap-x-8 mb-2"> {/* Ajout de gap-x-8 */}
          {/* Section de Texte */}
          <div className="max-w-lg text-left"> {/* Changer text-center à text-left */}
            <h1 className="text-4xl font-bold text-blue-600 leading-tight mb-4">
            Gérer votre business en toute sécurité
            </h1>
            <p className="text-gray-600 text-lg mb-6">
                Optimisez la gestion de votre boutique
                avec notre application intuitive et gagnez du temps au quotidien !
                Essayez-la dès maintenant et transformez votre activité.
            </p>
            <button className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-500 transition"
              onClick={()=>navigate("gesapp/boutiquecreate")}
            >
               En savoir plus...
            </button>
          </div>
  
          {/* Section Image */}
          <div className="mt-8 lg:mt-0 lg:ml-8 max-w-md">
            <img
              src={imageWelcomePage}
              alt="presentation"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    );
}

  