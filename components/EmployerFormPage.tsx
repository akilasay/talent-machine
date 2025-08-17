"use client";

import { useState } from "react";

const EmployerFormPage = () => {
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    industry: "",
    location: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // TODO: Add API call to save employer profile
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-blue-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 cursor-default select-none">
            Create Employer Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />
          <InputField
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />
          <InputField
            label="Industry"
            name="industry"
            value={form.industry}
            onChange={handleChange}
          />
          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <TextAreaField
            label="Company Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <InputField
            label="Contact Email"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            type="email"
          />
          <InputField
            label="Contact Phone"
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            type="tel"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </section>
    </main>
  );
};

// ---------------- Input Field Components ----------------

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      required
    />
  </div>
);

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      required
    />
  </div>
);

export default EmployerFormPage;
