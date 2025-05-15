import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

import ParticlesBackground from '../Components/ParticlesBackground';

interface FormData {
  name: string;
  email: string;
}

const Waitlist = () => {
  const [form, setForm] = useState<FormData>({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await addDoc(collection(db, 'waitlist'), {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
      });
      setStatus('success');
      setForm({ name: '', email: '' });
    } catch (err) {
      console.error('Error adding document: ', err);
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white font-poppins">
      <ParticlesBackground />

      <div className="bg-white border border-blue-100 rounded-2xl shadow-xl w-[400px] p-6 relative z-10" style={{ boxShadow: '0px 0px 20px rgba(0, 89, 255, 0.2)' }}>
        {/* Top bar like Mac window */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Join the <span className="text-blue-600 font-bold">waitlist</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 z-1 text-black">
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-blue-800 rounded-xl p-2 px-4 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-blue-800 rounded-xl p-2 px-4 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold py-2 rounded-xl hover:bg-blue-900 transition"
          >
            Join Now
          </button>
          {status === 'success' && (
            <p className="text-green-600 mt-2 text-center">
              You're on the list! You’ll be first to know when Apexo launches 🎉
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-2 text-center">Oops! Something went wrong.</p>
          )} {/* Close Button (optional) */}
        <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2">
         
        </div>
        </form>

       
      </div>
    </div>
  );
};

export default Waitlist;