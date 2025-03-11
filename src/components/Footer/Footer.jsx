export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Multixy.
          </p>
        </div>
      </footer>
    );
  }
  