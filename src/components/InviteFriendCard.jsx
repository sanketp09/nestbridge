import { Mail, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { properties } from '../data/properties'

export default function InviteFriendCard() {
  const [friendName, setFriendName] = useState('')
  const [friendEmail, setFriendEmail] = useState('')
  const [friendPhone, setFriendPhone] = useState('')

  const picks = useMemo(() => properties.slice(0, 3), [])
  const referralLink = `${window.location.origin}/referral-showcase?ref=${encodeURIComponent(friendName || 'NestBridge Member')}`

  const message = `Hi ${friendName || 'Friend'},\n\nI found an amazing premium property platform called NestBridge.\n\nWhy you should check it now:\n- 100% verified listings\n- cinematic property tours\n- secure closing support\n\nTop picks right now:\n1) ${picks[0].title} - ${picks[0].priceDisplay}\n   ${picks[0].image}\n2) ${picks[1].title} - ${picks[1].priceDisplay}\n   ${picks[1].image}\n3) ${picks[2].title} - ${picks[2].priceDisplay}\n   ${picks[2].image}\n\nExplore full showcase here:\n${referralLink}`

  const sendWhatsapp = () => {
    const phone = friendPhone.replace(/\D/g, '')
    const url = `https://wa.me/${phone || ''}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const sendEmail = () => {
    const subject = 'Exclusive NestBridge Property Picks For You'
    const body = message + '\n\nThis invitation was shared via NestBridge Invite a Friend.'
    window.location.href = `mailto:${friendEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <article className="rounded-2xl border border-gold/40 bg-surface p-5">
      <h3 className="font-display text-3xl text-text">Invite A Friend</h3>
      <p className="text-sm text-muted mt-2">
        Share a premium ad-style invite with property visuals and strong pitch copy. Your friend can open a dedicated showcase page instantly.
      </p>

      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        {picks.map((item) => (
          <div key={item.id} className="rounded-xl border border-border overflow-hidden bg-bg">
            <img src={item.image} alt={item.title} className="w-full h-24 object-cover" />
            <div className="p-2">
              <p className="text-xs text-text truncate">{item.title}</p>
              <p className="text-[11px] text-gold">{item.priceDisplay}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid sm:grid-cols-3 gap-2">
        <input
          className="input-dark !text-xs"
          placeholder="Friend name"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <input
          className="input-dark !text-xs"
          placeholder="Friend email"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
        />
        <input
          className="input-dark !text-xs"
          placeholder="Friend WhatsApp number"
          value={friendPhone}
          onChange={(e) => setFriendPhone(e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={sendWhatsapp} className="btn-gold inline-flex items-center gap-2">
          <MessageCircle size={16} /> Send On WhatsApp
        </button>
        <button
          onClick={sendEmail}
          className="rounded-xl border border-border px-4 py-2.5 text-sm text-text hover:border-gold inline-flex items-center gap-2"
        >
          <Mail size={16} /> Send Via Email
        </button>
      </div>
    </article>
  )
}
