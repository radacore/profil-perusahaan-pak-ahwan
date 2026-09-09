import { serviceIconOptions } from '@/lib/service-icons';
import { Label } from '@/components/ui/label';

interface IconPickerProps {
  value: string | null | undefined;
  onChange: (name: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="space-y-2">
      <Label>Ikon</Label>
      <div className="grid grid-cols-6 gap-2">
        {serviceIconOptions.map((opt) => {
          const Icon = opt.icon;
          const selected = value === opt.name;
          return (
            <button
              key={opt.name}
              type="button"
              onClick={() => onChange(opt.name)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-all ${
                selected
                  ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                  : 'border-input hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium text-muted-foreground">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
