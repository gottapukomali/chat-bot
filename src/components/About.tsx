import React from 'react';

export function About() {
  return (
    <main className="container mx-auto px-4 md:px-8 py-12">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Digital Literacy Campaign</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            The Digital Literacy Campaign is a nationwide initiative aimed at empowering individuals with essential digital skills needed in today's increasingly connected world. Our mission is to make digital technology accessible and understandable for everyone, regardless of their age or background.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We believe that digital literacy is a fundamental right in the modern world. Our goal is to bridge the digital divide by providing easy-to-understand guidance for commonly used digital tools and services. Through our interactive chatbot and comprehensive tutorials, we help people gain confidence in using technology for their daily needs.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Interactive chatbot assistance for immediate help</li>
            <li>Step-by-step tutorials for popular apps and services</li>
            <li>Comprehensive guides for digital payment systems</li>
            <li>Navigation and maps usage tutorials</li>
            <li>Basic smartphone usage guidance</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-gray-600 mb-6">
            Since our inception, we have helped thousands of individuals become more confident in using digital tools. Our platform has been particularly successful in helping elderly citizens and those from non-technical backgrounds adapt to digital services for their daily needs.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Mission</h2>
          <p className="text-gray-600">
            Whether you're looking to learn digital skills or want to contribute to our mission, we welcome you to be part of our journey. Together, we can create a more digitally inclusive society.
          </p>
        </div>
      </section>
    </main>
  );
}