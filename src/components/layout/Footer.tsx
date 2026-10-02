export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          © 2026 SMK Negeri 2 Indramayu. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Help</a>
        </div>
      </div>
    </footer>
  );
}

