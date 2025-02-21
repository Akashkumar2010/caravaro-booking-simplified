
import { Button } from "./ui/button";

export function Download() {
  return (
    <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
            <p className="text-gray-300 mb-8">
              Get the best car services experience with our mobile app. Book services, track your
              bookings, and manage your profile on the go.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                App Store
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                Play Store
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/400x600"
              alt="Mobile App"
              className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
