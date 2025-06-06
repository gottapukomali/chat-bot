import React from 'react';
import { Users, Target, Award, BookOpen } from 'lucide-react';

export function About() {
  return (
    <main className="container mx-auto px-4 md:px-8 py-12">
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Digital Literacy Campaign</h1>
          <p className="text-xl text-gray-600">
            Empowering individuals with essential digital skills for today's connected world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We believe that digital literacy is a fundamental right in the modern world. Our goal is to bridge the digital divide by providing easy-to-understand guidance for commonly used digital tools and services. Through our interactive chatbot and comprehensive tutorials, we help people gain confidence in using technology for their daily needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where everyone, regardless of age or background, can confidently navigate the digital landscape. By breaking down technological barriers, we're creating a more inclusive digital society where no one is left behind in the digital revolution.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-primary-50 p-6 rounded-xl text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">10,000+</h3>
            <p className="text-gray-600">Users Helped</p>
          </div>

          <div className="bg-primary-50 p-6 rounded-xl text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-primary-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">50+</h3>
            <p className="text-gray-600">Cities Reached</p>
          </div>

          <div className="bg-primary-50 p-6 rounded-xl text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-primary-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">15+</h3>
            <p className="text-gray-600">Awards Won</p>
          </div>

          <div className="bg-primary-50 p-6 rounded-xl text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-primary-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">100+</h3>
            <p className="text-gray-600">Tutorials</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Interactive Learning</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>24/7 chatbot assistance</li>
                  <li>Step-by-step tutorials</li>
                  <li>Practice exercises</li>
                  <li>Progress tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Popular Topics</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Digital payments and banking</li>
                  <li>Social media communication</li>
                  <li>Navigation and maps</li>
                  <li>Online safety and security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Whether you're looking to learn digital skills or want to contribute to our mission, we welcome you to be part of our journey. Together, we can create a more digitally inclusive society.
          </p>
          <button className="btn btn-primary">Get Started Today</button>
        </div>
      </section>
    </main>
  );
}