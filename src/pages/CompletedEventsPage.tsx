import React, { useState } from 'react';
import { Calendar, MapPin, Image as ImageIcon, Search, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface CompletedEventsPageProps {
  onNavigate: (route: string) => void;
}

export const CompletedEventsPage: React.FC<CompletedEventsPageProps> = ({ onNavigate }) => {
  const { publishedEvents } = useContent();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = publishedEvents.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#EFE6E4] pb-6">
        <div className="text-xs font-bold uppercase text-[#9C1C24] tracking-wider font-sans mb-1">
          පුණ්‍යකර්ම ලේඛනාගාරය (Dhamma Event Archive)
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#650F18] font-sinhala-serif">
          අවසන් වූ පුණ්‍යකර්ම හා ඡායාරූප ගැලරි
        </h1>
        <p className="text-sm text-[#2B2526] mt-2 max-w-3xl leading-relaxed">
          මෙත් රූපවාහිනී මාධ්‍ය ජාලයේ මූලිකත්වයෙන් සහ සහභාගීත්වයෙන් දිවයින පුරා පවත්වන ලද ඓතිහාසික පුණ්‍යකර්ම, කඨින මහෝත්සව සහ පොහෝ දින සීල සමාදාන වැඩසටහන්හි ඡායාරූප සටහන්.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs max-w-md relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="පුණ්‍යකර්ම නම හෝ ස්ථානය සොයන්න..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
        />
      </div>

      {/* Grid of Events */}
      <div>
        <div className="text-xs text-stone-500 mb-4">
          පුණ්‍යකර්ම ගැලරි <span className="font-bold text-[#650F18]">{filteredEvents.length}</span> ක් හමුවිය
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE6E4] p-8">
            <div className="w-12 h-12 rounded-full bg-[#FDF4F5] text-[#9C1C24] mx-auto flex items-center justify-center mb-3">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif">
              පුණ්‍යකර්ම කිසිවක් හමු නොවීය
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                onClick={() => onNavigate(`/events/${event.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-stone-200">
                  <img
                    src={event.coverImage || '/src/assets/images/event_kathina_ceremony_1791621311155.jpg'}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Top date badge */}
                  <div className="absolute top-3 left-3 bg-[#650F18]/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg">
                    {event.eventDate}
                  </div>

                  {/* Photo count indicator */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    <ImageIcon className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span className="font-bold">{event.photos?.length || 0}</span>
                    <span>ඡායාරූප</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors leading-snug font-sinhala-serif line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-xs text-[#2B2526] line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                    <span className="text-stone-500 flex items-center gap-1 truncate max-w-[180px]">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      {event.venue}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`/events/${event.id}`);
                      }}
                      className="px-3.5 py-1.5 bg-[#FDF4F5] hover:bg-[#F5DADC] text-[#9C1C24] font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>ඡායාරූප බලන්න</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
