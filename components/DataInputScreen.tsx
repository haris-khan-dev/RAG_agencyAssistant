
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface DataInputScreenProps {
  onSave: (info: string) => void;
}

const placeholderText = `Welcome to 'PixelPerfect', a design agency specializing in branding and UX/UI design.

Our Mission: To craft beautiful and intuitive digital experiences.

Key Services:
- Brand Identity & Logo Design
- Web & Mobile App UX/UI Design
- Design Systems Development

Our Team:
- CEO: Jane Doe
- Head of Design: John Smith
- Lead UX Researcher: Emily White

Company Policies:
- Work Hours: 9 AM to 5 PM, Monday to Friday. Flexible hours are available upon manager approval.
- Vacation Policy: Employees get 20 paid vacation days per year. Please request time off at least 2 weeks in advance through the HR portal.
- Tech Stack: We primarily use Figma for design, Slack for communication, and Asana for project management.
`;

export const DataInputScreen: React.FC<DataInputScreenProps> = ({ onSave }) => {
  const [info, setInfo] = useState('');

  const handleSave = () => {
    if (info.trim()) {
      onSave(info.trim());
    } else {
        onSave(placeholderText); // Use placeholder if input is empty
    }
  };

  return (
    <div className="flex flex-col h-full p-6 md:p-8 bg-slate-800 rounded-2xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
          <SparklesIcon className="w-8 h-8 text-blue-400" />
          Agency Assistant Setup
        </h1>
        <p className="text-slate-400 mt-2">
          Paste your agency's information below to create a knowledge base.
        </p>
      </div>
      <textarea
        className="flex-grow w-full p-4 bg-slate-900 border-2 border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none text-sm"
        placeholder={placeholderText}
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:bg-slate-600"
      >
        Start Assistant
      </button>
      <p className="text-xs text-slate-500 text-center mt-2">You can click "Start Assistant" to use the example data.</p>
    </div>
  );
};
