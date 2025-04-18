// import { Mark, mergeAttributes } from "@tiptap/core";

// export const Subscript = Mark.create({
//   name: "subscript",

//   // تعریف اینکه چه تگ HTML ای برای subscript استفاده بشه
//   parseHTML() {
//     return [
//       {
//         tag: "sub",
//       },
//     ];
//   },

//   // رندر کردن تگ HTML برای subscript
//   renderHTML({ HTMLAttributes }) {
//     return ["sub", mergeAttributes(HTMLAttributes), 0];
//   },

//   // تعریف دستور toggleSubscript
//   addCommands() {
//     return {
//       toggleSubscript:
//         () =>
//         ({ state, dispatch }) => {
//           const { tr } = state;
//           const markType = this.type; // اشاره به خود مارک subscript
//           const { from, to } = state.selection;

//           // بررسی اینکه آیا مارک subscript در محدوده انتخاب‌شده فعال است یا نه
//           const isActive = state.doc.rangeHasMark(from, to, markType);

//           // اگر فعال بود، غیرفعالش کن، وگرنه فعالش کن
//           if (isActive) {
//             tr.removeMark(from, to, markType);
//           } else {
//             tr.addMark(from, to, markType.create());
//           }

//           // اعمال تغییرات
//           if (dispatch) dispatch(tr);
//           return true;
//         },
//     };
//   },
// });









import { Mark, mergeAttributes } from '@tiptap/core'
import type { StyleParseRule } from '@tiptap/pm/model'





/**
 * This extension allows you to create subscript text.
 * @see https://www.tiptap.dev/api/marks/subscript
 */
export const Subscript = Mark.create({
  name: 'subscript',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'sub',
      },
      {
        style: 'vertical-align',
        getAttrs(value) {
          // Don’t match this rule if the vertical align isn’t sub.
          if (value !== 'sub') {
            return false
          }

          // If it falls through we’ll match, and this mark will be applied.
          return null
        },
      } 
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['sub', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setSubscript: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleSubscript: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetSubscript: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-,': () => this.editor.commands.toggleSubscript(),
    }
  },
})
