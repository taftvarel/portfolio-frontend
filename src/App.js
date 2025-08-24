import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Code, User, Briefcase } from 'lucide-react';
import './index.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Go backend
  useEffect(() => {
    fetch('http://api.propcloud.fun/api/projects')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data || []); // ✅ ensures it's never null
        } else {
          setProjects([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setProjects([]); // ✅ fallback to empty array
        setLoading(false);
      });
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-purple-400 ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              John Doe
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              Full Stack Developer
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating innovative web applications with modern technologies. 
              Specialized in React.js frontend development and Go backend services.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a href="/#" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm">
              <Github size={24} />
            </a>
            <a href="/#" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm">
              <Linkedin size={24} />
            </a>
            <a href="/#" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm">
              <Mail size={24} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Code className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-gray-400">React, JavaScript, TypeScript, Tailwind CSS</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Briefcase className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-gray-400">Go, REST APIs, PostgreSQL, MongoDB</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <User className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold mb-2">Tools</h3>
              <p className="text-sm text-gray-400">Docker, Git, AWS, Linux</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-purple-400"></div>
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">🚧 No projects yet</h3>
              <p className="text-gray-400">Check back soon for awesome updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tech || []).map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-400/20 text-purple-300 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a href={project.github} className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                      <a href={project.demo} className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                        <ExternalLink size={16} className="mr-2" />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Mail className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-400">john.doe@example.com</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Github className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-gray-400">@johndoe</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Linkedin className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400">john-doe</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
