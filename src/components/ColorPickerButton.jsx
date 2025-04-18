import { useEffect, useRef } from 'react';
import Pickr from '@simonwep/pickr';

const ColorPickerButton = ({ editor }) => {
  const pickrRef = useRef(null);

  useEffect(() => {
    // مطمئن شو که pickrRef.current وجود داره
    if (!pickrRef.current) {
      console.error("Pickr element not found!");
      return;
    }

    const pickr = Pickr.create({
      el: pickrRef.current, // از pickrRef.current به جای selector استفاده کن
      theme: 'nano', // یا 'classic' یا 'monolith'
      swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)',
      ],
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true,
        },
      },
    });

    pickr.on('change', (color) => {
      const hexColor = color.toHEXA().toString();
      editor.chain().focus().setColor(hexColor).run();
    });

    return () => pickr.destroy();
  }, [editor]);

  return (
    <button ref={pickrRef} className="color-picker-button">
      انتخاب رنگ
    </button>
  );
};

export default ColorPickerButton;
