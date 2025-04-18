import { Extension } from "@tiptap/core";
import { Mark } from "@tiptap/core";



export const TextColor=Mark.create({
    name:"textColor",
    addOptions(){
        return {
            types:["textStyle"]
        };
    },
    addGlobalAttributes(){
        return [
            {
                types:this.options.types,
                attributes:{
                    color:{
                        default:null,
                        parseHTML:(element)=>element.style.color || null,
                        renderHTML:(attributes)=>{
                            if(!attributes.color) return {};
                            return {style:`color:${attributes.color}`}
                        }
                    }
                }
            }
        ]
    },
    addCommands(){
        return {
            setColor:
            (color)=>
            ({commends})=>{
                return commends.setMark("textStyle",{color:null})
            },
            unsetColor:
            ()=>
            ({commands})=>{
                return commands.unsetMark("textStyle")
            }
        }
    }
})