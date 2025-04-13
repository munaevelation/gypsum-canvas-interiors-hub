
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-black mb-8 text-center">Our Story</h1>
              
              <div className="mb-12 overflow-hidden rounded-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Gypsum Carnis Workshop" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              <ScrollArea className="h-[500px] rounded-md border border-gray-100 p-6">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-semibold text-black mb-4">Our Beginning</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Founded in 2010, Gypsum Carnis began as a small workshop dedicated to creating custom gypsum decorations for local homes and businesses. Our founder, Alex Thompson, had a passion for architectural details and saw an opportunity to bring high-quality gypsum designs to the market at accessible prices.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-semibold text-black mb-4">The Craft</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      At Gypsum Carnis, we believe in preserving traditional craftsmanship while embracing modern techniques and materials. Each piece is carefully designed, molded, and finished by skilled artisans who take pride in their work.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Our manufacturing process combines time-honored techniques with cutting-edge technology. We use only the finest quality gypsum and ensure that each piece meets our exacting standards before it leaves our workshop.
                    </p>
                  </section>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-black mb-3">Our Values</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Quality craftsmanship</li>
                        <li>Attention to detail</li>
                        <li>Customer satisfaction</li>
                        <li>Environmental responsibility</li>
                        <li>Innovation in design</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-black mb-3">Our Mission</h3>
                      <p className="text-gray-700">
                        To enhance interior spaces with timeless, elegant gypsum details that elevate the aesthetic of any room while providing exceptional value and service to our customers.
                      </p>
                    </div>
                  </div>
                  
                  <section>
                    <h2 className="text-2xl font-semibold text-black mb-4">Growth and Innovation</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Over the years, we've expanded our product range to include everything from ceiling cornices and medallions to modern 3D panels. Our design team is constantly developing new patterns and styles to meet the evolving tastes of our customers.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      In 2018, we opened our flagship showroom, allowing customers to experience our products firsthand and consult with our design experts. This has been a game-changer for our business, helping homeowners and designers visualize how our products can transform their spaces.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-semibold text-black mb-4">Looking Forward</h2>
                    <p className="text-gray-700 leading-relaxed">
                      As we continue to grow, we remain committed to our core values of quality, craftsmanship, and customer satisfaction. We're excited about the future and the opportunity to bring our unique gypsum designs to even more homes and businesses around the world.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-semibold text-black mb-4">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                        <h3 className="font-semibold text-black">Alex Thompson</h3>
                        <p className="text-gray-600 text-sm">Founder & CEO</p>
                      </div>
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                        <h3 className="font-semibold text-black">Maria Rodriguez</h3>
                        <p className="text-gray-600 text-sm">Lead Designer</p>
                      </div>
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                        <h3 className="font-semibold text-black">David Chen</h3>
                        <p className="text-gray-600 text-sm">Production Manager</p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
