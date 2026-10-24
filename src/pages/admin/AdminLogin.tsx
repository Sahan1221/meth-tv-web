import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MethTvLogo } from '../../components/common/MethTvLogo';

interface AdminLoginProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onNavigateHome }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@methtv.lk');
  const [password, setPassword] = useState('methadmin2026#');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message || 'පිවිසීම අසාර්ථක විය.');
      }
    } catch {
      setError('පද්ධති දෝෂයක් හටගැනිණි.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (type: 'admin' | 'editor') => {
    if (type === 'admin') {
      setEmail('admin@methtv.lk');
      setPassword('methadmin2026#');
    } else {
      setEmail('editor@methtv.lk');
      setPassword('metheditor2026#');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Decorative warm maroon radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF5F6] via-[#FAF7F5] to-[#FAF7F5] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        {/* Official Logo */}
        <div className="p-2.5 rounded-2xl bg-white border border-[#EFE6E4] shadow-xs inline-block mb-4">
          <MethTvLogo size="md" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
          මෙත් රූපවාහිනී පරිපාලන පද්ධතිය
        </h1>
        <p className="text-xs text-[#9C1C24] mt-1 font-medium">
          METH TV Administrator Portal — ආරක්ෂිත පිවිසුම
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-3xl sm:px-10 border border-[#EFE6E4]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#650F18] mb-1.5">
                විද්‍යුත් තැපෑල (Email)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-xs text-[#2B2526] focus:outline-none focus:ring-2 focus:ring-[#9C1C24]"
                  placeholder="admin@methtv.lk"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#650F18] mb-1.5">
                මුරපදය (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-xs text-[#2B2526] focus:outline-none focus:ring-2 focus:ring-[#9C1C24]"
                  placeholder="••••••••••••"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-[#9C1C24] hover:bg-[#80141D] active:scale-[0.99] transition-all disabled:opacity-50 shadow-xs cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>පරිපාලක පද්ධතියට පිවිසෙන්න</span>
                  <ArrowRight className="w-4 h-4 text-[#F5C518]" />
                </>
              )}
            </button>
          </form>

          {/* Prototype credentials quick-fill helper */}
          <div className="mt-6 pt-5 border-t border-[#EFE6E4] space-y-3">
            <div className="flex items-center gap-1.5 text-[11px] text-[#650F18] font-semibold">
              <Info className="w-3.5 h-3.5 text-[#9C1C24]" />
              <span>නිරූපණ පිවිසුම් ගිණුම් (Demo Credentials):</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="p-2 bg-[#FAF7F5] hover:bg-[#FDF4F5] border border-[#EFE6E4] rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-[#650F18]">ප්‍රධාන පරිපාලක</div>
                <div className="text-[10px] text-stone-500">Super Admin</div>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('editor')}
                className="p-2 bg-[#FAF7F5] hover:bg-[#FDF4F5] border border-[#EFE6E4] rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-[#650F18]">සංස්කාරක</div>
                <div className="text-[10px] text-stone-500">Content Editor</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#9C1C24] hover:underline cursor-pointer"
            >
              ← ප්‍රසිද්ධ වෙබ් අඩවියට ආපසු යන්න
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
