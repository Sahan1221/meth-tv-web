import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  FolderOpen,
  Heart,
  HeartHandshake
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MethTvLogo } from '../../components/common/MethTvLogo';
import { BRAND_CONFIG } from '../../config/brand';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onNavigateHome,
  children,
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'දළ විශ්ලේෂණය (Overview)', icon: LayoutDashboard },
    { id: 'programs', label: 'වැඩසටහන් කළමනාකරණය', icon: Calendar },
    { id: 'events', label: 'පුණ්‍යකර්ම හා ගැලරි', icon: ImageIcon },
    { id: 'donations', label: 'පරිත්‍යාග හා අරමුදල්', icon: Heart },
    { id: 'dayakathwaya', label: 'දායකත්ව කළමනාකරණය', icon: HeartHandshake },
    { id: 'news', label: 'පුවත් සහ නිවේදන', icon: FileText },
    { id: 'media', label: 'මාධ්‍ය පුස්තකාලය (Media)', icon: FolderOpen },
    { id: 'settings', label: 'නාලිකා සැකසුම්', icon: Settings },
  ];

  const handleSelectTab = (tab: string) => {
    onTabChange(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col lg:flex-row antialiased text-[#2B2526]">
      {/* Mobile Header */}
      <header className="lg:hidden bg-[#4A0B10] text-white px-4 py-3 flex items-center justify-between border-b border-[#650F18] shadow-xs">
        <div className="flex items-center gap-2">
          <div className="p-0.5 rounded-lg bg-white">
            <MethTvLogo size="sm" />
          </div>
          <span className="font-bold text-sm text-white font-sinhala-serif">පරිපාලක පුවරුව</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-stone-200 hover:text-white cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#4A0B10] text-[#F1D5D8] flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 border-r border-[#650F18] ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-0 max-lg:-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header with Official Logo */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white shadow-xs shrink-0">
              <MethTvLogo size="sm" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight font-sinhala-serif">මෙත් රූපවාහිනී</div>
              <div className="text-[11px] text-[#F5C518] font-medium">පරිපාලන අංශය (Admin)</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#9C1C24] text-white shadow-xs font-bold'
                      : 'text-[#F1D5D8] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5C518]' : 'text-stone-300'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (User info & Public site link) */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* User profile */}
          <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl text-xs">
            <div className="w-8 h-8 rounded-full bg-[#9C1C24] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 text-[#F5C518]" />
            </div>
            <div className="overflow-hidden">
              <div className="text-white font-semibold truncate">{user?.name || 'පරිපාලක'}</div>
              <div className="text-[10px] text-stone-300 truncate">{user?.email}</div>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={onNavigateHome}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#F1D5D8] hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F5C518]" />
              <span>ප්‍රසිද්ධ වෙබ් අඩවියට</span>
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-200 hover:text-white hover:bg-rose-900/30 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>පද්ධතියෙන් ඉවත් වන්න</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#FAF7F5]">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
