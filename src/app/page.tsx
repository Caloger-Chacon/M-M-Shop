export default function Home() {
  return (
    <main className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Logo como texto estilizado */}
        <div className="mb-6">
        <img 
          src="/logo.png" 
          alt="M&M Shop" 
          className="h-24 md:h-32 mx-auto mb-6"
        />
        </div>
        
        {/* EST. 2026 con líneas decorativas */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16 md:w-24 bg-terracotta"></div>
          <p className="text-terracotta text-sm md:text-base font-medium tracking-widest uppercase">
            EST. 2026
          </p>
          <div className="h-px w-16 md:w-24 bg-cream"></div>
        </div>
        
        {/* Slogan */}
        <p className="text-charcoal-light text-base md:text-lg font-light">
          Tu belleza es primero
        </p>
      </div>
    </main>
  )
}