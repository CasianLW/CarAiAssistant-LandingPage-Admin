import { useState, ChangeEvent, FormEvent } from "react";

interface FormValues {
  name: string;
  email: string;
  sujet: string[];
  message: string;
}

const ContactFormComponent = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    sujet: [],
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "email" && !validateEmail(value)) {
      setError("Entrez une adresse email valide.");
    } else {
      setError("");
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newSujets = checked
      ? [...formValues.sujet, name]
      : formValues.sujet.filter((sujet) => sujet !== name);
    setFormValues({ ...formValues, sujet: newSujets });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValues.email || !validateEmail(formValues.email)) {
      setError("Entrez une adresse email valide.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (response.ok) {
        setFeedback(data.message);
        setFormValues({ name: "", email: "", sujet: [], message: "" });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setFeedback(
        typeof error === "string"
          ? error
          : "Erreur d'envoi. Réesayez plus tard."
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-center">
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="block  w-full p-2 border border-app-black-300 bg-app-black-300 rounded-3xl"
        type="text"
        placeholder="Votre Nom*"
        name="name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <input
        className="block w-full p-2 border border-app-black-300 bg-app-black-300 rounded-3xl"
        type="email"
        placeholder="Votre Email*"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <p className="text-center">Sujet*:</p>
      <div className="flex justify-between">
        <label>
          <input
            type="checkbox"
            name="App"
            checked={formValues.sujet.includes("App")}
            onChange={handleCheckboxChange}
          />{" "}
          App
        </label>
        <label>
          <input
            type="checkbox"
            name="Website"
            checked={formValues.sujet.includes("Website")}
            onChange={handleCheckboxChange}
          />{" "}
          Website
        </label>
        <label>
          <input
            type="checkbox"
            name="Autre"
            checked={formValues.sujet.includes("Autre")}
            onChange={handleCheckboxChange}
          />{" "}
          Autre
        </label>
      </div>
      <textarea
        className="block w-full p-2 border border-app-black-300 bg-app-black-300 rounded-3xl"
        placeholder="Votre Message*"
        name="message"
        value={formValues.message}
        onChange={handleInputChange}
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-full  mx-auto hover:bg-blue-600 disabled:bg-app-gris-200 disabled:cursor-not-allowed "
        type="submit"
        disabled={
          isLoading ||
          !formValues.email ||
          !formValues.message ||
          formValues.sujet.length === 0
        }
      >
        {isLoading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
      {feedback && <p className="text-green-500">{feedback}</p>}
    </form>
  );
};

export default ContactFormComponent;
