import { Bath, BedDouble, CircleCheck, MoveRight, Ruler, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PropertyCard({ property }) {
  const navigate = useNavigate()

  return (
    <article className="group rounded-2xl overflow-hidden border border-border bg-surface hover-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-text border border-border">
          {property.status}
        </span>
        {property.verified && (
          <span className="absolute right-3 top-3 rounded-full bg-success/15 text-success px-3 py-1 text-xs flex items-center gap-1 border border-success/40">
            <CircleCheck size={12} /> Verified
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-text leading-tight">{property.title}</h3>
        <p className="mt-2 text-sm text-muted flex items-center gap-1">
          <MapPin size={14} /> {property.location}
        </p>
        <p className="mt-3 text-gold text-2xl font-semibold">{property.priceDisplay}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted">
          <div className="chip"><BedDouble size={13} /> {property.beds || '-'} Beds</div>
          <div className="chip"><Bath size={13} /> {property.baths || '-'} Baths</div>
          <div className="chip"><Ruler size={13} /> {property.sqft} sqft</div>
        </div>
        <button
          onClick={() => navigate(`/property/${property.id}`)}
          className="mt-5 w-full rounded-xl border border-gold bg-gold/10 px-4 py-2.5 text-sm text-gold hover:bg-gold hover:text-black transition flex items-center justify-center gap-2"
        >
          View Details <MoveRight size={15} />
        </button>
      </div>
    </article>
  )
}
