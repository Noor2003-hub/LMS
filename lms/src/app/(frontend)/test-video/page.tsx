// app/test-video/page.tsx
export default function TestVideoPage() {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black">
        <div className="w-4/5 aspect-video border-2 border-white">
          <iframe
            src="https://iframe.mediadelivery.net/embed/416221/b8ed4862-6d12-464b-a7bc-62cd432b36e7"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-none"
          />
        </div>
      </div>
    );
  }
  