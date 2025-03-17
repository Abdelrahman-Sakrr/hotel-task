import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-700 dark:text-gray-200 tracking-widest">
        404
      </h1>
      <div className=" px-2 text-sm rounded mt-5 absolute">Page Not Found</div>
      <div className="text-gray-500 dark:text-gray-400 text-xl font-medium mt-4 mb-8">
        Oops! The page you're looking for doesn't exist.
      </div>
      <Link to="/">
        <Button color="violet" variant="default" size="lg">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
