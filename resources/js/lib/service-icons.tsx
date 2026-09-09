import {
  Camera, Code, Database, Globe, Headset, Layers, Palette,
  Server, Shield, Smartphone, TrendingUp, Wifi,
} from 'lucide-react';

export const serviceIconOptions = [
  { name: 'globe',       label: 'Web',        icon: Globe },
  { name: 'palette',     label: 'Desain',     icon: Palette },
  { name: 'trending-up', label: 'Marketing',  icon: TrendingUp },
  { name: 'headset',     label: 'Konsultasi', icon: Headset },
  { name: 'code',        label: 'Program',    icon: Code },
  { name: 'camera',      label: 'Fotografi',  icon: Camera },
  { name: 'server',      label: 'Server',     icon: Server },
  { name: 'shield',      label: 'Keamanan',   icon: Shield },
  { name: 'smartphone',  label: 'Mobile',     icon: Smartphone },
  { name: 'database',    label: 'Database',   icon: Database },
  { name: 'pen-tool',    label: 'Ilustrasi',  icon: Layers },
  { name: 'wifi',        label: 'Jaringan',   icon: Wifi },
];

const defaultIcon = Layers;

const iconColorMap: Record<string, { bg: string; iconBox: string; iconColor: string }> = {
  'globe':       { bg: 'from-blue-500/10 to-blue-600/5',   iconBox: 'bg-blue-100',         iconColor: 'text-blue-600' },
  'palette':     { bg: 'from-pink-500/10 to-pink-600/5',   iconBox: 'bg-pink-100',         iconColor: 'text-pink-600' },
  'trending-up': { bg: 'from-emerald-500/10 to-emerald-600/5', iconBox: 'bg-emerald-100',  iconColor: 'text-emerald-600' },
  'headset':     { bg: 'from-purple-500/10 to-purple-600/5', iconBox: 'bg-purple-100',     iconColor: 'text-purple-600' },
  'code':        { bg: 'from-cyan-500/10 to-cyan-600/5',       iconBox: 'bg-cyan-100',     iconColor: 'text-cyan-600' },
  'camera':      { bg: 'from-rose-500/10 to-rose-600/5',       iconBox: 'bg-rose-100',     iconColor: 'text-rose-600' },
  'server':      { bg: 'from-slate-500/10 to-slate-600/5',     iconBox: 'bg-slate-100',    iconColor: 'text-slate-600' },
  'shield':      { bg: 'from-orange-500/10 to-orange-600/5',   iconBox: 'bg-orange-100',   iconColor: 'text-orange-600' },
  'smartphone':  { bg: 'from-teal-500/10 to-teal-600/5',       iconBox: 'bg-teal-100',     iconColor: 'text-teal-600' },
  'database':    { bg: 'from-indigo-500/10 to-indigo-600/5',   iconBox: 'bg-indigo-100',   iconColor: 'text-indigo-600' },
  'pen-tool':    { bg: 'from-violet-500/10 to-violet-600/5',   iconBox: 'bg-violet-100',   iconColor: 'text-violet-600' },
  'wifi':        { bg: 'from-sky-500/10 to-sky-600/5',         iconBox: 'bg-sky-100',      iconColor: 'text-sky-600' },
};

const defaultColors = { bg: 'from-gray-500/10 to-gray-600/5', iconBox: 'bg-gray-100', iconColor: 'text-gray-600' };

export function getServiceIcon(name: string | null | undefined) {
  const opt = serviceIconOptions.find((o) => o.name === name);
  return { Icon: opt?.icon || defaultIcon, colors: iconColorMap[name || ''] || defaultColors };
}
