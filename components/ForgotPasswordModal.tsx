import React, { useState } from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 min-h-screen">
      <div className="bg-gray-200 rounded-2xl p-6 w-full max-w-sm relative mx-auto my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black text-center mb-4 uppercase">
          RECUPERAR SENHA
        </h2>

        {/* Instructional Text */}
        <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
          Enviaremos instruções de como redefinir sua senha para o e-mail de cadastro.
        </p>

        {/* Email Input Field */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-300 text-gray-700 placeholder-gray-500 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        {/* Send Recovery Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Enviar recuperação
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
