import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    title: "Project Overview",
    content: "Campaign Sign Tracker is a web-based solution designed to help political campaigns track the potential and physical locations of their campaign signs effectively and efficiently."
  },
  {
    title: "Purpose",
    content: "To streamline the process of reporting, resolving, and managing campaign sign placements. This system aims to replace traditional methods like paper maps or Excel spreadsheets, which can be challenging to manage."
  },
  {
    title: "Intended Audience",
    content: "• Politicians at different levels\n• Campaign managers\n• Volunteers assisting with campaigns\n• Paid sign crews\n• Potential integration with established political software companies"
  },
  {
    title: "Potential Impact",
    content: "• Improved efficiency in sign placement and tracking\n• Better management of sign conditions and statuses\n• Enhanced coordination between campaign team members\n• Increased visibility and effectiveness of campaign signs\n• Cost-effective solution for campaigns of all sizes"
  },
  {
    title: "Work Plan",
    content: "1. Install and become familiar with Next.js and JavaScript\n2. Learn and implement Google Maps API\n3. Set up and implement a Google Firebase database\n4. Create a web-based interface combining the database and map\n5. Develop a homepage with navigation and filtering options\n6. Conduct multiple rounds of testing and refinement"
  },
  {
    title: "Design Overview",
    content: "• Web-based application accessible from various devices\n• Built using Next.js, JavaScript, HTML, CSS, and Google Maps API\n• Database component for tracking sign locations with filters and statuses\n• Map view showing sign locations as pins\n• Responsive design for use on desktop, tablet, and mobile devices"
  },
  {
    title: "Key Requirements",
    content: "✓ Responsive UI for multiple device types\n✓ Login authentication\n✓ GPS integration for current location\n✓ Address-based pin placement\n✓ Status assignment for sign locations\n✓ Crossroads and sign type categorization\n✓ Database and map views\n✓ Search functionality by crossroads"
  },
  {
    title: "Stretch Goals",
    content: "• Photo integration for sign locations\n• Dashboard with sign statistics\n• Color-coded pins for different statuses\n• Favoriting/flagging sign locations"
  },
  {
    title: "User Testing",
    content: "• Three rounds of testing planned\n• User Acceptance Testing (UAT) to be performed by a respected politician and their sign crew\n• Testing will verify core functionalities such as location tracking, address pin placement, status sorting, and search capabilities"
  },
  {
    title: "New CS Concepts Learned",
    content: "• Next.js framework for React applications\n• Google Maps API integration\n• Firebase for online storage\n• MongoDB for database management\n• TypeScript for enhanced JavaScript functionality\n• Responsive web design techniques"
  }
];

const SlideDeck = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: "url('https://cconover2.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5312d327-2375-4c98-832f-b566cb7c88ca%2F6f591465-2c5b-45c5-abf6-b5efc811f0b5%2FScreenshot_2024-03-30_at_5.42.51_PM.png?table=block&id=e795177d-d903-4698-b6c8-ac6a916238ee&spaceId=5312d327-2375-4c98-832f-b566cb7c88ca&width=2000&userId=&cache=v2')"}}>
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{slides[currentSlide].title}</h2>
            <p className="text-lg whitespace-pre-line text-gray-700">{slides[currentSlide].content}</p>
          </div>
          <div className="flex justify-between p-4 bg-gray-200/80">
            <Button
              onClick={prevSlide}
              variant="outline"
              className="flex items-center bg-white"
            >
              <ChevronLeft className="mr-2" />
              Previous
            </Button>
            <span className="text-lg font-semibold text-gray-800">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              onClick={nextSlide}
              variant="outline"
              className="flex items-center bg-white"
            >
              Next
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

export default SlideDeck;