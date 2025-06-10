import { Button } from "@/components/ui/button"
import { Leaf, Sprout } from "lucide-react" // Plant-related icons

interface VideoContentCardProps {
  videoSrc: string
  title: string
  description: string
  primaryButtonText?: string
  secondaryButtonText?: string
  category?: string
  smallText?: string
  videoPoster?: string
  themeColor?: "green" | "pink" | "blue" // Example theme colors for buttons
}

export default function VideoContentCard({
  videoSrc,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  category,
  smallText,
  videoPoster = "/placeholder.svg?width=600&height=400&text=Loading+Video",
  themeColor = "green",
}: VideoContentCardProps) {
  const themeClasses = {
    green: {
      button: "bg-green-600 hover:bg-green-700 focus-visible:ring-green-500",
      secondaryButton: "border-green-600 text-green-700 hover:bg-green-50 focus-visible:ring-green-500",
      icon: <Leaf className="inline-block h-4 w-4 mr-2" />,
    },
    pink: {
      button: "bg-pink-500 hover:bg-pink-600 focus-visible:ring-pink-500",
      secondaryButton: "border-pink-500 text-pink-600 hover:bg-pink-50 focus-visible:ring-pink-500",
      icon: <Sprout className="inline-block h-4 w-4 mr-2" />,
    },
    blue: {
      // A more neutral/calm option
      button: "bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500",
      secondaryButton: "border-blue-500 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500",
      icon: <Leaf className="inline-block h-4 w-4 mr-2" />,
    },
  }

  const currentTheme = themeClasses[themeColor]

  return (
    <div className="relative aspect-[4/3] sm:aspect-video w-full rounded-2xl overflow-hidden shadow-xl group bg-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110"
        poster={videoPoster}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Light overlay for text contrast if needed, or remove if videos are generally light */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/60" />
      {/* Alternative for very light theme: <div className="absolute inset-0 bg-white/10 z-10" /> */}

      <div className="relative z-20 flex flex-col justify-center items-center text-center h-full p-6 sm:p-8 md:p-10 text-white">
        {category && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 text-gray-100 bg-black/40 px-2 py-1 rounded-md inline-block group-hover:bg-black/50 transition-colors">
            {category}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 leading-tight text-shadow-md tracking-tight group-hover:text-shadow-lg transition-all">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-50 mb-4 sm:mb-6 max-w-lg text-shadow-sm group-hover:text-shadow-md transition-all">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          {primaryButtonText && (
            <Button
              size="lg"
              className={`${currentTheme.button} text-white px-6 py-2.5 text-sm sm:text-base rounded-full w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 transition-all`}
            >
              {currentTheme.icon}
              {primaryButtonText}
            </Button>
          )}
          {secondaryButtonText && (
            <Button
              variant="outline"
              size="lg"
              className={`${currentTheme.secondaryButton} bg-white/80 hover:bg-white backdrop-blur-sm px-6 py-2.5 text-sm sm:text-base rounded-full w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 transition-all`}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
        {smallText && (
          <p className="text-xs text-gray-200 mt-4 text-shadow-sm group-hover:text-shadow-md transition-all">
            {smallText}
          </p>
        )}
      </div>
    </div>
  )
}

// Helper for text shadow (add to globals.css or use Tailwind JIT)
// .text-shadow-sm { text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
// .text-shadow-md { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
// .text-shadow-lg { text-shadow: 0 3px 6px rgba(0,0,0,0.4); }
