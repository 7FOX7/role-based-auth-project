'use client';
 
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-black">
      <h2 className="text-center text-white">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-emerald-400 px-4 py-2 text-black transition-colors hover:bg-emerald-600"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}