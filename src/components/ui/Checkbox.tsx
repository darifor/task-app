import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
  size?: number;
}

export const Checkbox = ({ checked, onChange, color = "#4648d4", size = 24 }: CheckboxProps) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className="flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-transform active:scale-90"
      style={{ width: size, height: size }}
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: checked ? color : 'transparent',
          borderColor: checked ? color : '#767586', // outline color
        }}
        className="w-full h-full rounded-full border-2 flex items-center justify-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: checked ? 1 : 0,
            scale: checked ? 1 : 0 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="material-symbols-outlined text-on-primary text-[16px] font-bold"
        >
          check
        </motion.span>
      </motion.div>
    </button>
  );
};
