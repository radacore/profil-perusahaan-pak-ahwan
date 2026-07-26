import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';


interface TeamMember {
  id: number;
  name: string;
  title: string;
  photo: string | null;
  bio: string;
}

interface TeamProps {
  teamMembers: TeamMember[];
}

function MemberCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="p-6 text-center">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="mx-auto h-28 w-28 rounded-full object-cover border-4 border-[#E0F2FE]"
          />
        ) : (
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#E0F2FE] border-4 border-[#E0F2FE]">
            <span className="text-3xl font-bold text-[#1E3A8A]">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">{member.name}</h3>
        <p className="mt-1 text-sm text-[#1E3A8A] font-medium">{member.title}</p>

        {member.bio && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 inline-flex items-center text-sm font-medium text-[#0D9488] hover:text-[#0D9488]/80"
            >
              {expanded ? 'Tutup' : 'Lihat Bio'}
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded && (
              <div className="mt-4 border-t border-[#E5E7EB] pt-4 text-left">
                <p className="text-sm text-[#6B7280] leading-relaxed">{member.bio}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Team({ teamMembers }: TeamProps) {
  const settings = (usePage().props as any).settings || {};

  return (
    <>
      <Head title="Tim Kami" />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Tim Kami</h1>
          <p className="mt-2 text-[#E0F2FE]">
            Para profesional di balik {settings.company_name || 'ProfilKorp'}.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {teamMembers.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[#6B7280]">Belum ada anggota tim.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
