// components/ContactForm.tsx
import React from "react";

export default function ContactForm() {
  return (
    <section className="bg-white to-gray-950 px-6 py-16 text-white h-screen">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Discutons de votre projet
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm">
              Votre nom
            </label>
            <input
              type="text"
              id="name"
              placeholder="Jean Dupont"
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              placeholder="vous@email.com"
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 text-sm">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Décrivez votre besoin en quelques mots..."
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-md py-3 px-6 font-semibold text-white"
          >
            Envoyer le message
          </button>
        </form>
      </div>
    </section>
  );
}
