
import {Extension} from '@tiptap/core'
export   const FontSizeWithClass = Extension.create({
    name: 'fontSizeWithClass',
  
    addCommands() {
      return {
        setFontSize:
          (size) =>
          ({ chain, state }) => {
            const { from, to } = state.selection;
            if (from === to) {
              console.log(size);
              
              console.log("   اگر متنی انتخاب نشده باشد، اندازه قلم را روی پاراگراف یا هدینگ فعلی اعمال می‌کنیم ");
              
              // اگر متنی انتخاب نشده باشد، اندازه قلم را روی پاراگراف یا هدینگ فعلی اعمال می‌کنیم
              return chain()
                .focus()
                .updateAttributes('paragraph', { class: `font-size-${size}` })
                .updateAttributes('heading', { class: `font-size-${size}` })
                .run();
            } else {
              console.log("اگر متنی انتخاب شده باشد، اندازه قلم را روی متن انتخاب‌شده اعمال می‌کنی");
              console.log(size);
              
              // اگر متنی انتخاب شده باشد، اندازه قلم را روی متن انتخاب‌شده اعمال می‌کنیم
              return chain()
                .focus()
                .setNode('paragraph', { class: `font-size-${size}` })
                .run();
            }
          },
      };
    },
  });