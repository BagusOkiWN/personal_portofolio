import { SocialLinks } from "@/components/home/SocialLinks"

export function Footer() {
  return (
    <footer className="bg-bg-secondary py-8 border-t border-border-color mt-auto">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-text-primary font-medium">Okik's Personal Portfolio</p>
          <p className="text-sm text-text-secondary mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <SocialLinks variant="footer" />
      </div>
    </footer>
  )
}
